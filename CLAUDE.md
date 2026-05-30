# פרויקט: אדיר — תיק עבודות

## מי
**אדיר בוטבול** — מעצב גרפי ועיצוב ווב.
- אימייל: adirtal@gmail.com
- טלפון: 054-243-5488 / 0542435488
- GitHub: `adurbut/adir-portfolio`
- Vercel: מחובר לריפו (deploy אוטומטי על כל push ל-main)

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
| `adir.css` | Design system tokens + layout גלובלי |
| `portfolio.css` | סגנונות פורטפוליו (hero, cards, services, contact) |
| `case-study.css` | סגנונות case study |
| `case.js` | קומפוננט React משותף לכל case study |
| `image-slot.js` | Web component לתמונות |
| `.image-slots.state.json` | 24 image slots (base64 PNGs) |
| `screenshot.js` | Playwright script לצילום אוטומטי |
| `.github/workflows/screenshots.yml` | GitHub Action לצילום |
| `assets/adir-logo.svg` | לוגו SVG — שבילים שחורים (ללא fill) |

## 3 העבודות
| # | שם | אתר | case study |
|---|----|-----|-----------|
| 01 | לוטנצ'יק | lotanchik.vercel.app | lotanchik.html |
| 02 | סושי · כיוונים | sushi-kivunim.vercel.app | sushi.html |
| 03 | דידי דימיוני | didifun.co.il | didi.html |

## קרדיט (Credit)
כשמבקשים "קרדיט" — רצועת signature שמוסיפים לפוטר של כל אתר שאדיר בנה. **רץ על כל הפרויקטים.**

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
- **צבע:** ירש מהסביבה (`.footer-bottom` מגדיר `color: var(--muted)`)
- **מיקום:** בפוטר, בצד שמאל של שורת `footer-bottom`

## אנימציית Hero
הלוגו מופיע עם blur-in + עלייה, ואחריו הטקסט נכנס בהדרגה:
- `.hero-logo-anim` — `animation: heroLogoReveal 2.2s` עם `filter: blur` ו-`scale(1.05)`
- כל אלמנט בhero מקבל `animation: heroUp` עם delay מדורג (1.3s–1.95s)
- `prefers-reduced-motion: reduce` מכבה את הכל
- CSS נמצא ב-`portfolio.css`

## הערות טכניות
- **RTL + padding:** אין להשתמש ב-shorthand `padding: top 0 bottom` על אלמנטים שמשתמשים ב-`.wrap` — זה מאפס את השוליים הצדדיים. להשתמש ב-`padding-top` + `padding-bottom` בנפרד.
- **overflow-x:** `html, body { overflow-x: hidden; }` מוגדר ב-`adir.css` כדי למנוע גלילה אופקית מאנימציות.
- **screenshot.js:** עובד רק דרך GitHub Actions (סביבה חוסמת HTTP חיצוני)
- **GitHub Action Secrets:** `SUSHI_USER`, `SUSHI_PASS` (למערכת הסושי שמוגנת בסיסמה)
- **לצילום חדש:** Actions → "צלם צילומי מסך מהאתרים" → Run workflow
- **דידי (didifun.co.il):** פופאפ anti-bot — צילומים נעשו ידנית ולא דרך Playwright
- **SVG לוגו:** שבילים שחורים ללא fill — לצבע אפור משתמשים ב-`opacity: 0.48` ולא ב-filter
