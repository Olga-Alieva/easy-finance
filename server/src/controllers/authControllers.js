const checkAuthUser = async (req, res) => {
  const userEmail = req.session?.userEmail;
  const userId = req.session?.userId;
  res.json(userEmail ? { userEmail, userId } : {});
};

module.exports = { checkAuthUser };
