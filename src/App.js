import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './stores/AuthContext';
import RequireAuth from "./routes/PrivateRoute";
import NotRequireAuth from "./routes/PublicRoute";
import Archive from './components/Archive';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
              <Route
                  path="/"
                  element={
                    <NotRequireAuth>
                      <Login />
                    </NotRequireAuth>
                  }
                />
              <Route
                path="/signup"
                element={
                  <NotRequireAuth>
                    <Signup />
                  </NotRequireAuth>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/archive"
                element={
                  <RequireAuth>
                    <Archive />
                  </RequireAuth>
                }
              />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
