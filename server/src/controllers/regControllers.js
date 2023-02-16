const bcrypt = require('bcrypt');

const { User } = require('../db/models');

const regUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ where: { email }, raw: true });
    if (findUser) {
      return res.redirect('/register?error=email_exists');
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hash });
    req.session.userEmail = newUser.email;
    req.session.userId = newUser.id;
    req.session.save(() => {
      res.redirect('/');
    });
  } catch (error) {
    console.log(error);
    res.redirect('/register?error=error_unknown');
  }
};

module.exports = { regUser };
