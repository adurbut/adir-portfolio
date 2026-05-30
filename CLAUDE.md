# פרויקט: אדיר — תיק עבודות

## מי
**אדיר בוטבול** — מעצב גרפי ועיצוב ווב.
- אימייל: adirtal@gmail.com
- טלפון: 054-243-5488
- GitHub: `adurbut/adir-portfolio`
- Vercel: מחובר לריפו (deploy אוטומטי)

## מה
תיק עבודות דיגיטלי עם 3 עבודות + עמודי case study לכל אחת.

## Stack
- React 18 + Babel CDN (ללא build step — JSX בדפדפן)
- עברית RTL (`lang="he" dir="rtl"`)
- CSS design tokens (`.adir-root`) — פלטת "דיו", פונטים: Frank Ruhl Libre + Assistant + IBM Plex Mono
- `image-slot` web component — drag-drop + persistence ב-`.image-slots.state.json`

## קבצים מרכזיים
| קובץ | תיאור |
|------|--------|
| `index.html` | דף ראשי |
| `portfolio.js` | React app ראשי |
| `adir.css` | Design system tokens |
| `portfolio.css` | סגנונות פורטפוליו |
| `case-study.css` | סגנונות case study |
| `case.js` | קומפוננט React משותף לכל case study |
| `image-slot.js` | Web component לתמונות |
| `.image-slots.state.json` | 24 image slots (base64 PNGs) |
| `screenshot.js` | Playwright script לצילום אוטומטי |
| `.github/workflows/screenshots.yml` | GitHub Action לצילום |

## 3 העבודות
| # | שם | אתר | case study |
|---|----|-----|-----------|
| 01 | לוטנצ'יק | lotanchik.vercel.app | lotanchik.html |
| 02 | סושי · כיוונים | sushi-kivunim.vercel.app | sushi.html |
| 03 | דידי דימיוני | didifun.co.il | didi.html |

## קרדיט (Credit)
כשהמשתמש מבקש "קרדיט" — הכוונה לרצועת signature שמוסיפים לאתרי לקוחות. **רץ על כל הפרויקטים.**

```
Created by [לוגו אדיר SVG] Designs · 0542435488
```

### קוד מדויק (JSX):
```jsx
<span style={{display:'inline-flex',alignItems:'baseline',gap:'0.35em',direction:'ltr'}}>
  Created by
  <img src="assets/adir-logo.svg" alt="Adir"
    style={{height:'1.4em',width:'auto',verticalAlign:'baseline',display:'inline-block',position:'relative',top:'0.15em',opacity:0.48}} />
  Designs · <span style={{fontSize:'0.82em'}}>0542435488</span>
</span>
```

### כללים:
- **סדר:** Created by → לוגו → Designs · מספר
- **כיוון:** `direction: ltr` חובה (הדף עברי RTL)
- **לוגו:** `height: 1.4em`, `opacity: 0.48` (מופיע אפור), מיושר ל-baseline
- **טלפון:** `font-size: 0.82em` (קטן מעט מהשאר)
- **צבע:** ירש מהסביבה (`color: var(--muted)` או מה שמתאים לאתר)
- **מיקום:** בפוטר של כל אתר שאדיר בנה

## הערות טכניות
- סביבת Claude Code on the web חוסמת HTTP חיצוני — screenshot.js עובד רק דרך GitHub Action
- GitHub Action Secrets: `SUSHI_USER`, `SUSHI_PASS` (למערכת הסושי שמוגנת בסיסמה)
- לצילום חדש: Actions → "צלם צילומי מסך מהאתרים" → Run workflow
- אתר דידי (didifun.co.il) מגיב עם פופאפ anti-bot — צילומים נעשו ידנית
