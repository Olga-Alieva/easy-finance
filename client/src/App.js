import { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Records from './pages/Records';
import Protected from './components/ProtectedRoute';
import AddEntry from './pages/AddEntry';
import { UserContext } from './context/UserContext';

function App() {
  const { getUser } = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/records/add"
          element={
            <Protected>
              <AddEntry />
            </Protected>
          }
        />

        <Route
          path="/records"
          element={
            <Protected>
              <Records />
            </Protected>
          }
        />

        {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </>
  );
}

export default App;
