import { createContext, useContext, useState, useEffect } from 'react';
import { IconCheckCircle, IconX, IconBell } from '../icons';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('icai_demo_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (user) localStorage.setItem('icai_demo_user', JSON.stringify(user));
    else localStorage.removeItem('icai_demo_user');
  }, [user]);

  const showToast = (text, kind = 'success') => {
    setToast({ text, kind });
    setTimeout(() => setToast(null), 2800);
  };

  const login = (creds) => {
    const role = creds.role || 'Member';
    const name =
      creds.name ||
      (role === 'Member'
        ? 'CA Anjali Sharma'
        : role === 'Student'
          ? 'Rohan Deshmukh'
          : 'Visitor');
    const u = {
      name,
      email: creds.email || 'anjali.sharma@example.com',
      role,
      memberNo:
        role === 'Member' ? '138742' : role === 'Student' ? 'WRO-0563421' : null,
      cpe: role === 'Member' ? 28 : 0,
      udin: role === 'Member' ? 14 : 0,
      since: 'Apr 2026',
    };
    setUser(u);
    showToast(`Welcome back, ${u.name.split(' ').slice(-1)[0]}!`);
  };

  const signup = (data) => {
    const u = {
      name: data.name,
      email: data.email,
      role: data.role,
      memberNo:
        data.role === 'Member'
          ? 'NEW-' + Math.floor(100000 + Math.random() * 900000)
          : data.role === 'Student'
            ? 'WRO-' + Math.floor(1000000 + Math.random() * 9000000)
            : null,
      cpe: 0,
      udin: 0,
      since: 'May 2026',
    };
    setUser(u);
    showToast('Account created. Welcome to ICAI Nagpur!');
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out', 'info');
    window.location.hash = '#/';
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, showToast }}>
      {children}
      {toast && (
        <div className="toast" role="status">
          {toast.kind === 'success' ? (
            <IconCheckCircle />
          ) : toast.kind === 'error' ? (
            <IconX />
          ) : (
            <IconBell />
          )}
          <span>{toast.text}</span>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
