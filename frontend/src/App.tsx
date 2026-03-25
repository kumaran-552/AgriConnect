import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Agriculture from './pages/Agriculture';
import Insurance from './pages/Insurance';
import Poultry from './pages/Poultry';
import Products from './pages/Products';
import Livestock from './pages/Livestock';
import Experts from './pages/Experts';
import Doctors from './pages/Doctors';
import AuthGuard from './components/auth/AuthGuard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/agriculture" element={<Agriculture />} />
              <Route path="/insurance" element={<Insurance />} />
              <Route path="/poultry" element={<Poultry />} />
              <Route path="/products" element={<Products />} />
              <Route path="/livestock" element={<Livestock />} />
              <Route path="/experts" element={<Experts />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route
                path="/dashboard"
                element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
