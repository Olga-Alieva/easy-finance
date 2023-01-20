import { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Records from './pages/Records';
import Protected from './components/ProtectedRoute';
import AddEntry from './pages/AddEntry';

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const destroySession = () => {
    setisLoggedIn(null);
    setUser({});
    window.location = '/';
  };

  const getUser = async () => {
    const response = await fetch('/check-auth-user');
    const responseJson = await response.json();
    setUser(responseJson);
    if (Object.keys(responseJson)?.length !== 0) {
      return setisLoggedIn(true);
    }
    setisLoggedIn(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    // console.log('🚀 ~ userEFFECT', user);
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home user={user} destroySession={destroySession} />} />
        <Route path="/login" element={<Login user={user} destroySession={destroySession} />} />
        <Route
          path="/register"
          element={<Register user={user} destroySession={destroySession} />}
        />
        <Route
          path="/records/add"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <AddEntry user={user} destroySession={destroySession} />
            </Protected>
          }
        />

        <Route
          path="/records"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Records user={user} destroySession={destroySession} />
            </Protected>
          }
        />
        {/* <Route path="/logout" element={<Logout user={user} destroySession={destroySession} />} /> */}

        {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </>
  );
}

export default App;
