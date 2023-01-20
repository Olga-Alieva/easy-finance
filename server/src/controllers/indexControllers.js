const renderTemplate = require('../lib/renderTemplate');
const Home = require('../views/Home.jsx');
// const { User } = require('../db/models');

const renderHome = async (req, res) => {
  const user = req.session?.userEmail;
  // const userId = req.session?.userId;
  renderTemplate(Home, { user }, res);
};

module.exports = { renderHome };
