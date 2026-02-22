"use client";

import { useState, useEffect, useRef, useCallback, createContext, useContext, useMemo } from "react";

// ═══════════════════════════════════════════════════════════
// T U L I — Artisan Brand Platform v2.0
// Premium · Cinematic · Editorial · Storytelling-first
// ═══════════════════════════════════════════════════════════

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1920&q=85&auto=format",
  heroAlt: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1920&q=85&auto=format",
  artisan1: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800&q=80&auto=format",
  artisan2: "https://images.unsplash.com/photo-1621274403997-37aace184f49?w=800&q=80&auto=format",
  artisan3: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&auto=format",
  blockPrint1: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&q=80&auto=format",
  blockPrint2: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80&auto=format",
  brass1: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&q=80&auto=format",
  brass2: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80&auto=format",
  textile1: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80&auto=format",
  textile2: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&q=80&auto=format",
  saree: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&auto=format",
  monsoon: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=85&auto=format",
  dawn: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85&auto=format",
  earth: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&q=85&auto=format",
  workshop: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=85&auto=format",
  hands: "https://images.unsplash.com/photo-1621274403997-37aace184f49?w=1200&q=85&auto=format",
};

// ── DATA ──

const ARTISANS = [
  {
    id: "meera-devi", name: "Meera Devi", craft: "Block Printing", region: "Jaipur, Rajasthan",
    bio: "Third-generation block printer preserving 400-year-old Sanganer traditions. Each piece takes 3–7 days of meticulous hand-stamping with carved teak blocks.",
    story: "Meera learned the art of block printing at age eight, sitting beside her grandmother in their courtyard workshop. Today, she leads a collective of twelve women artisans, each carrying forward patterns that have been in their families for generations. Her signature indigo dyes are made from natural neel plants, crushed and fermented for forty days.",
    quote: "Every imperfection in a hand-printed textile is proof that a human being cared enough to create it.",
    yearsOfPractice: 28, image: IMAGES.artisan1,
  },
  {
    id: "rajan-kumar", name: "Rajan Kumar", craft: "Brass Metalwork", region: "Moradabad, Uttar Pradesh",
    bio: "Master metalsmith creating contemporary vessels using ancient lost-wax casting methods passed down through five generations.",
    story: "In the narrow lanes of Moradabad, known as Peetal Nagri — the City of Brass — Rajan's workshop hums with the rhythm of hammers on metal. Each vessel begins as a wax model, hand-sculpted, then encased in clay. When the mold is fired, the wax melts away, leaving space for molten brass to fill. No two pieces are ever identical.",
    quote: "Brass remembers the hand that shaped it. That memory lives in every curve.",
    yearsOfPractice: 35, image: IMAGES.artisan2,
  },
  {
    id: "lakshmi-bai", name: "Lakshmi Bai", craft: "Handloom Weaving", region: "Pochampally, Telangana",
    bio: "Ikat weaving master creating mesmerizing geometric patterns through resist-dyeing threads before they meet the loom.",
    story: "The click-clack of Lakshmi's loom begins before dawn and continues well past dusk. Pochampally Ikat — a UNESCO heritage craft — demands extraordinary precision: each thread is tied and dyed in exact patterns before weaving begins. A single saree can take three weeks. Lakshmi's patterns draw from temple architecture and the geometry of rice paddies.",
    quote: "The loom is my language. Every thread is a word, every pattern a story only cloth can tell.",
    yearsOfPractice: 40, image: IMAGES.artisan3,
  },
];

const COLLECTIONS = [
  { id: "monsoon-edit", title: "The Monsoon Edit", subtitle: "Rain-inspired indigos & earthy textures", description: "A curated collection celebrating the poetry of the Indian monsoon — deep indigos, rain-washed greys, and the rich earth tones that emerge when the first drops meet dry soil.", season: "Monsoon 2026", color: "#1a3a4a", image: IMAGES.monsoon, productIds: ["bp-001","hw-001","bm-002"] },
  { id: "first-light", title: "First Light", subtitle: "Dawn-inspired brass & warm textiles", description: "Pieces that capture the golden warmth of early morning — hand-polished brass that catches light like sunrise, and textiles in saffron, turmeric, and soft cream.", season: "Spring 2026", color: "#8B6914", image: IMAGES.dawn, productIds: ["bm-001","hw-002","bp-002"] },
  { id: "earth-altar", title: "Earth & Altar", subtitle: "Sacred geometry in everyday objects", description: "Where devotion meets daily life. Temple-inspired patterns in brass, cloth, and natural dyes — objects that transform mundane rituals into moments of quiet reverence.", season: "Year-round", color: "#5C3D2E", image: IMAGES.earth, productIds: ["bm-001","bp-001","hw-001"] },
];

const PRODUCTS = [
  { id: "bp-001", name: "Indigo Dabu Table Runner", artisanId: "meera-devi", craft: "Block Printing", price: 2400, originalPrice: null, description: "Hand-printed with carved teak blocks using the ancient Dabu mud-resist technique. Each piece undergoes seven stages of printing and washing, creating layers of indigo that deepen with every wash.", details: ["100% handspun cotton","Natural indigo & Dabu mud-resist","180cm × 35cm","7-stage printing process","Slight variations are marks of authenticity"], careInstructions: "Hand wash cold with mild soap. Dry in shade. Iron on reverse.", timeToCreate: "3–5 days", tag: "Bestseller", colors: ["Deep Indigo","Soft Indigo"], inStock: true, image: IMAGES.blockPrint1 },
  { id: "bp-002", name: "Saffron Jaal Cushion Set", artisanId: "meera-devi", craft: "Block Printing", price: 1800, originalPrice: 2200, description: "A pair of cushion covers featuring the intricate 'jaal' (net) pattern, hand-stamped in warm saffron and turmeric tones on unbleached cotton.", details: ["Set of 2 covers","100% organic cotton","Natural vegetable dyes","45cm × 45cm each","Zip closure"], careInstructions: "Gentle machine wash. Avoid direct sunlight when drying.", timeToCreate: "2–3 days", tag: "New", colors: ["Saffron","Turmeric"], inStock: true, image: IMAGES.blockPrint2 },
  { id: "bm-001", name: "Ceremonial Brass Diya Set", artisanId: "rajan-kumar", craft: "Brass Metalwork", price: 3200, originalPrice: null, description: "A set of three hand-cast brass diyas with lotus petal bases. Created using the lost-wax method — each lamp is unique, carrying the subtle textures of hand-sculpted wax originals.", details: ["Set of 3 diyas","Pure brass, lost-wax cast","Heights: 6cm, 8cm, 10cm","Hand-polished satin finish","Develops a living patina over time"], careInstructions: "Clean with lemon and salt for brightness, or let natural patina develop.", timeToCreate: "5–7 days", tag: "Signature", colors: ["Natural Brass"], inStock: true, image: IMAGES.brass1 },
  { id: "bm-002", name: "Rain Vessel", artisanId: "rajan-kumar", craft: "Brass Metalwork", price: 4800, originalPrice: 5500, description: "A sculptural brass vase with a hammered rain-texture finish. The surface is created by thousands of individual hammer strikes, each catching light differently — like rain on still water.", details: ["Pure brass, hand-hammered","Height: 24cm, Diameter: 12cm","Watertight for fresh flowers","4 days of hammering","Signed by artisan"], careInstructions: "Wipe with soft dry cloth. Water spots add to the rain aesthetic.", timeToCreate: "4 days", tag: "Limited Edition", colors: ["Hammered Brass","Oxidized Brass"], inStock: true, image: IMAGES.brass2 },
  { id: "hw-001", name: "Midnight Ikat Throw", artisanId: "lakshmi-bai", craft: "Handloom Weaving", price: 5600, originalPrice: null, description: "A generous throw blanket woven in the Pochampally double-ikat technique — where both warp and weft threads are resist-dyed before weaving. The geometric pattern floats between layers of midnight blue and cream.", details: ["100% handloom cotton","Double-ikat technique","200cm × 150cm","Natural dyes","UNESCO Heritage craft"], careInstructions: "Dry clean recommended for first wash. Subsequently, gentle hand wash in cold water.", timeToCreate: "15–21 days", tag: "Heritage", colors: ["Midnight Blue","Storm Grey"], inStock: true, image: IMAGES.textile1 },
  { id: "hw-002", name: "Temple Steps Saree", artisanId: "lakshmi-bai", craft: "Handloom Weaving", price: 8500, originalPrice: null, description: "A masterwork saree featuring the 'temple steps' border pattern — inspired by the stepped architecture of South Indian gopurams. Woven in warm cream with burnt sienna borders.", details: ["Pure silk-cotton blend","Single-ikat with supplementary weft borders","5.5 meters with running blouse","Temple steps & diamond motifs","Certificate of authenticity"], careInstructions: "Dry clean only. Store folded in muslin.", timeToCreate: "21–30 days", tag: "Masterwork", colors: ["Cream & Sienna"], inStock: true, image: IMAGES.saree },
];

const PROMOTIONS = [
  { id: "promo-1", code: "FIRSTCRAFT", discount: 15, type: "percentage", description: "15% off your first order", applicableProducts: "all", active: true },
  { id: "promo-2", code: null, discount: null, type: "sale", description: "Monsoon Sale", applicableProducts: ["bp-002","bm-002"], active: true },
];

const getArtisan = (id) => ARTISANS.find((a) => a.id === id);
const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
const getCollectionProducts = (col) => col.productIds.map(getProduct).filter(Boolean);
const formatPrice = (p) => `₹${p.toLocaleString("en-IN")}`;
const getProductPromo = (pid) => PROMOTIONS.find((p) => p.active && p.type === "sale" && (p.applicableProducts === "all" || p.applicableProducts.includes(pid)));

// ═══════════════════════════════════════════════
// THEME SYSTEM
// ═══════════════════════════════════════════════

function getCSS(isDark) {
  const d = isDark;
  return {
    heading: {
      fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)",
      fontWeight: 300,
      color: d ? "#EDE8DF" : "#171412",
      letterSpacing: "-0.02em",
      lineHeight: 1.1,
    },
    body: {
      fontFamily: "var(--font-karla, 'Karla', sans-serif)",
      fontWeight: 400,
      color: d ? "#9B958A" : "#555248",
      lineHeight: 1.8,
      fontSize: "15.5px",
    },
    label: {
      fontFamily: "var(--font-karla, 'Karla', sans-serif)",
      fontSize: "10px",
      letterSpacing: "3px",
      textTransform: "uppercase",
      fontWeight: 600,
    },
    // Semantic colors — swap with theme
    dark: d ? "#EDE8DF" : "#171412",
    mid: d ? "#9B958A" : "#555248",
    light: d ? "#6B665D" : "#A39E93",
    cream: d ? "#0C0B09" : "#FAF8F4",
    gold: d ? "#D4B96E" : "#B8960C",
    goldHighlight: "#D4B545",
    divider: d ? "rgba(237,232,223,0.07)" : "#E8E3DA",
    // Backgrounds
    bg: d ? "#0C0B09" : "#FAF8F4",
    bgAlt: d ? "#131210" : "#F0EBE1",
    surface: d ? "#1A1815" : "#FFFFFF",
    darkBg: d ? "#070605" : "#171412",
    // Nav
    navBg: d ? "rgba(12,11,9,0.92)" : "rgba(250,248,244,0.92)",
    // Hero
    heroOverlay: d
      ? "linear-gradient(180deg, rgba(12,11,9,0.3) 0%, rgba(12,11,9,0.6) 60%, rgba(12,11,9,0.9) 100%)"
      : "linear-gradient(180deg, rgba(23,20,18,0.3) 0%, rgba(23,20,18,0.6) 60%, rgba(23,20,18,0.85) 100%)",
    // Shadows
    cardShadow: d ? "0 24px 64px rgba(0,0,0,0.4)" : "0 24px 64px rgba(23,20,18,0.07)",
    softShadow: d ? "0 4px 24px rgba(0,0,0,0.3)" : "0 4px 24px rgba(23,20,18,0.05)",
    // Fixed colors for always-dark sections (hero, footer, etc.)
    textOnDark: "#EDE8DF",
    textOnDarkSoft: "rgba(237,232,223,0.65)",
    textOnDarkMuted: "rgba(237,232,223,0.4)",
    // Scrollbar
    scrollThumb: d ? "#2A2622" : "#C8C3B8",
    // Misc
    imgPlaceholder: d ? "#1A1815" : "#E8E3DA",
    btnPrimaryBg: d ? "#EDE8DF" : "#171412",
    btnPrimaryText: d ? "#0C0B09" : "#FAF8F4",
  };
}

// ── CONTEXT ──
const AppContext = createContext();
const useApp = () => useContext(AppContext);

// ── EASING ──
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_HOVER = "cubic-bezier(0.4, 0, 0.2, 1)";

// ── HOOKS ──

function useInView(opts = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1, ...opts }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useParallax(speed = 0.12) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let raf;
    const handler = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      setOffset((center - viewCenter) * speed);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(handler); };
    window.addEventListener("scroll", onScroll, { passive: true });
    handler();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [speed]);
  return [ref, offset];
}

// ═══════════════════════════════════════════════
// SHARED UI COMPONENTS
// ═══════════════════════════════════════════════

function Reveal({ children, delay = 0, direction = "up", className = "", style = {} }) {
  const [ref, vis] = useInView();
  const transforms = {
    up: "translateY(36px)", down: "translateY(-36px)",
    left: "translateX(48px)", right: "translateX(-48px)",
    none: "none", scale: "scale(0.97)",
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : transforms[direction],
      transition: `opacity 1s ${EASE} ${delay}s, transform 1s ${EASE} ${delay}s`,
      willChange: "opacity, transform",
      ...style,
    }}>{children}</div>
  );
}

function GrainOverlay() {
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.025, background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, mixBlendMode: "multiply" }} />;
}

function Divider({ width = "48px", color, style: s = {} }) {
  const { css } = useApp();
  return <div style={{ width, height: "1px", background: color || css.gold, ...s }} />;
}

function Tag({ children, variant = "default" }) {
  const { css } = useApp();
  const variants = {
    default: { background: css.btnPrimaryBg, color: css.btnPrimaryText },
    gold: { background: css.gold, color: "#fff" },
    outline: { background: "transparent", color: css.dark, border: `1px solid ${css.divider}` },
    sale: { background: "#A63D2F", color: "#fff" },
  };
  return <span style={{ ...variants[variant], padding: "5px 14px", fontSize: "9px", ...css.label, letterSpacing: "1.5px", display: "inline-block" }}>{children}</span>;
}

function Img({ src, alt = "", aspect = "3/4", style: s = {} }) {
  const { css } = useApp();
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ aspectRatio: aspect, overflow: "hidden", background: css.imgPlaceholder, position: "relative", ...s }}>
      <img
        src={src} alt={alt} loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          opacity: loaded ? 1 : 0, transition: `opacity 0.7s ${EASE_HOVER}`,
          transform: "scale(1.01)",
        }}
      />
    </div>
  );
}

function HoverImg({ src, alt = "", aspect = "3/4", style: s = {} }) {
  const { css } = useApp();
  const [hov, setHov] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ aspectRatio: aspect, overflow: "hidden", background: css.imgPlaceholder, position: "relative", ...s }}
    >
      <img
        src={src} alt={alt} loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          opacity: loaded ? 1 : 0,
          transform: hov ? "scale(1.05)" : "scale(1)",
          transition: `transform 0.8s ${EASE}, opacity 0.6s ${EASE_HOVER}`,
        }}
      />
    </div>
  );
}

function CraftBadge({ craft }) {
  const { css } = useApp();
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "6px 14px", border: `1px solid ${css.divider}`, ...css.label, fontSize: "9px", color: css.light }}>
      <span style={{ width: 4, height: 4, borderRadius: "50%", background: css.gold }} />{craft}
    </span>
  );
}

function SectionLabel({ children, color }) {
  const { css } = useApp();
  return <span style={{ ...css.label, color: color || css.light, display: "block" }}>{children}</span>;
}

function ThemeToggle({ color }) {
  const { isDark, toggleTheme } = useApp();
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        background: "none", border: "none", cursor: "pointer",
        padding: 8, display: "flex", alignItems: "center", justifyContent: "center",
        transition: `opacity 0.3s ease`,
        opacity: 0.75,
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = "1"}
      onMouseLeave={e => e.currentTarget.style.opacity = "0.75"}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: `all 0.5s ${EASE}` }}>
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
}

// ── PRODUCT CARD ──

function ProductCard({ product, index = 0 }) {
  const { navigate, css } = useApp();
  const [hov, setHov] = useState(false);
  const artisan = getArtisan(product.artisanId);
  const promo = getProductPromo(product.id);
  const hasDiscount = product.originalPrice || promo;

  return (
    <Reveal delay={index * 0.08}>
      <div
        onClick={() => navigate("product", product.id)}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ cursor: "pointer", position: "relative" }}
      >
        <div style={{ position: "relative", marginBottom: "22px" }}>
          <HoverImg src={product.image} alt={product.name} aspect="3/4" />
          <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 8 }}>
            {product.tag && <Tag variant={product.tag === "Limited Edition" ? "gold" : "default"}>{product.tag}</Tag>}
            {hasDiscount && <Tag variant="sale">Sale</Tag>}
          </div>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px",
            background: "linear-gradient(transparent, rgba(23,20,18,0.7))",
            opacity: hov ? 1 : 0, transform: hov ? "translateY(0)" : "translateY(8px)",
            transition: `all 0.5s ${EASE}`,
          }}>
            <span style={{ ...css.label, fontSize: "9px", color: "rgba(250,248,244,0.9)", letterSpacing: "2.5px" }}>View Details →</span>
          </div>
        </div>
        <CraftBadge craft={product.craft} />
        <h3 style={{ ...css.heading, fontSize: "21px", fontWeight: 400, margin: "14px 0 6px" }}>{product.name}</h3>
        <p style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: "12px", color: css.light, marginBottom: "12px", letterSpacing: "0.3px" }}>
          by {artisan?.name} · {artisan?.region}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: "17px", fontWeight: 600, color: css.dark }}>{formatPrice(product.price)}</span>
          {product.originalPrice && <span style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: "14px", color: css.light, textDecoration: "line-through" }}>{formatPrice(product.originalPrice)}</span>}
        </div>
      </div>
    </Reveal>
  );
}

// ═══════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════

function Navbar() {
  const { navigate, currentPage, cart, css, isDark } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = currentPage === "home";
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Shop", page: "shop" },
    { label: "Collections", page: "collections" },
    { label: "Artisans", page: "artisans" },
    { label: "Our Story", page: "story" },
  ];

  const navTextColor = isTransparent ? "rgba(237,232,223,0.75)" : css.light;
  const navActiveColor = isTransparent ? css.textOnDark : css.dark;
  const brandColor = isTransparent ? css.textOnDark : css.dark;
  const brandSubColor = isTransparent ? "rgba(237,232,223,0.4)" : css.light;

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "14px 40px" : "22px 40px",
        background: isTransparent ? "transparent" : css.navBg,
        backdropFilter: isTransparent ? "none" : "blur(24px) saturate(1.2)",
        borderBottom: isTransparent ? "none" : `1px solid ${css.divider}`,
        transition: `all 0.6s ${EASE}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div onClick={() => navigate("home")} style={{ cursor: "pointer", display: "flex", alignItems: "baseline", gap: "10px" }}>
          <span style={{
            fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)", fontSize: "30px", fontWeight: 600,
            color: brandColor, letterSpacing: "-0.5px",
            transition: `color 0.5s ${EASE_HOVER}`,
          }}>Tuli</span>
          <span style={{
            ...css.label, fontSize: "7px", letterSpacing: "3.5px",
            color: brandSubColor,
            transition: `color 0.5s ${EASE_HOVER}`,
          }}>Artisan</span>
        </div>

        <div className="tuli-desktop-nav" style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {links.map((l) => (
            <span key={l.page} onClick={() => navigate(l.page)} style={{
              ...css.label, fontSize: "10px", letterSpacing: "2px",
              color: currentPage === l.page ? navActiveColor : navTextColor,
              cursor: "pointer", transition: `color 0.4s ${EASE_HOVER}`,
              borderBottom: currentPage === l.page ? `1px solid ${navActiveColor}` : "1px solid transparent",
              paddingBottom: "3px",
            }}
            onMouseEnter={(e) => e.target.style.color = navActiveColor}
            onMouseLeave={(e) => e.target.style.color = currentPage === l.page ? navActiveColor : navTextColor}
            >{l.label}</span>
          ))}

          <ThemeToggle color={isTransparent ? css.textOnDark : css.dark} />

          <span onClick={() => navigate("cart")} style={{
            ...css.label, fontSize: "10px", letterSpacing: "2px", position: "relative", cursor: "pointer",
            color: navTextColor, transition: `color 0.4s ${EASE_HOVER}`,
          }}
          onMouseEnter={(e) => e.target.style.color = navActiveColor}
          onMouseLeave={(e) => e.target.style.color = navTextColor}
          >
            Bag
            {cart.length > 0 && <span style={{
              position: "absolute", top: -8, right: -16, width: 18, height: 18, borderRadius: "50%",
              background: css.gold, color: "#fff", fontSize: "9px", fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{cart.length}</span>}
          </span>
        </div>

        <div className="tuli-mobile-controls" style={{ display: "none", alignItems: "center", gap: "8px" }}>
          <ThemeToggle color={menuOpen ? css.dark : (isTransparent ? css.textOnDark : css.dark)} />
          <div onClick={() => setMenuOpen(!menuOpen)} style={{
            cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", zIndex: 1001, padding: 4,
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: 22, height: "1.5px", display: "block",
                background: (menuOpen || !isTransparent) ? css.dark : css.textOnDark,
                transform: menuOpen ? (i === 0 ? "rotate(45deg) translateY(6.5px)" : i === 1 ? "scaleX(0)" : "rotate(-45deg) translateY(-6.5px)") : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
                transition: `all 0.4s ${EASE}`,
              }} />
            ))}
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999, background: css.bg,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "40px",
        }}>
          {links.map((l, i) => (
            <span key={l.page} onClick={() => { navigate(l.page); setMenuOpen(false); }} style={{
              ...css.heading, fontSize: "38px", fontWeight: 300, cursor: "pointer",
              opacity: 0, animation: `tuliSlideIn 0.6s ${EASE} ${i * 0.08}s forwards`,
            }}>{l.label}</span>
          ))}
          <span onClick={() => { navigate("cart"); setMenuOpen(false); }} style={{
            ...css.label, fontSize: "12px", color: css.gold, cursor: "pointer", marginTop: 8,
            opacity: 0, animation: `tuliSlideIn 0.6s ${EASE} ${links.length * 0.08}s forwards`,
          }}>Bag {cart.length > 0 && `(${cart.length})`}</span>
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════

function HomePage() {
  const { navigate, css } = useApp();
  const [parallaxRef, pOffset] = useParallax(0.12);

  return (
    <div>
      {/* ── HERO ── */}
      <section ref={parallaxRef} style={{
        minHeight: "105vh", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", inset: "-10%",
          backgroundImage: `url(${IMAGES.hero})`,
          backgroundSize: "cover", backgroundPosition: "center",
          transform: `translateY(${pOffset}px) scale(1.1)`,
          filter: "brightness(0.4) contrast(1.1)",
          transition: "transform 0.05s linear",
        }} />
        <div style={{ position: "absolute", inset: 0, background: css.heroOverlay }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "900px", padding: "0 32px" }}>
          <Reveal delay={0.4}>
            <Divider width="32px" color="rgba(212,181,69,0.5)" style={{ margin: "0 auto 24px" }} />
          </Reveal>
          <Reveal delay={0.6}>
            <SectionLabel color={css.textOnDarkMuted}>Where Craft Becomes Legacy</SectionLabel>
          </Reveal>
          <Reveal delay={0.8}>
            <h1 style={{
              ...css.heading, color: css.textOnDark,
              fontSize: "clamp(48px, 9vw, 100px)",
              margin: "24px 0 28px",
              fontWeight: 300,
            }}>
              Handcrafted by<br />
              <em style={{ fontStyle: "italic", color: css.goldHighlight }}>India&apos;s Finest</em><br />
              Artisans
            </h1>
          </Reveal>
          <Reveal delay={1.0}>
            <p style={{ ...css.body, color: css.textOnDarkSoft, maxWidth: "500px", margin: "0 auto 52px", fontSize: "16.5px", lineHeight: 1.85 }}>
              Every piece tells a story of heritage, patience, and mastery. Directly from artisan hands to your home.
            </p>
          </Reveal>
          <Reveal delay={1.2}>
            <div style={{ display: "flex", gap: "18px", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => navigate("shop")} className="tuli-btn-primary">Explore the Collection</button>
              <button onClick={() => navigate("story")} className="tuli-btn-ghost">Our Story</button>
            </div>
          </Reveal>
        </div>

        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", textAlign: "center", animation: "tuliBounce 3s ease infinite" }}>
          <span style={{ ...css.label, fontSize: "8px", letterSpacing: "4px", color: "rgba(237,232,223,0.2)" }}>Scroll</span>
          <div style={{ width: 1, height: 32, background: "linear-gradient(rgba(237,232,223,0.2), transparent)", margin: "10px auto 0" }} />
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section style={{ padding: "130px 32px", background: css.bg, textAlign: "center" }}>
        <Reveal>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <Divider width="32px" color={css.gold} style={{ margin: "0 auto 32px" }} />
            <h2 style={{ ...css.heading, fontSize: "clamp(26px, 4vw, 40px)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.45 }}>
              &ldquo;We don&apos;t sell products.<br />We preserve legacies.&rdquo;
            </h2>
            <p style={{ ...css.body, color: css.light, marginTop: "28px", maxWidth: "540px", margin: "28px auto 0" }}>
              Tuli connects you directly to master artisans — no middlemen, no markups, no mass production. Each piece is made to order, carrying centuries of tradition in every stitch, pour, and weave.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ padding: "80px 32px 120px", background: css.bg }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px", flexWrap: "wrap", gap: 16 }}>
              <div>
                <SectionLabel>Curated Selection</SectionLabel>
                <h2 style={{ ...css.heading, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 300, marginTop: "10px" }}>Featured Pieces</h2>
              </div>
              <span onClick={() => navigate("shop")} style={{ ...css.label, color: css.light, cursor: "pointer", borderBottom: `1px solid ${css.divider}`, paddingBottom: 3, fontSize: "10px", transition: `color 0.3s ease` }}
                onMouseEnter={e => e.target.style.color = css.gold}
                onMouseLeave={e => e.target.style.color = css.light}
              >View All →</span>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "40px" }}>
            {PRODUCTS.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── COLLECTION BANNER ── */}
      <section style={{ padding: "0 32px", background: css.bg }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal direction="scale">
            <div
              onClick={() => navigate("collection", "monsoon-edit")}
              style={{ position: "relative", overflow: "hidden", cursor: "pointer", minHeight: "460px", display: "flex", alignItems: "center" }}
            >
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${IMAGES.monsoon})`, backgroundSize: "cover", backgroundPosition: "center",
                filter: "brightness(0.4)", transition: `transform 0.7s ${EASE}`,
              }} className="tuli-zoom-img" />
              <div style={{ position: "relative", zIndex: 2, padding: "clamp(48px, 6vw, 88px) clamp(48px, 5vw, 88px)" }}>
                <SectionLabel color={css.textOnDarkMuted}>New Collection</SectionLabel>
                <h2 style={{ ...css.heading, color: css.textOnDark, fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 200, margin: "12px 0" }}>The Monsoon Edit</h2>
                <p style={{ ...css.body, color: css.textOnDarkSoft, maxWidth: "440px", fontStyle: "italic" }}>Rain-inspired indigos & earthy textures</p>
                <span style={{ ...css.label, color: css.goldHighlight, display: "inline-block", marginTop: 28, borderBottom: `1px solid ${css.goldHighlight}`, paddingBottom: 3, fontSize: "10px" }}>Explore Collection →</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ARTISAN SPOTLIGHT ── */}
      <section style={{ padding: "130px 32px", background: css.bg }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "72px" }}>
              <Divider width="32px" color={css.gold} style={{ margin: "0 auto 28px" }} />
              <SectionLabel>Meet the Makers</SectionLabel>
              <h2 style={{ ...css.heading, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 300, marginTop: 10 }}>Our Artisans</h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "32px" }}>
            {ARTISANS.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.12}>
                <div
                  onClick={() => navigate("artisan", a.id)}
                  className="tuli-card-hover"
                  style={{ cursor: "pointer", background: css.surface, overflow: "hidden", border: `1px solid ${css.divider}`, transition: `transform 0.6s ${EASE}, box-shadow 0.6s ${EASE_HOVER}` }}
                >
                  <HoverImg src={a.image} alt={a.name} aspect="4/3" />
                  <div style={{ padding: "32px 32px 36px" }}>
                    <CraftBadge craft={a.craft} />
                    <h3 style={{ ...css.heading, fontSize: "24px", fontWeight: 400, margin: "16px 0 6px" }}>{a.name}</h3>
                    <p style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: "12px", color: css.gold, letterSpacing: "0.5px", marginBottom: 16 }}>{a.region} · {a.yearsOfPractice} years</p>
                    <p style={{ ...css.body, fontSize: "14px", color: css.mid }}>{a.bio}</p>
                    <Divider width="28px" color={css.gold} style={{ marginTop: 24 }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{ padding: "88px 32px", background: css.bgAlt, borderTop: `1px solid ${css.divider}`, borderBottom: `1px solid ${css.divider}` }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, textAlign: "center" }}>
          {[
            { icon: "✦", label: "Handcrafted", desc: "Every piece made by hand" },
            { icon: "◈", label: "Direct Trade", desc: "80%+ goes to artisans" },
            { icon: "❋", label: "Heritage Crafts", desc: "Centuries-old techniques" },
            { icon: "◎", label: "Authenticated", desc: "Certificate of origin" },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div>
                <span style={{ fontSize: "24px", color: css.gold, display: "block", marginBottom: 4 }}>{t.icon}</span>
                <h4 style={{ ...css.label, color: css.dark, margin: "14px 0 8px", fontSize: "11px" }}>{t.label}</h4>
                <p style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: "13px", color: css.light }}>{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── SHOP ──

function ShopPage() {
  const { css } = useApp();
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("featured");
  const crafts = ["all", ...new Set(PRODUCTS.map(p => p.craft))];
  let filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.craft === filter);
  if (sort === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div style={{ paddingTop: 120, background: css.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <Reveal>
          <div style={{ marginBottom: 52 }}>
            <SectionLabel>The Collection</SectionLabel>
            <h1 style={{ ...css.heading, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 200, marginTop: 10 }}>Shop All</h1>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48, flexWrap: "wrap", gap: 16, borderBottom: `1px solid ${css.divider}`, paddingBottom: 22 }}>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {crafts.map(c => (
                <span key={c} onClick={() => setFilter(c)} style={{
                  ...css.label, fontSize: "10px", letterSpacing: "1.5px", cursor: "pointer",
                  color: filter === c ? css.dark : css.light, fontWeight: filter === c ? 700 : 500,
                  borderBottom: filter === c ? `1.5px solid ${css.dark}` : "1.5px solid transparent",
                  paddingBottom: 4, transition: `all 0.4s ${EASE_HOVER}`,
                }}>{c === "all" ? "All Crafts" : c}</span>
              ))}
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{
              fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: "12px", color: css.mid, background: css.bg,
              border: `1px solid ${css.divider}`, padding: "10px 18px", cursor: "pointer", outline: "none",
            }}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 40, paddingBottom: 120 }}>
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}

// ── PRODUCT DETAIL ──

function ProductPage({ id }) {
  const { navigate, addToCart, css } = useApp();
  const product = getProduct(id);
  const artisan = product ? getArtisan(product.artisanId) : null;
  const [selColor, setSelColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return <div style={{ paddingTop: 160, textAlign: "center", minHeight: "60vh", background: css.bg }}><p style={css.body}>Product not found</p></div>;

  const promo = getProductPromo(product.id);
  const handleAdd = () => { addToCart({ ...product, qty, selectedColor: product.colors[selColor] }); setAdded(true); setTimeout(() => setAdded(false), 2000); };

  return (
    <div style={{ paddingTop: 80, background: css.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 32px" }}>
        <Reveal>
          <div style={{ display: "flex", gap: 8, fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 12, color: css.light, marginBottom: 28 }}>
            <span onClick={() => navigate("home")} style={{ cursor: "pointer", transition: `color 0.3s ease` }} onMouseEnter={e => e.target.style.color = css.dark} onMouseLeave={e => e.target.style.color = css.light}>Home</span><span>/</span>
            <span onClick={() => navigate("shop")} style={{ cursor: "pointer", transition: `color 0.3s ease` }} onMouseEnter={e => e.target.style.color = css.dark} onMouseLeave={e => e.target.style.color = css.light}>Shop</span><span>/</span>
            <span style={{ color: css.dark }}>{product.name}</span>
          </div>
        </Reveal>
      </div>
      <div className="tuli-product-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 120px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 88, alignItems: "start" }}>
        <Reveal direction="left">
          <div style={{ position: "relative" }}>
            <Img src={product.image} alt={product.name} aspect="4/5" />
            {product.tag && <div style={{ position: "absolute", top: 24, left: 24 }}><Tag variant="gold">{product.tag}</Tag></div>}
          </div>
        </Reveal>
        <Reveal direction="right" delay={0.15}>
          <div>
            <CraftBadge craft={product.craft} />
            <h1 style={{ ...css.heading, fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 300, margin: "20px 0 10px" }}>{product.name}</h1>
            <p onClick={() => navigate("artisan", artisan?.id)} style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 13, color: css.light, cursor: "pointer", marginBottom: 28 }}>
              by <span style={{ color: css.gold, borderBottom: `1px solid ${css.gold}` }}>{artisan?.name}</span> · {artisan?.region}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
              <span style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 30, fontWeight: 600, color: css.dark }}>{formatPrice(product.price)}</span>
              {product.originalPrice && <span style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 18, color: css.light, textDecoration: "line-through" }}>{formatPrice(product.originalPrice)}</span>}
              {promo && <Tag variant="sale">On Sale</Tag>}
            </div>
            <Divider width="100%" color={css.divider} style={{ marginBottom: 28 }} />
            <p style={{ ...css.body, marginBottom: 32 }}>{product.description}</p>

            {product.colors.length > 1 && (
              <div style={{ marginBottom: 28 }}>
                <SectionLabel color={css.light}>Color — {product.colors[selColor]}</SectionLabel>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  {product.colors.map((c, i) => (
                    <button key={i} onClick={() => setSelColor(i)} style={{
                      padding: "10px 22px", border: selColor === i ? `1.5px solid ${css.dark}` : `1px solid ${css.divider}`,
                      background: "transparent", fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 12,
                      cursor: "pointer", color: css.dark, transition: `all 0.3s ${EASE_HOVER}`,
                    }}>{c}</button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
              <div style={{ display: "flex", border: `1px solid ${css.divider}`, alignItems: "center" }}>
                <button onClick={() => setQty(Math.max(1, qty-1))} style={{ width: 48, height: 52, border: "none", background: "transparent", fontSize: 18, cursor: "pointer", color: css.dark }}>−</button>
                <span style={{ width: 44, textAlign: "center", fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 14, color: css.dark }}>{qty}</span>
                <button onClick={() => setQty(qty+1)} style={{ width: 48, height: 52, border: "none", background: "transparent", fontSize: 18, cursor: "pointer", color: css.dark }}>+</button>
              </div>
              <button onClick={handleAdd} className="tuli-btn-primary" style={{ flex: 1, minWidth: 200, fontSize: 12 }}>
                {added ? "✓ Added to Bag" : "Add to Bag"}
              </button>
            </div>
            <p style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 12, color: css.light, marginBottom: 40 }}>
              ✦ Time to create: {product.timeToCreate} &nbsp;&nbsp; ◎ Certificate of authenticity included
            </p>
            <Divider width="100%" color={css.divider} />
            {[
              { title: "Details & Materials", content: product.details.join(" · ") },
              { title: "Care Instructions", content: product.careInstructions },
              { title: "Shipping & Returns", content: "Free shipping above ₹3,000. Handcrafted — allow 7–14 days. Returns within 7 days of delivery in original packaging." },
            ].map(s => <Accordion key={s.title} {...s} />)}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Accordion({ title, content }) {
  const { css } = useApp();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${css.divider}` }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0",
        background: "none", border: "none", cursor: "pointer", ...css.label, fontSize: "11px", letterSpacing: "1px", color: css.dark,
      }}>
        {title}
        <span style={{ transform: open ? "rotate(45deg)" : "none", transition: `transform 0.4s ${EASE}`, fontSize: 20, fontWeight: 300 }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: "hidden", transition: `max-height 0.5s ${EASE}` }}>
        <p style={{ ...css.body, fontSize: 13, paddingBottom: 22 }}>{content}</p>
      </div>
    </div>
  );
}

// ── COLLECTIONS ──

function CollectionsPage() {
  const { navigate, css } = useApp();
  return (
    <div style={{ paddingTop: 130, background: css.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 120px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <Divider width="32px" color={css.gold} style={{ margin: "0 auto 28px" }} />
            <h1 style={{ ...css.heading, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 200 }}>Collections</h1>
            <p style={{ ...css.body, color: css.light, maxWidth: 500, margin: "18px auto 0" }}>Thoughtfully curated edits that tell a story through craft, color, and heritage.</p>
          </div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1} direction="scale">
              <div onClick={() => navigate("collection", c.id)} style={{
                position: "relative", overflow: "hidden", cursor: "pointer", minHeight: 340, display: "flex", alignItems: "flex-end",
                transition: `transform 0.6s ${EASE}`,
              }}
              className="tuli-zoom-parent"
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.003)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url(${c.image})`, backgroundSize: "cover", backgroundPosition: "center",
                  filter: "brightness(0.38)", transition: `transform 0.8s ${EASE}`,
                }} className="tuli-zoom-img" />
                <div style={{ position: "relative", zIndex: 2, padding: "clamp(36px, 5vw, 72px)" }}>
                  <SectionLabel color={css.textOnDarkMuted}>{c.season}</SectionLabel>
                  <h2 style={{ ...css.heading, color: css.textOnDark, fontSize: "clamp(30px, 4vw, 54px)", fontWeight: 200, margin: "10px 0" }}>{c.title}</h2>
                  <p style={{ ...css.body, color: css.textOnDarkSoft, fontStyle: "italic", fontSize: 15 }}>{c.subtitle}</p>
                  <span style={{ ...css.label, color: css.goldHighlight, display: "inline-block", marginTop: 22, borderBottom: `1px solid ${css.goldHighlight}`, paddingBottom: 3, fontSize: 10 }}>{c.productIds.length} Pieces →</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function CollectionDetailPage({ id }) {
  const { css } = useApp();
  const col = COLLECTIONS.find(c => c.id === id);
  if (!col) return <div style={{ paddingTop: 160, textAlign: "center", background: css.bg }}><p>Not found</p></div>;
  const products = getCollectionProducts(col);
  return (
    <div style={{ paddingTop: 0, background: css.bg, minHeight: "100vh" }}>
      <section style={{ position: "relative", minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${col.image})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.32)" }} />
        <Reveal><div style={{ position: "relative", zIndex: 2, padding: "130px 32px 88px" }}>
          <SectionLabel color={css.textOnDarkMuted}>{col.season}</SectionLabel>
          <h1 style={{ ...css.heading, color: css.textOnDark, fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 200, margin: "14px 0" }}>{col.title}</h1>
          <p style={{ ...css.body, color: css.textOnDarkSoft, maxWidth: 540, margin: "0 auto" }}>{col.description}</p>
        </div></Reveal>
      </section>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 32px 120px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 40 }}>
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}

// ── ARTISANS ──

function ArtisansPage() {
  const { navigate, css } = useApp();
  return (
    <div style={{ paddingTop: 130, background: css.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 120px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <Divider width="32px" color={css.gold} style={{ margin: "0 auto 28px" }} />
            <h1 style={{ ...css.heading, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 200 }}>Our Artisans</h1>
            <p style={{ ...css.body, color: css.light, maxWidth: 540, margin: "18px auto 0" }}>Every piece is created by a master craftsperson — someone who has dedicated their life to preserving ancient techniques.</p>
          </div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
          {ARTISANS.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.12}>
              <div onClick={() => navigate("artisan", a.id)} className="tuli-artisan-row" style={{
                display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1.4fr" : "1.4fr 1fr", gap: 64, cursor: "pointer", alignItems: "center",
              }}>
                <div style={{ order: i % 2 === 0 ? 0 : 1 }} className="tuli-artisan-img">
                  <HoverImg src={a.image} alt={a.name} aspect="3/4" />
                </div>
                <div>
                  <CraftBadge craft={a.craft} />
                  <h2 style={{ ...css.heading, fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 300, margin: "20px 0 8px" }}>{a.name}</h2>
                  <p style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 13, color: css.gold, marginBottom: 20 }}>{a.region} · {a.yearsOfPractice} years of practice</p>
                  <p style={{ ...css.body, marginBottom: 28 }}>{a.bio}</p>
                  <p style={{ ...css.heading, fontSize: 17, fontStyle: "italic", color: css.light, borderLeft: `2px solid ${css.gold}`, paddingLeft: 20, lineHeight: 1.65 }}>&ldquo;{a.quote}&rdquo;</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArtisanDetailPage({ id }) {
  const { navigate, css } = useApp();
  const artisan = getArtisan(id);
  if (!artisan) return <div style={{ paddingTop: 160, textAlign: "center", background: css.bg }}><p>Not found</p></div>;
  const prods = PRODUCTS.filter(p => p.artisanId === id);
  return (
    <div style={{ paddingTop: 0, background: css.bg, minHeight: "100vh" }}>
      <section style={{ background: css.darkBg }}>
        <div className="tuli-artisan-hero" style={{ maxWidth: 1280, margin: "0 auto", padding: "110px 32px 88px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 72, alignItems: "center" }}>
          <Reveal direction="left"><Img src={artisan.image} alt={artisan.name} aspect="3/4" /></Reveal>
          <Reveal direction="right" delay={0.15}>
            <div>
              <CraftBadge craft={artisan.craft} />
              <h1 style={{ ...css.heading, color: css.textOnDark, fontSize: "clamp(34px, 4.5vw, 54px)", fontWeight: 200, margin: "20px 0 8px" }}>{artisan.name}</h1>
              <p style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 14, color: css.textOnDarkMuted, marginBottom: 32 }}>{artisan.region} · {artisan.yearsOfPractice} years</p>
              <Divider width="32px" color={css.gold} style={{ marginBottom: 32 }} />
              <p style={{ ...css.body, color: css.textOnDarkSoft, fontSize: 16, lineHeight: 2 }}>{artisan.story}</p>
              <p style={{ ...css.heading, fontSize: 20, fontStyle: "italic", color: css.goldHighlight, marginTop: 40, lineHeight: 1.65 }}>&ldquo;{artisan.quote}&rdquo;</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 32px 120px" }}>
        <Reveal><h2 style={{ ...css.heading, fontSize: 32, fontWeight: 300, marginBottom: 48 }}>Pieces by {artisan.name}</h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 40 }}>
          {prods.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </div>
  );
}

// ── OUR STORY ──

function StoryPage() {
  const { css } = useApp();
  return (
    <div style={{ paddingTop: 110, background: css.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "52px 32px 120px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 68 }}>
            <Divider width="32px" color={css.gold} style={{ margin: "0 auto 28px" }} />
            <SectionLabel>Est. 2026</SectionLabel>
            <h1 style={{ ...css.heading, fontSize: "clamp(38px, 5vw, 62px)", fontWeight: 200, marginTop: 14 }}>Our Story</h1>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Img src={IMAGES.workshop} alt="Workshop" aspect="16/7" style={{ marginBottom: 52 }} />
        </Reveal>

        <Reveal delay={0.2}>
          <div style={css.body}>
            <p style={{ marginBottom: 30 }}>Tuli was born from a simple revelation: some of the world&apos;s most extraordinary craftsmanship exists in India&apos;s villages, workshops, and homes — yet the artisans behind these marvels remain invisible to the people who would treasure their work most.</p>
            <p style={{ marginBottom: 30 }}>We set out to change that. Not by building another marketplace, but by creating a space where every product is a doorway into a story — of tradition, of patience, of mastery earned over decades.</p>

            <div style={{ background: css.darkBg, padding: "60px 52px", margin: "52px -16px", textAlign: "center" }}>
              <p style={{ ...css.heading, fontSize: "clamp(22px, 3vw, 32px)", fontStyle: "italic", color: css.goldHighlight, lineHeight: 1.55, fontWeight: 300 }}>
                &ldquo;In a world of mass production, the handmade is an act of resistance.&rdquo;
              </p>
            </div>

            <p style={{ marginTop: 52, marginBottom: 30 }}>At Tuli, we work directly with artisan families — no middlemen, no factory intermediaries. We pay fair prices upfront, not on commission. We tell their stories with the depth and respect they deserve.</p>

            <Img src={IMAGES.hands} alt="Artisan hands at work" aspect="16/9" style={{ margin: "44px 0" }} />

            <h2 style={{ ...css.heading, fontSize: 32, fontWeight: 300, margin: "56px 0 28px" }}>Our Principles</h2>
            {[
              { title: "Direct Trade", text: "80% or more of every sale goes directly to the artisan. No exploitative supply chains." },
              { title: "Slow Craft", text: "We don't rush. Every piece is made to order, honoring the time genuine craftsmanship demands." },
              { title: "Story First", text: "Every product page tells the human story — because context transforms an object into a treasure." },
              { title: "Living Heritage", text: "We support artisans in passing their skills to the next generation, ensuring these crafts survive and evolve." },
            ].map((p, i) => (
              <div key={i} style={{ marginBottom: 36 }}>
                <h3 style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 14, fontWeight: 700, color: css.dark, marginBottom: 10, letterSpacing: "0.3px" }}>{p.title}</h3>
                <p style={{ color: css.mid }}>{p.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ── CART ──

function CartPage() {
  const { cart, removeFromCart, navigate, css } = useApp();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div style={{ paddingTop: 130, background: css.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px 120px" }}>
        <Reveal><h1 style={{ ...css.heading, fontSize: 40, fontWeight: 300, marginBottom: 48 }}>Your Bag</h1></Reveal>
        {cart.length === 0 ? (
          <Reveal delay={0.15}><div style={{ textAlign: "center", padding: "88px 0" }}>
            <p style={{ ...css.body, color: css.light, marginBottom: 32 }}>Your bag is empty</p>
            <button onClick={() => navigate("shop")} className="tuli-btn-primary">Continue Shopping</button>
          </div></Reveal>
        ) : (
          <Reveal delay={0.15}><div>
            {cart.map((item, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: 22, alignItems: "center", padding: "28px 0", borderBottom: `1px solid ${css.divider}` }}>
                <Img src={item.image} alt={item.name} aspect="3/4" style={{ width: 80 }} />
                <div>
                  <h3 style={{ ...css.heading, fontSize: 17, fontWeight: 400, marginBottom: 6 }}>{item.name}</h3>
                  <p style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 12, color: css.light }}>{item.selectedColor} · Qty: {item.qty}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 17, fontWeight: 600, color: css.dark, marginBottom: 10 }}>{formatPrice(item.price * item.qty)}</p>
                  <button onClick={() => removeFromCart(i)} style={{ background: "none", border: "none", fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 11, color: css.light, cursor: "pointer", textDecoration: "underline" }}>Remove</button>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "36px 0", borderTop: `2px solid ${css.dark}`, marginTop: 10 }}>
              <span style={{ ...css.label, color: css.dark, fontSize: 12 }}>Total</span>
              <span style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 28, fontWeight: 600, color: css.dark }}>{formatPrice(total)}</span>
            </div>
            <button className="tuli-btn-primary" style={{ width: "100%", fontSize: 12 }}>Proceed to Checkout</button>
            <p style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 12, color: css.light, textAlign: "center", marginTop: 18 }}>Free shipping on orders above ₹3,000</p>
          </div></Reveal>
        )}
      </div>
    </div>
  );
}

// ── FOOTER ──

function Footer() {
  const { navigate, css } = useApp();
  return (
    <footer style={{ background: css.darkBg, color: css.textOnDark, padding: "92px 32px 44px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Divider width="48px" color={css.gold} style={{ marginBottom: 56 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 52, marginBottom: 72 }}>
          <div>
            <span style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)", fontSize: 28, fontWeight: 600, display: "block", color: css.textOnDark }}>Tuli</span>
            <p style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 13, lineHeight: 1.85, color: "rgba(237,232,223,0.45)", marginTop: 18, maxWidth: 280 }}>
              Connecting you directly to India&apos;s finest artisans. Every purchase sustains a centuries-old craft tradition.
            </p>
          </div>
          <div>
            <h4 style={{ ...css.label, fontSize: 9, color: "rgba(237,232,223,0.25)", marginBottom: 22 }}>Shop</h4>
            {["All Products", "Collections", "New Arrivals", "Gifts"].map(l => (
              <p key={l} onClick={() => navigate("shop")} style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 14, color: "rgba(237,232,223,0.55)", marginBottom: 14, cursor: "pointer", transition: "color 0.3s ease" }}
                onMouseEnter={e => e.target.style.color = "rgba(237,232,223,0.85)"}
                onMouseLeave={e => e.target.style.color = "rgba(237,232,223,0.55)"}
              >{l}</p>
            ))}
          </div>
          <div>
            <h4 style={{ ...css.label, fontSize: 9, color: "rgba(237,232,223,0.25)", marginBottom: 22 }}>About</h4>
            {[["Our Story","story"],["Artisans","artisans"],["Sustainability","story"],["Press","story"]].map(([l,p]) => (
              <p key={l} onClick={() => navigate(p)} style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 14, color: "rgba(237,232,223,0.55)", marginBottom: 14, cursor: "pointer", transition: "color 0.3s ease" }}
                onMouseEnter={e => e.target.style.color = "rgba(237,232,223,0.85)"}
                onMouseLeave={e => e.target.style.color = "rgba(237,232,223,0.55)"}
              >{l}</p>
            ))}
          </div>
          <div>
            <h4 style={{ ...css.label, fontSize: 9, color: "rgba(237,232,223,0.25)", marginBottom: 22 }}>Stay in touch</h4>
            <p style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 13, color: "rgba(237,232,223,0.45)", marginBottom: 18, lineHeight: 1.75 }}>Join for early access & 10% off your first order.</p>
            <div style={{ display: "flex" }}>
              <input type="email" placeholder="your@email.com" style={{ flex: 1, padding: "14px 16px", background: "rgba(237,232,223,0.05)", border: "1px solid rgba(237,232,223,0.1)", borderRight: "none", color: css.textOnDark, fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 13, outline: "none" }} />
              <button style={{ padding: "14px 24px", background: css.gold, color: "#fff", border: "none", fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 14, cursor: "pointer", transition: `background 0.3s ease` }}
                onMouseEnter={e => e.target.style.background = css.goldHighlight}
                onMouseLeave={e => e.target.style.background = css.gold}
              >→</button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(237,232,223,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 11, color: "rgba(237,232,223,0.2)" }}>© 2026 Tuli Artisan. Handcrafted with care.</p>
          <p style={{ fontFamily: "var(--font-karla, 'Karla', sans-serif)", fontSize: 11, color: "rgba(237,232,223,0.2)" }}>Privacy · Terms · Shipping</p>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════

export default function TuliApp() {
  const [currentPage, setCurrentPage] = useState("home");
  const [pageId, setPageId] = useState(null);
  const [cart, setCart] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // Load saved theme or system preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tuli-theme");
      if (saved) {
        setIsDark(saved === "dark");
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDark(true);
      }
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const next = !prev;
      try { localStorage.setItem("tuli-theme", next ? "dark" : "light"); } catch {}
      return next;
    });
  }, []);

  const css = useMemo(() => getCSS(isDark), [isDark]);

  const navigate = useCallback((page, id = null) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setPageId(id);
      window.scrollTo({ top: 0 });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitioning(false));
      });
    }, 350);
  }, []);

  const addToCart = useCallback((item) => setCart(p => [...p, item]), []);
  const removeFromCart = useCallback((i) => setCart(p => p.filter((_, idx) => idx !== i)), []);

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <HomePage />;
      case "shop": return <ShopPage />;
      case "product": return <ProductPage id={pageId} />;
      case "collections": return <CollectionsPage />;
      case "collection": return <CollectionDetailPage id={pageId} />;
      case "artisans": return <ArtisansPage />;
      case "artisan": return <ArtisanDetailPage id={pageId} />;
      case "story": return <StoryPage />;
      case "cart": return <CartPage />;
      default: return <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={{ navigate, currentPage, pageId, cart, addToCart, removeFromCart, css, isDark, toggleTheme }}>
      <div style={{
        fontFamily: "var(--font-karla, 'Karla', sans-serif)",
        background: css.bg,
        color: css.dark,
        minHeight: "100vh",
        transition: `background-color 0.6s ${EASE_HOVER}, color 0.5s ${EASE_HOVER}`,
      }}>
        <GrainOverlay />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body {
            background: ${css.bg};
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            transition: background-color 0.6s ${EASE_HOVER};
          }
          ::selection { background: ${css.gold}; color: #fff; }
          ::-webkit-scrollbar { width: 5px; }
          ::-webkit-scrollbar-track { background: ${css.bg}; }
          ::-webkit-scrollbar-thumb { background: ${css.scrollThumb}; border-radius: 3px; }
          input::placeholder { color: rgba(237,232,223,0.3); }

          .tuli-btn-primary {
            padding: 18px 48px; background: ${css.btnPrimaryBg}; color: ${css.btnPrimaryText}; border: none;
            font-family: var(--font-karla, 'Karla', sans-serif); font-size: 11px; letter-spacing: 2.5px;
            text-transform: uppercase; cursor: pointer; font-weight: 600;
            transition: all 0.5s ${EASE};
          }
          .tuli-btn-primary:hover { background: ${css.gold}; color: #fff; }
          .tuli-btn-primary:active { transform: scale(0.97); }

          .tuli-btn-ghost {
            padding: 18px 48px; background: transparent; color: ${css.textOnDark};
            border: 1px solid rgba(237,232,223,0.2); font-family: var(--font-karla, 'Karla', sans-serif);
            font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase;
            cursor: pointer; font-weight: 400; transition: all 0.5s ${EASE};
          }
          .tuli-btn-ghost:hover { border-color: rgba(237,232,223,0.6); background: rgba(237,232,223,0.05); }
          .tuli-btn-ghost:active { transform: scale(0.97); }

          .tuli-card-hover:hover { transform: translateY(-8px); box-shadow: ${css.cardShadow}; }
          .tuli-zoom-parent:hover .tuli-zoom-img { transform: scale(1.04) !important; }

          @keyframes tuliSlideIn { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes tuliBounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(10px); } }

          @media (max-width: 768px) {
            .tuli-desktop-nav { display: none !important; }
            .tuli-mobile-controls { display: flex !important; }
            .tuli-product-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            .tuli-artisan-row { grid-template-columns: 1fr !important; }
            .tuli-artisan-img { order: 0 !important; }
            .tuli-artisan-hero { grid-template-columns: 1fr !important; padding: 88px 32px 68px !important; }
          }
        `}</style>
        <Navbar />
        <div style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateY(10px)" : "translateY(0)",
          transition: `opacity 0.35s ${EASE_HOVER}, transform 0.35s ${EASE_HOVER}`,
        }}>
          {renderPage()}
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}
