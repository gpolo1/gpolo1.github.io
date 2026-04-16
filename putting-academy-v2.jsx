import { useState, useEffect, useRef } from "react";

/* ─────────────────────────── DESIGN TOKENS ─────────────────────────── */
const C = {
  bg:        "#080807",
  surface:   "#0e0e0c",
  card:      "#131311",
  cardHover: "#191917",
  border:    "#252520",
  borderHi:  "#3a3a30",
  gold:      "#b8973e",
  goldHi:    "#d4af5a",
  goldDim:   "#6b5522",
  goldGlow:  "rgba(184,151,62,0.12)",
  green:     "#1a3318",
  greenHi:   "#3d6b38",
  text:      "#e2ddd0",
  textMid:   "#918b7a",
  textDim:   "#504c42",
  red:       "#8b2020",
  redHi:     "#c04040",
};

/* ─────────────────────────── CSS ─────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body,#root{background:${C.bg};color:${C.text};font-family:'DM Sans',sans-serif;min-height:100vh;overflow-x:hidden;}

/* SCROLLBAR */
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:${C.bg};}
::-webkit-scrollbar-thumb{background:${C.goldDim};border-radius:2px;}

/* LAYOUT */
.app{max-width:960px;margin:0 auto;padding:0 16px 100px;}

/* HERO */
.hero{
  position:relative;
  text-align:center;
  padding:56px 0 40px;
  border-bottom:1px solid ${C.border};
  margin-bottom:0;
  overflow:hidden;
}
.hero::before{
  content:'';position:absolute;top:-80px;left:50%;transform:translateX(-50%);
  width:500px;height:300px;
  background:radial-gradient(ellipse at center, rgba(184,151,62,0.06) 0%, transparent 70%);
  pointer-events:none;
}
.hero-eyebrow{font-size:10px;letter-spacing:5px;color:${C.gold};text-transform:uppercase;font-weight:600;margin-bottom:18px;}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(34px,6vw,58px);font-weight:500;line-height:1.05;color:${C.text};}
.hero-title em{font-style:italic;color:${C.goldHi};}
.hero-sub{font-size:11px;letter-spacing:3.5px;color:${C.textMid};text-transform:uppercase;margin-top:14px;margin-bottom:24px;}
.hero-stats{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;margin-top:28px;}
.hero-stat{text-align:center;}
.hero-stat-num{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:${C.goldHi};}
.hero-stat-label{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:${C.textDim};margin-top:3px;}
.hero-rule{width:60px;height:1px;background:linear-gradient(90deg,transparent,${C.gold},transparent);margin:24px auto 0;}

/* NAV */
.nav{
  position:sticky;top:0;z-index:100;
  background:rgba(8,8,7,0.95);
  backdrop-filter:blur(12px);
  border-bottom:1px solid ${C.border};
  padding:0;
  display:flex;
  overflow-x:auto;
  scrollbar-width:none;
}
.nav::-webkit-scrollbar{display:none;}
.nav-item{
  flex-shrink:0;
  padding:14px 20px;
  font-size:10px;letter-spacing:2.5px;text-transform:uppercase;font-weight:600;
  color:${C.textDim};cursor:pointer;border:none;background:none;
  font-family:'DM Sans',sans-serif;
  border-bottom:2px solid transparent;
  transition:all 0.2s;white-space:nowrap;
}
.nav-item:hover{color:${C.text};}
.nav-item.active{color:${C.goldHi};border-bottom-color:${C.gold};}

/* SECTION WRAPPER */
.section{padding:40px 0;}
.section-eyebrow{font-size:9px;letter-spacing:4px;color:${C.gold};text-transform:uppercase;font-weight:700;margin-bottom:10px;}
.section-title{font-family:'Playfair Display',serif;font-size:clamp(26px,4vw,40px);font-weight:500;color:${C.text};margin-bottom:8px;line-height:1.2;}
.section-title em{font-style:italic;color:${C.goldHi};}
.section-intro{font-size:13.5px;line-height:1.9;color:${C.textMid};max-width:680px;margin-bottom:32px;}

/* CARDS */
.card{background:${C.card};border:1px solid ${C.border};border-radius:3px;padding:24px;margin-bottom:14px;transition:border-color 0.2s;}
.card:hover{border-color:${C.borderHi};}
.card.gold{border-color:${C.goldDim};background:linear-gradient(135deg,${C.card},#161410);}
.card.green-card{border-color:${C.greenHi};background:linear-gradient(135deg,#0d1a0c,${C.card});}
.card.dark{background:${C.surface};border-color:${C.border};}

/* CARD HEADER */
.card-num{font-size:9px;letter-spacing:3px;color:${C.gold};font-weight:700;text-transform:uppercase;margin-bottom:6px;font-family:'DM Mono',monospace;}
.card-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:500;color:${C.text};margin-bottom:6px;}
.card-sub{font-size:10px;letter-spacing:2px;color:${C.goldHi};text-transform:uppercase;font-weight:600;margin-bottom:12px;}
.card-body{font-size:13px;line-height:1.9;color:${C.textMid};}
.card-body p{margin-bottom:10px;}
.card-body p:last-child{margin-bottom:0;}
.card-body strong{color:${C.text};font-weight:600;}

/* EXPANDABLE */
.expand-btn{
  display:inline-flex;align-items:center;gap:6px;
  margin-top:14px;padding:8px 16px;
  background:none;border:1px solid ${C.border};border-radius:2px;
  color:${C.textMid};font-family:'DM Sans',sans-serif;font-size:10px;
  letter-spacing:2px;text-transform:uppercase;font-weight:600;cursor:pointer;
  transition:all 0.2s;
}
.expand-btn:hover{border-color:${C.gold};color:${C.gold};}
.expand-content{margin-top:20px;padding-top:20px;border-top:1px solid ${C.border};}

/* MODULE BODY SECTIONS */
.mod-section{margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid ${C.border};}
.mod-section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
.mod-section-title{font-size:12px;font-weight:700;color:${C.text};letter-spacing:0.5px;margin-bottom:7px;display:flex;align-items:center;gap:8px;}
.mod-section-title::before{content:'';display:block;width:16px;height:1px;background:${C.gold};}
.mod-section-body{font-size:12.5px;line-height:1.9;color:${C.textMid};}

/* DRILL CARDS */
.drill-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin-top:16px;}
.drill{
  background:${C.surface};border:1px solid ${C.border};
  border-left:3px solid ${C.gold};border-radius:0 3px 3px 0;
  padding:16px;
}
.drill-top{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px;}
.drill-name{font-size:11px;font-weight:700;letter-spacing:1px;color:${C.text};text-transform:uppercase;}
.drill-diff{font-size:9px;letter-spacing:1px;padding:2px 7px;border-radius:1px;font-weight:700;text-transform:uppercase;}
.diff-beginner{background:rgba(61,107,56,0.2);color:${C.greenHi};}
.diff-intermediate{background:rgba(184,151,62,0.15);color:${C.gold};}
.diff-advanced{background:rgba(139,32,32,0.2);color:${C.redHi};}
.drill-body{font-size:11.5px;line-height:1.8;color:${C.textMid};}
.drill-metric{margin-top:8px;font-size:10px;font-family:'DM Mono',monospace;color:${C.gold};letter-spacing:1px;}

/* GAME CARDS */
.game{
  background:linear-gradient(135deg,#0f110a,${C.card});
  border:1px solid ${C.greenHi};border-radius:3px;padding:18px;margin-bottom:10px;
}
.game-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;}
.game-name{font-family:'Playfair Display',serif;font-size:17px;font-weight:500;color:${C.text};}
.game-tag{font-size:9px;letter-spacing:2px;color:${C.greenHi};text-transform:uppercase;font-weight:700;padding:3px 8px;border:1px solid ${C.greenHi};border-radius:1px;}
.game-body{font-size:12.5px;line-height:1.85;color:${C.textMid};}
.game-rules{margin-top:10px;padding:10px 14px;background:rgba(0,0,0,0.3);border-radius:2px;}
.game-rules-title{font-size:9px;letter-spacing:2px;color:${C.goldHi};text-transform:uppercase;font-weight:700;margin-bottom:6px;}
.game-rules ul{padding-left:16px;}
.game-rules li{font-size:11.5px;color:${C.textMid};margin-bottom:4px;line-height:1.7;}

/* STAT TABLE */
.stat-table{width:100%;border-collapse:collapse;font-size:12px;margin:16px 0;}
.stat-table th{text-align:left;padding:8px 12px;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:${C.gold};font-weight:700;border-bottom:1px solid ${C.border};font-family:'DM Sans',sans-serif;}
.stat-table td{padding:9px 12px;border-bottom:1px solid ${C.border};color:${C.textMid};line-height:1.5;}
.stat-table tr:last-child td{border-bottom:none;}
.stat-table tr:hover td{background:rgba(255,255,255,0.02);}
.stat-highlight{color:${C.goldHi};font-weight:600;}
.stat-green{color:${C.greenHi};}
.stat-red{color:${C.redHi};}

/* PROGRESS BAR */
.prob-row{display:flex;align-items:center;gap:10px;padding:7px 0;}
.prob-label{font-size:11px;color:${C.textMid};width:90px;flex-shrink:0;}
.prob-bar-bg{flex:1;height:6px;background:${C.surface};border-radius:3px;overflow:hidden;}
.prob-bar{height:100%;border-radius:3px;transition:width 0.8s ease;}
.prob-val{font-size:11px;font-family:'DM Mono',monospace;color:${C.gold};width:40px;text-align:right;flex-shrink:0;}

/* PSYCHOLOGY CARDS */
.psych-card{
  background:${C.card};border:1px solid ${C.border};border-radius:3px;
  padding:0;margin-bottom:12px;overflow:hidden;
}
.psych-header{
  display:flex;justify-content:space-between;align-items:center;
  padding:18px 22px;cursor:pointer;transition:background 0.2s;
}
.psych-header:hover{background:${C.cardHover};}
.psych-header-left{}
.psych-cat{font-size:9px;letter-spacing:3px;color:${C.gold};text-transform:uppercase;font-weight:700;margin-bottom:5px;}
.psych-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:500;color:${C.text};}
.psych-chevron{color:${C.textDim};font-size:18px;transition:transform 0.3s;flex-shrink:0;}
.psych-chevron.open{transform:rotate(180deg);}
.psych-body{padding:0 22px 20px;font-size:13px;line-height:1.95;color:${C.textMid};}
.psych-body p{margin-bottom:12px;}
.psych-body p:last-child{margin-bottom:0;}
.psych-body strong{color:${C.text};font-weight:600;}
.psych-body em{color:${C.goldHi};font-style:italic;}
.psych-divider{height:1px;background:${C.border};margin:0 22px;}
.psych-insight{
  background:rgba(184,151,62,0.06);border-left:2px solid ${C.gold};
  padding:12px 16px;margin-top:14px;border-radius:0 2px 2px 0;
  font-size:12px;line-height:1.8;color:${C.textMid};font-style:italic;
}

/* QUOTE */
.quote{
  border-left:2px solid ${C.gold};padding:14px 22px;
  font-family:'Playfair Display',serif;font-style:italic;
  font-size:18px;color:${C.textMid};line-height:1.6;
  margin:24px 0;
}
.quote-attr{font-family:'DM Sans',sans-serif;font-size:10px;font-style:normal;letter-spacing:2px;color:${C.textDim};text-transform:uppercase;margin-top:8px;}

/* WEEK PLAN */
.phase-header{
  font-size:9px;letter-spacing:4px;color:${C.goldHi};text-transform:uppercase;font-weight:700;
  margin:28px 0 14px;display:flex;align-items:center;gap:12px;
}
.phase-header::after{content:'';flex:1;height:1px;background:${C.border};}
.week-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin-bottom:8px;}
.week-card{background:${C.surface};border:1px solid ${C.border};border-radius:3px;padding:16px;}
.week-num{font-size:9px;letter-spacing:3px;color:${C.gold};text-transform:uppercase;font-weight:700;margin-bottom:4px;}
.week-title{font-family:'Playfair Display',serif;font-size:16px;font-weight:500;color:${C.text};margin-bottom:10px;}
.week-list{list-style:none;padding:0;}
.week-list li{
  font-size:11.5px;color:${C.textMid};padding:4px 0 4px 16px;
  position:relative;border-bottom:1px solid rgba(37,37,32,0.5);line-height:1.5;
}
.week-list li:last-child{border-bottom:none;}
.week-list li::before{content:'→';position:absolute;left:0;color:${C.goldDim};font-size:10px;top:5px;}

/* TRACKER */
.tracker-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:20px;}
.tracker-cell{background:${C.surface};border:1px solid ${C.border};border-radius:3px;padding:14px;text-align:center;}
.tracker-cell.gold-cell{border-color:${C.goldDim};}
.tracker-metric{font-size:9px;letter-spacing:2px;color:${C.gold};text-transform:uppercase;font-weight:700;margin-bottom:4px;}
.tracker-val{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:${C.goldHi};margin-bottom:3px;}
.tracker-desc{font-size:11px;color:${C.textDim};line-height:1.4;}

/* TAGS */
.tag-row{display:flex;flex-wrap:wrap;gap:5px;margin-top:12px;}
.tag{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;padding:3px 8px;border-radius:1px;background:${C.surface};border:1px solid ${C.border};color:${C.textDim};}
.tag.gold-tag{color:${C.goldDim};border-color:${C.goldDim};}

/* DIVIDER */
.divider{height:1px;background:${C.border};margin:32px 0;position:relative;}
.divider::after{content:'◆';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);color:${C.goldDim};font-size:9px;background:${C.bg};padding:0 10px;}

/* ASSESSMENT */
.assess-item{display:flex;gap:16px;padding:16px 0;border-bottom:1px solid ${C.border};}
.assess-item:last-child{border-bottom:none;}
.assess-num{width:32px;height:32px;border:1px solid ${C.goldDim};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:${C.gold};flex-shrink:0;font-family:'DM Mono',monospace;}
.assess-content h4{font-size:13px;font-weight:600;color:${C.text};margin-bottom:5px;}
.assess-content p{font-size:12px;line-height:1.75;color:${C.textMid};}
.assess-benchmark{font-size:10px;font-family:'DM Mono',monospace;color:${C.gold};margin-top:6px;padding:4px 8px;background:rgba(184,151,62,0.07);border-radius:2px;display:inline-block;}

/* FITTING */
.fitting-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;}
.fitting-card{background:${C.surface};border:1px solid ${C.border};border-radius:3px;padding:16px;}
.fitting-icon{font-size:22px;margin-bottom:8px;}
.fitting-title{font-size:12px;font-weight:700;color:${C.text};letter-spacing:0.5px;margin-bottom:6px;}
.fitting-body{font-size:11.5px;line-height:1.75;color:${C.textMid};}

/* PLAYER SPOTLIGHTS */
.player-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-bottom:20px;}
.player-card{background:${C.surface};border:1px solid ${C.border};border-radius:3px;padding:16px;}
.player-name{font-family:'Playfair Display',serif;font-size:16px;font-weight:500;color:${C.text};margin-bottom:4px;}
.player-title{font-size:9px;letter-spacing:2px;color:${C.gold};text-transform:uppercase;font-weight:700;margin-bottom:8px;}
.player-insight{font-size:11.5px;line-height:1.75;color:${C.textMid};}
.player-change{margin-top:8px;font-size:10px;font-family:'DM Mono',monospace;padding:4px 8px;background:rgba(61,107,56,0.15);border:1px solid ${C.greenHi};color:${C.greenHi};border-radius:2px;display:inline-block;}

/* MOBILE FINE-TUNING */
@media(max-width:600px){
  .hero{padding:36px 0 28px;}
  .hero-stats{gap:20px;}
  .drill-grid{grid-template-columns:1fr;}
  .fitting-grid{grid-template-columns:1fr;}
}
`;

/* ─────────────────────────── DATA ─────────────────────────── */

const MAKE_PROBS = [
  { dist:"2 ft",  tour:99, scratch:98, h10:93, h20:84 },
  { dist:"3 ft",  tour:96, scratch:93, h10:85, h20:70 },
  { dist:"5 ft",  tour:77, scratch:72, h10:59, h20:44 },
  { dist:"8 ft",  tour:56, scratch:50, h10:37, h20:24 },
  { dist:"10 ft", tour:40, scratch:35, h10:26, h20:15 },
  { dist:"15 ft", tour:23, scratch:19, h10:13, h20:8  },
  { dist:"20 ft", tour:15, scratch:13, h10:8,  h20:5  },
  { dist:"30 ft", tour:7,  scratch:6,  h10:4,  h20:2  },
];

const PLAYERS = [
  { name:"Scottie Scheffler", title:"World No. 1, 2024 Season", insight:"Ranked 162nd in SG:Putting when Kenyon was called in late 2023. Kenyon identified aim bias to the right, dominant right hand 'radial release', wayward heel strikes and layered compensations. Changes: wider stance, straightened alignment, torso repositioning, hands raised at setup. Switched to TaylorMade Spider Tour X mallet.", change:"162nd → 22nd in SG:Putting | 9 wins + Masters in 2024" },
  { name:"Rory McIlroy",      title:"4× Major Champion",        insight:"Kenyon worked with Rory on simplifying an overworked technical process. The coaching focused on delivering clear mental cues rather than complex mechanics — translating technical understanding into a single feel cue for execution. Rory describes the process as 'earning the right to simplicity.'", change:"Consistent top-10 SG:Putting in peak seasons" },
  { name:"Brooks Koepka",     title:"5× Major Champion",        insight:"Kenyon helped Koepka understand his natural arc and match it to his putter specs. A key change was removing excessive conscious thought during the stroke — Brooks' process became simpler, more athletic, less manufactured. His best putting performances correlate directly with this shift to unconscious execution.", change:"2018–19: Two consecutive US Open titles" },
  { name:"Patrick Cantlay",   title:"Approach Putt Leader",     insight:"Kenyon student and one of the most technically consistent putters on tour. Cantlay leads the PGA Tour in Approach Putt Performance (avg. 1'10\" proximity after first putt from distance). His pace control work under Kenyon is considered among the most refined on tour.", change:"#1 Approach Putt Performance 2025–26" },
  { name:"Tommy Fleetwood",   title:"Ryder Cup Points Machine", insight:"Fleetwood's putting transformation under Kenyon centred on green reading and pace. His ability to read complex breaks and commit fully — without second-guessing — became a foundation of his tournament consistency. Kenyon describes Tommy as a 'model student of process.'", change:"Multiple DP World Tour titles and Ryder Cup hero" },
  { name:"Max Homa",          title:"6× PGA Tour Winner",       insight:"Described Kenyon as 'the most knowledgeable person I've ever talked to about putting.' Homa's work focused on pre-putt routine consistency and start line. His improvement in clutch putting situations — historically a weakness — coincided directly with Kenyon's intervention.", change:"Multiple wins post-Kenyon. Career-best SG:Putting periods" },
];

const MODULES = [
  {
    num:"01", title:"The Science of Setup & Alignment", tag:"Mechanics — Foundation",
    intro:"Most missed putts are decided before the stroke begins. Setup is the great equaliser — it does not require athleticism or talent. It requires attention, repetition, and honest self-assessment. Get it wrong and no amount of technical refinement downstream can save you.",
    sections:[
      { title:"Why Perception Defeats Reality", body:"The single most consistent finding across thousands of Kenyon student fittings: amateur golfers believe they are square when they are not. The visual system is poorly designed for precise alignment. We anchor to the target we see most clearly — the hole — and our brain fills in the rest. Research by optician and golf scientist Dr. Craig Farnsworth shows that even skilled amateurs carry 3–5° of shoulder misalignment on average. Over a 10-foot putt, 1° of shoulder misalignment redirects the stroke 2 inches offline at the cup. You are not missing because your stroke is broken. You are missing because your body is aimed 6 feet left of where you think it is." },
      { title:"Eye Position — The Most Critical Variable", body:"Eyes must be directly over the ball or fractionally inside the target line — never outside it. When eyes are outside the ball, the target appears left of its true position, producing systematic pulls. The test is simple: address a ball, hold a second ball against the bridge of your nose, drop it. On the ball = perfect. Inside 2 inches = acceptable. Outside the ball = critical fault requiring correction before anything else." },
      { title:"Shoulder Alignment — The Engine Room", body:"Kenyon worked with Scottie Scheffler specifically on shoulder alignment — noticing that Scheffler's right hand position was causing him to aim his shoulders left as a compensation for a face that aimed right. These compensating errors stack. Even Scheffler — the best ball striker since Tiger — was putting with a stack of mutually cancelling errors that became catastrophic under pressure. Shoulders parallel to the target line. This is non-negotiable." },
      { title:"Grip: Passive Hands, Active Arms", body:"Grip pressure should sit at 4–5 out of 10. The hands are passive controllers — they transmit force without generating it. The moment hands become active movers of the putter, face angle at impact becomes unreliable. Kenyon noticed Scheffler's right hand was 'sitting more on top of the grip' and taking over through impact — a fault he sees in thousands of amateurs. The grip should feel like you are holding a baby bird: enough pressure to feel it, not enough to restrict its movement." },
      { title:"Ball Position, Posture & The Triangle", body:"Ball position forward of centre promotes a slightly ascending strike, creating immediate end-over-end roll rather than backspin. Posture should allow the arms to hang freely under the shoulders, forming a triangle between shoulders, forearms and hands. This triangle should remain intact throughout the stroke. Any collapse of the triangle introduces wrist action and destroys consistency. PGA Tour research shows that players with 'intact triangle' mechanics have 34% higher start line accuracy than those who break the triangle at any point." },
    ],
    drills:[
      { name:"Mirror Alignment Test", diff:"beginner", body:"Set a putting mirror or use a phone propped behind the ball. Address normally. Note where your eyes fall relative to the target line. Mark the correct position. Practise until eye position is a reflex — 50 reps daily for 2 weeks.", metric:"Target: Eyes on or inside ball, 45/50 sessions" },
      { name:"Alignment Rod Square Check", diff:"beginner", body:"Lay a rod along your toe line. Step back, photograph from directly behind. Measure your shoulder angle vs. the rod. Even 3° of open shoulders redirects your stroke into a systematic pull. Correct and repeat until confirmed square on 10 consecutive setups.", metric:"Target: ≤2° shoulder deviation on video check" },
      { name:"Grip Pressure Calibration", diff:"beginner", body:"Squeeze to 10/10 — feel the tension creep up your forearms. Release to 2/10 — feel the putter become almost uncontrollable. Find 4–5/10: present, calm, soft. Hit 20 putts logging whether the grip feels tighter or softer than target.", metric:"Target: Consistent 4–5/10 reported for 20/20 putts" },
      { name:"Ball Drop Eye Test", diff:"beginner", body:"Set up normally. Hold a second ball at nose bridge, release. Where it lands: on the ball = pass. Outside the ball = fail (fix putter length / posture). Repeat 10 times per session until you pass every time.", metric:"Target: On-ball landing on 9/10 attempts" },
      { name:"Triangle Maintenance Drill", diff:"intermediate", body:"Set up without a ball. Cross your wrists at your chest. Feel your shoulder movement drive the putter without hands breaking the wrist angle. Now putt 20 balls with a rubber band around your forearms below the elbows — any wrist break snaps the band.", metric:"Target: Zero band breaks over 20 consecutive strokes" },
    ],
    games:[
      { name:"The Setup Challenge", tag:"Solo Competition", body:"Set up to 20 putts. Award yourself 1 point for correct eye position, 1 for square shoulders, 1 for correct grip pressure, 1 for correct ball position. Maximum 80 points total.", rules:["Perfect setup = 4 points", "One error = 2 points", "Two or more errors = 0 points", "Target: 70+ points before progressing to Module 2"] },
    ]
  },
  {
    num:"02", title:"Stroke Mechanics & Face Control", tag:"Mechanics — Core",
    intro:"85% of a putt's starting direction is determined by face angle at impact — not path. This is the most important number in all of putting. A face 1° open at impact on a 10-foot putt sends the ball 2 inches right of the cup. At 20 feet, you miss completely. Everything in this module serves one goal: a square face, delivered consistently.",
    sections:[
      { title:"The 85/15 Rule — Face Beats Path", body:"Research by Dr. Dave Pelz and validated by PGA Tour ShotLink data establishes unambiguously that face angle at impact accounts for approximately 85% of the ball's starting direction. Path contributes roughly 15%. Yet most golfers spend 90% of their mechanical practice thinking about path and arc. This is the wrong priority. Fix the face first. Always." },
      { title:"Arc vs. Straight: Your Stroke Is Personal", body:"There is no correct stroke shape. Physics dictates that on an inclined plane, the club head will arc. The degree of arc is determined by your posture — more upright creates a straighter path, more bent-over creates a stronger arc. Neither is wrong. What matters is that your stroke is internally consistent — it does not change shape under pressure — and that your putter matches your natural arc. Kenyon's genius is understanding this: he does not impose a style. He identifies your style and optimises it." },
      { title:"The Deceleration Myth — Debunked", body:"Tour player analysis via SAM PuttLab technology reveals a consistent finding: the best putters in the world do not 'accelerate through impact.' Peak acceleration occurs at the end of the backstroke, transitioning smoothly through impact. Some elite putters show slight deceleration at the ball. The source of this myth — 'don't decelerate' — was a reaction to amateur golfers who decelerate catastrophically on short putts from fear. The correction was never 'accelerate aggressively' — it was 'commit to a smooth, metronomic tempo.' Tempo stays constant. Length changes. Speed does not." },
      { title:"Heel, Toe, Centre — Impact Patterns", body:"Scheffler exhibited 'lots of wayward heel strikes' before working with Kenyon — a direct consequence of his misaligned shoulder compensation. Impact pattern directly influences the ball's exit angle due to gear effect. Centre-face contact with ±2mm tolerance is the standard for elite putting. Testing with impact tape reveals patterns that no other diagnostic can — players are consistently shocked by where they actually strike the ball." },
      { title:"The Pendulum and the Still Axis", body:"The stroke revolves around a still axis point — typically the sternum. Any lateral sway of the body moves the arc off its arc, changing impact point on the face and redirecting the ball. Kenyon works extensively on body stillness, particularly head movement. Research shows that head movement of more than 5mm laterally during a 10-foot stroke correlates with 65% higher miss rate on start line delivery." },
    ],
    drills:[
      { name:"Gate Drill (Face Training)", diff:"beginner", body:"Two tees 5cm apart, 14 inches ahead of ball on start line. Roll putts through the gate. If you miss, your face is off — not your aim. Start at 3 feet straight. Build to 8 feet. This is the most important drill in putting. Do it daily.", metric:"Target: 80%+ gate success at 8 feet over 30 attempts" },
      { name:"Coin on Putter (Tempo)", diff:"intermediate", body:"Balance a 10p coin on the back of your putter head. Make your stroke. If the coin falls on the backstroke, you jerked. If it falls sharply through impact, you over-accelerated. The coin should stay through a smooth backswing and release naturally at transition. Spend 10 minutes daily for 3 weeks.", metric:"Target: Coin stays for full backswing on 15/20 attempts" },
      { name:"Impact Tape Test", diff:"beginner", body:"Apply impact tape or chalk dust to putter face. Strike 10 balls. Photograph the impact pattern. Elite: cluster within 4mm of centre. Club player average: 10–15mm spread. Identify whether you are heel or toe biased and diagnose with setup — usually a posture or lie angle issue.", metric:"Target: All 10 impacts within 6mm of geometric centre" },
      { name:"Shadow Drill (Body Stillness)", diff:"beginner", body:"Stand in bright light so your shadow falls on the ground. Make your stroke. Watch the head shadow. Any lateral movement = body sway = inconsistent impact. Work until the shadow of your head is completely stationary through the full stroke. 20 reps daily.", metric:"Target: Zero visible head movement on video from 5 feet distance" },
      { name:"Metronome Training", diff:"intermediate", body:"Set a metronome (app) to 70–76 BPM. Make your backswing on the first click, impact on the second. The ratio of backstroke length to through-stroke length should be 1:1.2 — slightly longer through side. At 76 BPM this forces a metronomic, unhurried tempo identical to tour players measured via SAM PuttLab.", metric:"Target: 20 consecutive putts in perfect 1:1.2 ratio at 74 BPM" },
      { name:"One-Hand Drills", diff:"advanced", body:"Putt with your lead hand only for 5 minutes, then trail hand only for 5 minutes. Lead-only exposes trail hand dominance (face opens). Trail-only exposes pull tendency. Combine the feeling of both into your full grip. Used by Kenyon with McIlroy to isolate hand contributions.", metric:"Target: 10/10 gate passes with each hand separately" },
    ],
    games:[
      { name:"The 21 Game", tag:"Stroke Competition", body:"Two players, one hole, 6 feet away. Each player alternates putts. Made putt = 3 points. Hitting the hole without dropping = 1 point. Miss = 0. First to 21 wins. Highest pressure format for short putts.", rules:["Alternate from same spot", "Keep running score visible", "If tied at 21+, sudden death rule applies", "Must win by 2 clear points"] },
      { name:"Stroke Quality Bingo", tag:"Solo Training", body:"Create a 3×3 bingo card: face square at impact, centred strike, smooth tempo, still head, full follow-through, full turn, consistent grip, aligned at setup, committed stroke. Check off each as you achieve them on consecutive putts.", rules:["Must earn each square on different putts", "Blackout (all 9) = session complete", "Reset the card if you repeat an error from a previous putt", "Average time to blackout tracks session quality"] },
    ]
  },
  {
    num:"03", title:"Start Line Mastery", tag:"Precision — Priority One",
    intro:"The start line is the foundational skill — the first link in the chain. If your ball does not leave the putter on your intended line, every other skill becomes irrelevant. Fix start line first, always. Kenyon's research shows that bringing start line error from the amateur average of 2.5° to under 1° is worth 3–5 putts per round on its own.",
    sections:[
      { title:"The Perception Problem — 1° Is Everything", body:"On a 10-foot putt, 1° of start line error sends the ball 2.1 inches offline at the cup. The PGA Tour average start line error is 0.7°. The average club golfer shows 2.4–3.8°. The gap sounds small. The difference in results is enormous. A 1° improvement in start line accuracy, with everything else equal, converts approximately 3 additional putts per 18 holes into makes — without changing a single other thing." },
      { title:"Two Skills, One Goal: Aim vs. Delivery", body:"Most golfers think of start line as a single skill. It is two separate skills: (1) Aim Accuracy — can you align your putter face to your intended target? (2) Delivery Accuracy — can you deliver the face square to where you aimed? A golfer can aim accurately and miss the gate (delivery problem). Or aim inaccurately but compensate and hit the gate (perception problem). Each requires a completely different solution. This module tests both separately." },
      { title:"The Four Sources of Start Line Error", body:"Start line error enters the system at four points: (1) Aim error at setup — the face is not pointing where you think. (2) Path error — the putter travels on a path that redirects the ball. (3) Face angle change at impact — the hands actively change the face during the stroke. (4) Impact location — heel/toe strikes redirect the ball via gear effect. Identifying which source dominates for you is the first job of this module." },
    ],
    drills:[
      { name:"String Line Baseline Test", diff:"beginner", body:"Tie a string from ball to hole on a 10-foot straight putt. Putt 20 balls — count how many start on the string (within 1cm). Record the score. This is your start line baseline.", metric:"Elite: 17+/20 | Club avg: 11–14/20 | Retest every 2 weeks" },
      { name:"Perception vs. Delivery Separation", diff:"intermediate", body:"Test 1: Gate without string (delivery only). Test 2: Gate WITH string (delivery + aim check). Gap between scores = perception error. If Gate+String >> Gate alone, your aim is the problem. If similar, mechanics are the problem. Completely different fixes for each.", metric:"Target: Less than 2 putts gap between the two tests" },
      { name:"100-Foot Challenge", diff:"advanced", body:"Accumulate 100 feet of made putts. 10 × 10-footers, or any combination. The catch: any miss resets your total to zero. The pressure of 'protecting your footage' at 70+ feet is extraordinarily realistic and reveals exactly how your start line behaves under accumulated stakes.", metric:"Target: Complete in under 25 attempts" },
      { name:"The Ruler Drill", diff:"beginner", body:"Lay a 30cm ruler on the green with the ball at one end. The ruler acts as a path guide. Roll putts along the ruler length, keeping the putter above the ruler without deviating. Forces on-arc delivery and exposes path errors instantly.", metric:"Target: 15/15 putts staying above ruler without deviation" },
      { name:"Blind Gate", diff:"advanced", body:"Set the gate at your intended start line. Close your eyes once you've started your stroke. Don't check until after impact. This removes visual correction mid-stroke — the single most common cause of path deviation in anxious putters. Your body fixes what your eyes started to question.", metric:"Target: 70%+ blind gate success at 6 feet" },
    ],
    games:[
      { name:"The Clock Game", tag:"Accuracy Challenge", body:"Place 12 balls around a hole at 4 feet, equally spaced like a clock face. Start at 12 o'clock. You must make all 12 consecutively. Miss = start over from 12.", rules:["All 12 must be made in sequence, no exceptions", "Record your best consecutive run each session", "Move to 5 feet when you consistently reach 12/12", "At 6 feet this becomes one of the hardest drills in golf"] },
      { name:"The Pressure 18", tag:"Round Simulation", body:"Play 18 'holes' — each hole is a different start line challenge. 6 holes from 3 feet straight, 6 from 5 feet with break, 6 from 8 feet with varying breaks. Score like a golf round: made putt = birdie (1), first-putt miss made on second = par (2), anything else = bogey+.", rules:["Track total 'strokes' for the 18-hole round", "Target score: under 22 (approximately 4-under)", "PGA Tour equivalent: approximately 18–19", "Club player average: approximately 28–32"] },
    ]
  },
  {
    num:"04", title:"Pace Control & Distance Mastery", tag:"Feel — The Three-Putt Eliminator",
    intro:"Three-putts are almost universally caused by pace failure on the first putt — not bad reads, not poor mechanics. A first putt from 30 feet that stops within 2 feet of the hole makes the second putt a near-certainty. The same putt hit 6 feet past gives you a nervous knee-knocker. Eliminate pace failure and your handicap drops immediately.",
    sections:[
      { title:"The Three-Putt Epidemic — By The Numbers", body:"PGA Tour pros three-putt only 0.51 times per round. Scratch golfers three-putt once every 36 holes. 10-handicaps: once every 17 holes. 15-handicaps: once every 9 holes. 20-handicaps: two or more per round on average (Arccos/Shotscope data). For a 15-handicap playing 18 holes, eliminating 50% of their three-putts reduces their score by an average of 1.5 strokes per round immediately — before improving a single other skill." },
      { title:"The Backswing Length System", body:"Kenyon trains a systematic approach: develop calibrated backswing lengths for distance bands, and hold tempo absolutely constant. A 6-inch backswing reliably produces X feet. A 10-inch backswing produces Y feet. The precision of this system is its power — it removes guesswork and allows for predictable adjustments on uphill/downhill terrain without changing the swing thought." },
      { title:"Dead-Zone Pace — The Optimal Speed", body:"Tour statistics confirm: putts struck with dying pace (just reaching the front of the cup) hole at a higher rate than firm-speed putts for all putts under 15 feet. The geometric explanation: a ball dying at the hole can fall in from any angle. A ball rolling firmly past can enter only through the back half of the cup, reducing the effective cup diameter by approximately 40%. Dying pace is not timid putting. It is optimal putting, confirmed by data." },
      { title:"Uphill/Downhill Modifiers", body:"Uphill putts require 10–18% more stroke length than the flat equivalent. Downhill putts require 20–35% less. Severe downhill putts (stimp 13+, 3%+ slope) on fast greens demand creative solutions: landing the ball short and rolling in, or playing far outside to straighten the break. Developing a clear mental modifier system — 'this is a 30-foot uphill so I stroke it like a 35-footer' — eliminates the most catastrophic pace errors." },
    ],
    drills:[
      { name:"Backswing Band Calibration", diff:"beginner", body:"Flat green only. Mark three backswing lengths: 6, 10, 14 inches. Putt 10 balls with each length, constant tempo, record average distance. These are your personal distance bands. Recalibrate monthly and when conditions change significantly.", metric:"Document your 3 bands — refer to them before every lag putt" },
      { name:"No-Hole Lag Drill", diff:"intermediate", body:"Remove the hole as a target entirely. Pick 4 spots at 25, 35, 45, and 55 feet. Putt to stop within 3 feet of the spot — no cup. Without the visual anchor of a hole, the brain computes pure distance. This alone improves lag pace by an average of 28% (teaching pro data, Arccos verified).", metric:"Target: 8/10 stopping within 3 feet at 40+ feet" },
      { name:"Slope Ladder", diff:"intermediate", body:"Find a sloping section of green. Mark 5ft, 10ft, 15ft from hole uphill AND downhill. Alternate one uphill/one downhill for all three distances. Goal: finish within 18 inches of the hole every time. Track percentage. This drill directly replicates the pace-adjustment demands of every real round.", metric:"Target: 70%+ within 18 inches across all distances and slopes" },
      { name:"Pace Only Challenge", diff:"beginner", body:"From 20 feet, putt 10 balls to an empty cup. Award 3 points if the ball stops within 6 inches of the hole. 1 point if within 18 inches. 0 if outside. Maximum 30 points. Do from multiple distances to build a full pace library.", metric:"Target: 22+ points from 20 feet; 18+ from 30 feet" },
      { name:"Speed Gradient Drill", diff:"advanced", body:"On the same 20-foot uphill/downhill sequence, deliberately putt 3 balls at dying pace, 3 at moderate pace, 3 at firm pace. Observe both: (1) the different lines each pace requires, and (2) which pace offers the most consistency. Most players find dying pace has 40% lower miss distance on average.", metric:"Compare average miss distance across three speeds — record findings" },
    ],
    games:[
      { name:"Lag Golf — The Course Game", tag:"Round Simulation", body:"On the putting green, create an 18-hole 'course' using different holes at varying distances (minimum 25 feet). Play 18 holes. You have unlimited putts to hole out. Count every putt. Target: no three-putts across 18 holes. Score like putting average per hole.", rules:["Every hole minimum 25 feet from tee position", "No 'gimmes' — hole out every putt", "Target: 36 total putts (2.0 per hole average)", "Tour standard: 34–35 for 18 holes from these distances"] },
      { name:"The Distance Dial", tag:"Feel Training", body:"A partner (or yourself using marks) calls out a random distance between 10 and 60 feet. You have 5 seconds to find your backswing length and execute. Score: on-demand distance estimation and delivery.", rules:["Randomly called distances only — no pre-planning", "Putt stops within 3 feet = 2 points", "Within 5 feet = 1 point", "First to 20 points wins in head-to-head version"] },
    ]
  },
  {
    num:"05", title:"Green Reading — The Competitive Edge", tag:"Skill — The Separator",
    intro:"The world's best readers of greens can gain 1–2 strokes per round over the field purely through superior read accuracy, independent of mechanics. This is not a talent. It is a trained system. The same system used on tour — including AimPoint Express — is taught in full here.",
    sections:[
      { title:"The Under-Read Bias — Why We All Miss Wrong", body:"Research by Dr. Mark Swash and subsequent studies confirm that amateur golfers systematically under-read putts. The visual system anchors to the hole as a target — we see the straight line between ball and hole as the dominant path, even when the slope clearly dictates otherwise. This bias causes the universal miss pattern: right-edge lipouts. Overcorrect your read by 20% and you will be closer to accurate. This is not a permanent fix — it is the first step of recalibrating your perception." },
      { title:"AimPoint Express — The Framework", body:"AimPoint Express is a feel-based slope reading system built on physical measurement. You stand on the lowest side of the break, feel the slope under your feet, and assign a number 1–4 based on slope degree. You then use that number to position your finger from the centre of the hole — this is your aimpoint. Studies of AimPoint-trained golfers show a 31% improvement in read accuracy over untrained readers at equal skill levels. Kenyon is an accredited instructor; this system is central to the academy." },
      { title:"The Three Variables — Speed, Slope, Distance", body:"Every putt is a simultaneous equation with three variables: slope angle (how much it breaks), green speed (how much the slope is amplified), and distance (how long the ball is subject to those forces). Masters-level green reading involves solving all three simultaneously, before committing to a single line and single pace. Changing pace after committing to a line — or changing line after committing to pace — produces inconsistency. Both variables must be committed simultaneously." },
      { title:"Grain — The Hidden Variable", body:"Bermuda grass greens (common in the southeastern US, Caribbean, and parts of Asia) carry grain that amplifies or reduces the effect of slope. Grain with the slope: amplify break by 15–25%. Grain against slope: reduce break by 10–20%. Grain identification: shiny grass in the direction the grain runs, dull going against. The grain grows generally toward water (or west, toward sunset). Grain also affects pace: into-grain putts need 15–25% more length; with-grain putts need 10–20% less." },
      { title:"The Low-Side Walk", body:"Tour professionals spend significantly more time reading the low side of a putt than the high side. This is not incidental — the low side reveals true slope direction, shows how the ball will accelerate as it falls off the break, and reveals the critical last 3 feet of trajectory into the hole. Research on eye-tracking data from tour players shows 65% of total read time is spent below the hole. Most amateurs read exclusively from behind the ball." },
    ],
    drills:[
      { name:"Read & Predict Challenge", diff:"beginner", body:"On 10 different breaking putts (15 feet), place a tee where you think the ball will start — your predicted start line. Putt. Measure the gap between your predicted start tee and actual start line. Average deviation is your read accuracy baseline.", metric:"Tour calibre: <1.5 inches avg deviation | Club avg: 4–6 inches" },
      { name:"Slope Feel Calibration", diff:"intermediate", body:"Walk to 20 different spots on the putting green. Feel the slope under your feet — no visual reference. Assign a number 1–4. Then use a smartphone level or lie meter to confirm. Track your accuracy. This trains the AimPoint Express kinesthetic sense.", metric:"Target: Correct number within 1 unit, 80% of time" },
      { name:"Speed-Break Separation Drill", diff:"intermediate", body:"On the same breaking putt, hit 3 at dying pace, 3 at moderate, 3 at firm. Record the different aimpoints needed for each speed. This builds the understanding that pace and line are inseparable variables — you cannot choose a line without first committing to a pace.", metric:"Document 3 aimpoint positions for 3 speeds on 5 different putts" },
      { name:"The Low-Side Read Drill", diff:"beginner", body:"On every putt in practice rounds, deliberately walk to the low side of the hole before reading. Spend 60% of your read time there. Note what you see that you would have missed from behind the ball. Journal your observations for 4 weeks.", metric:"Target: Habitual low-side read in every pre-putt routine" },
      { name:"The Grain Grid", diff:"advanced", body:"On Bermuda greens, identify 10 different grain directions using shiny vs. dull test. For each, predict whether the break is amplified or reduced. Test by putting the same putt with and without accounting for grain. Measure actual break difference.", metric:"Target: Correct grain identification 8/10 attempts" },
    ],
    games:[
      { name:"The Green Reading Wars", tag:"Head-to-Head", body:"Two players, same hole, same 15-foot breaking putt. Both read the green independently. Before putting, reveal your predicted start line using a finger point. Points: 1 for better read than opponent, 2 for holing it. The read prediction earns points whether or not the putt drops.", rules:["Reveal reads simultaneously before either putts", "Read accuracy judged by measuring start line after putt", "Playing 9 different holes of varying breaks", "First to 10 points wins"] },
      { name:"The AimPoint Speed Run", tag:"Skill Building", body:"Set 12 balls around 4 different holes (3 per hole) at 15 feet with varying slopes. For each putt, you have 30 seconds to complete your AimPoint Express read and putt. Score: made putt = 3, within 18 inches = 1.", rules:["30-second clock enforced strictly", "AimPoint method must be used — visible finger placement required", "Track made percentage and average proximity", "Target: 6+ made out of 12; all 12 inside 3 feet"] },
    ]
  },
  {
    num:"06", title:"The Mental Game & Pre-Putt Routine", tag:"Psychology — The Multiplier",
    intro:"A technically flawless putter who collapses under pressure will always underperform their ability. A mentally bulletproof putter with average mechanics will always outperform their technical ceiling. The mental game is not something you have or don't have. It is trained, exactly like mechanics. Exactly like this module teaches.",
    sections:[
      { title:"The Routine Is Neuroscience, Not Ritual", body:"A pre-putt routine is not superstition. It is neurological engineering. Research establishes that a consistent pre-putt routine activates 'chunked' motor programs stored in the basal ganglia — the brain's motor skill repository. When the routine begins, it triggers stored sequences that execute as single units rather than individual conscious decisions. A study of professional golfers showed 87% of successful shots followed their complete routine; only 43% of poor shots did. Jordan Spieth's routine — walk-around read, foot-wiggle, handle-tilt, blackout execution — is not quirky habit. It is a precise neurological trigger sequence." },
      { title:"Process Over Outcome — The Most Important Shift", body:"You have zero control over whether the ball goes in the hole. You have complete control over your process. Measuring yourself on outcomes that you do not control is a reliable path to frustration, inconsistency, and lost confidence. Measuring yourself only on process — did I execute my routine? did I commit? did I read properly? — gives you a controllable metric. A perfectly executed putt that lips out is a success. A made putt struck with a tentative, uncommitted stroke is not." },
      { title:"The Quiet Eye — Research-Validated Elite Behaviour", body:"Dr. Joan Vickers (University of Calgary) identified the 'Quiet Eye' phenomenon: elite performers fix their gaze on the ball (for putts) for a final 3–5 second dwell period before initiating the stroke — significantly longer than non-elite performers. The dwell period suppresses competing neural activity and programmes the motor system more precisely. Golfers trained specifically in Quiet Eye techniques showed 18–23% improvement in start line accuracy in controlled trials. Your final look at the ball before the stroke should be still, held, committed — not a rushed glance." },
      { title:"Anxiety Is Excitement — The Harvard Reframe", body:"Harvard Business School research by Dr. Alison Wood Brooks demonstrates that reframing anxiety as excitement ('I am excited') significantly outperforms calming strategies ('I am calm') in performance accuracy. The physiological states are nearly identical — elevated heart rate, heightened alertness, heightened muscular readiness. The only difference is the narrative. In golf terms: the 5-foot putt to win the match is not terrifying. It is the exact putt you came to the course to practise for. That framing is not delusion. It is optimised neuroscience." },
      { title:"The Commitment Line — No Retreat", body:"The moment you begin to build your stance, you have crossed the commitment line. After this point there is no more analysis, no second-guessing, no plan B. The decision is made. Players who cross the commitment line and then second-guess mid-stroke produce the worst possible outcome: a physical execution of mental conflict. If genuine doubt strikes before you cross the commitment line — reset. Step back. Read again. Start fresh. 20 extra seconds now is worth 4 shots over 18 holes." },
      { title:"The 10-Step Reset Protocol", body:"After every putt — made or missed — your job is to reset to emotional neutral within 10 steps. Not 30. Not at the next tee box. 10 steps. Kenyon works with players on a physical reset cue — a specific breath, a tap, a single word ('next') — that physically triggers the transition. This prevents emotional cascade: the missed 14 putt bleeding into the 15 setup. Each putt is its own event. In practice, the 10-step reset is rehearsed thousands of times until it fires automatically under any competitive pressure." },
    ],
    drills:[
      { name:"Routine Stopwatch Test", diff:"beginner", body:"Time your pre-putt routine on 20 consecutive putts. Target: 18–32 seconds each time. Standard deviation under 3 seconds. Significant variation reveals where emotional state is disrupting process. A routine that compresses under pressure is the single clearest sign of anxiety hijacking your process.", metric:"Target: Mean 22–28s, standard deviation <3s across 20 putts" },
      { name:"The Pressure Grid", diff:"intermediate", body:"9 balls, 3-foot circle around one hole. Make all 9 in a row. Miss = restart from zero. Track how many attempts to complete. Most players find putts 6–9 become deeply uncomfortable — this discomfort is precisely what you are training to tolerate. Run this drill at the start of every session.", metric:"Target: Complete in ≤3 attempts; note maximum consecutive streak" },
      { name:"Quiet Eye Training", diff:"intermediate", body:"For 20 putts, deliberately hold your final look at the ball for 3 slow seconds before starting the stroke. Do not look at the hole after this final fixation. Feel the stillness. The first few putts will feel unnaturally slow. After 15 attempts, it becomes natural. This directly replicates the Quiet Eye pattern measured in elite putters.", metric:"Track: did the putt feel more committed? Note yes/no for 20 putts" },
      { name:"Verbalised Routine Drill", diff:"beginner", body:"For 4 weeks, speak your routine out loud on every practice putt: 'I am reading right-to-left 2 inches at 20 feet. I am committing to this line. I am committed to dying pace. I am starting my routine.' Verbalisation forces genuine cognitive engagement rather than mechanical repetition.", metric:"4-week protocol — complete before dropping to internal process" },
      { name:"Distraction Immunity Drill", diff:"advanced", body:"Have a partner attempt to distract you during your routine — talking, moving, dropping objects. You must complete your routine without restart more than twice per 20 attempts. If you are broken, you reset completely and start the routine from the beginning. This builds the mental compartmentalisation needed for crowd noise and partner movement on tour.", metric:"Target: Complete routine without disruption on 15/20 attempts" },
      { name:"The 10-Step Reset Walk", diff:"beginner", body:"After every missed practice putt, immediately walk exactly 10 steps away. Stop. One slow exhale. Return. Begin the next putt as if the previous one never existed. This physical ritual is trained here so it fires automatically on the course without conscious thought.", metric:"Protocol: mandatory after every missed putt for 8 weeks" },
    ],
    games:[
      { name:"The Survivor Series", tag:"Pressure Championship", body:"3 to 5 players. Each player has 3 lives. Play 18 'holes' on the putting green (varying distances 4–15 feet). Miss a putt = lose a life. First player to lose all 3 lives is eliminated. Survivor wins.", rules:["All players putt the same hole simultaneously", "Distances pre-set each round by the host", "Eliminated players must caddie for remaining players", "Final survivor earns a point for the week's series record"] },
      { name:"Money Ball Tournament", tag:"Pressure Simulation", body:"Each player places a nominal bet on each putt (pennies work fine). The stakes — however small — activate the same neurological pressure response as real competition. The awareness that missing has a 'cost' is neurologically sufficient to trigger competitive pressure.", rules:["Agree on minimum stake per putt before starting", "Closest to the hole collects all stakes on each hole", "Made putt wins double the pot", "Track who is ahead over 9 holes — settling score at the end"] },
    ]
  },
  {
    num:"07", title:"Equipment Fitting & Putter Optimisation", tag:"Equipment — The Force Multiplier",
    intro:"The wrong putter makes the correct stroke nearly impossible. The right putter makes a marginal stroke significantly more consistent. This is not marketing — it is geometry and biomechanics. Kenyon identified Scheffler's putter as a central part of his system change — a shift to the TaylorMade Spider Tour X that Scheffler aimed better than his previous blade. The result followed immediately.",
    sections:[
      { title:"The Three Variables That Actually Matter", body:"Face balance vs. toe hang matches your arc to your putter's natural geometry. Loft controls how the ball leaves the face (too much = hop/backspin, too little = dive into turf). Length controls your posture and consequently your eye position and arm hang. These three variables are non-negotiable fitting elements. All others — insert material, aesthetics, feel — affect confidence and rhythm, which in turn affect performance. They matter secondarily. Start with physics." },
      { title:"Face Balance vs. Toe Hang — The Arc Match", body:"A face-balanced putter (face points skyward when balanced on a finger at the shaft mid-point) returns naturally to square during a straight-path stroke. A toe-hang putter (face rotates toward ground when balanced) returns naturally to square during an arc stroke. Using the wrong type for your stroke type means manually compensating for the putter's natural geometry on every stroke. Kenyon measures stroke arc first, then matches putter type accordingly — not the other way around." },
      { title:"Dynamic Loft — The Overlooked Variable", body:"Static putter loft is typically 3–4°. At impact, forward shaft lean reduces dynamic loft; an ascending arc increases it. Most club golfers have dynamic loft either near zero (creates backspin and hop) or above 6° (creates excessive jump). SAM PuttLab and Quintic Ball Roll technology measures dynamic loft at impact. End-over-end roll should begin within 8–10 inches of impact on a properly fitted putter. Roll quality is the most direct measure of whether your loft, angle of attack and putter are optimally matched." },
      { title:"The Scheffler Equipment Story", body:"When Kenyon worked with Scheffler, the alignment line on his ball was actively working against him — it pointed somewhere different from where his putter aimed. The new TaylorMade Spider Tour X with its white insert and thin black alignment marking allowed Scheffler to aim equally well with no ball line at all — eliminating an entire source of misalignment anxiety. He described it as being 'freed up.' The right equipment removes a problem rather than solving it. That is the standard." },
      { title:"Weight, Length, Lie Angle", body:"Standard putter length (33–35 inches) was designed for average body proportions. Most golfers benefit from a putter 1–2 inches shorter than stock — getting the eyes over the ball and arms hanging freely. Lie angle determines whether the toe sits up or digs at address — a toe-up lie causes the face to point right; a toe-down lie points it left. Swing weight affects tempo: heavier heads encourage smoother swings (reduces manipulation); lighter heads give more feel on short putts but can cause instability on long ones." },
    ],
    drills:[
      { name:"Face Balance Self-Test", diff:"beginner", body:"Hold your putter loosely by the shaft in two fingers at the grip end. Note the angle the face settles. Face pointing straight up = face balanced. Face rotating to point downward = toe hang. Degree of rotation indicates arc strength needed. If this conflicts with your natural stroke, you have a putter-stroke mismatch.", metric:"Document: face-balanced / slight toe-hang / strong toe-hang" },
      { name:"Eye Position Check", diff:"beginner", body:"Set up normally. Hold a second ball at nose bridge, drop it. On the ball = correct. Inside 2 inches = acceptable. Outside the ball = putter too short or posture too upright. This is the fastest single diagnostic of putter length fit.", metric:"Target: ball lands on or inside address ball on 9/10 drops" },
      { name:"Roll Quality Test", diff:"beginner", body:"Mark a horizontal line across a practice ball. Putt the ball. Watch the line as it rolls. If the line wobbles immediately = high sidespin, face delivery problem or excessive loft. If the line shows rapid end-over-end roll within 10 inches of impact = optimal dynamic loft and face delivery.", metric:"Target: end-over-end roll within 10 inches, 8/10 putts" },
      { name:"Aim Test (5 Putter Types)", diff:"intermediate", body:"Borrow or demo 5 different putters covering the range from blade to mallet. Aim each to a 10-foot target using your normal aim process. Photograph from directly behind each time. Compare aim accuracy across putters without putting. Most golfers aim one style significantly better. This is your starting point.", metric:"Document: which putter you consistently aimed most accurately" },
    ],
  },
];

const PSYCH_CONTENT = [
  {
    cat:"Neuroscience", title:"Why Conscious Thought Destroys Motor Performance",
    body:[
      "The cerebral cortex — responsible for analytical thought — is not designed for skilled motor execution under competition conditions. The cerebellum and basal ganglia handle skilled movement patterns. When you consciously think about your stroke mechanics during execution, you are activating the wrong neural architecture entirely.",
      "Dr. Gabriele Wulf's research at UNLV (the OPTIMAL theory of motor learning) demonstrates that an <strong>external focus of attention</strong> (thinking about the ball's path, or the target) produces superior performance to <strong>internal focus</strong> (thinking about your hands, your stroke, your body). Golfers instructed to focus externally show 23–31% lower stroke variability in putting accuracy compared to internally focused golfers.",
      "The practical implication is profound: <em>the harder you try to control your stroke consciously during execution, the worse it gets</em>. Your practice builds the program. Your execution runs it. These must be kept completely separate.",
    ],
    insight:"During execution, think only of the target or the ball's path. Any mechanical thought after you cross the commitment line is a distraction from the program that your practice has already installed."
  },
  {
    cat:"Flow Psychology", title:"The Quiet Eye & Elite Visual Strategy",
    body:[
      "Dr. Joan Vickers (University of Calgary) studied the gaze behaviour of elite and novice putters using eye-tracking technology. The defining characteristic of elite performance was a final 'Quiet Eye' fixation — a still, sustained gaze on the ball lasting 300 milliseconds or more immediately before the stroke began.",
      "Novice and anxious putters showed rapid, scanning eye movements with no stable final fixation — the gaze skipping between ball, hole and line in a pattern that reflects and amplifies cognitive anxiety. Elite putters showed the opposite: a decisive, committed final gaze that suppressed competing neural activity and programmed the motor system more precisely.",
      "<strong>In controlled training trials, golfers trained in Quiet Eye technique showed 18–23% improvement in start line accuracy.</strong> This is one of the highest-ROI interventions in all of putting coaching because it is immediately trainable and does not require any mechanical change.",
    ],
    insight:"Your final look at the ball before the stroke begins should be held, still, and deliberate — minimum 3 full seconds. This is not a delay. This is the most important 3 seconds in your putting process."
  },
  {
    cat:"Pressure Performance", title:"The Anxiety-Excitement Reframe — Evidence-Based",
    body:[
      "Harvard Business School researcher Dr. Alison Wood Brooks ran a series of controlled experiments on the relationship between anxiety, excitement and performance. Her finding: people instructed to say 'I am excited' before a high-stakes task significantly outperformed those instructed to say 'I am calm' — and dramatically outperformed those who said nothing.",
      "The physiological states of anxiety and excitement are nearly identical: elevated heart rate, heightened alertness, increased cortisol, heightened muscular readiness. The only meaningful difference is the cognitive label applied to those sensations. <em>'This situation is threatening'</em> versus <em>'This situation is an opportunity.'</em>",
      "In golf terms: the 4-foot putt to win the match produces exactly the same physiological response as a 4-foot putt you are genuinely excited to make. The sensations are data, not commands. <strong>Reframe the data.</strong> 'I am excited by this putt' activates the same neural state as performing at your best. 'I am terrified of this putt' activates the freeze response.",
    ],
    insight:"Before any high-pressure putt, internally say: 'I am excited.' Say it with conviction. Say it twice. Research shows this single intervention improves accuracy by 15–25% in high-stakes conditions."
  },
  {
    cat:"Habit Architecture", title:"Why Routines Work: The Basal Ganglia Explanation",
    body:[
      "The basal ganglia — a set of nuclei deep in the brain — is responsible for storing and executing automatic behaviour sequences called 'chunks.' When a sequence of actions is repeated consistently enough, the cortex stops directing each individual step and instead signals the basal ganglia to execute the entire chunk as a single unit.",
      "This is why a disrupted putting routine feels so physically jarring — you have interrupted the playback of a stored program mid-execution. The brain's attempt to resume involves the cortex re-engaging, which reintroduces exactly the conscious mechanical thought that destroys execution quality.",
      "<strong>A pre-putt routine must have identical sequence, identical timing, identical sensory cues every time, for months, before it achieves true automaticity.</strong> Jordan Spieth's routine — observed from behind in high-speed video — shows within 1.2 seconds of variation across hundreds of putts. This is not habit. This is trained automaticity, the product of thousands of deliberate repetitions.",
    ],
    insight:"The goal of your routine is not to feel ready. The goal is to make feeling ready completely automatic — so that the routine itself is the trigger for execution, without the requirement of conscious intent."
  },
  {
    cat:"Confidence Science", title:"Competence Creates Confidence — Not the Other Way Around",
    body:[
      "Popular sports psychology often prescribes positive thinking, affirmations, and visualising success as routes to confidence. The evidence base for this is weak. What the research shows is that <strong>durable confidence is a downstream product of demonstrated competence</strong> — specifically, of accurately remembering past successful performance.",
      "Before competitive rounds, elite golfers systematically run a 'success reel': vivid, detailed mental replays of putts they have made in pressure situations. Neuroscience confirms that recalling a successful motor performance activates the same neural circuits as actual execution — physically priming the motor system. The confidence produced has a real evidence base: <em>you are not pretending you can do it. You are remembering that you have done it.</em>",
      "This distinction matters because <strong>false confidence — built on affirmations untethered to evidence — collapses under the first adverse outcome</strong>. Evidence-based confidence withstands adversity because it has a historical foundation.",
    ],
    insight:"Before every competitive round, spend 90 seconds recalling 3 specific putts you have made in similar conditions. Not abstract confidence — specific memories. This is the scientifically validated route to genuine putting confidence."
  },
  {
    cat:"Resilience", title:"The Neuroscience of the Bounce-Back",
    body:[
      "Competitive golfers miss putts. This is not a failure of character or technique — it is statistical certainty. PGA Tour professionals miss 60% of 10-foot putts. The question is not whether you will miss. It is whether a miss on hole 14 affects the stroke on hole 15.",
      "Research on emotional cascade in athletes shows that unprocessed emotional responses to adverse outcomes occupy working memory — the limited cognitive resource required for skilled execution. A missed putt that generates unresolved emotional activity literally reduces the cognitive capacity available for the next putt's process.",
      "<strong>The 10-step reset protocol is not about suppressing emotion — it is about completing it.</strong> Allow one brief, genuine emotional response (3 seconds internally). Execute your physical reset cue. Direct attention forward: 'Next. Full process.' The protocol is trained in practice thousands of times so it fires automatically. The mistake most golfers make is trying to develop resilience cognitively. You develop it physically, through repetition, until the reset is a reflex.",
    ],
    insight:"Your reset cue must be physical — a breath, a tap, a specific word. Abstract intentions to 'move on' fail under pressure because they require cognitive resources the pressure state has already consumed."
  },
];

const PROGRAMME_PHASES = [
  {
    phase:"PHASE ONE — FOUNDATION",
    label:"Weeks 1–4",
    weeks:[
      { num:"Weeks 1–2", title:"Diagnostic & Baseline Calibration", items:[
        "Complete all 6 baseline assessments — record all scores",
        "Identify your 2 primary fault areas from assessment results",
        "Begin Module 1: Setup & Alignment — exclusively",
        "Daily: Mirror Drill + Alignment Rod Check (15 min)",
        "Establish putts gained baseline over 2 rounds",
        "Journal: note setup feel vs. confirmed alignment every session",
      ]},
      { num:"Weeks 3–4", title:"Setup Mastery & Introduction to Stroke", items:[
        "Complete Module 1 in full — all sections and drills",
        "Begin Module 2: Stroke Mechanics — sections 1–3 only",
        "Gate Drill daily — 30 attempts from 5 feet straight",
        "Impact tape test — photograph and analyse impact pattern",
        "Retest: Start Line Assessment at end of Week 4",
        "No green reading work yet — earn it by fixing foundation",
      ]},
    ]
  },
  {
    phase:"PHASE TWO — CORE SKILLS",
    label:"Weeks 5–8",
    weeks:[
      { num:"Weeks 5–6", title:"Stroke & Start Line Breakthrough", items:[
        "Complete Module 2 in full — all sections, all drills",
        "Complete Module 3: Start Line — Gate Drill to 80% at 8 feet",
        "Introduce Metronome Training — establish personal tempo",
        "Backswing Band Calibration — document your 3 bands",
        "Begin tracking: start line log and pace control log",
        "First Pressure Grid session — record baseline consecutive score",
      ]},
      { num:"Weeks 7–8", title:"Pace Mastery & Green Reading Introduction", items:[
        "Complete Module 4: Pace Control in full",
        "Begin Module 5: Green Reading — AimPoint Express foundation",
        "Slope Ladder Drill 3× per week minimum",
        "Slope Feel Calibration — 20 spots daily",
        "First full practice round with new pace system",
        "Mid-programme retest: all 6 baseline assessments. Compare to Week 1.",
      ]},
    ]
  },
  {
    phase:"PHASE THREE — PERFORMANCE INTEGRATION",
    label:"Weeks 9–12",
    weeks:[
      { num:"Weeks 9–10", title:"Mental Game & Routine Internalisation", items:[
        "Complete Module 6: Mental Game — all 6 sections",
        "Build your personal 4-phase pre-putt routine",
        "Routine Stopwatch Test — target: <3 seconds variation across 20 putts",
        "Daily: Pressure Grid + Verbalised Routine (first 2 weeks only)",
        "Apply new routine to full competitive rounds — journal outcomes",
        "Read all 6 Psychology Deep Reads — once each, one per session",
      ]},
      { num:"Weeks 11–12", title:"Equipment, Full Integration & Testing", items:[
        "Module 7: Equipment Self-Assessment — complete all fitting tests",
        "Full simulation practice: 18-hole scoring rounds on putting green",
        "Final retest: all 6 baselines — photograph and document improvements",
        "Identify top 2 priority areas for next 12-week block",
        "Set performance targets for the following season",
        "Establish your long-term maintenance schedule",
      ]},
    ]
  },
];

const ASSESSMENTS = [
  { num:"1", title:"Start Line Accuracy Test", desc:"String line from ball to hole on 10-foot straight putt. 20 putts. Count how many start within 1cm of the string. This is your primary mechanical baseline.", benchmark:"Elite: 17+/20 | Club avg: 11–14/20 | Below avg: <10/20" },
  { num:"2", title:"Pace Control (Proximity) Test", desc:"10 putts each from 20ft, 30ft, and 40ft. Count how many finish within 2 feet. 30 total putts.", benchmark:"Elite: 25+/30 | Good: 18–24 | Club avg: 12–17 | Below avg: <12" },
  { num:"3", title:"Short Putt Pressure Grid", desc:"9 balls in consecutive sequence around a hole at 3 feet. Count consecutive makes before a miss. Record 3 attempts; take highest consecutive run.", benchmark:"Elite: 9/9 routinely | Good: 6–8 | Club avg: 3–5 | Below avg: <3" },
  { num:"4", title:"Read Accuracy Baseline", desc:"On 5 breaking putts from 15 feet, predict your start line with a tee before putting. Measure deviation of actual start line from predicted. Average = read baseline.", benchmark:"Elite: <1.5 inches avg | Good: 2–3 inches | Club avg: 4–6 inches" },
  { num:"5", title:"Routine Consistency Test", desc:"Time your pre-putt routine on 10 consecutive putts. Record mean and range (fastest to slowest).", benchmark:"Elite: 22–28s mean, <3s range | Good: <6s range | Club avg: 8–15s range" },
  { num:"6", title:"Putts Gained Baseline", desc:"Over 3 rounds, record every putt with starting distance. Calculate putts gained vs. PGA Tour baseline (provided in tracker). This is your holistic performance starting point.", benchmark:"Scratch: ≈0 vs tour | H10: ≈ –1.5/round | H20: ≈ –3.0/round" },
];

/* ─────────────────────────── COMPONENTS ─────────────────────────── */

function ProbChart({ highlighted }) {
  const [active, setActive] = useState(null);
  return (
    <div>
      <div style={{display:"flex",gap:20,flexWrap:"wrap",marginBottom:14}}>
        {[{label:"PGA Tour",color:"#d4af5a"},{label:"Scratch",color:"#6bb85a"},{label:"10-Handicap",color:"#6aaecc"},{label:"20-Handicap",color:"#cc6a6a"}].map(l=>(
          <div key={l.label} style={{display:"flex",alignItems:"center",gap:5}}>
            <div style={{width:10,height:10,borderRadius:1,background:l.color}}/>
            <span style={{fontSize:10,color:C.textMid,letterSpacing:"0.5px"}}>{l.label}</span>
          </div>
        ))}
      </div>
      {MAKE_PROBS.map((row,i)=>(
        <div key={i} onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)}
          style={{background:active===i?"rgba(255,255,255,0.02)":"transparent",borderRadius:2,padding:"2px 0",marginBottom:3}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:10,fontFamily:"'DM Mono',monospace",color:C.textMid,width:38,flexShrink:0}}>{row.dist}</span>
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:2}}>
              {[{v:row.tour,c:"#d4af5a"},{v:row.scratch,c:"#6bb85a"},{v:row.h10,c:"#6aaecc"},{v:row.h20,c:"#cc6a6a"}].map((bar,j)=>(
                <div key={j} style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{flex:1,height:5,background:C.surface,borderRadius:3,overflow:"hidden"}}>
                    <div style={{width:`${bar.v}%`,height:"100%",background:bar.c,borderRadius:3,transition:"width 1s ease"}}/>
                  </div>
                  <span style={{fontSize:10,fontFamily:"'DM Mono',monospace",color:bar.c,width:32,textAlign:"right"}}>{bar.v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <p style={{fontSize:11,color:C.textDim,marginTop:12,lineHeight:1.6}}>
        Source: PGA Tour ShotLink data, Mark Broadie (Columbia Business School), ShotScope & Arccos aggregate amateur data
      </p>
    </div>
  );
}

function ModuleCard({ mod }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  return (
    <div className={`card${open?" gold":""}`} style={{marginBottom:12}}>
      <div className="card-num">{mod.num} — {mod.tag}</div>
      <div className="card-title">{mod.title}</div>
      <div className="card-body"><p>{mod.intro}</p></div>
      <div className="tag-row">
        <span className="tag gold-tag">{mod.drills?.length || 0} Drills</span>
        <span className="tag gold-tag">{mod.sections?.length || 0} Sections</span>
        {mod.games && <span className="tag gold-tag">{mod.games.length} Games</span>}
      </div>
      <button className="expand-btn" onClick={()=>setOpen(!open)}>
        {open ? "Collapse ▲" : "Open Full Module ▼"}
      </button>

      {open && (
        <div className="expand-content">
          {/* TABS */}
          <div style={{display:"flex",gap:4,marginBottom:20,borderBottom:`1px solid ${C.border}`,paddingBottom:0}}>
            {["content","drills","games"].filter(t=>t!=="games"||mod.games).map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)}
                style={{padding:"8px 16px",background:"none",border:"none",borderBottom:`2px solid ${activeTab===t?C.gold:"transparent"}`,
                  color:activeTab===t?C.goldHi:C.textDim,fontFamily:"'DM Sans',sans-serif",
                  fontSize:10,letterSpacing:"2px",textTransform:"uppercase",fontWeight:700,cursor:"pointer",marginBottom:"-1px"}}>
                {t==="content"?"Knowledge":t.charAt(0).toUpperCase()+t.slice(1)}
              </button>
            ))}
          </div>

          {activeTab==="content" && (
            <div>
              {mod.sections.map((s,i)=>(
                <div key={i} className="mod-section">
                  <div className="mod-section-title">{s.title}</div>
                  <div className="mod-section-body">{s.body}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab==="drills" && (
            <div className="drill-grid">
              {mod.drills.map((d,i)=>(
                <div key={i} className="drill">
                  <div className="drill-top">
                    <div className="drill-name">{d.name}</div>
                    <span className={`drill-diff diff-${d.diff}`}>{d.diff}</span>
                  </div>
                  <div className="drill-body">{d.body}</div>
                  {d.metric && <div className="drill-metric">⬝ {d.metric}</div>}
                </div>
              ))}
            </div>
          )}

          {activeTab==="games" && mod.games && (
            <div>
              {mod.games.map((g,i)=>(
                <div key={i} className="game">
                  <div className="game-header">
                    <div className="game-name">{g.name}</div>
                    <div className="game-tag">{g.tag}</div>
                  </div>
                  <div className="game-body">{g.body}</div>
                  <div className="game-rules">
                    <div className="game-rules-title">Rules & Scoring</div>
                    <ul>{g.rules.map((r,j)=><li key={j}>{r}</li>)}</ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PsychCard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="psych-card">
      <div className="psych-header" onClick={()=>setOpen(!open)}>
        <div className="psych-header-left">
          <div className="psych-cat">{item.cat}</div>
          <div className="psych-title">{item.title}</div>
        </div>
        <div className={`psych-chevron${open?" open":""}`}>▾</div>
      </div>
      {open && (
        <>
          <div className="psych-divider"/>
          <div className="psych-body">
            {item.body.map((p,i)=>(
              <p key={i} dangerouslySetInnerHTML={{__html:p}}/>
            ))}
            {item.insight && (
              <div className="psych-insight">
                <strong style={{color:C.gold,fontSize:"9px",letterSpacing:"2px",textTransform:"uppercase",display:"block",marginBottom:5}}>Academy Insight</strong>
                {item.insight}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────── MAIN APP ─────────────────────────── */
export default function App() {
  const [section, setSection] = useState("overview");
  const [probTarget, setProbTarget] = useState("h20");
  const topRef = useRef(null);

  const NAV_ITEMS = [
    {id:"overview",label:"Overview"},
    {id:"stats",   label:"Tour Stats"},
    {id:"assess",  label:"Assessment"},
    {id:"modules", label:"7 Modules"},
    {id:"games",   label:"Games"},
    {id:"programme",label:"12-Week Plan"},
    {id:"psychology",label:"Psychology"},
    {id:"fitting", label:"Fitting"},
    {id:"tracker", label:"Tracker"},
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="app" ref={topRef}>

        {/* HERO */}
        <div className="hero">
          <div className="hero-eyebrow">The Putting Solutions Academy</div>
          <h1 className="hero-title">The Complete System to Putt<br/>Like a <em>Tour Professional</em></h1>
          <p className="hero-sub">7 Modules · 40+ Drills · 12-Week Programme · PGA Tour Research · Full Psychology</p>
          <div className="hero-stats">
            {[
              {num:"90+",label:"Tour Wins"},
              {num:"6",label:"Majors"},
              {num:"22",label:"Ryder Cuppers"},
              {num:"7",label:"Modules"},
              {num:"40+",label:"Drills"},
              {num:"12",label:"Week Plan"},
            ].map(s=>(
              <div className="hero-stat" key={s.label}>
                <div className="hero-stat-num">{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="hero-rule"/>
        </div>

        {/* NAV */}
        <nav className="nav">
          {NAV_ITEMS.map(n=>(
            <button key={n.id} className={`nav-item${section===n.id?" active":""}`} onClick={()=>setSection(n.id)}>{n.label}</button>
          ))}
        </nav>

        {/* ─── OVERVIEW ─── */}
        {section==="overview" && (
          <div className="section">
            <div className="section-eyebrow">Welcome to the Academy</div>
            <h2 className="section-title">The Most Complete Putting System<br/><em>Ever Built for Club Golfers</em></h2>
            <p className="section-intro">Built on the same methodology used with Scottie Scheffler, Rory McIlroy, Brooks Koepka, Tommy Fleetwood, Justin Rose, Patrick Cantlay, Max Homa and more. Over 90 Tour wins. Six majors. The science, the philosophy, and the specific tools — now accessible to you.</p>

            <div className="quote">
              "Coaching isn't so much about what you know, but how you communicate it to others. And I don't have a Phil Kenyon method. Each player is a different puzzle I hope to solve with different solutions."
              <div className="quote-attr">Phil Kenyon — Golf Digest, 2026</div>
            </div>

            <div className="divider"/>

            <div className="section-eyebrow">The Philosophy</div>
            <div className="card gold">
              <div className="card-sub">Individual Over Method</div>
              <div className="card-title">There Is No Kenyon Method</div>
              <div className="card-body">
                <p>Kenyon's students look nothing alike on the greens. Scheffler putts differently from McIlroy. McIlroy putts differently from Koepka. There is no single 'Phil Kenyon stroke' that can be taught from a textbook, because Kenyon does not impose a stroke. He identifies what each individual does best — their natural arc, their perceptual biases, their psychological tendencies — and optimises that specific system.</p>
                <p>This academy teaches you the same framework. You will emerge from it understanding your game deeply enough to diagnose and fix your own putting across every type of green, every pressure scenario, for the rest of your golfing life.</p>
              </div>
            </div>

            <div className="card gold">
              <div className="card-sub">The Priority Hierarchy</div>
              <div className="card-title">Start Line → Pace → Reading</div>
              <div className="card-body">
                <p><strong>Start Line:</strong> 85% of starting direction is determined by face angle at impact. Fix this first. Everything else is noise until start line is reliable.</p>
                <p><strong>Pace Control:</strong> Three-putts are almost universally caused by pace failure on the first putt, not bad reads. A 30-foot putt stopping within 2 feet converts nearly every time. The same putt hit 6 feet past becomes a pressure situation.</p>
                <p><strong>Green Reading:</strong> A great read is wasted on a bad start line. A great read paired with a reliable stroke is a weapon. Earn the right to work on reading by fixing start line and pace first.</p>
              </div>
            </div>

            <div className="card gold">
              <div className="card-sub">The Scheffler Case Study</div>
              <div className="card-title">162nd to 22nd in SG:Putting — One Season</div>
              <div className="card-body">
                <p>In September 2023, Scottie Scheffler — the best ball-striker in golf since Tiger Woods — ranked 162nd in Strokes Gained: Putting on the PGA Tour and had ended the season without a major. Kenyon flew to Texas and identified a stack of compensating errors: aim bias right, right hand dominant on the grip causing a 'radial release' that changed the lie angle, shoulder compensation that aimed left, wayward heel strikes, and short-putt misery.</p>
                <p>Kenyon subtracted the compensations rather than adding corrections. Wider stance. Straightened alignment. Raised hands slightly. New putter — a TaylorMade Spider Tour X mallet that Scheffler aimed better without a ball line than his previous blade with one. He described being 'freed up.' He won nine times in 2024 including a second Masters. In 2025, he ranked 22nd in SG:Putting.</p>
              </div>
            </div>

            <div className="section-eyebrow" style={{marginTop:32}}>Tour Players Trained in This System</div>
            <div className="player-grid">
              {PLAYERS.map((p,i)=>(
                <div key={i} className="player-card">
                  <div className="player-name">{p.name}</div>
                  <div className="player-title">{p.title}</div>
                  <div className="player-insight">{p.insight}</div>
                  <div className="player-change">{p.change}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── STATS ─── */}
        {section==="stats" && (
          <div className="section">
            <div className="section-eyebrow">Data & Research</div>
            <h2 className="section-title">PGA Tour Statistics &<br/><em>What They Mean for Your Game</em></h2>
            <p className="section-intro">Understanding the actual numbers changes how you practise, how you think on the course, and what you should expect from yourself. These are not estimates — they are PGA Tour ShotLink data, validated by Professor Mark Broadie (Columbia Business School), ShotScope and Arccos aggregate amateur data.</p>

            <div className="card gold">
              <div className="card-sub">Make Probability by Distance</div>
              <div className="card-title">What Does the Data Actually Show?</div>
              <div className="card-body" style={{marginBottom:16}}>
                <p>The most important table in putting education. Study it carefully. Then study it again. Most amateur golfers carry expectations that are catastrophically misaligned with statistical reality — and this misalignment is the source of more frustration, more anxiety, and more missed putts than any mechanical fault.</p>
              </div>
              <ProbChart/>
            </div>

            <div className="card">
              <div className="card-sub">The Key Insights</div>
              <div className="card-title">What This Data Means For How You Practice</div>
              <div className="card-body">
                <p><strong>Insight 1 — The 10-Foot Wall.</strong> PGA Tour professionals make only 40% of 10-foot putts. Your average 10-handicapper makes 26%. If you miss a 10-footer, you have not failed — you have conformed exactly to the statistical reality of your skill level. The players who thrive manage this reality and move on; those who don't spiral. Expectation management is a stroke-saver.</p>
                <p><strong>Insight 2 — Short Game Is Everything.</strong> The enormous gap between skill levels is between 3 and 8 feet. Tour pros make 96% from 3 feet. 20-handicaps make 70%. Scratch golfers make 93%. This zone — the par-saving, bogey-avoiding, momentum-protecting zone — is where rounds are won and lost. Spend 60% of your mechanical practice inside 8 feet.</p>
                <p><strong>Insight 3 — Lag Puts First for Amateurs.</strong> Above 25 feet, the difference between a scratch golfer and a 20-handicap is only 5–8 percentage points in make rate. The gap is not in holing long putts — it is in avoiding three-putts. A scratch golfer three-putts once every 36 holes. A 15-handicap three-putts once every 9. This is the fastest route to lower scores: not holing more 20-footers, but leaving every first putt within 3 feet of the hole.</p>
              </div>
            </div>

            <div className="card">
              <div className="card-sub">Three-Putt Statistics</div>
              <div className="card-title">The Real Handicap Separator</div>
              <table className="stat-table">
                <thead><tr><th>Skill Level</th><th>Three-Putts per Round</th><th>Three-Putt from 25ft</th><th>Strokes Lost vs Tour</th></tr></thead>
                <tbody>
                  <tr><td>PGA Tour Pro</td><td className="stat-highlight">0.51</td><td>5%</td><td>—</td></tr>
                  <tr><td>Scratch Golfer</td><td>0.5</td><td>8%</td><td className="stat-green">≈ –0.1/rnd</td></tr>
                  <tr><td>5-Handicap</td><td>1.06</td><td>12%</td><td className="stat-red">≈ –0.6/rnd</td></tr>
                  <tr><td>10-Handicap</td><td>2.06</td><td>18%</td><td className="stat-red">≈ –1.5/rnd</td></tr>
                  <tr><td>15-Handicap</td><td>2.0</td><td>24%</td><td className="stat-red">≈ –2.2/rnd</td></tr>
                  <tr><td>20-Handicap</td><td>2.0+</td><td>32%</td><td className="stat-red">≈ –3.0/rnd</td></tr>
                </tbody>
              </table>
              <p style={{fontSize:11,color:C.textDim,marginTop:8}}>Sources: PGA Tour ShotLink, Arccos Golf, ShotScope aggregate data</p>
            </div>

            <div className="card">
              <div className="card-sub">Strokes Gained: Putting — What Good Looks Like</div>
              <div className="card-title">Benchmarks for Every Level</div>
              <table className="stat-table">
                <thead><tr><th>SG:Putting</th><th>Description</th><th>Tour Examples</th></tr></thead>
                <tbody>
                  <tr><td className="stat-highlight">+2.0 to +3.0</td><td>Elite season — exceptional putting campaign</td><td>Jordan Spieth 2015</td></tr>
                  <tr><td className="stat-green">+0.5 to +1.5</td><td>Above average — giving your team an edge</td><td>Scheffler 2025 (+0.8)</td></tr>
                  <tr><td>–0.2 to +0.3</td><td>Tour average — neutral putting contribution</td><td>Field average</td></tr>
                  <tr><td className="stat-red">–0.5 to –1.5</td><td>Putting leak — costing wins</td><td>Scheffler pre-Kenyon 2023</td></tr>
                  <tr><td className="stat-red">Below –2.0</td><td>Critical weakness — primary coaching priority</td><td>Historical yip cases</td></tr>
                </tbody>
              </table>
            </div>

            <div className="card">
              <div className="card-sub">The Three-Putt Calculation</div>
              <div className="card-title">How Much Is Your Putting Costing You?</div>
              <div className="card-body">
                <p>If you are a 15-handicap three-putting twice per round, and you reduce that to once per round, you save 18 strokes over a 9-round period. That is approximately <strong>2 full handicap shots saved from a single skill improvement.</strong></p>
                <p>The Putts Gained calculation is even more granular: it compares your actual putts at each distance to the PGA Tour average required putts from the same distances. A 15-handicap typically loses 2.2 strokes per round to putting versus tour average. This programme's realistic 12-week target is to recover 0.8–1.2 strokes of that gap — enough to notice a measurable handicap movement.</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── ASSESSMENT ─── */}
        {section==="assess" && (
          <div className="section">
            <div className="section-eyebrow">Before You Begin</div>
            <h2 className="section-title">Your 6-Part<br/><em>Diagnostic Assessment</em></h2>
            <p className="section-intro">Do not begin any module until these assessments are complete. The data they produce tells you precisely where to direct your first 4 weeks, and provides the baseline against which your Week 8 and Week 12 retests will prove your improvement. These are not optional.</p>

            <div className="card">
              {ASSESSMENTS.map((a,i)=>(
                <div key={i} className="assess-item">
                  <div className="assess-num">{a.num}</div>
                  <div className="assess-content">
                    <h4>{a.title}</h4>
                    <p>{a.desc}</p>
                    <div className="assess-benchmark">{a.benchmark}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card gold">
              <div className="card-sub">Interpreting Your Results</div>
              <div className="card-title">Where to Focus First</div>
              <div className="card-body">
                <p><strong>Start Line below 14/20:</strong> Modules 1 and 2 are your absolute priority. Do not move on until the Gate Drill reaches 75%+ success at 6 feet.</p>
                <p><strong>Pace Control below 18/30:</strong> Module 4 should run in parallel with Module 2 from Week 3. Lag putting improvement is the fastest route to handicap improvement for most golfers.</p>
                <p><strong>Pressure Grid below 4/9:</strong> Module 6 should be introduced from Week 5 regardless of mechanical progress. Mental issues do not wait for mechanics to be perfected.</p>
                <p><strong>Read Accuracy above 4 inches:</strong> Module 5 will have exceptional ROI on your round-by-round performance. Prioritise it in Weeks 7–8.</p>
                <p><strong>Routine variation above 8 seconds:</strong> Begin the Routine Stopwatch Test immediately — this is an early indicator of mental game instability under mild practice pressure.</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── MODULES ─── */}
        {section==="modules" && (
          <div className="section">
            <div className="section-eyebrow">The Curriculum</div>
            <h2 className="section-title">7 Modules —<br/><em>The Complete System</em></h2>
            <p className="section-intro">Each module contains the full knowledge base, multiple drills graded by difficulty, competitive games, and measurable targets. Work through them sequentially in the 12-week programme, then return to individual modules as your tracker data directs.</p>
            {MODULES.map((m,i)=><ModuleCard key={i} mod={m}/>)}
          </div>
        )}

        {/* ─── GAMES ─── */}
        {section==="games" && (
          <div className="section">
            <div className="section-eyebrow">Competitive Practice</div>
            <h2 className="section-title">The Complete Game Library —<br/><em>Make Practice Feel Like Competition</em></h2>
            <p className="section-intro">Research shows that practice under simulated competitive pressure transfers more directly to on-course performance than repetitive block practice. These games are deliberately designed to apply specific types of pressure that directly match the challenges in real rounds.</p>

            {MODULES.filter(m=>m.games).map((m,i)=>(
              <div key={i}>
                <div className="phase-header">Module {m.num} — {m.title}</div>
                {m.games.map((g,j)=>(
                  <div key={j} className="game">
                    <div className="game-header">
                      <div className="game-name">{g.name}</div>
                      <div className="game-tag">{g.tag}</div>
                    </div>
                    <div className="game-body">{g.body}</div>
                    <div className="game-rules">
                      <div className="game-rules-title">Rules & Scoring</div>
                      <ul>{g.rules.map((r,k)=><li key={k}>{r}</li>)}</ul>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div className="divider"/>

            <div className="card gold">
              <div className="card-sub">Why Competitive Practice Works</div>
              <div className="card-title">The Science of Pressure Training</div>
              <div className="card-body">
                <p>Research on motor learning consistently shows that <strong>variable and competitive practice</strong> produces superior transfer to real performance than blocked, repetitive practice. The reason: pressure practice activates the same neurological states as actual competition, conditioning the neural pathways that must fire on the course.</p>
                <p>A study on putting practice formats found that golfers who spent 30% of their practice time in competitive games showed <strong>42% better maintenance of skill under competitive conditions</strong> compared to those who practised only in block format — even when total practice volume was identical.</p>
                <p>Recommendation: minimum one game-format session per week throughout the 12-week programme. Two per week in Phase Three (Weeks 9–12).</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── PROGRAMME ─── */}
        {section==="programme" && (
          <div className="section">
            <div className="section-eyebrow">Your Roadmap</div>
            <h2 className="section-title">The 12-Week Programme —<br/><em>Step by Step</em></h2>
            <p className="section-intro">Follow this plan in sequence. Each phase builds on the last. Skipping ahead undermines the architecture. Trust the data from your assessments, stay with the retests, and let your numbers — not your feelings — guide any deviations from the plan.</p>

            {PROGRAMME_PHASES.map((phase,i)=>(
              <div key={i}>
                <div className="phase-header">{phase.phase} · {phase.label}</div>
                <div className="week-grid">
                  {phase.weeks.map((w,j)=>(
                    <div key={j} className="week-card">
                      <div className="week-num">{w.num}</div>
                      <div className="week-title">{w.title}</div>
                      <ul className="week-list">
                        {w.items.map((item,k)=><li key={k}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="divider"/>

            <div className="card gold">
              <div className="card-sub">The Daily Practice Template</div>
              <div className="card-title">20–45 Minutes, 3–4 Times per Week</div>
              <div className="card-body">
                <p><strong>Opening — 5 minutes:</strong> Alignment rod check. Eye position drop test. Grip pressure calibration. Build your setup before any stroke work.</p>
                <p><strong>Mechanical Drill Block — 10–15 minutes:</strong> One drill only from your current module focus. Full attention. Numerical tracking. Not two drills — one.</p>
                <p><strong>Pace & Start Line Block — 10–15 minutes:</strong> Gate Drill (start line) combined with Slope Ladder or Lag Drill (pace). Always train both together — they are inseparable on the course.</p>
                <p><strong>Competitive Game — 5–10 minutes:</strong> One game from the library, relevant to your current module. Full competitive engagement — no casual repetitions.</p>
                <p><strong>Routine Practice — 5 minutes:</strong> 10 putts from varying distances using your full, timed routine. No mechanical thought. Pure process execution.</p>
                <p><strong>Journal — 3 minutes:</strong> One numerical result from a drill. Mental state rating (1–10). One thing that worked. One priority for next session.</p>
              </div>
            </div>

            <div className="card">
              <div className="card-sub">Retest Schedule</div>
              <div className="card-title">When and What to Test</div>
              <div className="card-body">
                <p><strong>End of Week 4:</strong> Start Line Test only. Minimum +2/20 improvement expected.</p>
                <p><strong>End of Week 8 (mid-programme):</strong> All 6 assessments. Compare to Week 1 baseline. Recalibrate focus for Phase Three based on weakest category.</p>
                <p><strong>End of Week 12:</strong> All 6 assessments. Full comparison to Week 1. Document everything — this data becomes the baseline for your next 12-week block.</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── PSYCHOLOGY ─── */}
        {section==="psychology" && (
          <div className="section">
            <div className="section-eyebrow">The Mental Game</div>
            <h2 className="section-title">Psychology of<br/><em>World-Class Putting</em></h2>
            <p className="section-intro">Six deep essays on the science behind elite putting psychology. Each draws on peer-reviewed research, tour player case studies, and direct application to your game. Read one per week during the first six weeks. Return to the most relevant ones whenever your mental game deteriorates.</p>

            <div className="quote">
              "Putting is extremely difficult. It's by far the most mental part of golf. You can putt well for a period and not make anything. Jordan and Tiger — they're two of the best putters to ever play. I have no doubt they'll be putting great again. It just takes time and getting that inner confidence back."
              <div className="quote-attr">Justin Thomas — ESPN, 2018</div>
            </div>

            {PSYCH_CONTENT.map((p,i)=><PsychCard key={i} item={p}/>)}

            <div className="divider"/>

            <div className="card">
              <div className="card-sub">Tour Application</div>
              <div className="card-title">How Tour Players Apply This Science</div>
              <div className="card-body">
                <p><strong>Jordan Spieth</strong> uses an explicit 'blackout mode' trigger — tilting the handle toward the target — as the physical cue that ends conscious thought and initiates motor execution. His pre-putt routine (read from all sides, foot-wiggle, address, handle-tilt, blackout) is identical across thousands of competitive putts.</p>
                <p><strong>Brad Faxon</strong> (universally regarded as the greatest natural putter of his era) described his process as entirely visual and feeling-based — he never thought about mechanics during execution. His entire process was a committed visual picture followed by 'releasing it' with no conscious motor intent. Pure Quiet Eye. Pure external focus.</p>
                <p><strong>Ben Crenshaw</strong> — two-time Masters champion whose putting was considered artistry — said he tried to 'think of nothing' over the ball. What he described was the phenomenology of advanced basal-ganglia execution: the conscious mind steps aside and the stored program runs without interference.</p>
                <p>The pattern across elite putters is identical: rich, unhurried preparation (reading, routine, building the picture); a decisive commitment line; and then complete cognitive surrender to unconscious execution. This is not mysticism. It is neurological efficiency at its highest expression.</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── FITTING ─── */}
        {section==="fitting" && (
          <div className="section">
            <div className="section-eyebrow">Module 7 — Deep Dive</div>
            <h2 className="section-title">Equipment Fitting &<br/><em>Putter Optimisation</em></h2>
            <p className="section-intro">The correct putter removes a problem. The wrong putter creates one. Kenyon's intervention with Scheffler included a putter change as a central element — not a cosmetic one. Understanding the physics of putter fitting gives you control over one of the most impactful variables in your putting system.</p>

            <div className="fitting-grid">
              {[
                {icon:"⚖️",title:"Face Balance vs. Toe Hang",body:"Face-balanced: for straight-path strokes. Toe-hang: for arc strokes. Test: balance putter on two fingers at shaft mid-point. Face up = face balanced. Face rotating down = toe hang. Match this to your natural stroke arc before buying any putter."},
                {icon:"📐",title:"Loft (Static vs. Dynamic)",body:"Standard loft: 3–4°. At impact: shaft lean reduces dynamic loft to near zero (creates backspin/hop). Ascending arc increases it. Check roll quality — end-over-end within 10 inches = correct. Hop at the start = too much dynamic loft."},
                {icon:"📏",title:"Putter Length",body:"Most golfers should use a putter 1–2 inches shorter than standard. Length controls posture, which controls eye position, which controls aim. Build the length from eye position down — not from a standard number on the shelf."},
                {icon:"🔭",title:"Aim Quality",body:"The most underrated fitting metric: which putter do YOU aim best? Test 5 different putter shapes. Photograph aim from directly behind. The putter you aim most accurately — regardless of feel — is your starting point."},
                {icon:"⚡",title:"Lie Angle",body:"Toe up at address = face points right. Toe down = face points left. Lie angle is typically customisable — it is not fixed. Often responsible for 2–3° of aim error that the golfer blames on their stroke."},
                {icon:"🎯",title:"Swing Weight & Head Weight",body:"Heavier heads encourage smoother, more passive hands — reducing manipulation and improving tempo. Most tour players use heavier heads than standard (340–360g). Lighter heads give more feel on short putts but can cause instability at distance."},
              ].map((c,i)=>(
                <div key={i} className="fitting-card">
                  <div className="fitting-icon">{c.icon}</div>
                  <div className="fitting-title">{c.title}</div>
                  <div className="fitting-body">{c.body}</div>
                </div>
              ))}
            </div>

            <div className="divider"/>

            <div className="card green-card">
              <div className="card-sub">The Scheffler Fitting Story — Detailed</div>
              <div className="card-title">Why a Putter Change Unlocked a Season</div>
              <div className="card-body">
                <p>When Kenyon worked with Scheffler, the existing setup had multiple compounding errors: the blade putter with an alignment line that pointed slightly right of where Scheffler aimed; a right-hand grip position on top of the shaft causing radial deviation at impact; shoulder alignment left as a compensation; wayward heel strikes as a result.</p>
                <p>The TaylorMade Spider Tour X change addressed two things simultaneously: (1) the mallet's face geometry allowed Scheffler to aim it more accurately than the blade, confirmed through aim-testing data; (2) the heavier head encouraged a more passive right hand, naturally reducing the radial release that was the root cause of the face angle inconsistency. The putter change was not aesthetic. It was a mechanical intervention.</p>
                <p><strong>The principle: the right equipment removes the problem rather than creating a technique patch to work around it.</strong> This is why fitting comes last in the system — you need to understand your stroke's natural tendencies before you can identify the equipment that works with them rather than against them.</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── TRACKER ─── */}
        {section==="tracker" && (
          <div className="section">
            <div className="section-eyebrow">Data & Analytics</div>
            <h2 className="section-title">The Putting Tracker &<br/><em>Performance Tools</em></h2>
            <p className="section-intro">What gets measured gets improved. These tracking tools convert your on-course and practice performance into data that directs where your next block of practice should go. The most important number in your game is your Putts Gained trend — not your score.</p>

            <div className="tracker-grid">
              {[
                {metric:"Target: SG:Putt",val:"+0.8",desc:"Realistic 12-week improvement vs. your baseline"},
                {metric:"3-Putt Target",val:"≤1",desc:"Three-putts per round after Week 8"},
                {metric:"Gate Success",val:"80%",desc:"Gate Drill at 8 feet — Module 2 completion standard"},
                {metric:"Pace Proximity",val:"70%",desc:"Within 18 inches from 30 feet — lag target"},
                {metric:"Pressure Grid",val:"7/9",desc:"Average consecutive makes — Week 12 target"},
                {metric:"Read Accuracy",val:"<2\"",desc:"Average start line deviation from predicted — Week 12"},
              ].map((t,i)=>(
                <div key={i} className={`tracker-cell${i<2?" gold-cell":""}`}>
                  <div className="tracker-metric">{t.metric}</div>
                  <div className="tracker-val">{t.val}</div>
                  <div className="tracker-desc">{t.desc}</div>
                </div>
              ))}
            </div>

            <div className="card gold">
              <div className="card-sub">How to Track Putts Gained</div>
              <div className="card-title">The Most Important Metric in Your Game</div>
              <div className="card-body">
                <p>Putts Gained compares your actual putts to the PGA Tour expected putts from the same distances. The reference values below (Mark Broadie, Columbia Business School) are the gold standard:</p>
                <table className="stat-table">
                  <thead><tr><th>Distance</th><th>Tour Avg Putts</th><th>Make %</th><th>Expected Value</th></tr></thead>
                  <tbody>
                    {[
                      ["3 ft","1.04","96%","0.96 strokes saved if made"],
                      ["5 ft","1.23","77%","0.77 strokes saved if made"],
                      ["8 ft","1.44","56%","0.56 strokes saved if made"],
                      ["10 ft","1.60","40%","0.40 strokes saved if made"],
                      ["15 ft","1.77","23%","0.23 strokes saved if made"],
                      ["20 ft","1.85","15%","0.15 strokes saved if made"],
                      ["30 ft","1.93","7%","0.07 strokes saved if made"],
                      ["40 ft","1.96","4%","0.04 strokes saved if made"],
                    ].map(([d,t,m,e],i)=>(
                      <tr key={i}><td>{d}</td><td className="stat-highlight">{t}</td><td>{m}</td><td style={{fontSize:11,color:C.textDim}}>{e}</td></tr>
                    ))}
                  </tbody>
                </table>
                <p style={{marginTop:12}}>For every round, record each putt's starting distance and final outcome. Sum your actual putts vs. expected putts. The difference is your SG:Putting for the round. Track this across every round. A positive trend over 12 weeks is the clearest evidence your system is working.</p>
              </div>
            </div>

            <div className="card">
              <div className="card-sub">Practice Logs to Keep</div>
              <div className="card-title">Five Tracking Tools for Daily Use</div>
              <div className="card-body">
                <p><strong>Start Line Log:</strong> Date, distance, attempts, gate successes, success %. Weekly trend. Expected improvement: +5–10% per 4-week block during active drill work.</p>
                <p><strong>Pace Control Log:</strong> Distance range, attempts, within-2-foot count, success %. Additionally: note every round putt where first putt ended outside 3 feet. Target: under 3 pace misses per 18 holes after Week 8.</p>
                <p><strong>Pressure Grid Log:</strong> Record maximum consecutive makes per session. Plot weekly. Improvement here is the clearest indicator of mental game development under training.</p>
                <p><strong>Routine Timing Log:</strong> Mean and range of 10 timed routines per week. Narrowing range is the metric — it means automaticity is developing. Wide range = mental instability in practice.</p>
                <p><strong>Round-by-Round Stats:</strong> Total putts, three-putts, one-putts, and putts from inside/outside 10 feet. Plot the trend across rounds. Most players find their pattern clearly after just 5–6 rounds of honest tracking.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
