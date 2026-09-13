import React, { useState, useEffect } from 'react';
import AITalentHuntSite from './components/AITalentHuntSite';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';
import { apiUrl } from './api';

console.log('[App.js] Loading...');

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    console.log('[App.js] Checking auth...');
    const token = localStorage.getItem('adminToken');
    if (token) {
      fetch(apiUrl('/api/admin/verify'), {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          console.log('[App.js] Auth verify status:', res.status);
          if (res.ok) {
            setIsAdmin(true);
          } else {
            localStorage.removeItem('adminToken');
          }
          setAuthChecked(true);
        })
        .catch(err => {
          console.log('[App.js] Auth verify failed:', err.message);
          localStorage.removeItem('adminToken');
          setAuthChecked(true);
        });
    } else {
      setAuthChecked(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('adminToken', token);
    setIsAdmin(true);
    setShowLogin(false);
    setShowAdmin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    setShowAdmin(false);
  };

  console.log('[App.js] Rendering. authChecked:', authChecked, 'showAdmin:', showAdmin, 'isAdmin:', isAdmin);

  if (showAdmin && isAdmin) {
    return <AdminPanel onLogout={handleLogout} onBack={() => setShowAdmin(false)} />;
  }

  return (
    <>
      <AITalentHuntSite 
        isAdmin={isAdmin} 
        onLoginClick={() => setShowLogin(true)} 
        onAdminClick={() => setShowAdmin(true)}
      />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
    </>
  );
}

export default App;
