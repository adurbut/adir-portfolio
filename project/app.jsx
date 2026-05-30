/* global React */
const { useState } = React;

/* ----------------------------------------------------------
   Token directions
---------------------------------------------------------- */
const PALETTES = {
  ink: {
    name: 'דיו', tag: 'מונוכרום חם',
    vars: { '--paper':'#f6f3ec','--surface':'#fcfaf4','--stone':'#ebe3d2','--stone-2':'#d8cfbb','--ink':'#16140f','--ink-70':'#4a463d','--muted':'#8c8676','--line':'#e4dece','--accent':'#16140f','--accent-ink':'#f6f3ec' },
    swatches: [ ['נייר','#F6F3EC'],['סטון','#EBE3D2'],['סטון 2','#D8CFBB'],['עמום','#8C8676'],['דיו 70','#4A463D'],['דיו','#16140F'] ],
  },
  clay: {
    name: 'חרסית', tag: 'אקצנט חם',
    vars: { '--paper':'#f7f2ea','--surface':'#fdf9f2','--stone':'#efe6d6','--stone-2':'#ddd0ba','--ink':'#1c1a16','--ink-70':'#534e45','--muted':'#968a7a','--line':'#e8e0d0','--accent':'#bc5e3b','--accent-ink':'#fdf9f2' },
    swatches: [ ['נייר','#F7F2EA'],['סטון','#EFE6D6'],['חרסית','#BC5E3B'],['עמום','#968A7A'],['דיו 70','#534E45'],['דיו','#1C1A16'] ],
  },
  forest: {
    name: 'זית', tag: 'אקצנט קר',
    vars: { '--paper':'#f4f2ec','--surface':'#faf9f3','--stone':'#e7e5da','--stone-2':'#d2d2c2','--ink':'#14160f','--ink-70':'#454a3d','--muted':'#828776','--line':'#dde0d2','--accent':'#33524a','--accent-ink':'#f4f2ec' },
    swatches: [ ['נייר','#F4F2EC'],['סטון','#E7E5DA'],['זית','#33524A'],['עמום','#828776'],['דיו 70','#454A3D'],['דיו','#14160F'] ],
  },
};

const TYPES = {
  editorial: {
    name: 'ספרותי', pair: 'Frank Ruhl Libre · Assistant',
    vars: { '--font-display':"'Frank Ruhl Libre', serif", '--font-body':"'Assistant', sans-serif", '--disp-weight':'700', '--disp-tracking':'-0.01em', '--disp-lh':'1.06' },
    displayName: 'Frank Ruhl Libre', bodyName: 'Assistant',
  },
  minimal: {
    name: 'מינימלי', pair: 'Heebo light · Heebo',
    vars: { '--font-display':"'Heebo', sans-serif", '--font-body':"'Heebo', sans-serif", '--disp-weight':'300', '--disp-tracking':'-0.005em', '--disp-lh':'1.08' },
    displayName: 'Heebo', bodyName: 'Heebo',
  },
  display: {
    name: 'תצוגתי', pair: 'Suez One · Heebo',
    vars: { '--font-display':"'Suez One', serif", '--font-body':"'Heebo', sans-serif", '--disp-weight':'400', '--disp-tracking':'-0.005em', '--disp-lh':'1.05' },
    displayName: 'Suez One', bodyName: 'Heebo',
  },
};

const LOGO_BLACK = 'assets/adir-logo.svg';
const LOGO_CREAM = 'assets/adir-logo-cream.png';

const Arr = () => (
  <svg className="arr" width="17" height="13" viewBox="0 0 17 13" fill="none" aria-hidden="true">
    <path d="M16 6.5H1M6.5 1L1 6.5L6.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Eyebrow = ({ idx, children }) => (
  <p className="eyebrow"><span className="idx">{idx}</span><span className="bar"></span>{children}</p>
);

/* ----------------------------------------------------------
   Sections
---------------------------------------------------------- */
function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="nav-logo" href="#top"><img src={LOGO_BLACK} alt="Adir" style={{filter:'var(--logo-filter, none)'}} /></a>
        <ul className="nav-links">
          <li><a href="#work">עבודות</a></li>
          <li><a href="#about">אודות</a></li>
          <li><a href="#services">שירותים</a></li>
          <li><a href="#contact">צור קשר</a></li>
        </ul>
        <div className="nav-cta">
          <a className="btn btn-secondary btn-sm" href="#contact">בוא נדבר<Arr/></a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="wrap hero" id="top">
      <img className="hero-logo" src={LOGO_BLACK} alt="Adir" />
      <h1>מערכת עיצוב לבניית מותגים שנושמים.</h1>
      <p>סטודיו עצמאי לעיצוב חוויות דיגיטליות — דפי נחיתה, אתרים, אפליקציות ומיתוג. זוהי השפה הוויזואלית שמאחורי כל פרויקט.</p>
      <div className="row-wrap" style={{marginBottom:'8px'}}>
        <a className="btn btn-primary" href="#work">לצפייה בעבודות<Arr/></a>
        <a className="btn btn-ghost" href="#contact">הורדת המערכת</a>
      </div>
      <dl className="hero-meta">
        <div><dt>תחום</dt><dd>עיצוב דיגיטלי ומיתוג</dd></div>
        <div><dt>מבוסס</dt><dd>תל אביב · 2025</dd></div>
        <div><dt>גרסה</dt><dd>1.0</dd></div>
      </dl>
    </header>
  );
}

function LogoSection() {
  return (
    <section className="section" id="brand">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Eyebrow idx="01">הלוגו</Eyebrow>
            <h2 className="section-title">סימן אחד, שני רקעים.</h2>
          </div>
          <p className="section-note">הלוגוטייפ נשען על פורמות מעוגלות, ליגטורה בין ה־A ל־d, והנקודה מעל ה־i כמוטיב חוזר. שמרו על מרחב נשימה סביבו בגובה אות ה־i לפחות.</p>
        </div>
        <div className="grid-2 tight">
          <div className="card-pad" style={{background:'var(--surface)', display:'flex', alignItems:'center', justifyContent:'center', minHeight:'240px'}}>
            <img src={LOGO_BLACK} alt="Adir על רקע בהיר" style={{width:'62%'}} />
          </div>
          <div className="card-pad" style={{background:'var(--ink)', display:'flex', alignItems:'center', justifyContent:'center', minHeight:'240px', borderColor:'var(--ink)'}}>
            <img src={LOGO_CREAM} alt="Adir על רקע כהה" style={{width:'62%'}} />
          </div>
        </div>
        <div className="row-wrap" style={{marginTop:'24px', gap:'40px'}}>
          <div><p className="ts-cap" style={{margin:'0 0 4px'}}>מרחב הגנה</p><p className="muted" style={{margin:0, fontSize:'15px'}}>≥ גובה אות אחת מכל צד</p></div>
          <div><p className="ts-cap" style={{margin:'0 0 4px'}}>גודל מינימלי</p><p className="muted" style={{margin:0, fontSize:'15px'}}>24px גובה דיגיטלי</p></div>
          <div><p className="ts-cap" style={{margin:'0 0 4px'}}>מוטיב</p><p className="muted" style={{margin:0, fontSize:'15px'}}>הנקודה • כסימן עצמאי</p></div>
        </div>
      </div>
    </section>
  );
}

function ColorSection({ palette, rich }) {
  const p = PALETTES[palette];
  return (
    <section className={'section' + (rich ? ' tint' : '')} id="color">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Eyebrow idx="02">צבע</Eyebrow>
            <h2 className="section-title">פלטת «{p.name}».</h2>
          </div>
          <p className="section-note">בסיס של נייר חם ודיו עמוק, עם אקצנט יחיד שמוביל פעולה. החליפו כיוון צבע מפאנל ה־Tweaks כדי לראות את שלוש הפלטות.</p>
        </div>
        <div className="swatch-grid">
          {p.swatches.map(([nm, hx]) => (
            <div className="swatch" key={hx+nm}>
              <div className="chip" style={{background:hx, borderBottom:'1px solid var(--line)'}}></div>
              <div className="meta"><p className="nm">{nm}</p><p className="hx">{hx}</p></div>
            </div>
          ))}
        </div>
        <div className="row-wrap" style={{marginTop:'34px', gap:'14px'}}>
          {Object.entries(PALETTES).map(([k, v]) => (
            <div key={k} className="row-wrap" style={{gap:'10px'}}>
              <div style={{display:'flex'}}>
                {Object.values(v.vars).slice(0,1).map((_,i)=>null)}
                <span style={{width:22,height:22,borderRadius:'50%',background:v.vars['--accent'],border:'1px solid var(--line)'}}></span>
                <span style={{width:22,height:22,borderRadius:'50%',background:v.vars['--ink'],border:'1px solid var(--line)',marginInlineStart:-7}}></span>
                <span style={{width:22,height:22,borderRadius:'50%',background:v.vars['--paper'],border:'1px solid var(--line)',marginInlineStart:-7}}></span>
              </div>
              <span className="muted" style={{fontSize:'13.5px', fontFamily:'var(--font-mono)'}}>{v.name}{k===palette?' ●':''}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TypeSection({ type }) {
  const t = TYPES[type];
  return (
    <section className="section" id="type">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Eyebrow idx="03">טיפוגרפיה</Eyebrow>
            <h2 className="section-title">כיוון «{t.name}».</h2>
          </div>
          <p className="section-note">צמד גופנים: {t.pair}. כותרות תצוגה לצד גוף טקסט קריא וממוטב. החליפו כיוון טיפוגרפי מפאנל ה־Tweaks.</p>
        </div>

        <div className="grid-2 tight" style={{marginBottom:'48px'}}>
          <div className="font-card">
            <p className="big" style={{fontFamily:'var(--font-display)', fontWeight:'var(--disp-weight)'}}>אבגדהוז</p>
            <p className="nm">{t.displayName}</p>
            <p className="role">DISPLAY · כותרות</p>
            <p className="glyphs" style={{fontFamily:'var(--font-display)'}}>א ב ג ד ה — Adir 0123</p>
          </div>
          <div className="font-card">
            <p className="big" style={{fontFamily:'var(--font-body)', fontWeight:400}}>אבגדהוז</p>
            <p className="nm">{t.bodyName}</p>
            <p className="role">TEXT · גוף</p>
            <p className="glyphs" style={{fontFamily:'var(--font-body)'}}>א ב ג ד ה — Adir 0123</p>
          </div>
        </div>

        <div>
          <div className="type-row">
            <div className="lbl">Display<span>72 / 1.02</span></div>
            <p className="type-spec ts-display">עיצוב שמדבר.</p>
          </div>
          <div className="type-row">
            <div className="lbl">H1<span>48 / 1.1</span></div>
            <p className="type-spec ts-h1">בונים מותגים בקו נקי</p>
          </div>
          <div className="type-row">
            <div className="lbl">H2<span>34 / 1.15</span></div>
            <p className="type-spec ts-h2">פרויקטים נבחרים מהסטודיו</p>
          </div>
          <div className="type-row">
            <div className="lbl">Body<span>19 / 1.7</span></div>
            <p className="type-spec ts-body">כל פרויקט מתחיל בשאלה אחת: מה הסיפור שצריך להיאמר, ולמי. מתוך התשובה נבנית מערכת ויזואלית שלמה — טיפוגרפיה, צבע, קצב וחלל — שמשרתת את המסר בלי להתפשר על יופי.</p>
          </div>
          <div className="type-row">
            <div className="lbl">Caption<span>13 / .08em</span></div>
            <p className="type-spec ts-cap">2025 — סטודיו עצמאי לעיצוב דיגיטלי</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComponentsSection({ rich }) {
  const [active, setActive] = useState('אתרים');
  const cats = ['דפי נחיתה','אתרים','אפליקציות','מיתוג','פוסטרים'];
  return (
    <section className={'section' + (rich ? ' tint' : '')} id="components">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Eyebrow idx="04">רכיבים</Eyebrow>
            <h2 className="section-title">אבני הבניין.</h2>
          </div>
          <p className="section-note">סט רכיבים עקבי — כפתורים, תגיות, שדות וציטוטים — שמרכיב כל מסך באתר.</p>
        </div>

        <div className="grid-2">
          <div className="stack-lg">
            <div>
              <p className="ts-cap" style={{marginBottom:'16px'}}>כפתורים</p>
              <div className="stack-md">
                <div className="row-wrap">
                  <a className="btn btn-primary" href="#">פעולה ראשית<Arr/></a>
                  <a className="btn btn-secondary" href="#">פעולה משנית<Arr/></a>
                  <a className="btn btn-ghost" href="#">קישור<Arr/></a>
                </div>
                <div className="row-wrap">
                  <a className="btn btn-primary btn-sm" href="#">קטן<Arr/></a>
                  <a className="btn btn-secondary btn-sm" href="#">קטן</a>
                </div>
              </div>
            </div>
            <div>
              <p className="ts-cap" style={{marginBottom:'16px'}}>תגיות קטגוריה</p>
              <div className="chips">
                {cats.map(c => (
                  <button key={c} className={'chip-tag' + (c===active?' is-active':'')} onClick={()=>setActive(c)}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="ts-cap" style={{marginBottom:'16px'}}>ספיינג ורדיוס</p>
              <div className="token-row">
                {[['4','16px'],['8','24px'],['12','40px'],['16','64px']].map(([n,px])=>(
                  <div className="token-box" key={n}><div className="vis" style={{width:px,height:px,borderRadius:'4px'}}></div><div className="nm">{n}</div></div>
                ))}
                <div style={{width:1,height:64,background:'var(--line)'}}></div>
                {[['sm','8px'],['md','14px'],['lg','22px']].map(([n,r])=>(
                  <div className="token-box" key={n}><div className="radius-box" style={{borderRadius:r}}></div><div className="nm">{n}</div></div>
                ))}
              </div>
            </div>
          </div>

          <div className="stack-lg">
            <div className="card-pad">
              <p className="ts-cap" style={{marginBottom:'18px'}}>טופס יצירת קשר</p>
              <div className="stack-md">
                <div className="field"><label>שם מלא</label><input placeholder="ישראל ישראלי" /></div>
                <div className="field"><label>אימייל</label><input placeholder="hello@adir.studio" /></div>
                <div className="field"><label>על הפרויקט</label><textarea placeholder="ספרו לי בכמה מילים על הפרויקט שלכם…"></textarea></div>
                <a className="btn btn-primary" href="#" style={{alignSelf:'flex-start'}}>שליחה<Arr/></a>
              </div>
            </div>
          </div>
        </div>

        <div className={'statement' + (rich ? ' rich' : '')} style={{marginTop:'56px'}}>
          <span className="mark">”</span>
          <blockquote>טוב שבעיצוב הוא לא מה שמוסיפים — אלא מה שמעזים להוריד.</blockquote>
          <cite>— עקרון מנחה · Adir Studio</cite>
        </div>
      </div>
    </section>
  );
}

const TONES = {
  stone: { bg:'var(--stone-2)', fg:'var(--ink)', sub:'var(--ink-70)' },
  ink:   { bg:'var(--ink)', fg:'var(--paper)', sub:'var(--muted)' },
  muted: { bg:'var(--muted)', fg:'var(--paper)', sub:'color-mix(in oklab, var(--paper) 78%, transparent)' },
  ink70: { bg:'var(--ink-70)', fg:'var(--paper)', sub:'var(--muted)' },
};

const WORKS = [
  { num:'01', mark:'L', cat:'דף נחיתה', title:'Lumen Skincare', desc:'דף מכר למותג טיפוח טבעי, עם המרה גבוהה.', yr:'2025', tone:'stone' },
  { num:'02', mark:'N', cat:'אפליקציה · UI/UX', title:'Nava Banking', desc:'אפליקציית בנקאות עם דשבורד נקי ונגיש.', yr:'2025', tone:'ink' },
  { num:'03', mark:'O', cat:'מיתוג', title:'Olea Café', desc:'זהות מלאה לבית קפה — לוגו, תפריט ושילוט.', yr:'2024', tone:'muted' },
  { num:'04', mark:'S', cat:'אתר אינטרנט', title:'Studio Sela', desc:'אתר תדמית למשרד אדריכלים בוטיק.', yr:'2024', tone:'ink70' },
];

function WorkSection() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Eyebrow idx="05">המערכת בפעולה</Eyebrow>
            <h2 className="section-title">תיק העבודות.</h2>
          </div>
          <p className="section-note">כך נראה גריד הפרויקטים בעמוד הבית — כל כרטיס בגוון אחר ממשפחת הדיו. כאן תתווספנה העבודות שלך.</p>
        </div>
        <div className="work-grid">
          {WORKS.map((w) => {
            const tn = TONES[w.tone];
            return (
            <article className="work-card" key={w.num}>
              <div className="work-thumb" style={{background: tn.bg}}>
                <span className="num" style={{color: tn.sub}}>{w.num} / 04</span>
                <span className="ph-mark" style={{color: tn.fg}}>{w.mark}</span>
              </div>
              <div className="work-body">
                <span className="cat">{w.cat}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <div className="work-foot">
                  <span className="yr">{w.yr}</span>
                  <span className="go">לצפייה<Arr/></span>
                </div>
              </div>
            </article>
          );})}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div className="footer-logo" style={{marginBottom:'18px'}}><img src={LOGO_BLACK} alt="Adir" /></div>
            <p className="muted" style={{maxWidth:'30ch', margin:0}}>סטודיו עצמאי לעיצוב חוויות דיגיטליות ומיתוג.</p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>ניווט</h4>
              <a href="#work">עבודות</a><a href="#about">אודות</a><a href="#services">שירותים</a>
            </div>
            <div className="footer-col">
              <h4>קשר</h4>
              <a href="#">hello@adir.studio</a><a href="#">050-000-0000</a><a href="#">תל אביב</a>
            </div>
            <div className="footer-col">
              <h4>רשתות</h4>
              <a href="#">Instagram</a><a href="#">Behance</a><a href="#">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Adir — כל הזכויות שמורות</span>
          <span>נבנה עם תשומת לב לפרטים</span>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------
   App + Tweaks
---------------------------------------------------------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "ink",
  "type": "editorial",
  "richness": "rich"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const rootVars = { ...PALETTES[t.palette].vars, ...TYPES[t.type].vars };
  const rich = t.richness === 'rich';

  return (
    <div className="adir-root" style={rootVars}>
      <Nav />
      <Hero />
      <LogoSection />
      <ColorSection palette={t.palette} rich={rich} />
      <TypeSection type={t.type} />
      <ComponentsSection rich={rich} />
      <WorkSection />
      <Footer />

      <TweaksPanel>
        <TweakSection label="כיוון צבע" />
        <TweakRadio label="פלטה" value={t.palette}
          options={[{value:'ink',label:'דיו'},{value:'clay',label:'חרסית'},{value:'forest',label:'זית'}]}
          onChange={(v)=>setTweak('palette', v)} />
        <TweakRadio label="גוונים" value={t.richness}
          options={[{value:'calm',label:'רגוע'},{value:'rich',label:'עשיר'}]}
          onChange={(v)=>setTweak('richness', v)} />
        <TweakSection label="טיפוגרפיה" />
        <TweakRadio label="כיוון" value={t.type}
          options={[{value:'editorial',label:'ספרותי'},{value:'minimal',label:'מינימלי'},{value:'display',label:'תצוגתי'}]}
          onChange={(v)=>setTweak('type', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
