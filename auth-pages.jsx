/* Login + Signup + Forgot password screens */

function AuthSidePanel({ mode }) {
  return (
    <div className="auth-side">
      <div style={{ position: "relative", zIndex: 1 }}>
        <a href="#/" className="row gap-3" style={{ color: "white" }}>
          <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: ".5rem", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.25)" }}>CA</div>
          <div>
            <div style={{ fontSize: ".875rem", fontWeight: 700 }}>ICAI Nagpur Branch</div>
            <div style={{ fontSize: ".75rem", opacity: .8 }}>of WIRC of ICAI</div>
          </div>
        </a>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "32rem" }}>
        <div className="row gap-2" style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", padding: ".375rem .75rem", borderRadius: 999, fontSize: ".75rem", fontWeight: 600, width: "fit-content" }}>
          <IconAward size="sm" /> {mode === "signup" ? "Join the branch portal" : "Welcome back"}
        </div>
        <h2 style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.1, margin: "1rem 0 1rem" }}>
          {mode === "signup" ? <>Your gateway to <span style={{ color: "var(--accent)" }}>CPE, UDIN</span> and the Nagpur CA community.</>
                              : <>Pick up where you <span style={{ color: "var(--accent)" }}>left off</span>.</>}
        </h2>
        <p style={{ opacity: .85, lineHeight: 1.55 }}>
          {mode === "signup"
            ? "Track your CPE hours, register for events, generate UDINs, and access the full members directory — all in one place."
            : "Resume registrations, view your CPE tracker, and reconnect with the Nagpur Branch community."}
        </p>

        <div className="col gap-3" style={{ marginTop: "2rem" }}>
          {[
            { Icon: IconCheckCircle, t: "Self-service for members & students" },
            { Icon: IconCheckCircle, t: "150+ CPE events curated each year" },
            { Icon: IconCheckCircle, t: "PrayGyaan AI assistant — built-in" },
          ].map((f, i) => (
            <div key={i} className="row gap-3" style={{ fontSize: ".875rem" }}>
              <span style={{ width: "1.5rem", height: "1.5rem", borderRadius: 999, background: "rgba(255,255,255,.15)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <f.Icon size="sm" />
              </span>
              {f.t}
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, fontSize: ".75rem", opacity: .7 }}>
        Demo mockup · Not connected to live ICAI services · Any credentials work
      </div>
    </div>
  );
}

function RolePicker({ value, onChange }) {
  return (
    <div>
      <label className="field-label">I am a…</label>
      <div className="role-pills">
        {[
          { v: "Member", Icon: IconShield, l: "CA Member" },
          { v: "Student", Icon: IconGraduationCap, l: "Student" },
        ].map((o) => (
          <button key={o.v} type="button"
                  className={"role-pill" + (value === o.v ? " active" : "")}
                  onClick={() => onChange(o.v)}>
            <o.Icon size="sm" /> {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}

function PasswordField({ label, value, onChange, placeholder = "••••••••", show, setShow, autoComplete }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <div style={{ position: "relative" }}>
        <input className="input-base" type={show ? "text" : "password"} value={value} onChange={onChange}
               placeholder={placeholder} autoComplete={autoComplete} style={{ paddingRight: "2.5rem" }} />
        <button type="button" onClick={() => setShow(!show)}
                style={{ position: "absolute", right: ".625rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }}>
          {show ? <IconEyeOff size="sm" /> : <IconEye size="sm" />}
        </button>
      </div>
    </div>
  );
}

function LoginPage() {
  const { login } = useAuth();
  const [role, setRole] = React.useState("Member");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [err, setErr] = React.useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) { setErr("Please enter your email and password."); return; }
    setErr("");
    login({ email, role });
    navigate("/dashboard");
  };

  return (
    <div className="auth-shell">
      <AuthSidePanel mode="login" />
      <div className="auth-form-wrap">
        <div className="auth-card">
          <div style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Sign in to your account</h1>
            <p className="muted-text" style={{ fontSize: ".875rem", marginTop: ".25rem" }}>
              New here? <a href="#/signup" style={{ color: "var(--primary)", fontWeight: 600 }}>Create an account</a>
            </p>
          </div>

          <div className="auth-tabs">
            <a href="#/login" className="auth-tab active" style={{ textAlign: "center" }}>Sign in</a>
            <a href="#/signup" className="auth-tab" style={{ textAlign: "center" }}>Create account</a>
          </div>

          <form onSubmit={submit} className="col gap-4">
            <RolePicker value={role} onChange={setRole} />

            <div>
              <label className="field-label">Email or membership no.</label>
              <input className="input-base" type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                     placeholder={role === "Member" ? "138742 or you@firm.in" : "WRO-0563421 or you@email.com"} autoComplete="username" />
            </div>

            <PasswordField label="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                           show={show} setShow={setShow} autoComplete="current-password" />

            <div className="row" style={{ justifyContent: "space-between", fontSize: ".8125rem" }}>
              <label className="row gap-2" style={{ cursor: "pointer" }}>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember me
              </label>
              <a href="#/forgot" style={{ color: "var(--primary)", fontWeight: 600 }}>Forgot password?</a>
            </div>

            {err && <div className="alert alert-error"><IconX size="sm" /> {err}</div>}

            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: ".75rem" }}>
              Sign in <IconArrowRight size="sm" />
            </button>

            <div className="row gap-3" style={{ alignItems: "center", color: "var(--muted-foreground)", fontSize: ".75rem", margin: ".25rem 0" }}>
              <div style={{ height: 1, background: "var(--border)", flex: 1 }} />
              <span>or continue with</span>
              <div style={{ height: 1, background: "var(--border)", flex: 1 }} />
            </div>

            <div className="row gap-2">
              <button type="button" className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>
                <span style={{ fontWeight: 700, color: "var(--primary)" }}>SSP</span> ICAI Self Service
              </button>
              <button type="button" className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>
                <IconMail size="sm" /> Magic link
              </button>
            </div>

            <div className="alert alert-info" style={{ marginTop: ".25rem" }}>
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

function SignupPage() {
  const { signup } = useAuth();
  const [role, setRole] = React.useState("Member");
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({
    name: "", email: "", phone: "", memberNo: "",
    password: "", confirm: "",
    otp: ["", "", "", "", "", ""],
    consent: false,
  });
  const [show, setShow] = React.useState(false);
  const [err, setErr] = React.useState("");

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const otpRefs = React.useRef([]);

  const setOtp = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...data.otp];
    next[i] = v;
    update("otp", next);
    if (v && i < 5) otpRefs.current[i+1]?.focus();
  };

  const goStep1 = (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.phone) { setErr("Please fill in your details."); return; }
    if (role === "Member" && !data.memberNo) { setErr("Membership number is required for CA members."); return; }
    if (data.password.length < 8) { setErr("Password must be at least 8 characters."); return; }
    if (data.password !== data.confirm) { setErr("Passwords don't match."); return; }
    if (!data.consent) { setErr("Please accept the Web-Media Policy."); return; }
    setErr("");
    setStep(2);
  };

  const goStep2 = (e) => {
    e.preventDefault();
    if (data.otp.join("").length !== 6) { setErr("Enter the full 6-digit code."); return; }
    setErr("");
    setStep(3);
  };

  const finish = () => {
    signup({ name: data.name, email: data.email, role });
    navigate("/dashboard");
  };

  return (
    <div className="auth-shell">
      <AuthSidePanel mode="signup" />
      <div className="auth-form-wrap">
        <div className="auth-card">
          <div style={{ marginBottom: "1.25rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Create your account</h1>
            <p className="muted-text" style={{ fontSize: ".875rem", marginTop: ".25rem" }}>
              Already a user? <a href="#/login" style={{ color: "var(--primary)", fontWeight: 600 }}>Sign in</a>
            </p>
          </div>

          <div className="auth-tabs">
            <a href="#/login" className="auth-tab" style={{ textAlign: "center" }}>Sign in</a>
            <a href="#/signup" className="auth-tab active" style={{ textAlign: "center" }}>Create account</a>
          </div>

          {/* stepper */}
          <div className="row gap-2" style={{ marginBottom: "1.25rem", fontSize: ".75rem", color: "var(--muted-foreground)" }}>
            {["Details", "Verify", "Done"].map((s, i) => {
              const n = i + 1;
              const active = step >= n;
              return (
                <React.Fragment key={s}>
                  <div className="row gap-2" style={{ color: active ? "var(--primary)" : undefined, fontWeight: active ? 600 : 500 }}>
                    <span style={{ width: "1.25rem", height: "1.25rem", borderRadius: 999, fontSize: ".7rem", display: "inline-flex", alignItems: "center", justifyContent: "center", background: active ? "var(--primary)" : "var(--muted)", color: active ? "white" : "var(--muted-foreground)" }}>{step > n ? "✓" : n}</span>
                    {s}
                  </div>
                  {i < 2 && <div style={{ flex: 1, height: 2, background: step > n ? "var(--primary)" : "var(--border)", borderRadius: 2 }} />}
                </React.Fragment>
              );
            })}
          </div>

          {step === 1 && (
            <form onSubmit={goStep1} className="col gap-3">
              <RolePicker value={role} onChange={setRole} />

              <div>
                <label className="field-label">Full name</label>
                <input className="input-base" value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="CA Anjali Sharma" />
              </div>

              <div className="row gap-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div>
                  <label className="field-label">Email</label>
                  <input className="input-base" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="you@firm.in" />
                </div>
                <div>
                  <label className="field-label">Mobile</label>
                  <input className="input-base" type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98000 00000" />
                </div>
              </div>

              <div>
                <label className="field-label">{role === "Member" ? "Membership number" : "SRO / Student registration no."}</label>
                <input className="input-base" value={data.memberNo} onChange={(e) => update("memberNo", e.target.value)} placeholder={role === "Member" ? "e.g. 138742" : "e.g. WRO-0563421"} />
              </div>

              <PasswordField label="Password" value={data.password} onChange={(e) => update("password", e.target.value)}
                             show={show} setShow={setShow} autoComplete="new-password" placeholder="At least 8 characters" />

              <PasswordField label="Confirm password" value={data.confirm} onChange={(e) => update("confirm", e.target.value)}
                             show={show} setShow={setShow} autoComplete="new-password" />

              <label className="row gap-2" style={{ alignItems: "flex-start", fontSize: ".8125rem", cursor: "pointer" }}>
                <input type="checkbox" checked={data.consent} onChange={(e) => update("consent", e.target.checked)} style={{ marginTop: ".15rem" }} />
                <span className="muted-text">I have read and accept the <a href="#" style={{ color: "var(--primary)", fontWeight: 600 }}>ICAI Web-Media Policy</a> and consent to be contacted about CPE programmes.</span>
              </label>

              {err && <div className="alert alert-error"><IconX size="sm" /> {err}</div>}

              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: ".75rem" }}>
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
                    <input key={i} ref={(el) => otpRefs.current[i] = el}
                           className="input-base otp-cell" inputMode="numeric" maxLength={1}
                           value={v} onChange={(e) => setOtp(i, e.target.value)}
                           onKeyDown={(e) => { if (e.key === "Backspace" && !v && i > 0) otpRefs.current[i-1]?.focus(); }} />
                  ))}
                </div>
              </div>

              {err && <div className="alert alert-error"><IconX size="sm" /> {err}</div>}

              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: ".75rem" }}>
                Verify & continue <IconArrowRight size="sm" />
              </button>
              <div className="row" style={{ justifyContent: "space-between", fontSize: ".8125rem" }}>
                <button type="button" className="row gap-1" style={{ color: "var(--muted-foreground)" }} onClick={() => setStep(1)}>
                  <IconArrowLeft size="sm" /> Back
                </button>
                <button type="button" style={{ color: "var(--primary)", fontWeight: 600 }}>Resend code</button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="col gap-4" style={{ alignItems: "center", textAlign: "center", padding: "1rem 0" }}>
              <div style={{ width: "4rem", height: "4rem", borderRadius: 999, background: "oklch(0.55 0.14 155 / 0.12)", color: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconCheck />
              </div>
              <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>You're all set, {data.name.split(" ")[0]}!</h2>
                <p className="muted-text" style={{ fontSize: ".875rem", marginTop: ".5rem" }}>
                  Your {role.toLowerCase()} account has been created. Continue to your dashboard to register for events and explore branch services.
                </p>
              </div>
              <button onClick={finish} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: ".75rem" }}>
                Go to dashboard <IconArrowRight size="sm" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ForgotPage() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  return (
    <div className="auth-shell">
      <AuthSidePanel mode="login" />
      <div className="auth-form-wrap">
        <div className="auth-card">
          <a href="#/login" className="row gap-1 muted-text" style={{ fontSize: ".8125rem", marginBottom: "1rem" }}>
            <IconArrowLeft size="sm" /> Back to sign in
          </a>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Reset your password</h1>
          <p className="muted-text" style={{ fontSize: ".875rem", marginTop: ".25rem", marginBottom: "1.5rem" }}>
            Enter your registered email and we'll send you a reset link.
          </p>
          {sent ? (
            <div className="alert alert-success">
              <IconCheckCircle size="sm" />
              <div>If an account exists for <strong>{email}</strong>, a reset link is on its way. Check your inbox.</div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="col gap-4">
              <div>
                <label className="field-label">Email</label>
                <input className="input-base" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@firm.in" required />
              </div>
              <button className="btn btn-primary" type="submit" style={{ width: "100%", justifyContent: "center", padding: ".75rem" }}>
                Send reset link
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginPage, SignupPage, ForgotPage });
