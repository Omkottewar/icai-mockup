import PageHeader from '../components/layout/PageHeader';

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About the Branch" subtitle="Established 1962 · Branch of WIRC of ICAI" />
      <section className="container" style={{ padding: '3rem 1rem' }}>
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div className="card">
            <div className="tiny-eyebrow">Vision</div>
            <h3 style={{ marginTop: '.5rem', fontSize: '1.125rem', fontWeight: 600 }}>A model branch of ICAI</h3>
            <p className="muted-text" style={{ marginTop: '.5rem' }}>
              To be a leading branch dedicated to the holistic development of members and students through quality
              education, networking, and innovative initiatives.
            </p>
          </div>
          <div className="card">
            <div className="tiny-eyebrow">Mission</div>
            <h3 style={{ marginTop: '.5rem', fontSize: '1.125rem', fontWeight: 600 }}>Service to the profession</h3>
            <p className="muted-text" style={{ marginTop: '.5rem' }}>
              Deliver world-class CPE programmes, advocate for members' interests, mentor students, and contribute
              to financial literacy in the wider community.
            </p>
          </div>
          <div className="card">
            <div className="tiny-eyebrow">History</div>
            <h3 style={{ marginTop: '.5rem', fontSize: '1.125rem', fontWeight: 600 }}>Six decades of service</h3>
            <p className="muted-text" style={{ marginTop: '.5rem' }}>
              The Nagpur Branch was established in 1962 and has grown into one of the most active branches of
              WIRC, serving over 5,000 members and 8,500+ students.
            </p>
          </div>
        </div>

        <h2 style={{ marginTop: '3rem', fontSize: '1.5rem', fontWeight: 700 }}>Managing Committee 2025–26</h2>
        <div style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[
            { name: 'Chairperson', title: 'CA — Chairperson' },
            { name: 'Vice Chair', title: 'CA — Vice Chairperson' },
            { name: 'Secretary', title: 'CA — Secretary' },
            { name: 'Treasurer', title: 'CA — Treasurer' },
            { name: 'WICASA Chair', title: 'CA — WICASA Chair' },
            { name: 'Member 1', title: 'CA — Committee Member' },
            { name: 'Member 2', title: 'CA — Committee Member' },
            { name: 'Member 3', title: 'CA — Committee Member' },
          ].map((p) => (
            <div key={p.name} className="card" style={{ textAlign: 'center' }}>
              <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: 999, margin: '0 auto', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>CA</div>
              <div style={{ marginTop: '.75rem', fontWeight: 600 }}>{p.name}</div>
              <div className="muted-text" style={{ fontSize: '.8125rem' }}>{p.title}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
