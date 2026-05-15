import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { navigate } from '../../hooks/useRoute';
import AuthSidePanel from '../../components/auth/AuthSidePanel';
import RolePicker from '../../components/auth/RolePicker';
import PasswordField from '../../components/auth/PasswordField';
import { IconX, IconArrowRight, IconMail, IconShield } from '../../icons';

export default function LoginPage() {
  const { login } = useAuth();
  const [role, setRole] = useState('Member');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [err, setErr] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) { setErr('Please enter your email and password.'); return; }
    setErr('');
    login({ email, role });
    navigate('/dashboard');
  };

  return (
    <div className="auth-shell">
      <AuthSidePanel mode="login" />
      <div className="auth-form-wrap">
        <div className="auth-card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Sign in to your account</h1>
            <p className="muted-text" style={{ fontSize: '.875rem', marginTop: '.25rem' }}>
              New here? <a href="#/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create an account</a>
            </p>
          </div>

          <div className="auth-tabs">
            <a href="#/login" className="auth-tab active" style={{ textAlign: 'center' }}>Sign in</a>
            <a href="#/signup" className="auth-tab" style={{ textAlign: 'center' }}>Create account</a>
          </div>

          <form onSubmit={submit} className="col gap-4">
            <RolePicker value={role} onChange={setRole} />

            <div>
              <label className="field-label">Email or membership no.</label>
              <input
                className="input-base"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'Member' ? '138742 or you@firm.in' : 'WRO-0563421 or you@email.com'}
                autoComplete="username"
              />
            </div>

            <PasswordField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              show={show}
              setShow={setShow}
              autoComplete="current-password"
            />

            <div className="row" style={{ justifyContent: 'space-between', fontSize: '.8125rem' }}>
              <label className="row gap-2" style={{ cursor: 'pointer' }}>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember me
              </label>
              <a href="#/forgot" style={{ color: 'var(--primary)', fontWeight: 600 }}>Forgot password?</a>
            </div>

            {err && <div className="alert alert-error"><IconX size="sm" /> {err}</div>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '.75rem' }}>
              Sign in <IconArrowRight size="sm" />
            </button>

            <div className="row gap-3" style={{ alignItems: 'center', color: 'var(--muted-foreground)', fontSize: '.75rem', margin: '.25rem 0' }}>
              <div style={{ height: 1, background: 'var(--border)', flex: 1 }} />
              <span>or continue with</span>
              <div style={{ height: 1, background: 'var(--border)', flex: 1 }} />
            </div>

            <div className="row gap-2">
              <button type="button" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>SSP</span> ICAI Self Service
              </button>
              <button type="button" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                <IconMail size="sm" /> Magic link
              </button>
            </div>

            <div className="alert alert-info" style={{ marginTop: '.25rem' }}>
              <IconShield size="sm" />
              <div>
                <strong>Demo:</strong> any email + password will sign you in as the role you picked above.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
