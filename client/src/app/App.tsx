import { Routes, Route } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { LoginPage } from 'pages/LoginPage';
import { Layout } from 'app/Layout';
import { RegisterPage } from 'pages/RegisterPage';
import { AddEntryPage } from 'pages/AddEntryPage';
import { ProtectedRoute } from 'app/Route';
import { RecordsPage } from 'pages/RecordsPage';
import { UserContext } from './providers/UserContext';
import { useContext, useEffect } from 'react';
import { StatisticsPage } from 'pages/StatisticsPage';
import { SimpleBarChart } from 'widgets/SimpleBarChart';
import { ReportsPage } from 'pages/ReportsPage';
import { TaxesPage } from 'pages/TaxesPage';
import { DocumentsPage } from 'pages/DocumentsPage';

function App() {
  const { getUser } = useContext(UserContext);

  useEffect(() => {
    if (getUser) {
      getUser();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/records/add"
          element={
            <ProtectedRoute>
              <AddEntryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <RecordsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              {/* <SimpleBarChart /> */}
              <StatisticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/taxes"
          element={
            <ProtectedRoute>
              <TaxesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <DocumentsPage />
            </ProtectedRoute>
          }
        />
        {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
