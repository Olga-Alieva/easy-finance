const React = require('react');
const Layout = require('./Layout');

module.exports = function Home({ user }) {
  return (
    <Layout user={user} active="Home">
      <h1>Home</h1>
      {user ? (
        ''
      ) : (
        <div className="alert alert-success" role="alert">
          {' '}
          Чтобы принять участие, зарегистрируйтесь, пожалуйста.
        </div>
      )}
      <main role="main"></main>
    </Layout>
  );
};
