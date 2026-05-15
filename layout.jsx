/* Header + Footer. Global chrome shared across all pages. */

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/members", label: "Members" },
  { to: "/students", label: "Students" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

const SOCIALS = [
  { Icon: IconFacebook, label: "Facebook", href: "#" },
  { Icon: IconTwitter, label: "Twitter", href: "#" },
  { Icon: IconLinkedin, label: "LinkedIn", href: "#" },
  { Icon: IconYoutube, label: "YouTube", href: "#" },
  { Icon: IconInstagram, label: "Instagram", href: "#" },
];

function Header() {
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    navigate("/search?q=" + encodeURIComponent(q));
  };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,.96)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ background: "rgba(255,255,255,.96)", color: "var(--primary-foreground)", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: ".375rem 1rem", fontSize: ".75rem" }}>
          <span>The Institute of Chartered Accountants of India · Set up by an Act of Parliament</span>
          <div className="row gap-3" style={{ opacity: .85 }}>
            {SOCIALS.map((s) => <a key={s.label} href={s.href} aria-label={s.label}><s.Icon size="sm" /></a>)}
          </div>
        </div>
      </div>

      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: ".75rem 1rem" }}>
        <a href="#/" className="row gap-3">
          <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: ".5rem", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>CA</div>
          <div>
            <div style={{ fontSize: ".875rem", fontWeight: 700, lineHeight: 1.2 }}>ICAI Nagpur Branch</div>
            <div style={{ fontSize: ".75rem", color: "var(--muted-foreground)" }}>of WIRC of ICAI</div>
          </div>
        </a>

        <nav className="row gap-1" style={{ display: "none" }} data-desktop-nav>
          {NAV.map((n) => (
            <Link key={n.to} to={n.to}
                  className="nav-link"
                  activeClassName="nav-link-active">{n.label}</Link>
          ))}
        </nav>

        <div className="row gap-2">
          <form onSubmit={onSearch} className="row gap-2 search-form" style={{ display: "none", border: "1px solid var(--border)", background: "var(--muted)", borderRadius: ".375rem", padding: ".375rem .75rem" }}>
            <IconSearch size="sm" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" style={{ background: "transparent", border: 0, outline: "none", fontSize: ".875rem", width: "11rem" }} />
          </form>

          <a href="#/praygyaan" className="row gap-1 praygyaan-pill" style={{ display: "none", padding: ".375rem .75rem", background: "oklch(0.55 0.14 155 / 0.1)", color: "var(--secondary)", borderRadius: ".375rem", fontSize: ".75rem", fontWeight: 600 }}>
            <IconBot size="sm" /> PrayGyaan AI
          </a>

          {user ? (
            <div ref={menuRef} style={{ position: "relative" }}>
              <button className="avatar-trigger" onClick={() => setMenuOpen(!menuOpen)}>
                <span className="avatar-circle">{user.name.split(" ").map(p => p[0]).slice(0,2).join("")}</span>
                <span className="hide-on-mobile">{user.name.split(" ")[0]}</span>
                <IconChevronDown size="sm" />
              </button>
              {menuOpen && (
                <div className="avatar-menu">
                  <div style={{ padding: ".5rem .625rem", borderBottom: "1px solid var(--border)", marginBottom: ".25rem" }}>
                    <div style={{ fontSize: ".8125rem", fontWeight: 600 }}>{user.name}</div>
                    <div style={{ fontSize: ".75rem", color: "var(--muted-foreground)" }}>{user.email}</div>
                    <span className="badge badge-secondary" style={{ marginTop: ".375rem" }}>{user.role}</span>
                  </div>
                  <a href="#/dashboard" className="menu-item" onClick={() => setMenuOpen(false)}><IconUser size="sm" /> Dashboard</a>
                  <a href="#/members" className="menu-item" onClick={() => setMenuOpen(false)}><IconShield size="sm" /> Member services</a>
                  <a href="#/dashboard" className="menu-item" onClick={() => setMenuOpen(false)}><IconSettings size="sm" /> Settings</a>
                  <button className="menu-item" onClick={() => { setMenuOpen(false); logout(); }} style={{ color: "var(--destructive)", width: "100%", textAlign: "left" }}>
                    <IconLogOut size="sm" /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <a href="#/login" className="btn btn-outline" style={{ padding: ".4rem .9rem" }}>Sign in</a>
              <a href="#/signup" className="btn btn-primary signup-cta" style={{ display: "none", padding: ".4rem .9rem" }}>Sign up</a>
            </>
          )}

          <button className="mobile-toggle" style={{ display: "inline-flex" }} onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="container" style={{ paddingBottom: ".75rem" }}>
          <nav className="col" style={{ borderTop: "1px solid var(--border)", paddingTop: ".5rem" }}>
            {NAV.map((n) => (
              <a key={n.to} href={"#" + n.to} onClick={() => setOpen(false)} style={{ padding: ".5rem 0", fontSize: ".875rem", fontWeight: 500 }}>{n.label}</a>
            ))}
            <a href="#/praygyaan" onClick={() => setOpen(false)} style={{ padding: ".5rem 0", fontSize: ".875rem", fontWeight: 600, color: "var(--secondary)" }}>PrayGyaan AI</a>
            {!user && (
              <a href="#/signup" onClick={() => setOpen(false)} style={{ padding: ".5rem 0", fontSize: ".875rem", fontWeight: 600, color: "var(--primary)" }}>Create account →</a>
            )}
          </nav>
        </div>
      )}

      <style>{`
        .nav-link { padding: .5rem .75rem; border-radius: .25rem; font-size: .875rem; font-weight: 500; color: oklch(0.18 0.05 250 / 0.8); transition: all .15s; }
        .nav-link:hover { background: var(--muted); color: var(--primary); }
        .nav-link-active { background: var(--muted); color: var(--primary); font-weight: 600; }
        @media (min-width: 1024px) {
          [data-desktop-nav] { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (min-width: 768px) {
          .search-form { display: flex !important; }
          .praygyaan-pill { display: inline-flex !important; }
          .signup-cta { display: inline-flex !important; }
        }
        @media (max-width: 600px) {
          .hide-on-mobile { display: none; }
        }
      `}</style>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ marginTop: "5rem", borderTop: "1px solid var(--border)", background: "oklch(0.96 0.01 240 / 0.4)" }}>
      <div className="container" style={{ display: "grid", gap: "2rem", padding: "3rem 1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <div>
          <div style={{ fontWeight: 700 }}>ICAI Nagpur Branch</div>
          <p className="muted-text" style={{ marginTop: ".5rem", fontSize: ".875rem" }}>Branch of WIRC of The Institute of Chartered Accountants of India.</p>
          <div className="row gap-3" style={{ marginTop: "1rem" }}>
            {SOCIALS.map((s) => <a key={s.label} href="#" aria-label={s.label} className="muted-text"><s.Icon /></a>)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: ".875rem", fontWeight: 600 }}>Quick Links</div>
          <ul className="col gap-2 muted-text" style={{ marginTop: ".75rem", padding: 0, listStyle: "none", fontSize: ".875rem" }}>
            <li><a href="#/about">About the branch</a></li>
            <li><a href="#/events">Events & CPE</a></li>
            <li><a href="#/members">For members</a></li>
            <li><a href="#/students">For students</a></li>
          </ul>
        </div>
        <div>
          <div style={{ fontSize: ".875rem", fontWeight: 600 }}>Initiatives</div>
          <ul className="col gap-2 muted-text" style={{ marginTop: ".75rem", padding: 0, listStyle: "none", fontSize: ".875rem" }}>
            <li><a href="#/benevolent-fund">CA Benevolent Fund</a></li>
            <li><a href="#/ca2-vision">CA 2.0 Vision</a></li>
            <li><a href="#/investor-awareness">Investor Awareness</a></li>
            <li><a href="#/career-counselling">Career Counselling</a></li>
          </ul>
        </div>
        <div>
          <div style={{ fontSize: ".875rem", fontWeight: 600 }}>Contact</div>
          <ul className="col gap-2 muted-text" style={{ marginTop: ".75rem", padding: 0, listStyle: "none", fontSize: ".875rem" }}>
            <li>ICAI Bhawan, Nagpur</li>
            <li>Maharashtra, India</li>
            <li>nagpur@icai.org</li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--border)", padding: "1rem", textAlign: "center", fontSize: ".75rem", color: "var(--muted-foreground)" }}>
        © {new Date().getFullYear()} ICAI Nagpur Branch · Demo mockup · Not affiliated with the official ICAI portal
      </div>
    </footer>
  );
}

function PageHeader({ title, subtitle }) {
  return (
    <section style={{ borderBottom: "1px solid var(--border)", background: "linear-gradient(135deg, var(--primary), var(--primary-darker))", color: "var(--primary-foreground)", padding: "3.5rem 0" }}>
      <div className="container">
        <h1 style={{ fontSize: "2.25rem", fontWeight: 700, letterSpacing: "-.01em", margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ marginTop: ".5rem", maxWidth: "42rem", color: "rgba(255,255,255,.8)" }}>{subtitle}</p>}
      </div>
    </section>
  );
}

Object.assign(window, { Header, Footer, PageHeader });
