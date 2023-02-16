const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const passCheck = await bcrypt.compare(password, user.password);
      if (passCheck) {
        req.session.userEmail = user.email;
        req.session.userId = user.id;
        req.session.save(() => res.redirect('/'));
      } else {
        return res.redirect('/login?error=password_incorrect');
      }
    } else {
      return res.redirect('/login?error=email_not_found');
    }
  } catch (error) {
    console.log(error);
    return res.redirect('/login?error=error_unknown');
  }
};

module.exports = { loginUser };
