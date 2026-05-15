/* Member dashboard — visible after login */

function DashboardPage() {
  const { user, logout } = useAuth();
  if (!user) {
    React.useEffect(() => { navigate("/login"); }, []);
    return null;
  }

  const isMember = user.role === "Member";

  const myEvents = [
    { title: "Direct Tax Amendments — Practical Insights", date: "18 May 2026", status: "Registered", cpe: 3 },
    { title: "GST Annual Return & Audit Workshop", date: "22 May 2026", status: "Registered", cpe: 6 },
    { title: "AI Tools for Chartered Accountants", date: "08 Jun 2026", status: "Waitlisted", cpe: 3 },
  ];
  const recentUdins = [
    { id: "26ABC1234EFG567HIJ", date: "02 May 2026", doc: "Tax Audit Report — XYZ Pvt Ltd" },
    { id: "26DEF5678IJK901LMN", date: "28 Apr 2026", doc: "Net Worth Certificate — A. Sharma" },
    { id: "26GHI9012MNO345PQR", date: "21 Apr 2026", doc: "Bank Audit — UCB Branch 12" },
  ];

  const cpeProgress = Math.round((user.cpe / 40) * 100);

  return (
    <section className="container" style={{ padding: "2.5rem 1rem" }}>
      {/* Welcome row */}
      <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr", alignItems: "start" }} data-dash-header>
        <div>
          <div className="tiny-eyebrow">My Account</div>
          <h1 style={{ marginTop: ".25rem", fontSize: "1.875rem", fontWeight: 700 }}>Welcome back, {user.name.split(" ")[0]}</h1>
          <p className="muted-text" style={{ marginTop: ".25rem" }}>
            {isMember ? "Membership No." : "SRO No."} <strong style={{ color: "var(--foreground)" }}>{user.memberNo}</strong> · Member since {user.since}
          </p>
        </div>
        <div className="row gap-2" style={{ flexWrap: "wrap" }}>
          <a href="#/events" className="btn btn-outline">Browse events</a>
          <a href="#/praygyaan" className="btn btn-primary"><IconBot size="sm" /> Ask PrayGyaan</a>
        </div>
      </div>

      {/* Stats */}
      <div style={{ marginTop: "2rem", display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {isMember ? (
          <>
            <StatCard label="CPE hours (this year)" num={user.cpe} suffix="/40" Icon={IconAward} />
            <StatCard label="UDINs generated" num={user.udin} Icon={IconShield} />
            <StatCard label="Events registered" num={myEvents.length} Icon={IconCalendar} />
            <StatCard label="Documents in locker" num={6} Icon={IconFileText} />
          </>
        ) : (
          <>
            <StatCard label="Articleship status" num="On track" Icon={IconAward} />
            <StatCard label="Mock tests taken" num={3} suffix="/8" Icon={IconBookOpen} />
            <StatCard label="Events attended" num={2} Icon={IconCalendar} />
            <StatCard label="Mentor sessions" num={1} Icon={IconUsers} />
          </>
        )}
      </div>

      {/* Two-column body */}
      <div style={{ marginTop: "2rem", display: "grid", gap: "1.5rem", gridTemplateColumns: "1fr" }} data-dash-body>
        {/* Main column */}
        <div className="col gap-5">
          {isMember && (
            <div className="card">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>CPE compliance</h2>
                <span className="badge badge-secondary">FY 2025–26</span>
              </div>
              <div className="row gap-3" style={{ marginTop: "1rem", justifyContent: "space-between" }}>
                <span className="muted-text" style={{ fontSize: ".875rem" }}>{user.cpe} of 40 hours completed</span>
                <span style={{ fontWeight: 600, fontSize: ".875rem", color: cpeProgress >= 75 ? "var(--secondary)" : "var(--primary)" }}>{cpeProgress}%</span>
              </div>
              <div className="progress-track" style={{ marginTop: ".5rem" }}>
                <div className="progress-fill" style={{ width: cpeProgress + "%" }} />
              </div>
              <div className="row gap-3" style={{ marginTop: "1rem", flexWrap: "wrap", color: "var(--muted-foreground)", fontSize: ".75rem" }}>
                <span>Structured: 18 hrs</span>
                <span>·</span>
                <span>Unstructured: 10 hrs</span>
                <span>·</span>
                <span>3-yr block target: 120 hrs</span>
              </div>
            </div>
          )}

          <div className="card">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>My upcoming events</h2>
              <a href="#/events" style={{ color: "var(--primary)", fontSize: ".875rem", fontWeight: 600 }}>Find more →</a>
            </div>
            <ul className="col" style={{ listStyle: "none", padding: 0, margin: ".75rem 0 0" }}>
              {myEvents.map((e) => (
                <li key={e.title} className="row" style={{ justifyContent: "space-between", padding: ".75rem 0", borderBottom: "1px solid var(--border)", gap: "1rem" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: ".875rem" }}>{e.title}</div>
                    <div className="row gap-3 muted-text" style={{ fontSize: ".75rem", marginTop: ".25rem" }}>
                      <span className="row gap-1"><IconCalendar size="sm" /> {e.date}</span>
                      <span className="row gap-1"><IconAward size="sm" /> {e.cpe} CPE</span>
                    </div>
                  </div>
                  <span className="badge" style={{
                    background: e.status === "Registered" ? "oklch(0.55 0.14 155 / 0.12)" : "oklch(0.85 0.16 90 / 0.4)",
                    color: e.status === "Registered" ? "var(--secondary)" : "var(--accent-foreground)" }}>{e.status}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* {isMember && (
            <div className="card">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>Recent UDINs</h2>
                <button className="btn btn-outline" style={{ padding: ".4rem .9rem" }}>+ New UDIN</button>
              </div>
              <ul className="col" style={{ listStyle: "none", padding: 0, margin: ".75rem 0 0" }}>
                {recentUdins.map((u) => (
                  <li key={u.id} className="row" style={{ justifyContent: "space-between", padding: ".75rem 0", borderBottom: "1px solid var(--border)", gap: "1rem", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontFamily: "monospace", fontSize: ".8125rem", fontWeight: 600 }}>{u.id}</div>
                      <div className="muted-text" style={{ fontSize: ".75rem", marginTop: ".25rem" }}>{u.doc}</div>
                    </div>
                    <span className="muted-text" style={{ fontSize: ".75rem" }}>{u.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )} */}
        </div>

        {/* Side column */}
        <div className="col gap-5">
          <div className="card">
            <div className="row gap-3">
              <span className="avatar-circle" style={{ width: "3.5rem", height: "3.5rem", fontSize: "1rem" }}>
                {user.name.split(" ").map(p => p[0]).slice(0,2).join("")}
              </span>
              <div>
                <div style={{ fontWeight: 600 }}>{user.name}</div>
                <div className="muted-text" style={{ fontSize: ".8125rem" }}>{user.email}</div>
                <span className="badge badge-secondary" style={{ marginTop: ".375rem" }}>{user.role}</span>
              </div>
            </div>
            <div className="col gap-2" style={{ marginTop: "1rem" }}>
              <button className="btn btn-outline" style={{ justifyContent: "flex-start" }}><IconUser size="sm" /> Edit profile</button>
              <button className="btn btn-outline" style={{ justifyContent: "flex-start" }}><IconSettings size="sm" /> Account settings</button>
              <button onClick={logout} className="btn btn-outline" style={{ justifyContent: "flex-start", color: "var(--destructive)", borderColor: "oklch(0.577 0.245 27.325 / 0.3)" }}>
                <IconLogOut size="sm" /> Sign out
              </button>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontWeight: 600 }}>Quick actions</h3>
            <div className="col gap-2" style={{ marginTop: ".75rem" }}>
              {(isMember ? [
                { Icon: IconShield, t: "Generate UDIN", to: "/members" },
                { Icon: IconAward, t: "View CPE certificates", to: "/members" },
                { Icon: IconBriefcase, t: "Update firm details", to: "/members" },
                { Icon: IconHandshake, t: "Contribute to CABF", to: "/benevolent-fund" },
              ] : [
                { Icon: IconBookOpen, t: "Take a mock test", to: "/students" },
                { Icon: IconBriefcase, t: "Articleship vacancies", to: "/students" },
                { Icon: IconUsers, t: "Book a mentor", to: "/career-counselling" },
                { Icon: IconAward, t: "View certificates", to: "/students" },
              ]).map((a) => (
                <a key={a.t} href={"#" + a.to} className="row gap-2" style={{ padding: ".5rem .625rem", borderRadius: ".375rem", fontSize: ".8125rem", border: "1px solid var(--border)" }}>
                  <a.Icon size="sm" /> {a.t}
                  <IconArrowRight size="sm" style={{ marginLeft: "auto", color: "var(--muted-foreground)" }} />
                </a>
              ))}
            </div>
          </div>

          {/* <div className="card" style={{ background: "linear-gradient(135deg, oklch(0.55 0.14 155 / 0.08), oklch(0.36 0.13 255 / 0.08))", borderColor: "transparent" }}>
            <div className="row gap-2" style={{ color: "var(--secondary)", fontSize: ".75rem", fontWeight: 600 }}>
              <IconBot size="sm" /> AI ASSISTANT
            </div>
            <h3 style={{ marginTop: ".5rem", fontWeight: 600 }}>Need help with something?</h3>
            <p className="muted-text" style={{ fontSize: ".875rem", marginTop: ".25rem" }}>
              Ask PrayGyaan about {isMember ? "UDIN, COP, or CPE rules" : "articleship, exams or scholarships"} — anytime.
            </p>
            <a href="#/praygyaan" className="btn btn-primary" style={{ marginTop: "1rem" }}>Open PrayGyaan <IconArrowRight size="sm" /></a>
          </div> */}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          [data-dash-header] { grid-template-columns: 1fr auto !important; align-items: center !important; }
        }
        @media (min-width: 960px) {
          [data-dash-body] { grid-template-columns: 1fr 320px !important; }
        }
      `}</style>
    </section>
  );
}

function StatCard({ label, num, suffix, Icon }) {
  return (
    <div className="stat-card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="stat-label">{label}</span>
        {Icon && <span className="muted-text"><Icon size="sm" /></span>}
      </div>
      <div className="stat-num" style={{ marginTop: ".5rem" }}>
        {num}{suffix && <span style={{ color: "var(--muted-foreground)", fontSize: "1rem", fontWeight: 500 }}>{suffix}</span>}
      </div>
    </div>
  );
}

Object.assign(window, { DashboardPage });
