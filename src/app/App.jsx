/* eslint-disable object-curly-newline */
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ConsoleLayout from '../layouts/ConsoleLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Consultas from '../pages/Consultas';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import Apps from '../pages/Apps';
import Users from '../pages/Users';
import Settings from '../pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="consultas" element={<Consultas />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Route>
        <Route path="console" element={<ConsoleLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="apps" element={<Apps />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
