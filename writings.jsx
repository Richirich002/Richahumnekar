import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Feather,
  Menu,
  Send,
  X,
} from "lucide-react";

type View = "Home" | "Poetry & Stories" | "About" | "Connect";
type WritingType = "Poem" | "Story" | "Reflection";
type Language = "Hindi" | "English";

const pieces: {
  title: string;
  titleHindi: string;
  type: WritingType;
  language: Language;
  date: string;
  excerpt: string;
  translation?: string;
  read: string;
}[] = [
  {
    title: "A room for the rain",
    titleHindi: "बारिश के लिए एक कमरा",
    type: "Poem",
    language: "English",
    date: "Poem · 4 min",
    excerpt: "I leave one window unlatched / for the rain to remember / the way home.",
    translation: "एक खिड़की खुली छोड़ देती हूँ / ताकि बारिश को याद रहे / घर लौटने का रास्ता।",
    read: "Some evenings the sky lowers its voice. The cup cools beside me, the page waits, and every small sound finds a place to sit.",
  },
  {
    title: "The blue trunk",
    titleHindi: "नीला संदूक",
    type: "Story",
    language: "Hindi",
    date: "कहानी · 6 min",
    excerpt: "दादी के नीले संदूक में कपड़ों से ज़्यादा मौसम रखे थे।",
    translation: "In Grandma’s blue trunk, there were more seasons than clothes.",
    read: "हर सर्दी हम उसे धूप में रखते। उसकी चरमराहट में घर के पुराने दिनों की आहट थी—धीमी, मगर बिल्कुल अपनी।",
  },
  {
    title: "What the river keeps",
    titleHindi: "नदी क्या सँभालती है",
    type: "Reflection",
    language: "English",
    date: "Reflection · 3 min",
    excerpt: "Perhaps letting go is not the opposite of keeping. Perhaps it is a way of carrying.",
    translation: "शायद छोड़ना, सँभालने का उलट नहीं। शायद यह साथ ले जाने का एक तरीका है।",
    read: "I think of the river carrying fallen leaves without asking them to stay. Even its leaving has a tenderness to it.",
  },
  {
    title: "चिट्ठी, जो भेजी नहीं",
    titleHindi: "चिट्ठी, जो भेजी नहीं",
    type: "Poem",
    language: "Hindi",
    date: "कविता · 3 min",
    excerpt: "तुम्हारे नाम की स्याही / अब भी सूखी नहीं— / बस काग़ज़ बदल गया है।",
    translation: "The ink of your name / has not dried yet— / only the paper has changed.",
    read: "रात की मेज़ पर रखी चिट्ठी को सुबह की रोशनी ने पढ़ा। जवाब में बस एक नया दिन आया।",
  },
  {
    title: "Small rituals of beginning",
    titleHindi: "शुरू करने की छोटी रस्में",
    type: "Reflection",
    language: "English",
    date: "Reflection · 5 min",
    excerpt: "A blank page is not an empty thing. It is a small, patient invitation.",
    translation: "कोरा पन्ना ख़ाली नहीं होता। वह एक छोटी, धीरज भरी दावत है।",
    read: "I make tea. I sharpen a pencil I rarely use. Then I write one true thing, and let the rest arrive in its own time.",
  },
  {
    title: "सफ़ेद छतरी",
    titleHindi: "सफ़ेद छतरी",
    type: "Story",
    language: "Hindi",
    date: "कहानी · 7 min",
    excerpt: "उस सफ़ेद छतरी के नीचे दो अजनबियों ने शहर की सबसे धीमी बातचीत की।",
    translation: "Beneath that white umbrella, two strangers had the city’s slowest conversation.",
    read: "बस-स्टॉप पर बारिश बढ़ती रही। उनके बीच की चुप्पी में कोई जल्दी नहीं थी, कोई परिचय माँगता हुआ सवाल नहीं।",
  },
];

const navigation: View[] = ["Home", "Poetry & Stories", "About", "Connect"];

export function PoetrySite() {
  const [view, setView] = useState<View>("Home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [language, setLanguage] = useState<"All" | Language>("All");
  const [kind, setKind] = useState<"All" | WritingType>("All");
  const [selectedPiece, setSelectedPiece] = useState<(typeof pieces)[number] | null>(null);
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const filteredPieces = useMemo(
    () =>
      pieces.filter(
        (piece) =>
          (language === "All" || piece.language === language) &&
          (kind === "All" || piece.type === kind),
      ),
    [language, kind],
  );

  const goTo = (next: View) => {
    setView(next);
    setMobileMenu(false);
    setSelectedPiece(null);
    setSent(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="poetry-site">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Noto+Serif+Devanagari:wght@400;500;600&display=swap');
        .poetry-site {
          --paper: #f4f1e9; --paper-deep: #ece8dc; --ink: #273c33; --muted: #69756b;
          --line: #d7d5c9; --olive: #73836d; --rust: #a85f49; --mist: #e3e8dd;
          min-height: 100dvh; color: var(--ink); background: var(--paper);
          font-family: 'DM Sans', sans-serif; position: relative; overflow: hidden;
        }
        .poetry-site * { box-sizing: border-box; }
        .poetry-site::before { content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: .17;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.11'/%3E%3C/svg%3E"); }
        .poetry-site > * { position: relative; z-index: 1; }
        .poetry-site button, .poetry-site input, .poetry-site textarea { font: inherit; }
        .poetry-site button { cursor: pointer; }
        .poetry-site .serif { font-family: 'Instrument Serif', 'Noto Serif Devanagari', Georgia, serif; }
        .poetry-site [lang='hi'] { font-family: 'Noto Serif Devanagari', 'Nirmala UI', 'Kohinoor Devanagari', serif; }
        .poetry-site .site-header { max-width: 1320px; margin: 0 auto; min-height: 94px; padding: 0 52px;
          display:flex; align-items:center; justify-content:space-between; border-bottom: 1px solid var(--line); }
        .poetry-site .brand { display:flex; align-items:center; gap:13px; text-align:left; border:0; background:none; color:inherit; padding:0; }
        .poetry-site .brand-mark { width:42px; height:42px; border:1px solid #aab29f; border-radius:50%; display:grid; place-items:center;
          color:var(--rust); font: 23px 'Instrument Serif',serif; background:#f7f4ed; }
        .poetry-site .brand-name { display:block; font-size:14px; font-weight:600; letter-spacing:.035em; }
        .poetry-site .brand-sub { display:block; margin-top:3px; color:var(--muted); font-size:10px; letter-spacing:.11em; text-transform:uppercase; }
        .poetry-site .desktop-nav { display:flex; align-items:center; gap:34px; }
        .poetry-site .nav-button { position:relative; border:0; background:none; color:#69736a; padding:11px 0; font-size:12px; letter-spacing:.025em; }
        .poetry-site .nav-button.active { color:var(--ink); }
        .poetry-site .nav-button.active::after { content:''; position:absolute; bottom:3px; left:0; right:0; height:1px; background:var(--rust); }
        .poetry-site .nav-contact { display:flex; align-items:center; gap:8px; color:var(--ink); padding:11px 16px; border:1px solid #b7beb0; border-radius:30px; background:transparent; font-size:11px; }
        .poetry-site .nav-contact:hover, .poetry-site .outline-action:hover { background:#e9e9dd; }
        .poetry-site .mobile-menu-button { display:none; border:1px solid var(--line); border-radius:50%; width:42px; height:42px; background:transparent; color:var(--ink); }
        .poetry-site .mobile-nav { display:none; }
        .poetry-site .page-shell { width:100%; max-width:1320px; margin:0 auto; padding:0 52px; }
        .poetry-site .eyebrow { display:flex; align-items:center; gap:10px; color:var(--rust); text-transform:uppercase; letter-spacing:.17em; font-size:10px; font-weight:600; }
        .poetry-site .eyebrow::before { content:''; width:24px; height:1px; background:var(--rust); }
        .poetry-site .home-hero { display:grid; grid-template-columns: 1.03fr .97fr; gap:50px; min-height:518px; padding:70px 0 57px; align-items:center; }
        .poetry-site .hero-copy { min-width:0; padding:0 0 9px 3.5%; }
        .poetry-site .hero-copy h1 { margin:25px 0 21px; font: clamp(49px, 6vw, 83px)/.98 'Instrument Serif','Noto Serif Devanagari',serif; letter-spacing:-.045em; font-weight:400; }
        .poetry-site .hero-copy h1 em { color:var(--rust); font-weight:400; }
        .poetry-site .hero-copy .hindi-hero { display:block; margin-top:13px; font: 400 clamp(26px,3.1vw,40px)/1.35 'Noto Serif Devanagari',serif; letter-spacing:0; color:#566653; }
        .poetry-site .hero-intro { max-width:405px; margin:0; color:#667168; font-size:14px; line-height:1.85; }
        .poetry-site .hero-intro-hi { margin-top:3px; font-size:13px; }
        .poetry-site .hero-cta-row { display:flex; align-items:center; gap:25px; margin-top:30px; }
        .poetry-site .solid-action { display:inline-flex; align-items:center; justify-content:center; gap:12px; border:0; border-radius:30px; padding:14px 19px; color:#f7f3e9; background:var(--ink); font-size:11px; transition:transform .2s, opacity .2s; }
        .poetry-site .solid-action:hover { transform:translateY(-2px); opacity:.92; }
        .poetry-site .text-action { display:inline-flex; align-items:center; gap:8px; border:0; padding:8px 0; background:none; color:var(--ink); font-size:11px; border-bottom:1px solid #bfc4b8; }
        .poetry-site .hero-art { height:369px; position:relative; overflow:hidden; border-radius:2px 92px 2px 2px; background:#dce2d4; }
        .poetry-site .hero-art img { width:100%; height:100%; display:block; object-fit:cover; object-position:center 53%; filter:saturate(.75); }
        .poetry-site .art-caption { position:absolute; bottom:18px; left:20px; color:#f6f3ea; font-size:10px; letter-spacing:.1em; text-shadow:0 1px 7px #26382f; }
        .poetry-site .art-index { position:absolute; right:18px; top:18px; width:42px; height:42px; border-radius:50%; background:#f4f1e9e8; color:var(--rust); display:grid; place-items:center; font:italic 18px 'Instrument Serif',serif; }
        .poetry-site .feature-band { padding:44px 0 51px; background:var(--mist); }
        .poetry-site .feature-grid { display:grid; grid-template-columns: 1fr 1.08fr; gap:65px; align-items:center; }
        .poetry-site .feature-note { padding-left:9%; }
        .poetry-site .feature-note blockquote { margin:22px 0 19px; max-width:430px; font:italic 36px/1.12 'Instrument Serif', 'Noto Serif Devanagari',serif; color:#34493e; }
        .poetry-site .feature-note .quote-hi { display:block; margin-top:8px; font: 400 20px/1.55 'Noto Serif Devanagari',serif; color:#526454; }
        .poetry-site .feature-note cite { color:var(--muted); font-style:normal; font-size:11px; }
        .poetry-site .feature-poem { padding:5px 0 4px 58px; border-left:1px solid #c7d0c2; }
        .poetry-site .feature-poem .poem-meta { display:flex; justify-content:space-between; gap:10px; color:#788174; font-size:10px; letter-spacing:.12em; text-transform:uppercase; }
        .poetry-site .feature-poem h2 { margin:20px 0 12px; font:400 34px/1.1 'Instrument Serif',serif; }
        .poetry-site .feature-poem .poem-hi-title { font-size:22px; color:#63725f; }
        .poetry-site .poem-lines { margin:0; font: 20px/1.7 'Instrument Serif',serif; color:#42544a; }
        .poetry-site .poem-lines-hi { margin-top:12px; font-size:16px; line-height:1.9; color:#647164; }
        .poetry-site .feature-bottom { display:flex; align-items:center; gap:20px; margin-top:21px; }
        .poetry-site .rule { width:46px; height:1px; background:#9ca995; }
        .poetry-site .quiet-link { border:0; background:transparent; padding:8px 0; color:var(--rust); display:inline-flex; align-items:center; gap:8px; font-size:11px; }
        .poetry-site .intro-strip { padding:67px 0 73px; display:grid; grid-template-columns: .8fr 1.2fr; gap:70px; align-items:center; }
        .poetry-site .intro-mark { color:#b6c0af; font:italic 124px/.8 'Instrument Serif',serif; }
        .poetry-site .intro-text h2 { margin:14px 0 13px; font:400 41px/1.08 'Instrument Serif',serif; }
        .poetry-site .intro-text p { max-width:590px; margin:0; color:#667168; font-size:13px; line-height:1.9; }
        .poetry-site .intro-text .hindi-copy { margin-top:6px; font-size:13px; }
        .poetry-site .page-heading { padding:66px 0 42px; border-bottom:1px solid var(--line); }
        .poetry-site .page-heading h1 { margin:20px 0 10px; font:400 clamp(47px,6vw,72px)/.98 'Instrument Serif','Noto Serif Devanagari',serif; letter-spacing:-.03em; }
        .poetry-site .page-heading p { margin:0; max-width:630px; color:var(--muted); font-size:13px; line-height:1.8; }
        .poetry-site .page-heading .hindi-subtitle { margin-top:4px; }
        .poetry-site .filters { display:flex; justify-content:space-between; align-items:center; gap:20px; padding:24px 0 15px; }
        .poetry-site .filter-group { display:flex; flex-wrap:wrap; gap:7px; align-items:center; }
        .poetry-site .filter-label { margin-right:6px; color:#7c8579; font-size:10px; letter-spacing:.12em; text-transform:uppercase; }
        .poetry-site .filter-chip { border:1px solid transparent; border-radius:30px; background:transparent; color:#647066; padding:8px 12px; font-size:10px; }
        .poetry-site .filter-chip.active { border-color:#b8c1b2; color:var(--ink); background:#e9ece3; }
        .poetry-site .piece-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; padding:10px 0 70px; }
        .poetry-site .piece-card { border:1px solid var(--line); min-height:242px; padding:23px 22px 20px; text-align:left; color:inherit; background:#f7f5ef; display:flex; flex-direction:column; transition:transform .2s, background .2s; }
        .poetry-site .piece-card:hover { transform:translateY(-3px); background:#f1efe6; }
        .poetry-site .piece-card-top { display:flex; justify-content:space-between; align-items:center; color:#879081; font-size:9px; letter-spacing:.11em; text-transform:uppercase; }
        .poetry-site .piece-card h2 { margin:20px 0 4px; font:400 26px/1.1 'Instrument Serif',serif; }
        .poetry-site .piece-card .piece-title-hi { margin:0 0 12px; color:#74816f; font-size:14px; }
        .poetry-site .piece-card .piece-excerpt { margin:0; font:italic 17px/1.5 'Instrument Serif', 'Noto Serif Devanagari',serif; color:#46594b; }
        .poetry-site .piece-card .piece-translation { margin:6px 0 0; color:#7a8276; font-size:11px; line-height:1.6; }
        .poetry-site .card-bottom { margin-top:auto; padding-top:16px; color:var(--rust); display:flex; justify-content:space-between; align-items:center; font-size:10px; }
        .poetry-site .empty-results { padding:45px 20px; text-align:center; color:var(--muted); grid-column:1/-1; border:1px dashed var(--line); }
        .poetry-site .about-layout { display:grid; grid-template-columns:.82fr 1.18fr; gap:80px; padding:53px 0 76px; }
        .poetry-site .about-portrait { min-height:440px; position:relative; background:#dce2d5; overflow:hidden; }
        .poetry-site .about-portrait img { width:100%; height:100%; object-fit:cover; position:absolute; inset:0; filter:saturate(.63); }
        .poetry-site .about-caption { position:absolute; left:18px; bottom:18px; padding:11px 14px; background:#f4f1e9e8; color:#63705e; font:italic 17px 'Instrument Serif',serif; }
        .poetry-site .about-copy h2 { margin:16px 0 15px; font:400 41px/1.05 'Instrument Serif',serif; }
        .poetry-site .about-copy p { color:#667168; font-size:13px; line-height:1.95; margin:0 0 10px; }
        .poetry-site .journey { display:grid; grid-template-columns:1fr 1fr 1fr; border-top:1px solid var(--line); margin-top:30px; padding-top:17px; gap:16px; }
        .poetry-site .journey div { color:var(--muted); font-size:10px; line-height:1.6; }
        .poetry-site .journey strong { display:block; color:var(--ink); font:400 20px 'Instrument Serif',serif; margin-bottom:4px; }
        .poetry-site .connect-layout { display:grid; grid-template-columns:1fr 1fr; gap:75px; padding:52px 0 78px; }
        .poetry-site .connect-copy h2 { font:400 43px/1.05 'Instrument Serif',serif; margin:17px 0 16px; }
        .poetry-site .connect-copy p { max-width:460px; color:#69746a; font-size:13px; line-height:1.9; margin:0 0 9px; }
        .poetry-site .connect-copy .hindi-copy { font-size:13px; }
        .poetry-site .contact-card { padding:26px; border:1px solid var(--line); background:#f7f5ef; }
        .poetry-site .contact-card h3 { margin:0 0 20px; font:400 26px 'Instrument Serif',serif; }
        .poetry-site .contact-card label { display:block; margin:14px 0 6px; color:#778073; font-size:10px; letter-spacing:.08em; }
        .poetry-site .contact-card input, .poetry-site .contact-card textarea { width:100%; border:0; border-bottom:1px solid #c9cec3; background:transparent; outline:none; padding:9px 0; color:var(--ink); font-size:12px; resize:vertical; }
        .poetry-site .contact-card input:focus, .poetry-site .contact-card textarea:focus { border-color:var(--rust); }
        .poetry-site .contact-card input::placeholder, .poetry-site .contact-card textarea::placeholder { color:#a0a69b; }
        .poetry-site .contact-card .solid-action { margin-top:18px; }
        .poetry-site .form-success { display:flex; gap:10px; align-items:flex-start; padding:13px; background:#e8eee3; color:#405746; font-size:12px; line-height:1.6; }
        .poetry-site .form-note { font-size:10px; color:#8a9186; margin:11px 0 0; line-height:1.6; }
        .poetry-site .footer { border-top:1px solid var(--line); padding:19px 52px 23px; max-width:1320px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; color:#7a8378; font-size:10px; }
        .poetry-site .footer-mark { color:var(--rust); font:italic 19px 'Instrument Serif',serif; }
        .poetry-site .modal-backdrop { position:fixed; inset:0; z-index:9; background:#25362f8c; display:flex; align-items:center; justify-content:center; padding:20px; animation:psFade .18s ease-out; }
        .poetry-site .reading-modal { width:min(620px,100%); max-height:90dvh; overflow:auto; background:var(--paper); padding:35px clamp(24px,6vw,56px) 39px; position:relative; box-shadow:0 18px 70px #1e2c2633; }
        .poetry-site .modal-close { position:absolute; top:17px; right:17px; background:transparent; border:1px solid var(--line); color:var(--ink); border-radius:50%; width:34px; height:34px; display:grid; place-items:center; }
        .poetry-site .reading-modal h2 { font:400 40px/1.08 'Instrument Serif',serif; margin:20px 0 2px; }
        .poetry-site .reading-modal .modal-hi-title { color:#667861; font-size:18px; margin:0 0 24px; }
        .poetry-site .reading-modal .reading-body { font:21px/1.7 'Instrument Serif','Noto Serif Devanagari',serif; white-space:pre-line; color:#3e5145; }
        .poetry-site .reading-modal .translation { border-top:1px solid var(--line); margin-top:23px; padding-top:20px; color:#728071; font-size:14px; line-height:1.8; }
        @keyframes psFade { from {opacity:0; transform:translateY(5px)} to {opacity:1; transform:translateY(0)} }
        @media(max-width:820px) {
          .poetry-site .site-header { padding:0 24px; min-height:78px; }
          .poetry-site .page-shell { padding:0 24px; }
          .poetry-site .desktop-nav { gap:20px; }
          .poetry-site .nav-button { font-size:11px; }
          .poetry-site .home-hero { gap:27px; min-height:470px; }
          .poetry-site .hero-art { height:310px; }
          .poetry-site .feature-grid { gap:30px; }
          .poetry-site .feature-note { padding-left:0; }
          .poetry-site .feature-poem { padding-left:30px; }
          .poetry-site .about-layout, .poetry-site .connect-layout { gap:38px; }
        }
        @media(max-width:640px) {
          .poetry-site .site-header { padding:0 18px; min-height:72px; }
          .poetry-site .desktop-nav { display:none; }
          .poetry-site .mobile-menu-button { display:grid; place-items:center; }
          .poetry-site .mobile-nav { display:flex; flex-direction:column; position:absolute; top:72px; left:0; right:0; z-index:5; padding:7px 20px 18px; background:var(--paper); border-bottom:1px solid var(--line); box-shadow:0 12px 20px #24382d0c; }
          .poetry-site .mobile-nav button { text-align:left; padding:12px 3px; background:none; border:0; color:var(--ink); border-bottom:1px solid #e1dfd4; font-size:13px; }
          .poetry-site .mobile-nav button.active { color:var(--rust); }
          .poetry-site .page-shell { padding:0 19px; }
          .poetry-site .home-hero { grid-template-columns:1fr; gap:29px; padding:49px 0 37px; min-height:unset; }
          .poetry-site .hero-copy { width:calc(100% - 38px); margin-inline:19px; padding:0; }
          .poetry-site .hero-copy h1 { margin:20px 0 16px; font-size:57px; }
          .poetry-site .hero-copy .hindi-hero { font-size:29px; }
          .poetry-site .hero-art { height:255px; border-top-right-radius:65px; }
          .poetry-site .feature-band { padding:34px 0 37px; }
          .poetry-site .feature-grid { grid-template-columns:1fr; gap:27px; }
          .poetry-site .feature-note blockquote { font-size:31px; margin:17px 0 12px; }
          .poetry-site .feature-note .quote-hi { font-size:18px; }
          .poetry-site .feature-poem { border-left:0; border-top:1px solid #c7d0c2; padding:22px 0 0; }
          .poetry-site .feature-poem h2 { margin-top:15px; }
          .poetry-site .intro-strip { grid-template-columns:1fr; gap:20px; padding:43px 0 52px; }
          .poetry-site .intro-mark { font-size:90px; }
          .poetry-site .intro-text h2 { font-size:35px; }
          .poetry-site .page-heading { padding:48px 0 30px; }
          .poetry-site .page-heading h1 { font-size:50px; }
          .poetry-site .filters { align-items:flex-start; flex-direction:column; gap:13px; }
          .poetry-site .filter-group { gap:4px; }
          .poetry-site .filter-label { width:100%; margin-bottom:3px; }
          .poetry-site .piece-grid { grid-template-columns:1fr; gap:11px; padding-bottom:44px; }
          .poetry-site .piece-card { min-height:218px; padding:21px; }
          .poetry-site .about-layout { grid-template-columns:1fr; gap:29px; padding:33px 0 52px; }
          .poetry-site .about-portrait { min-height:270px; }
          .poetry-site .about-copy h2 { font-size:36px; }
          .poetry-site .journey { gap:10px; }
          .poetry-site .journey strong { font-size:18px; }
          .poetry-site .connect-layout { grid-template-columns:1fr; gap:29px; padding:35px 0 49px; }
          .poetry-site .connect-copy h2 { font-size:37px; }
          .poetry-site .contact-card { padding:21px; }
          .poetry-site .footer { padding:17px 19px 20px; }
        }
      `}</style>

      <header className="site-header">
        <button className="brand" onClick={() => goTo("Home")} aria-label="Aangan, home">
          <span className="brand-mark" lang="hi">आ</span>
          <span>
            <span className="brand-name">Aangan / आँगन</span>
            <span className="brand-sub">Words, held gently</span>
          </span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              key={item}
              className={`nav-button ${view === item ? "active" : ""}`}
              onClick={() => goTo(item)}
            >
              {item === "Poetry & Stories"
                ? "Poetry & Stories / रचनाएँ"
                : item === "About"
                  ? "About / परिचय"
                  : item === "Connect"
                    ? "Connect / संपर्क"
                    : "Home / घर"}
            </button>
          ))}
          <button className="nav-contact" onClick={() => goTo("Connect")}>
            Write a note <ArrowUpRight size={13} />
          </button>
        </nav>
        <button
          className="mobile-menu-button"
          aria-label={mobileMenu ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X size={18} /> : <Menu size={18} />}
        </button>
        {mobileMenu && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <button
                key={item}
                className={view === item ? "active" : ""}
                onClick={() => goTo(item)}
              >
                {item === "Poetry & Stories"
                  ? "Poetry & Stories / रचनाएँ"
                  : item === "About"
                    ? "About / परिचय"
                    : item === "Connect"
                      ? "Connect / संपर्क"
                      : "Home / घर"}
              </button>
            ))}
          </nav>
        )}
      </header>

      {view === "Home" && (
        <>
          <section className="page-shell home-hero">
            <div className="hero-copy">
              <div className="eyebrow">A small place for words</div>
              <h1 className="serif">
                Stay a little.<br />
                <em>Read slowly.</em>
                <span className="hindi-hero" lang="hi">ठहरिए ज़रा। धीरे पढ़िए।</span>
              </h1>
              <p className="hero-intro">
                A quiet corner for poems, stories, and the thoughts that arrive between them.
              </p>
              <p className="hero-intro hero-intro-hi" lang="hi">
                कविताओं, कहानियों और उनके बीच उतरते ख़यालों के लिए एक शांत-सा कोना।
              </p>
              <div className="hero-cta-row">
                <button className="solid-action" onClick={() => goTo("Poetry & Stories")}>
                  Wander through the writing <ArrowRight size={14} />
                </button>
                <button
                  className="text-action"
                  onClick={() =>
                    document.getElementById("today-poem")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Today’s poem <ArrowDown size={13} />
                </button>
              </div>
            </div>
            <div className="hero-art">
              <img
                src="/__mockup/images/poetry-still-life.png"
                alt="An open notebook in soft afternoon light"
              />
              <span className="art-index">आ</span>
              <span className="art-caption">A page, a pause, a little light</span>
            </div>
          </section>

          <section className="feature-band" id="today-poem">
            <div className="page-shell feature-grid">
              <div className="feature-note">
                <div className="eyebrow">A thought to keep</div>
                <blockquote className="serif">
                  “Let the quiet have its own language.”
                  <span className="quote-hi" lang="hi">“ख़ामोशी को भी अपनी भाषा रखने दें।”</span>
                </blockquote>
                <cite>For unhurried afternoons / धीमी दोपहरों के नाम</cite>
              </div>
              <article className="feature-poem">
                <div className="poem-meta">
                  <span>Poem of the day / आज की कविता</span>
                  <span>01 — 04</span>
                </div>
                <h2 className="serif">The light stays</h2>
                <div className="poem-hi-title" lang="hi">रोशनी ठहरती है</div>
                <p className="poem-lines">
                  Even after the cup is empty,<br />
                  the warmth remembers the hands.<br />
                  Even after the words are gone,<br />
                  the room keeps a little light.
                </p>
                <p className="poem-lines poem-lines-hi" lang="hi">
                  प्याला ख़ाली होने के बाद भी,<br />
                  गरमाहट हाथों को याद रखती है।<br />
                  शब्द चले जाने के बाद भी,<br />
                  कमरे में थोड़ी रोशनी रहती है।
                </p>
                <div className="feature-bottom">
                  <span className="rule" />
                  <button
                    className="quiet-link"
                    onClick={() =>
                      setSelectedPiece({
                        ...pieces[0],
                        title: "The light stays",
                        titleHindi: "रोशनी ठहरती है",
                        type: "Poem",
                        language: "English",
                        date: "Poem of the day",
                        excerpt: "Even after the cup is empty, the warmth remembers the hands.",
                        translation: "प्याला ख़ाली होने के बाद भी, गरमाहट हाथों को याद रखती है।",
                        read: "Even after the cup is empty,\nthe warmth remembers the hands.\nEven after the words are gone,\nthe room keeps a little light.",
                      })
                    }
                  >
                    Read this poem <ArrowRight size={13} />
                  </button>
                </div>
              </article>
            </div>
          </section>

          <section className="page-shell intro-strip">
            <div className="intro-mark" aria-hidden="true">आ.</div>
            <div className="intro-text">
              <div className="eyebrow">A note from the writer</div>
              <h2 className="serif">Hello, I’m glad you found your way here.</h2>
              <p>
                I’m a freelance writer, content creator, and poet drawn to the details we almost miss:
                the last light on a wall, a word that changes shape in another language, the kindness
                of an ordinary day.
              </p>
              <p className="hindi-copy" lang="hi">
                मैं स्वतंत्र लेखन करती हूँ, content बनाती हूँ और कविताएँ लिखती हूँ। उन छोटी बातों की
                ओर लौटती हूँ जिन्हें हम अक्सर अनदेखा कर देते हैं।
              </p>
              <button className="quiet-link" onClick={() => goTo("About")}>
                A little more about me / मेरे बारे में <ArrowRight size={13} />
              </button>
            </div>
          </section>
        </>
      )}

      {view === "Poetry & Stories" && (
        <section className="page-shell">
          <div className="page-heading">
            <div className="eyebrow">The reading room / पाठ-कक्ष</div>
            <h1 className="serif">Poetry & Stories</h1>
            <p>
              A shelf of small worlds, in Hindi and English. Choose what you’d like to read, then
              take your time.
            </p>
            <p className="hindi-subtitle" lang="hi">
              हिंदी और अंग्रेज़ी में कुछ छोटी दुनिया। अपनी पसंद चुनिए, फिर थोड़ा ठहरकर पढ़िए।
            </p>
          </div>
          <div className="filters">
            <div className="filter-group" aria-label="Filter by language">
              <span className="filter-label">Language / भाषा</span>
              {(["All", "Hindi", "English"] as const).map((item) => (
                <button
                  key={item}
                  className={`filter-chip ${language === item ? "active" : ""}`}
                  onClick={() => setLanguage(item)}
                >
                  {item === "All" ? "All / सभी" : item === "Hindi" ? "Hindi / हिंदी" : "English"}
                </button>
              ))}
            </div>
            <div className="filter-group" aria-label="Filter by writing type">
              <span className="filter-label">Form / विधा</span>
              {(["All", "Poem", "Story", "Reflection"] as const).map((item) => (
                <button
                  key={item}
                  className={`filter-chip ${kind === item ? "active" : ""}`}
                  onClick={() => setKind(item)}
                >
                  {item === "All"
                    ? "All / सभी"
                    : item === "Poem"
                      ? "Poems / कविताएँ"
                      : item === "Story"
                        ? "Stories / कहानियाँ"
                        : "Reflections / विचार"}
                </button>
              ))}
            </div>
          </div>
          <div className="piece-grid">
            {filteredPieces.length ? (
              filteredPieces.map((piece) => (
                <button
                  className="piece-card"
                  key={piece.title}
                  onClick={() => setSelectedPiece(piece)}
                >
                  <div className="piece-card-top">
                    <span>{piece.type} / {piece.language}</span>
                    <BookOpen size={14} />
                  </div>
                  <h2 className="serif">{piece.title}</h2>
                  <p className="piece-title-hi" lang="hi">{piece.titleHindi}</p>
                  <p className="piece-excerpt" lang={piece.language === "Hindi" ? "hi" : "en"}>
                    {piece.excerpt}
                  </p>
                  {piece.translation && (
                    <p className="piece-translation" lang={piece.language === "Hindi" ? "en" : "hi"}>
                      {piece.translation}
                    </p>
                  )}
                  <div className="card-bottom">
                    <span>{piece.date}</span>
                    <ArrowUpRight size={14} />
                  </div>
                </button>
              ))
            ) : (
              <div className="empty-results">
                No pieces in this combination yet. Try another filter. / इस मेल में अभी कोई रचना नहीं—
                दूसरा फ़िल्टर चुनें।
              </div>
            )}
          </div>
        </section>
      )}

      {view === "About" && (
        <section className="page-shell">
          <div className="page-heading">
            <div className="eyebrow">The person behind the pages / पन्नों के पीछे</div>
            <h1 className="serif">A life, in many drafts.</h1>
            <p>Writing is how I make room for what I’m still learning to name.</p>
            <p className="hindi-subtitle" lang="hi">
              लेखन, उन बातों के लिए जगह बनाना है जिन्हें नाम देना मैं अभी सीख रही हूँ।
            </p>
          </div>
          <div className="about-layout">
            <div className="about-portrait">
              <img
                src="/__mockup/images/poetry-still-life.png"
                alt="A notebook and blossoms in a quiet writing space"
              />
              <div className="about-caption">A desk that makes room / एक खुली मेज़</div>
            </div>
            <div className="about-copy">
              <div className="eyebrow">A gentle introduction</div>
              <h2 className="serif">Between two languages, I found a home for my voice.</h2>
              <p>
                I’m a freelance writer, content creator, and poet. I move between Hindi and English,
                listening for the small shifts in feeling that happen when a thought crosses from one
                language into another.
              </p>
              <p lang="hi">
                मैं स्वतंत्र लेखिका, content creator और कवयित्री हूँ। हिंदी और अंग्रेज़ी के बीच
                आवाजाही करते हुए, उन भावों को सुनती हूँ जो भाषा बदलते ही थोड़ा नया रूप ले लेते हैं।
              </p>
              <p>
                This space is my open notebook: poems beside reflections, stories beside the ordinary
                details that stay with us. I hope you find a line that feels like company.
              </p>
              <p lang="hi">
                यह जगह मेरी खुली नोटबुक है—कविताएँ, विचार, कहानियाँ और रोज़मर्रा के वे पल जो साथ रह
                जाते हैं। उम्मीद है, कोई पंक्ति यहाँ आपकी हमसफ़र बनेगी।
              </p>
              <div className="journey">
                <div><strong>Freelance writer</strong>Words shaped with care / सधे हुए शब्द</div>
                <div><strong>Content creator</strong>Stories made to connect / जुड़ती हुई कहानियाँ</div>
                <div><strong>Poet</strong>Listening in two tongues / दो भाषाओं में सुनना</div>
              </div>
              <button className="quiet-link" onClick={() => goTo("Connect")}>
                Share a thought with me / अपनी बात लिखें <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </section>
      )}

      {view === "Connect" && (
        <section className="page-shell">
          <div className="page-heading">
            <div className="eyebrow">The door is open / दरवाज़ा खुला है</div>
            <h1 className="serif">Let’s begin with a note.</h1>
            <p>
              For literary submissions, thoughtful collaborations, or simply a line you’d like to
              leave here.
            </p>
            <p className="hindi-subtitle" lang="hi">
              रचनाएँ भेजने, किसी सुंदर सहयोग की शुरुआत करने या बस एक बात कहने के लिए।
            </p>
          </div>
          <div className="connect-layout">
            <div className="connect-copy">
              <div className="eyebrow">For readers & fellow makers</div>
              <h2 className="serif">Good things often start with a few honest words.</h2>
              <p>
                If you’d like to share your writing, suggest a collaboration, or tell me what stayed
                with you after reading, I’d love to hear from you.
              </p>
              <p lang="hi">
                अपनी रचना साझा करनी हो, किसी साथ काम करने का विचार हो या पढ़ने के बाद मन में ठहरी
                बात—आपका संदेश यहाँ स्वागत पाएगा।
              </p>
              <p>
                Use the editable details below to add the writer’s real contact information before
                publishing. No contact details have been supplied yet.
              </p>
              <div style={{ marginTop: 24, borderTop: "1px solid var(--line)", paddingTop: 18 }}>
                <label
                  style={{
                    display: "block",
                    color: "#778073",
                    fontSize: 10,
                    letterSpacing: ".08em",
                    marginBottom: 7,
                  }}
                >
                  WRITER’S EMAIL / लेखक का ईमेल
                </label>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Add an email address here / ईमेल यहाँ जोड़ें"
                  aria-label="Writer email placeholder"
                  style={{
                    maxWidth: 360,
                    width: "100%",
                    border: "0",
                    borderBottom: "1px solid #c9cec3",
                    background: "transparent",
                    padding: "9px 0",
                    outline: "none",
                    color: "var(--ink)",
                    fontSize: 12,
                  }}
                />
                <label
                  style={{
                    display: "block",
                    color: "#778073",
                    fontSize: 10,
                    letterSpacing: ".08em",
                    margin: "17px 0 7px",
                  }}
                >
                  SOCIAL HANDLE / सोशल हैंडल
                </label>
                <input
                  value={handle}
                  onChange={(event) => setHandle(event.target.value)}
                  placeholder="Add a social handle here / सोशल हैंडल यहाँ जोड़ें"
                  aria-label="Writer social handle placeholder"
                  style={{
                    maxWidth: 360,
                    width: "100%",
                    border: "0", **…**

_This response is too long to display in full._
