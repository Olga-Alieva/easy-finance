const logoutUser = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie('NameCookie');
      res.sendStatus(200);
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = { logoutUser };
