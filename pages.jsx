/* Public site pages — Home, About, Events, Members, Students, Resources, Contact,
   Praygyaan, Benevolent Fund, CA2 Vision, Investor Awareness, Career Counselling, Search.
   Recreated to match the original UI vocabulary. */

const ANNOUNCEMENTS = [
  "CPE Seminar on Direct Tax Amendments — 18th May 2026",
  "WICASA Mock Test Series for CA Foundation begins 25th May",
  "Branch Newsletter (May Issue) is now available for download",
  "Annual Conference registrations open — early-bird until 31st May",
];

const SERVICES = [
  { Icon: IconCalendar, title: "Events & CPE", desc: "Browse upcoming seminars, workshops and conferences across committees.", to: "/events" },
  { Icon: IconUsers, title: "For Members", desc: "Member services, COP, UDIN, firm directory, networking and more.", to: "/members" },
  { Icon: IconGraduationCap, title: "For Students", desc: "WICASA events, mock tests, articleship vacancies and career guidance.", to: "/students" },
  { Icon: IconFileText, title: "Resources", desc: "Standards, circulars, e-journal archive and downloadable newsletters.", to: "/resources" },
  { Icon: IconBriefcase, title: "Career Counselling", desc: "Book one-to-one sessions with volunteers and alma mater mentors.", to: "/career-counselling" },
  { Icon: IconMessageSquare, title: "Grievance & Help", desc: "Raise grievances or reach the branch through eSahaayataa.", to: "/contact" },
];

const HOME_EVENTS = [
  { title: "Direct Tax Amendments — Practical Insights", committee: "Direct Tax", date: "18 May 2026", time: "5:00 PM", venue: "ICAI Bhawan, Nagpur", cpe: 3 },
  { title: "GST Annual Return & Audit Workshop", committee: "GST", date: "22 May 2026", time: "10:00 AM", venue: "Hotel Centre Point", cpe: 6 },
  { title: "WICASA Mock Test Series — Foundation", committee: "WICASA", date: "25 May 2026", time: "9:00 AM", venue: "Branch Premises", cpe: 0 },
  { title: "Audit Quality & Documentation", committee: "Audit", date: "01 Jun 2026", time: "5:30 PM", venue: "Online (Zoom)", cpe: 2 },
  { title: "AI Tools for Chartered Accountants", committee: "IT", date: "08 Jun 2026", time: "4:00 PM", venue: "ICAI Bhawan", cpe: 3 },
  { title: "Annual Regional Conference 2026", committee: "CPE", date: "20 Jun 2026", time: "9:00 AM", venue: "Chitnavis Centre", cpe: 12 },
];
const COMMITTEES = ["All", "CPE", "WICASA", "Direct Tax", "GST", "Audit", "IT"];

const INITIATIVES = [
  { Icon: IconHandshake, title: "CA Benevolent Fund", desc: "Contribute to CABF — financial relief for members & families in distress.", to: "/benevolent-fund", cta: "Contribute" },
  { Icon: IconSunrise, title: "CA 2.0 — Life After Office", desc: "A meaningful second innings for senior CAs — wellness, mentorship & hobby circles.", to: "/ca2-vision", cta: "Explore" },
  { Icon: IconTrending, title: "Investor Awareness", desc: "Free programmes promoting financial literacy and safe investing for the public.", to: "/investor-awareness", cta: "Learn more" },
  { Icon: IconBriefcase, title: "Career Counselling", desc: "Book one-to-one sessions with volunteer CAs and alma-mater mentors.", to: "/career-counselling", cta: "Book a session" },
];

function HomePage() {
  const { user } = useAuth();
  const [heroQ, setHeroQ] = React.useState("");
  const [filter, setFilter] = React.useState("All");
  const filtered = (filter === "All" ? HOME_EVENTS : HOME_EVENTS.filter(e => e.committee === filter)).slice(0, 3);

  return (
    <>
      {/* Ticker */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "oklch(0.85 0.16 90 / 0.4)" }}>
        <div className="container row gap-3" style={{ padding: ".5rem 1rem", fontSize: ".875rem" }}>
          <span className="badge badge-primary" style={{ flexShrink: 0 }}>LATEST</span>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div className="ticker-track">
              {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((a, i) => (
                <span key={i} style={{ color: "rgba(0,0,0,.7)" }}>• {a}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", padding: "5rem 0", color: "var(--primary-foreground)",
        background: "linear-gradient(135deg, var(--primary), var(--primary-darker) 60%, var(--primary-tealish))" }}>
        <div className="container" style={{ display: "grid", gap: "2.5rem", gridTemplateColumns: "1fr", alignItems: "center" }} data-hero-grid>
          <div>
            <div className="row gap-2" style={{ width: "fit-content", padding: ".25rem .75rem", borderRadius: 999, border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.1)", fontSize: ".75rem", fontWeight: 500 }}>
              <IconAward size="sm" /> Branch of WIRC of ICAI
            </div>
            <h1 style={{ marginTop: "1rem", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.1 }}>
              Nagpur Branch of <span style={{ color: "var(--accent)" }}>ICAI</span>
            </h1>
            <p style={{ marginTop: "1rem", maxWidth: "32rem", color: "rgba(255,255,255,.8)" }}>
              Serving Chartered Accountants and CA students of Nagpur — through Continuing Professional Education,
              networking, knowledge, and member services.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); navigate("/search?q=" + encodeURIComponent(heroQ)); }}
                  className="row gap-2"
                  style={{ marginTop: "1.5rem", padding: ".375rem", border: "1px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.1)", borderRadius: ".5rem", backdropFilter: "blur(8px)" }}>
              <IconSearch size="sm" />
              <input value={heroQ} onChange={(e) => setHeroQ(e.target.value)}
                     placeholder="Search events, services, resources…"
                     style={{ flex: 1, background: "transparent", border: 0, outline: "none", padding: ".375rem", color: "white" }} />
              <button className="btn btn-accent" style={{ padding: ".4rem 1rem" }}>Search</button>
            </form>
            <div className="row gap-3" style={{ marginTop: "1.25rem", flexWrap: "wrap" }}>
              <a href="#/events" className="btn btn-accent">Upcoming Events <IconArrowRight size="sm" /></a>
              <a href="#/praygyaan" className="btn btn-ghost-light"><IconBot size="sm" /> Ask PrayGyaan AI</a>
              {!user && (
                <a href="#/signup" className="btn btn-ghost-light">Create account <IconArrowRight size="sm" /></a>
              )}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            {[
              { k: "5,000+", v: "Members" },
              { k: "8,500+", v: "Students" },
              { k: "150+", v: "Events / yr" },
              { k: "1962", v: "Established" },
            ].map((s) => (
              <div key={s.v} style={{ padding: "1.25rem", border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.1)", borderRadius: ".5rem", backdropFilter: "blur(8px)" }}>
                <div style={{ fontSize: "1.875rem", fontWeight: 700 }}>{s.k}</div>
                <div style={{ marginTop: ".25rem", fontSize: ".875rem", opacity: .7 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (min-width: 768px) { [data-hero-grid] { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </section>

      {/* Chairperson */}
      <section className="container" style={{ padding: "4rem 1rem" }}>
        <div className="card" style={{ display: "grid", gap: "2rem", padding: "2rem", gridTemplateColumns: "1fr", alignItems: "center" }} data-chair-grid>
          <div style={{ width: "10rem", height: "10rem", margin: "0 auto", borderRadius: 999, background: "linear-gradient(135deg, var(--primary), var(--secondary))", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", fontWeight: 700 }}>CA</div>
          <div>
            <div className="tiny-eyebrow">Chairperson's Message</div>
            <h2 style={{ marginTop: ".5rem", fontSize: "1.5rem", fontWeight: 700 }}>Welcome to the Nagpur Branch</h2>
            <p className="muted-text" style={{ marginTop: ".75rem", lineHeight: 1.55 }}>
              It gives me immense pleasure to welcome you to the official portal of the Nagpur Branch.
              Our branch is committed to the holistic development of members and students by organising
              quality CPE programmes, knowledge initiatives, and networking opportunities. Together,
              let us contribute to the profession and to nation-building.
            </p>
            <div style={{ marginTop: ".75rem", fontSize: ".875rem", fontWeight: 600 }}>Chairperson, Nagpur Branch (2025–26)</div>
          </div>
        </div>
        <style>{`@media (min-width: 768px) { [data-chair-grid] { grid-template-columns: 200px 1fr !important; } }`}</style>
      </section>

      {/* Services grid */}
      <section className="container" style={{ paddingBottom: "4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div className="tiny-eyebrow">Services</div>
          <h2 style={{ marginTop: ".25rem", fontSize: "1.875rem", fontWeight: 700 }}>Explore the Branch</h2>
        </div>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {SERVICES.map((s) => (
            <a key={s.title} href={"#" + s.to} className="card hover-lift" style={{ display: "block" }}>
              <div className="icon-tile"><s.Icon size="lg" /></div>
              <h3 style={{ marginTop: "1rem", fontSize: "1.125rem", fontWeight: 600 }}>{s.title}</h3>
              <p className="muted-text" style={{ marginTop: ".25rem", fontSize: ".875rem" }}>{s.desc}</p>
              <div className="row gap-1" style={{ marginTop: "1rem", color: "var(--primary)", fontSize: ".875rem", fontWeight: 500 }}>
                Explore <IconArrowRight size="sm" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Events */}
      <section style={{ borderTop: "1px solid var(--border)", background: "oklch(0.96 0.01 240 / 0.3)", padding: "4rem 0" }}>
        <div className="container">
          <div className="row" style={{ marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div className="tiny-eyebrow">Events</div>
              <h2 style={{ marginTop: ".25rem", fontSize: "1.875rem", fontWeight: 700 }}>Upcoming Events</h2>
              <p className="muted-text" style={{ fontSize: ".875rem" }}>Filter by committee</p>
            </div>
            <a href="#/events" style={{ color: "var(--primary)", fontWeight: 600, fontSize: ".875rem" }}>View all events →</a>
          </div>
          <div className="row gap-2" style={{ flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {COMMITTEES.map((c) => (
              <button key={c} onClick={() => setFilter(c)}
                className={"btn " + (filter === c ? "btn-primary" : "btn-outline")}
                style={{ padding: ".4rem 1rem", borderRadius: 999 }}>{c}</button>
            ))}
          </div>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {filtered.map((e) => <EventCard key={e.title} event={e} />)}
            {filtered.length === 0 && <p className="muted-text">No events for this committee right now.</p>}
          </div>
        </div>
      </section>

      {/* PrayGyaan promo */}
      <section className="container" style={{ padding: "4rem 1rem" }}>
        <div style={{ display: "grid", gap: "2rem", padding: "2rem", borderRadius: "1rem", color: "white",
          background: "linear-gradient(135deg, var(--secondary), var(--secondary-darker))",
          gridTemplateColumns: "1fr", alignItems: "center" }} data-promo-grid>
          <div>
            <div className="row gap-2" style={{ width: "fit-content", padding: ".25rem .75rem", borderRadius: 999, background: "rgba(255,255,255,.15)", fontSize: ".75rem", fontWeight: 600 }}>
              <IconBot size="sm" /> NEW
            </div>
            <h2 style={{ marginTop: ".75rem", fontSize: "1.875rem", fontWeight: 700 }}>Meet PrayGyaan — your AI assistant</h2>
            <p style={{ marginTop: ".5rem", maxWidth: "40rem", opacity: .85 }}>
              Get instant answers about CPE events, UDIN, articleship, branch services and more — 24×7.
              Powered by AI, built for Nagpur Branch members and students.
            </p>
          </div>
          <a href="#/praygyaan" className="btn" style={{ background: "white", color: "var(--secondary)", width: "fit-content", padding: ".75rem 1.25rem" }}>
            Chat now <IconArrowRight size="sm" />
          </a>
        </div>
        <style>{`@media (min-width: 768px) { [data-promo-grid] { grid-template-columns: 1fr auto !important; padding: 3rem !important; } }`}</style>
      </section>

      {/* Initiatives */}
      <section className="container" style={{ paddingBottom: "4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div className="tiny-eyebrow">Initiatives</div>
          <h2 style={{ marginTop: ".25rem", fontSize: "1.875rem", fontWeight: 700 }}>Branch Initiatives & Programmes</h2>
          <p className="muted-text" style={{ marginTop: ".25rem", fontSize: ".875rem" }}>Dedicated programmes that go beyond practice</p>
        </div>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {INITIATIVES.map((it) => (
            <div key={it.title} className="card col" style={{ display: "flex" }}>
              <div className="icon-tile green"><it.Icon size="lg" /></div>
              <h3 style={{ marginTop: "1rem", fontSize: "1.125rem", fontWeight: 600 }}>{it.title}</h3>
              <p className="muted-text" style={{ marginTop: ".25rem", fontSize: ".875rem", flex: 1 }}>{it.desc}</p>
              <a href={"#" + it.to} className="btn btn-primary" style={{ marginTop: "1.25rem", width: "fit-content", padding: ".4rem .9rem" }}>
                {it.cta} <IconArrowRight size="sm" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Knowledge hub */}
      <section style={{ borderTop: "1px solid var(--border)", background: "oklch(0.96 0.01 240 / 0.3)", padding: "4rem 0" }}>
        <div className="container">
          <div className="row" style={{ marginBottom: "2rem", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div className="tiny-eyebrow">Knowledge Hub</div>
              <h2 style={{ marginTop: ".25rem", fontSize: "1.875rem", fontWeight: 700 }}>Circulars, Standards & e-Journal</h2>
            </div>
            <a href="#/resources" style={{ color: "var(--primary)", fontWeight: 600, fontSize: ".875rem" }}>All resources →</a>
          </div>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {[
              { Icon: IconFileText, t: "Latest Circulars", d: "ICAI announcements, notifications and council decisions." },
              { Icon: IconBookOpen, t: "Standards (AS / SA)", d: "Accounting Standards, Ind AS and Standards on Auditing." },
              { Icon: IconDownload, t: "e-Journal Archive", d: "Browse The Chartered Accountant journal archives." },
            ].map((k) => (
              <a key={k.t} href="#/resources" className="card hover-lift">
                <div className="icon-tile"><k.Icon size="lg" /></div>
                <h3 style={{ marginTop: "1rem", fontSize: "1.125rem", fontWeight: 600 }}>{k.t}</h3>
                <p className="muted-text" style={{ marginTop: ".25rem", fontSize: ".875rem" }}>{k.d}</p>
                <div className="row gap-1" style={{ marginTop: "1rem", color: "var(--primary)", fontSize: ".875rem", fontWeight: 500 }}>
                  Open <IconArrowRight size="sm" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section style={{ borderTop: "1px solid var(--border)", background: "oklch(0.96 0.01 240 / 0.4)", padding: "3rem 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Useful ICAI Links</h2>
          <div style={{ marginTop: "1.25rem", display: "grid", gap: ".75rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {["Self Service Portal", "Digital Learning Hub", "eServices", "CDS",
              "ICAI Social", "ICAI Mobile App", "eSahaayataa", "ICAI TV"].map((l) => (
              <a key={l} href="#" className="card" style={{ padding: ".75rem 1rem", fontSize: ".875rem", fontWeight: 500 }}>{l}</a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function EventCard({ event: e, withRegister = false }) {
  return (
    <article className="card col hover-lift" style={{ display: "flex", padding: "1.25rem" }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="badge badge-secondary">{e.committee}</span>
        {e.cpe > 0 && <span className="badge badge-accent">{e.cpe} CPE{withRegister ? " hrs" : ""}</span>}
      </div>
      <h3 style={{ marginTop: ".75rem", fontSize: "1rem", fontWeight: 600 }}>{e.title}</h3>
      <div className="col gap-1 muted-text" style={{ marginTop: ".75rem", fontSize: ".75rem" }}>
        <div className="row gap-2"><IconCalendar size="sm" /> {e.date}</div>
        <div className="row gap-2"><IconClock size="sm" /> {e.time}</div>
        <div className="row gap-2"><IconMapPin size="sm" /> {e.venue}</div>
      </div>
      {withRegister && (
        <button className="btn btn-primary" style={{ marginTop: "1.25rem", justifyContent: "center" }}>Register</button>
      )}
    </article>
  );
}

function AboutPage() {
  return (
    <>
      <PageHeader title="About the Branch" subtitle="Established 1962 · Branch of WIRC of ICAI" />
      <section className="container" style={{ padding: "3rem 1rem" }}>
        <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div className="card">
            <div className="tiny-eyebrow">Vision</div>
            <h3 style={{ marginTop: ".5rem", fontSize: "1.125rem", fontWeight: 600 }}>A model branch of ICAI</h3>
            <p className="muted-text" style={{ marginTop: ".5rem" }}>
              To be a leading branch dedicated to the holistic development of members and students through quality
              education, networking, and innovative initiatives.
            </p>
          </div>
          <div className="card">
            <div className="tiny-eyebrow">Mission</div>
            <h3 style={{ marginTop: ".5rem", fontSize: "1.125rem", fontWeight: 600 }}>Service to the profession</h3>
            <p className="muted-text" style={{ marginTop: ".5rem" }}>
              Deliver world-class CPE programmes, advocate for members' interests, mentor students, and contribute
              to financial literacy in the wider community.
            </p>
          </div>
          <div className="card">
            <div className="tiny-eyebrow">History</div>
            <h3 style={{ marginTop: ".5rem", fontSize: "1.125rem", fontWeight: 600 }}>Six decades of service</h3>
            <p className="muted-text" style={{ marginTop: ".5rem" }}>
              The Nagpur Branch was established in 1962 and has grown into one of the most active branches of
              WIRC, serving over 5,000 members and 8,500+ students.
            </p>
          </div>
        </div>

        <h2 style={{ marginTop: "3rem", fontSize: "1.5rem", fontWeight: 700 }}>Managing Committee 2025–26</h2>
        <div style={{ marginTop: "1.5rem", display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {[
            { name: "Chairperson", title: "CA — Chairperson" },
            { name: "Vice Chair", title: "CA — Vice Chairperson" },
            { name: "Secretary", title: "CA — Secretary" },
            { name: "Treasurer", title: "CA — Treasurer" },
            { name: "WICASA Chair", title: "CA — WICASA Chair" },
            { name: "Member 1", title: "CA — Committee Member" },
            { name: "Member 2", title: "CA — Committee Member" },
            { name: "Member 3", title: "CA — Committee Member" },
          ].map((p) => (
            <div key={p.name} className="card" style={{ textAlign: "center" }}>
              <div style={{ width: "4.5rem", height: "4.5rem", borderRadius: 999, margin: "0 auto", background: "linear-gradient(135deg, var(--primary), var(--secondary))", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>CA</div>
              <div style={{ marginTop: ".75rem", fontWeight: 600 }}>{p.name}</div>
              <div className="muted-text" style={{ fontSize: ".8125rem" }}>{p.title}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function EventsPage() {
  const [filter, setFilter] = React.useState("All");
  const filtered = filter === "All" ? HOME_EVENTS : HOME_EVENTS.filter(e => e.committee === filter);
  return (
    <>
      <PageHeader title="Events & CPE" subtitle="Upcoming programmes — filter by committee" />
      <section className="container" style={{ padding: "2.5rem 1rem" }}>
        <div className="row gap-2" style={{ flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {COMMITTEES.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
                    className={"btn " + (filter === c ? "btn-primary" : "btn-outline")}
                    style={{ padding: ".4rem 1rem", borderRadius: 999 }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {filtered.map((e) => <EventCard key={e.title} event={e} withRegister />)}
        </div>
      </section>
    </>
  );
}

function MembersPage() {
  const items = [
    { t: "COP Renewal / Restoration / Surrender/ Firm Registration", d: "Self-service Certificate of Practice workflows via ICAI eServices." },
    { t: "UDIN Generation & Verification", d: "Generate and verify Unique Document Identification Numbers." },
    { t: "CPE Hours Tracker", d: "Track structured/unstructured CPE hours against the 120-hours-in-3-years requirement." },
    { t: "Member Networking Forum", d: "Members-only forum for peer discussion and assignment opportunities." },  ];
  return (
    <>
      <PageHeader title="For Members" subtitle="Services, CPE and resources for Chartered Accountants" />
      <section className="container" style={{ padding: "3rem 1rem" }}>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {items.map((s) => (
            <div key={s.t} className="card">
              <IconCheckCircle style={{ color: "var(--secondary)" }} size="lg" />
              <h3 style={{ marginTop: ".75rem", fontWeight: 600 }}>{s.t}</h3>
              <p className="muted-text" style={{ marginTop: ".25rem", fontSize: ".875rem" }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function StudentsPage() {
  const items = [
    { t: "WICASA Events & Mock Tests", d: "Foundation, Inter and Final mock tests, GMCS, ITT, orientation programmes." },
    { t: "Articleship Vacancies", d: "Browse openings posted by member firms across Nagpur and Vidarbha." },
    { t: "Career Counselling", d: "1-on-1 sessions with practising CAs and alma mater mentors." },
    { t: "Study Material & Resources", d: "Past papers, RTPs, MTPs and curated study notes." },
    { t: "Scholarships & Awards", d: "Information on merit-cum-need scholarships from CABF and the branch." },
    { t: "Student Forum", d: "Connect with peers, study groups and event volunteers." },
  ];
  return (
    <>
      <PageHeader title="For Students" subtitle="Everything CA students of Nagpur need — in one place." />
      <section className="container" style={{ padding: "3rem 1rem" }}>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {items.map((s) => (
            <div key={s.t} className="card">
              <div className="icon-tile green"><IconGraduationCap size="lg" /></div>
              <h3 style={{ marginTop: ".75rem", fontWeight: 600 }}>{s.t}</h3>
              <p className="muted-text" style={{ marginTop: ".25rem", fontSize: ".875rem" }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ResourcesPage() {
  const cats = [
    { Icon: IconFileText, t: "Circulars", d: "ICAI announcements, notifications and council decisions." },
    { Icon: IconBookOpen, t: "Standards (AS / SA)", d: "Accounting Standards, Ind AS and Standards on Auditing." },
    { Icon: IconDownload, t: "Branch Newsletter", d: "Monthly newsletter — events, articles, member updates." },
    { Icon: IconAward, t: "e-Journal Archive", d: "Browse The Chartered Accountant journal archives." },
    { Icon: IconShield, t: "Web-Media Policy", d: "ICAI guidelines for member online presence." },
    { Icon: IconSparkles, t: "Knowledge Repository", d: "Curated articles, presentations from past seminars." },
  ];
  return (
    <>
      <PageHeader title="Resources" subtitle="Standards, circulars, e-journal archive and downloadable newsletters." />
      <section className="container" style={{ padding: "3rem 1rem" }}>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {cats.map((s) => (
            <div key={s.t} className="card hover-lift">
              <div className="icon-tile"><s.Icon size="lg" /></div>
              <h3 style={{ marginTop: ".75rem", fontWeight: 600 }}>{s.t}</h3>
              <p className="muted-text" style={{ marginTop: ".25rem", fontSize: ".875rem" }}>{s.d}</p>
              <div className="row gap-1" style={{ marginTop: "1rem", color: "var(--primary)", fontSize: ".875rem", fontWeight: 500 }}>
                Open <IconArrowRight size="sm" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <>
      <PageHeader title="Contact the Branch" subtitle="We typically respond within 2 working days." />
      <section className="container" style={{ padding: "3rem 1rem", display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        <div className="card">
          <h3 style={{ fontWeight: 600, fontSize: "1.125rem" }}>ICAI Bhawan, Nagpur</h3>
          <ul className="col gap-3 muted-text" style={{ listStyle: "none", padding: 0, marginTop: "1rem", fontSize: ".875rem" }}>
            <li className="row gap-2"><IconMapPin size="sm" /> ICAI Bhawan, Nagpur, Maharashtra</li>
            <li className="row gap-2"><IconMail size="sm" /> nagpur@icai.org</li>
            <li className="row gap-2"><IconPhone size="sm" /> +91 712 — — — — — — </li>
            <li className="row gap-2"><IconClock size="sm" /> Mon–Sat, 10:00 AM – 6:00 PM</li>
          </ul>
          <div style={{ marginTop: "1.25rem", aspectRatio: "16/10", background: "repeating-linear-gradient(135deg, oklch(0.93 0.02 240), oklch(0.93 0.02 240) 12px, oklch(0.95 0.02 240) 12px, oklch(0.95 0.02 240) 24px)", borderRadius: ".5rem", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted-foreground)", fontSize: ".75rem", fontFamily: "monospace" }}>
            [ map placeholder ]
          </div>
        </div>
        <div className="card">
          <h3 style={{ fontWeight: 600, fontSize: "1.125rem" }}>Send a message</h3>
          {submitted ? (
            <div className="alert alert-success" style={{ marginTop: "1rem" }}>
              <IconCheckCircle size="sm" /> Thanks — your message has been logged. We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="col gap-3" style={{ marginTop: "1rem" }}>
              <div><label className="field-label">Name</label><input className="input-base" required /></div>
              <div><label className="field-label">Email</label><input className="input-base" type="email" required /></div>
              <div><label className="field-label">Subject</label>
                <select className="input-base">
                  <option>General enquiry</option>
                  <option>Event registration</option>
                  <option>Membership query</option>
                  <option>Grievance</option>
                </select>
              </div>
              <div><label className="field-label">Message</label><textarea className="input-base" rows="5" required /></div>
              <button className="btn btn-primary" style={{ justifyContent: "center" }}>Send message</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function PrayGyaanPage() {
  const [msgs, setMsgs] = React.useState([
    { role: "bot", text: "Namaste! I'm PrayGyaan. Ask me about CPE events, UDIN, articleship, or branch services." },
  ]);
  const [input, setInput] = React.useState("");
  const send = () => {
    if (!input.trim()) return;
    setMsgs((m) => [...m, { role: "user", text: input }, { role: "bot", text: "Thanks — a sample response will appear here once the AI backend is connected." }]);
    setInput("");
  };
  return (
    <>
      <PageHeader title="PrayGyaan — AI Assistant" subtitle="Your 24×7 guide to ICAI services, events and resources" />
      <section className="container" style={{ padding: "3rem 1rem", maxWidth: "64rem" }}>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {[
            { Icon: IconBot, t: "Instant Answers", d: "Quick replies on CPE, UDIN, COP and more." },
            { Icon: IconSparkles, t: "Smart Search", d: "Find circulars, events & resources fast." },
            { Icon: IconMessageSquare, t: "Always On", d: "Available 24×7 for members & students." },
          ].map((f) => (
            <div key={f.t} className="card">
              <f.Icon size="lg" /> 
              <div style={{ marginTop: ".75rem", fontWeight: 600 }}>{f.t}</div>
              <div className="muted-text" style={{ fontSize: ".875rem" }}>{f.d}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginTop: "2rem", padding: 0 }}>
          <div style={{ borderBottom: "1px solid var(--border)", padding: ".75rem 1.25rem", fontWeight: 600 }}>Chat with PrayGyaan</div>
          <div style={{ height: "20rem", overflowY: "auto", padding: "1.25rem", display: "flex", flexDirection: "column", gap: ".75rem" }}>
            {msgs.map((m, i) => (
              <div key={i} className="row" style={{ justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "75%", padding: ".5rem 1rem", borderRadius: ".5rem", fontSize: ".875rem",
                              background: m.role === "user" ? "var(--primary)" : "var(--muted)",
                              color: m.role === "user" ? "var(--primary-foreground)" : "var(--foreground)" }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="row gap-2" style={{ borderTop: "1px solid var(--border)", padding: ".75rem" }}>
            <input className="input-base" value={input} onChange={(e) => setInput(e.target.value)}
                   onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask anything…" style={{ flex: 1 }} />
            <button className="btn btn-primary" onClick={send}>Send</button>
          </div>
        </div>
      </section>
    </>
  );
}

function GenericPage({ title, subtitle, body }) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <section className="container" style={{ padding: "3rem 1rem", maxWidth: "56rem" }}>{body}</section>
    </>
  );
}

function BenevolentFundPage() {
  const [amount, setAmount] = React.useState("");
  const { showToast } = useAuth();
  return (
    <GenericPage title="CA Benevolent Fund" subtitle="Financial relief for members and their families in distress."
      body={
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div className="card">
            <div className="icon-tile green"><IconHandshake size="lg" /></div>
            <h3 style={{ marginTop: ".75rem", fontWeight: 600 }}>About CABF</h3>
            <p className="muted-text" style={{ marginTop: ".5rem", fontSize: ".875rem" }}>
              The Chartered Accountants Benevolent Fund (CABF) provides financial assistance to members and
              their dependents in case of distress, illness or untimely demise.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontWeight: 600 }}>Contribute</h3>
            <p className="muted-text" style={{ marginTop: ".25rem", fontSize: ".875rem" }}>Contributions are eligible for deduction under Section 80G.</p>
            <div className="row gap-2" style={{ marginTop: "1rem", flexWrap: "wrap" }}>
              {["₹501", "₹1,001", "₹5,001", "₹11,001"].map((a) => (
                <button key={a} onClick={() => setAmount(a)}
                        className={"btn " + (amount === a ? "btn-primary" : "btn-outline")}>{a}</button>
              ))}
            </div>
            <div style={{ marginTop: ".75rem" }}>
              <input className="input-base" placeholder="Or enter custom amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <button onClick={() => showToast("Demo: contribution flow stubbed")} className="btn btn-primary" style={{ marginTop: "1rem", width: "100%", justifyContent: "center" }}>
              Contribute now <IconArrowRight size="sm" />
            </button>
          </div>
        </div>
      } />
  );
}

function CA2VisionPage() {
  return (
    <GenericPage title="CA 2.0 — Life After Office" subtitle="A meaningful second innings for senior CAs"
      body={
        <div className="col gap-5">
          <p className="muted-text" style={{ lineHeight: 1.6 }}>
            CA 2.0 is the Nagpur Branch's flagship vision for senior chartered accountants — a community programme
            that combines wellness, mentorship and hobby circles, ensuring that veterans of the profession continue
            to live a meaningful, engaged and joyful life after retirement from active practice.
          </p>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {[
              { Icon: IconHeart, t: "Wellness circles", d: "Yoga, walks, health camps and mental wellness sessions." },
              { Icon: IconUsers, t: "Mentor a junior", d: "Structured 6-month mentor pairing with juniors and students." },
              { Icon: IconSparkles, t: "Hobby clubs", d: "Music, theatre, painting, photography — pick your circle." },
            ].map((p) => (
              <div key={p.t} className="card">
                <div className="icon-tile green"><p.Icon size="lg" /></div>
                <div style={{ marginTop: ".75rem", fontWeight: 600 }}>{p.t}</div>
                <div className="muted-text" style={{ fontSize: ".875rem" }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      } />
  );
}

function InvestorAwarenessPage() {
  return (
    <GenericPage title="Investor Awareness" subtitle="Free programmes promoting financial literacy and safe investing."
      body={
        <div className="col gap-5">
          <p className="muted-text" style={{ lineHeight: 1.6 }}>
            The branch conducts public investor awareness programmes in association with regulators and industry
            bodies to promote financial literacy, safe investing, fraud awareness and basic personal finance for
            students, salaried individuals and senior citizens.
          </p>
          <div className="card">
            <h3 style={{ fontWeight: 600 }}>Upcoming sessions</h3>
            <ul className="col gap-3" style={{ marginTop: ".75rem", padding: 0, listStyle: "none" }}>
              {[
                { t: "Financial Planning for Young Professionals", d: "12 May · ICAI Bhawan" },
                { t: "Beware of Online Investment Frauds", d: "19 May · Online" },
                { t: "Senior Citizens' Money Health", d: "26 May · Chitnavis Centre" },
              ].map((s) => (
                <li key={s.t} className="row" style={{ justifyContent: "space-between", padding: ".75rem 0", borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: ".875rem" }}>{s.t}</div>
                    <div className="muted-text" style={{ fontSize: ".75rem" }}>{s.d}</div>
                  </div>
                  <button className="btn btn-outline" style={{ padding: ".4rem .9rem" }}>Reserve</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      } />
  );
}

function CareerCounsellingPage() {
  const [booked, setBooked] = React.useState(false);
  return (
    <GenericPage title="Career Counselling" subtitle="One-to-one sessions with volunteer CAs and alma-mater mentors."
      body={
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div className="card">
            <h3 style={{ fontWeight: 600 }}>What you'll get</h3>
            <ul className="col gap-2 muted-text" style={{ marginTop: ".75rem", padding: 0, listStyle: "none", fontSize: ".875rem" }}>
              <li className="row gap-2"><IconCheck size="sm" style={{ color: "var(--secondary)" }} /> A 30-minute 1:1 with a practising CA</li>
              <li className="row gap-2"><IconCheck size="sm" style={{ color: "var(--secondary)" }} /> Help with articleship, exams and career paths</li>
              <li className="row gap-2"><IconCheck size="sm" style={{ color: "var(--secondary)" }} /> Optional follow-up over email</li>
            </ul>
          </div>
          <div className="card">
            <h3 style={{ fontWeight: 600 }}>Book a session</h3>
            {booked ? (
              <div className="alert alert-success" style={{ marginTop: "1rem" }}>
                <IconCheckCircle size="sm" /> Booked! A volunteer CA will reach out within 48 hours.
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setBooked(true); }} className="col gap-3" style={{ marginTop: "1rem" }}>
                <div><label className="field-label">Your name</label><input className="input-base" required /></div>
                <div><label className="field-label">CA stage</label>
                  <select className="input-base">
                    <option>Foundation</option>
                    <option>Intermediate</option>
                    <option>Final</option>
                    <option>Articleship</option>
                  </select>
                </div>
                <div><label className="field-label">What do you want to discuss?</label><textarea className="input-base" rows="3" /></div>
                <button className="btn btn-primary" style={{ justifyContent: "center" }}>Request session</button>
              </form>
            )}
          </div>
        </div>
      } />
  );
}

function SearchPage() {
  const route = useRoute();
  const q = route.query.q || "";
  const [query, setQuery] = React.useState(q);
  React.useEffect(() => setQuery(q), [q]);
  const matches = HOME_EVENTS.filter(e =>
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    e.committee.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <PageHeader title="Search" subtitle={query ? `Results for "${query}"` : "Search events, services and resources"} />
      <section className="container" style={{ padding: "3rem 1rem", maxWidth: "56rem" }}>
        <form onSubmit={(e) => { e.preventDefault(); navigate("/search?q=" + encodeURIComponent(query)); }} className="row gap-2">
          <div className="row gap-2 input-base" style={{ flex: 1 }}>
            <IconSearch size="sm" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…"
                   style={{ flex: 1, background: "transparent", border: 0, outline: "none" }} />
          </div>
          <button className="btn btn-primary">Search</button>
        </form>
        <div style={{ marginTop: "2rem", display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {matches.map((e) => <EventCard key={e.title} event={e} />)}
          {query && matches.length === 0 && (
            <p className="muted-text">No events matched "{query}". Try the events page or browse by committee.</p>
          )}
        </div>
      </section>
    </>
  );
}

Object.assign(window, {
  HomePage, AboutPage, EventsPage, MembersPage, StudentsPage, ResourcesPage,
  ContactPage, PrayGyaanPage, BenevolentFundPage, CA2VisionPage, InvestorAwarenessPage,
  CareerCounsellingPage, SearchPage, EventCard,
});
