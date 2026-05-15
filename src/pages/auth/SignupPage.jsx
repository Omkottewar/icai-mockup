import { useState, useRef, Fragment } from 'react';
import { useAuth } from '../../context/AuthContext';
import { navigate } from '../../hooks/useRoute';
import AuthSidePanel from '../../components/auth/AuthSidePanel';
import RolePicker from '../../components/auth/RolePicker';
import PasswordField from '../../components/auth/PasswordField';
import { IconX, IconArrowRight, IconArrowLeft, IconCheck, IconMail } from '../../icons';

export default function SignupPage() {
  const { signup } = useAuth();
  const [role, setRole] = useState('Member');
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: '', email: '', phone: '', memberNo: '',
    password: '', confirm: '',
    otp: ['', '', '', '', '', ''],
    consent: false,
  });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const otpRefs = useRef([]);

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const setOtp = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...data.otp];
    next[i] = v;
    update('otp', next);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const goStep1 = (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.phone) { setErr('Please fill in your details.'); return; }
    if (role === 'Member' && !data.memberNo) { setErr('Membership number is required for CA members.'); return; }
    if (data.password.length < 8) { setErr('Password must be at least 8 characters.'); return; }
    if (data.password !== data.confirm) { setErr("Passwords don't match."); return; }
    if (!data.consent) { setErr('Please accept the Web-Media Policy.'); return; }
    setErr('');
    setStep(2);
  };

  const goStep2 = (e) => {
    e.preventDefault();
    if (data.otp.join('').length !== 6) { setErr('Enter the full 6-digit code.'); return; }
    setErr('');
    setStep(3);
  };

  const finish = () => {
    signup({ name: data.name, email: data.email, role });
    navigate('/dashboard');
  };

  return (
    <div className="auth-shell">
      <AuthSidePanel mode="signup" />
      <div className="auth-form-wrap">
        <div className="auth-card">
          <div style={{ marginBottom: '1.25rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Create your account</h1>
            <p className="muted-text" style={{ fontSize: '.875rem', marginTop: '.25rem' }}>
              Already a user? <a href="#/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign in</a>
            </p>
          </div>

          <div className="auth-tabs">
            <a href="#/login" className="auth-tab" style={{ textAlign: 'center' }}>Sign in</a>
            <a href="#/signup" className="auth-tab active" style={{ textAlign: 'center' }}>Create account</a>
          </div>

          {/* Stepper */}
          <div className="row gap-2" style={{ marginBottom: '1.25rem', fontSize: '.75rem', color: 'var(--muted-foreground)' }}>
            {['Details', 'Verify', 'Done'].map((s, i) => {
              const n = i + 1;
              const active = step >= n;
              return (
                <Fragment key={s}>
                  <div className="row gap-2" style={{ color: active ? 'var(--primary)' : undefined, fontWeight: active ? 600 : 500 }}>
                    <span style={{ width: '1.25rem', height: '1.25rem', borderRadius: 999, fontSize: '.7rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: active ? 'var(--primary)' : 'var(--muted)', color: active ? 'white' : 'var(--muted-foreground)' }}>
                      {step > n ? '✓' : n}
                    </span>
                    {s}
                  </div>
                  {i < 2 && <div style={{ flex: 1, height: 2, background: step > n ? 'var(--primary)' : 'var(--border)', borderRadius: 2 }} />}
                </Fragment>
              );
            })}
          </div>

          {step === 1 && (
            <form onSubmit={goStep1} className="col gap-3">
              <RolePicker value={role} onChange={setRole} />
              <div>
                <label className="field-label">Full name</label>
                <input className="input-base" value={data.name} onChange={(e) => update('name', e.target.value)} placeholder="CA Anjali Sharma" />
              </div>
              <div className="row gap-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div>
                  <label className="field-label">Email</label>
                  <input className="input-base" type="email" value={data.email} onChange={(e) => update('email', e.target.value)} placeholder="you@firm.in" />
                </div>
                <div>
                  <label className="field-label">Mobile</label>
                  <input className="input-base" type="tel" value={data.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98000 00000" />
                </div>
              </div>
              <div>
                <label className="field-label">{role === 'Member' ? 'Membership number' : 'SRO / Student registration no.'}</label>
                <input className="input-base" value={data.memberNo} onChange={(e) => update('memberNo', e.target.value)} placeholder={role === 'Member' ? 'e.g. 138742' : 'e.g. WRO-0563421'} />
              </div>
              <PasswordField label="Password" value={data.password} onChange={(e) => update('password', e.target.value)} show={show} setShow={setShow} autoComplete="new-password" placeholder="At least 8 characters" />
              <PasswordField label="Confirm password" value={data.confirm} onChange={(e) => update('confirm', e.target.value)} show={show} setShow={setShow} autoComplete="new-password" />
              <label className="row gap-2" style={{ alignItems: 'flex-start', fontSize: '.8125rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={data.consent} onChange={(e) => update('consent', e.target.checked)} style={{ marginTop: '.15rem' }} />
                <span className="muted-text">I have read and accept the <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>ICAI Web-Media Policy</a> and consent to be contacted about CPE programmes.</span>
              </label>
              {err && <div className="alert alert-error"><IconX size="sm" /> {err}</div>}
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '.75rem' }}>
                Continue <IconArrowRight size="sm" />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={goStep2} className="col gap-4">
              <div className="alert alert-info">
                <IconMail size="sm" />
                <div>We sent a 6-digit code to <strong>{data.email}</strong>. <span className="muted-text">(Demo: type any 6 digits)</span></div>
              </div>
              <div>
                <label className="field-label">Verification code</label>
                <div className="otp-grid">
                  {data.otp.map((v, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      className="input-base otp-cell"
                      inputMode="numeric"
                      maxLength={1}
                      value={v}
                      onChange={(e) => setOtp(i, e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Backspace' && !v && i > 0) otpRefs.current[i - 1]?.focus(); }}
                    />
                  ))}
                </div>
              </div>
              {err && <div className="alert alert-error"><IconX size="sm" /> {err}</div>}
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '.75rem' }}>
                Verify & continue <IconArrowRight size="sm" />
              </button>
              <div className="row" style={{ justifyContent: 'space-between', fontSize: '.8125rem' }}>
                <button type="button" className="row gap-1" style={{ color: 'var(--muted-foreground)' }} onClick={() => setStep(1)}>
                  <IconArrowLeft size="sm" /> Back
                </button>
                <button type="button" style={{ color: 'var(--primary)', fontWeight: 600 }}>Resend code</button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="col gap-4" style={{ alignItems: 'center', textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ width: '4rem', height: '4rem', borderRadius: 999, background: 'oklch(0.55 0.14 155 / 0.12)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconCheck />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>You're all set, {data.name.split(' ')[0]}!</h2>
                <p className="muted-text" style={{ fontSize: '.875rem', marginTop: '.5rem' }}>
                  Your {role.toLowerCase()} account has been created. Continue to your dashboard to register for events and explore branch services.
                </p>
              </div>
              <button onClick={finish} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '.75rem' }}>
                Go to dashboard <IconArrowRight size="sm" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
