/* global React, ReactDOM */
/* Shared case-study component. Each project HTML sets window.PROJECT before loading this file. */

const PROJECT = window.PROJECT;
const ALL_PROJECTS = [
  { id: 'lotanchik', title: 'לוטנצ׳יק',     cat: 'דף נחיתה',           file: 'lotanchik.html' },
  { id: 'sushi',     title: 'סושי · כיוונים', cat: 'מערכת ניהול · UI/UX', file: 'sushi.html' },
  { id: 'didi',      title: 'דידי דימיוני',   cat: 'אתר אינטרנט',        file: 'didi.html' },
];

const STUDIO_WA = 'https://wa.me/972542435488';

/* ---- icons ---- */
const NW = () => (
  <svg className="nw" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ArrRight = () => (
  <svg width="17" height="13" viewBox="0 0 17 13" fill="none" aria-hidden="true">
    <path d="M1 6.5H16M10.5 1L16 6.5L10.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ArrLeft = () => (
  <svg width="17" height="13" viewBox="0 0 17 13" fill="none" aria-hidden="true">
    <path d="M16 6.5H1M6.5 1L1 6.5L6.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M11 7H3M6 4L3 7L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Eyebrow = ({ idx, children }) => (
  <p className="eyebrow">
    <span className="idx">{idx}</span>
    <span className="bar"></span>
    {children}
  </p>
);

const Arr = () => (
  <svg className="arr" width="17" height="13" viewBox="0 0 17 13" fill="none" aria-hidden="true">
    <path d="M16 6.5H1M6.5 1L1 6.5L6.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ---- Nav ---- */
function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="nav-logo" href="index.html">
          <img src="assets/adir-logo.svg" alt="Adir" />
        </a>
        <ul className="nav-links">
          <li><a href="index.html#work">עבודות</a></li>
          <li><a href="index.html#services">שירותים</a></li>
          <li><a href="index.html#contact">צור קשר</a></li>
        </ul>
        <div className="nav-cta">
          <a className="btn btn-secondary btn-sm" href={STUDIO_WA} target="_blank" rel="noopener noreferrer">
            וואטסאפ<Arr/>
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ---- Case Hero ---- */
function CaseHero({ p }) {
  return (
    <section className="cs-hero">
      <div className="wrap">
        <Eyebrow idx={p.index}>{p.cat} · {p.year}</Eyebrow>
        <h1>{p.title}</h1>
        <p className="lead">{p.tagline}</p>
        <div className="cs-hero-actions">
          <a className="btn-hero-back" href="index.html">
            <BackIcon/> חזרה לתיק
          </a>
          <a className="btn-hero-ext" href={p.href} target="_blank" rel="noopener noreferrer">
            לאתר החי <NW/>
          </a>
        </div>
      </div>
      <div className="wrap" style={{ paddingBottom: 0 }}>
        <div className="cs-hero-img">
          <image-slot
            id={`cs-hero-${p.id}`}
            shape="rect"
            placeholder={`גרור צילום מסך ראשי של ${p.title}`}
          ></image-slot>
        </div>
      </div>
    </section>
  );
}

/* ---- Meta Strip ---- */
function MetaStrip({ p }) {
  return (
    <div className="cs-meta-strip">
      <div className="wrap" style={{ padding: 0 }}>
        <dl className="cs-meta-inner">
          <div className="cs-meta-item"><dt>לקוח</dt><dd>{p.client}</dd></div>
          <div className="cs-meta-item"><dt>סוג</dt><dd>{p.cat}</dd></div>
          <div className="cs-meta-item"><dt>שנה</dt><dd dir="ltr">{p.year}</dd></div>
          <div className="cs-meta-item">
            <dt>קישור</dt>
            <dd>
              <a href={p.href} target="_blank" rel="noopener noreferrer">
                {p.domain} <NW/>
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/* ---- Challenge Section ---- */
function Challenge({ p }) {
  return (
    <section className="cs-section">
      <div className="wrap">
        <div className="cs-2col">
          <div>
            <p className="cs-label">האתגר</p>
            <h2 className="cs-h2">{p.challenge.title}</h2>
            <div className="cs-body">
              {p.challenge.body.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
          <div className="cs-img-slot">
            <image-slot
              id={`cs-challenge-${p.id}`}
              shape="rect"
              placeholder={`גרור צילום מסך — ${p.title}`}
            ></image-slot>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Solution Section ---- */
function Solution({ p }) {
  return (
    <section className="cs-section tint">
      <div className="wrap">
        <p className="cs-label">הפתרון</p>
        <h2 className="cs-h2" style={{ maxWidth: '20ch' }}>{p.solution.title}</h2>
        <div className="cs-2col" style={{ marginTop: '40px' }}>
          <div className="cs-img-slot">
            <image-slot
              id={`cs-solution-${p.id}`}
              shape="rect"
              placeholder={`גרור צילום מסך — ${p.title}`}
            ></image-slot>
          </div>
          <div className="cs-body" style={{ paddingTop: '8px' }}>
            {p.solution.body.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Features Section ---- */
function Features({ p }) {
  return (
    <section className="cs-section">
      <div className="wrap">
        <p className="cs-label">מה בנינו</p>
        <h2 className="cs-h2">יכולות מרכזיות.</h2>
        <div className="cs-features-grid">
          {p.features.map((f, i) => (
            <div className="cs-feature-card" key={i}>
              <div className="cs-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={f.icon}/>
                </svg>
              </div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Screenshots Section ---- */
function Screenshots({ p }) {
  return (
    <section className="cs-section tint">
      <div className="wrap">
        <p className="cs-label">מסכים נוספים</p>
        <h2 className="cs-h2">מבט מקרוב.</h2>
        <div className="cs-screens">
          {p.screens.map((s, i) => (
            <div className={`cs-screen-slot${s.tall ? ' tall' : ''}`} key={i}>
              <image-slot
                id={`cs-screen-${p.id}-${i}`}
                shape="rect"
                placeholder={s.label}
              ></image-slot>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Quote ---- */
function Quote({ p }) {
  if (!p.quote) return null;
  return (
    <section className="cs-section">
      <div className="wrap">
        <div className="cs-quote">
          <span className="mark">"</span>
          <blockquote>{p.quote}</blockquote>
        </div>
      </div>
    </section>
  );
}

/* ---- Project Nav ---- */
function ProjectNav({ p }) {
  const idx = ALL_PROJECTS.findIndex(x => x.id === p.id);
  const prev = ALL_PROJECTS[idx - 1] || null;
  const next = ALL_PROJECTS[idx + 1] || null;

  return (
    <div className="cs-project-nav">
      {prev ? (
        <a className="cs-pnav-item prev" href={prev.file}>
          <span className="cs-pnav-label"><ArrRight/> פרויקט קודם</span>
          <span className="cs-pnav-title">{prev.title}</span>
          <span className="cs-pnav-cat">{prev.cat}</span>
        </a>
      ) : <div />}
      {next ? (
        <a className="cs-pnav-item next" href={next.file}>
          <span className="cs-pnav-label">פרויקט הבא <ArrLeft/></span>
          <span className="cs-pnav-title">{next.title}</span>
          <span className="cs-pnav-cat">{next.cat}</span>
        </a>
      ) : <div />}
      <a className="cs-pnav-back" href="index.html">
        <BackIcon/> חזרה לכל העבודות
      </a>
    </div>
  );
}

/* ---- Contact ---- */
function Contact() {
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="contact-block">
          <Eyebrow idx="—">יש לכם פרויקט?</Eyebrow>
          <h2>בוא ניצור משהו<br/>שנשאר בזיכרון.</h2>
          <p>שלחו לי הודעה ונבנה יחד את הפרויקט הבא — מהרעיון הראשוני ועד ההשקה.</p>
          <div className="contact-actions">
            <a className="btn btn-wa" href={STUDIO_WA} target="_blank" rel="noopener noreferrer">
              שליחת WhatsApp<Arr/>
            </a>
            <a className="btn btn-phone" href="mailto:adirtal@gmail.com">adirtal@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Footer ---- */
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
              אדיר בוטבול — עיצוב ובניית חוויות דיגיטליות.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>ניווט</h4>
              <a href="index.html#work">עבודות</a>
              <a href="index.html#services">שירותים</a>
              <a href="index.html#contact">צור קשר</a>
            </div>
            <div className="footer-col">
              <h4>קשר</h4>
              <a href={STUDIO_WA} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href="mailto:adirtal@gmail.com">adirtal@gmail.com</a>
              <a href="tel:0542435488" dir="ltr">054-243-5488</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 אדיר בוטבול — כל הזכויות שמורות</span>
          <span>נבנה עם תשומת לב לפרטים</span>
        </div>
      </div>
    </footer>
  );
}

/* ---- App ---- */
function CaseApp() {
  const p = PROJECT;
  return (
    <div className="adir-root">
      <Nav />
      <CaseHero p={p} />
      <MetaStrip p={p} />
      <Challenge p={p} />
      <Solution p={p} />
      <Features p={p} />
      <Screenshots p={p} />
      <Quote p={p} />
      <ProjectNav p={p} />
      <Contact />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<CaseApp />);
