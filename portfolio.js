/* global React, ReactDOM */
const { useState } = React;

const STUDIO = {
  name: 'אדיר בוטבול',
  phoneDisplay: '054-243-5488',
  wa: 'https://wa.me/972542435488',
  tel: 'tel:0542435488',
  email: 'adirtal@gmail.com',
};

const WORKS = [
  {
    id: 'work-lotanchik', mark: 'L', index: '01',
    cat: 'דף נחיתה', title: 'לוטנצ׳יק',
    desc: 'דף נחיתה צבעוני וחוויתי לאמנית ילדים — מסיבות קונספט, מופעים והפעלות, עם המרה ישירה ל-WhatsApp, גלריות והמלצות.',
    yr: '2026', href: 'https://lotanchik.vercel.app/', caseHref: 'lotanchik.html', tone: 'stone',
  },
  {
    id: 'work-sushi', mark: 'S', index: '02',
    cat: 'מערכת ניהול · UI/UX', title: 'סושי · כיוונים',
    desc: 'מערכת פנימית לניהול בקשות סושיאל מדיה לחברת כיוונים, באר שבע — ממשק מאובטח ונקי.',
    yr: '2026', href: 'https://sushi-kivunim.vercel.app/', caseHref: 'sushi.html', tone: 'ink',
  },
  {
    id: 'work-didi', mark: 'D', index: '03',
    cat: 'אתר אינטרנט', title: 'דידי דימיוני',
    desc: 'אתר מותג מלא לעולם תוכן ילדים — הפעלות, שירי ילדים מקוריים, קונספטים, עיצוב הזמנות וערוץ דידי TV.',
    yr: '2026', href: 'https://didifun.co.il/', caseHref: 'didi.html', tone: 'ink70',
  },
];

const TONE_BG = {
  stone:  'var(--stone-2)',
  ink:    'var(--ink)',
  ink70:  'var(--ink-70)',
  muted:  'var(--muted)',
};
const TONE_FG = {
  stone:  'var(--ink)',
  ink:    'var(--paper)',
  ink70:  'var(--paper)',
  muted:  'var(--paper)',
};

const Arr = () => (
  <svg className="arr" width="17" height="13" viewBox="0 0 17 13" fill="none" aria-hidden="true">
    <path d="M16 6.5H1M6.5 1L1 6.5L6.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NW = () => (
  <svg className="nw" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Eyebrow = ({ idx, children }) => (
  <p className="eyebrow">
    <span className="idx">{idx}</span>
    <span className="bar"></span>
    {children}
  </p>
);

function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="nav-logo" href="#top">
          <img src="assets/adir-logo.svg" alt="Adir" />
        </a>
        <ul className="nav-links">
          <li><a href="#work">עבודות</a></li>
          <li><a href="#services">שירותים</a></li>
          <li><a href="#contact">צור קשר</a></li>
        </ul>
        <div className="nav-cta">
          <a className="btn btn-secondary btn-sm" href={STUDIO.wa} target="_blank" rel="noopener noreferrer">
            וואטסאפ<Arr/>
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="wrap p-hero" id="top">
      <img className="hero-logo-anim" src="assets/adir-logo.svg" alt="Adir" />
      <Eyebrow idx="—">{STUDIO.name} · סטודיו עצמאי</Eyebrow>
      <h1>חוויות דיגיטליות.</h1>
      <p className="lead">
        עיצוב ובניית דפי נחיתה, אתרים, אפליקציות ומערכות — מהרעיון הראשוני ועד המוצר החי.
        כל פרויקט נבנה בקו נקי, מדויק, ובהתאמה אישית.
      </p>
      <div className="row-wrap">
        <a className="btn btn-primary" href="#work">לעבודות<Arr/></a>
        <a className="btn btn-ghost" href={STUDIO.wa} target="_blank" rel="noopener noreferrer">בוא נדבר על פרויקט</a>
      </div>
      <dl className="hero-meta">
        <div><dt>תחומים</dt><dd>Web · UI/UX · מיתוג</dd></div>
        <div><dt>מבוסס</dt><dd>ישראל · 2026</dd></div>
        <div><dt>זמינות</dt><dd>פתוח לפרויקטים</dd></div>
      </dl>
    </header>
  );
}

function Featured({ w }) {
  return (
    <article className="featured">
      <div className="f-body">
        <span className="f-index" dir="ltr">{w.index} / 03 — מודגש</span>
        <span className="cat">{w.cat}</span>
        <h3>{w.title}</h3>
        <p>{w.desc}</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a className="ext" href={w.caseHref}>
            לקריאת תיק העבודה<NW/>
          </a>
          <a className="btn btn-ghost btn-sm" href={w.href} target="_blank" rel="noopener noreferrer">
            לאתר החי<NW/>
          </a>
        </div>
      </div>
      <div className="slot-wrap" style={{ background: TONE_BG[w.tone] }}>
        <image-slot
          id={w.id}
          shape="rect"
          placeholder={'גרור צילום מסך של ' + w.title}
        ></image-slot>
      </div>
    </article>
  );
}

function WorkCard({ w, total }) {
  return (
    <article className="work-card">
      <div className="work-thumb" style={{ background: TONE_BG[w.tone] }}>
        <span
          className="num"
          style={{ color: w.tone === 'stone' ? 'var(--ink-70)' : 'var(--muted)' }}
          dir="ltr"
        >
          {w.index} / {String(total).padStart(2, '0')}
        </span>
        <image-slot
          id={w.id}
          shape="rect"
          placeholder={'גרור צילום מסך של ' + w.title}
        ></image-slot>
      </div>
      <div className="work-body">
        <span className="cat">{w.cat}</span>
        <h3>{w.title}</h3>
        <p>{w.desc}</p>
        <div className="work-foot">
          <span className="yr">{w.yr}</span>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <a className="ext-min" href={w.href} target="_blank" rel="noopener noreferrer">
              לאתר<NW/>
            </a>
            <a className="ext-min" href={w.caseHref}>
              לתיק<NW/>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function WorkSection() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Eyebrow idx="01">עבודות נבחרות</Eyebrow>
            <h2 className="section-title">פרויקטים אחרונים.</h2>
          </div>
          <p className="section-note">
            מבחר עבודות חיות — מדף נחיתה ועד מערכת ניהול.
          </p>
        </div>
        <div style={{ marginBottom: '26px' }}>
          <Featured w={WORKS[0]} />
        </div>
        <div className="work-grid three">
          {WORKS.slice(1).map(w => (
            <WorkCard key={w.id} w={w} total={WORKS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  ['01', 'דפי נחיתה',           'דפים ממוקדי המרה, מהירים ומעוצבים.'],
  ['02', 'אתרי אינטרנט',         'אתרי תדמית ומותג, רספונסיביים לחלוטין.'],
  ['03', 'אפליקציות ומערכות',    'ממשקי UI/UX נקיים לדשבורדים וכלים פנימיים.'],
  ['04', 'מיתוג ולוגואים',       'זהות חזותית שלמה — מהסימן ועד מערכת העיצוב.'],
  ['05', 'עיצוב גרפי',           'פוסטרים, חומרים שיווקיים ותוכן לרשתות.'],
];

function Services() {
  return (
    <section className="section tint" id="services">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Eyebrow idx="02">מה אני עושה</Eyebrow>
            <h2 className="section-title">שירותים.</h2>
          </div>
          <p className="section-note">
            מקצה לקצה — אסטרטגיה, עיצוב ובנייה. עבודה צמודה, בקו אחד ונקי.
          </p>
        </div>
        <div className="services-list">
          {SERVICES.map(([idx, name, desc]) => (
            <div className="service-row" key={idx}>
              <span className="s-idx" dir="ltr">{idx}</span>
              <span className="s-name">{name}</span>
              <span className="s-desc">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="contact-block">
          <Eyebrow idx="03">יש לכם פרויקט?</Eyebrow>
          <h2>בוא ניצור משהו<br/>שנשאר בזיכרון.</h2>
          <p>שלחו לי הודעה ונבנה יחד את הפרויקט הבא — מהרעיון הראשוני ועד ההשקה.</p>
          <div className="contact-actions">
            <a className="btn btn-wa" href={STUDIO.wa} target="_blank" rel="noopener noreferrer">
              שליחת WhatsApp<Arr/>
            </a>
            <a className="btn btn-phone" href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
            <a className="btn btn-phone" href={STUDIO.tel}>{STUDIO.phoneDisplay}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div className="footer-logo" style={{ marginBottom: '18px' }}>
              <img src="assets/adir-logo.svg" alt="Adir" />
            </div>
            <p className="muted" style={{ maxWidth: '30ch', margin: 0 }}>
              {STUDIO.name} — עיצוב ובניית חוויות דיגיטליות.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>ניווט</h4>
              <a href="#work">עבודות</a>
              <a href="#services">שירותים</a>
              <a href="#contact">צור קשר</a>
            </div>
            <div className="footer-col">
              <h4>קשר</h4>
              <a href={STUDIO.wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
              <a href={STUDIO.tel}>{STUDIO.phoneDisplay}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {STUDIO.name} — כל הזכויות שמורות</span>
          <span style={{display:'inline-flex',alignItems:'baseline',gap:'0.35em',direction:'ltr'}}>
            Created by
            <img src="assets/adir-logo.svg" alt="Adir"
              style={{height:'1.4em',width:'auto',verticalAlign:'baseline',display:'inline-block',position:'relative',top:'0.15em',opacity:0.48}} />
            Designs · <span style={{fontSize:'0.82em'}}>0542435488</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="adir-root">
      <Nav />
      <Hero />
      <WorkSection />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
