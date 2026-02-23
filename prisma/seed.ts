import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ═══════════════════════════════════════════════
// Tuli Artisan — Seed Data
// ═══════════════════════════════════════════════

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1920&q=85&auto=format",
  heroAlt: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1920&q=85&auto=format",
  artisan1: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800&q=80&auto=format",
  artisan2: "https://images.unsplash.com/photo-1621274403997-37aace184f49?w=800&q=80&auto=format",
  artisan3: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&auto=format",
  artisan4: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80&auto=format",
  artisan5: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80&auto=format",
  artisan6: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80&auto=format",
  artisan7: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format",
  artisan8: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&auto=format",
  artisan9: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80&auto=format",
  artisan10: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80&auto=format",
  artisan11: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80&auto=format",
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
  pottery1: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80&auto=format",
  pottery2: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80&auto=format",
  pottery3: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&q=80&auto=format",
  embroidery1: "https://images.unsplash.com/photo-1617191880520-47f5b120e790?w=800&q=80&auto=format",
  embroidery2: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&q=80&auto=format",
  embroidery3: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80&auto=format",
  woodwork1: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&auto=format",
  woodwork2: "https://images.unsplash.com/photo-1560343787-b5d2738f7c4c?w=800&q=80&auto=format",
  leather1: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format",
  leather2: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&auto=format",
  papiermache1: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80&auto=format",
  papiermache2: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80&auto=format",
  stone1: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=800&q=80&auto=format",
  bamboo1: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=800&q=80&auto=format",
  bamboo2: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80&auto=format",
  collection4: "https://images.unsplash.com/photo-1523575708161-ad0fc2a9b951?w=1400&q=85&auto=format",
  collection5: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85&auto=format",
};

async function main() {
  // Clear existing data
  await prisma.collectionProduct.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.artisan.deleteMany();

  // ──────────────────────────────
  // ARTISANS
  // ──────────────────────────────

  const artisans = await Promise.all([
    prisma.artisan.create({
      data: {
        slug: "meera-devi",
        name: "Meera Devi",
        craft: "Block Printing",
        region: "Jaipur, Rajasthan",
        state: "Rajasthan",
        bio: "Third-generation block printer preserving 400-year-old Sanganer traditions. Each piece takes 3\u20137 days of meticulous hand-stamping with carved teak blocks.",
        story: "Meera learned the art of block printing at age eight, sitting beside her grandmother in their courtyard workshop. Today, she leads a collective of twelve women artisans, each carrying forward patterns that have been in their families for generations. Her signature indigo dyes are made from natural neel plants, crushed and fermented for forty days.",
        quote: "Every imperfection in a hand-printed textile is proof that a human being cared enough to create it.",
        yearsOfPractice: 28,
        image: IMAGES.artisan1,
      },
    }),
    prisma.artisan.create({
      data: {
        slug: "rajan-kumar",
        name: "Rajan Kumar",
        craft: "Brass Metalwork",
        region: "Moradabad, Uttar Pradesh",
        state: "Uttar Pradesh",
        bio: "Master metalsmith creating contemporary vessels using ancient lost-wax casting methods passed down through five generations.",
        story: "In the narrow lanes of Moradabad, known as Peetal Nagri \u2014 the City of Brass \u2014 Rajan\u2019s workshop hums with the rhythm of hammers on metal. Each vessel begins as a wax model, hand-sculpted, then encased in clay. When the mold is fired, the wax melts away, leaving space for molten brass to fill. No two pieces are ever identical.",
        quote: "Brass remembers the hand that shaped it. That memory lives in every curve.",
        yearsOfPractice: 35,
        image: IMAGES.artisan2,
      },
    }),
    prisma.artisan.create({
      data: {
        slug: "lakshmi-bai",
        name: "Lakshmi Bai",
        craft: "Handloom Weaving",
        region: "Pochampally, Telangana",
        state: "Telangana",
        bio: "Ikat weaving master creating mesmerizing geometric patterns through resist-dyeing threads before they meet the loom.",
        story: "The click-clack of Lakshmi\u2019s loom begins before dawn and continues well past dusk. Pochampally Ikat \u2014 a UNESCO heritage craft \u2014 demands extraordinary precision: each thread is tied and dyed in exact patterns before weaving begins. A single saree can take three weeks. Lakshmi\u2019s patterns draw from temple architecture and the geometry of rice paddies.",
        quote: "The loom is my language. Every thread is a word, every pattern a story only cloth can tell.",
        yearsOfPractice: 40,
        image: IMAGES.artisan3,
      },
    }),
    prisma.artisan.create({
      data: {
        slug: "arjun-prajapati",
        name: "Arjun Prajapati",
        craft: "Pottery",
        region: "Khurja, Uttar Pradesh",
        state: "Uttar Pradesh",
        bio: "Fourth-generation potter blending Mughal-era glazing techniques with modern minimalist forms.",
        story: "Arjun\u2019s hands have known clay since childhood. In Khurja, a town synonymous with Indian ceramics, his family has shaped vessels for four generations. He fires each piece in a traditional wood kiln, where temperatures above 1200\u00B0C transform raw earth into lustrous stoneware. His signature blue-white glaze echoes the tiles of Mughal monuments.",
        quote: "Clay is the most honest material. It shows everything \u2014 your patience, your breath, even your doubts.",
        yearsOfPractice: 22,
        image: IMAGES.artisan4,
      },
    }),
    prisma.artisan.create({
      data: {
        slug: "fatima-bi",
        name: "Fatima Bi",
        craft: "Embroidery",
        region: "Lucknow, Uttar Pradesh",
        state: "Uttar Pradesh",
        bio: "Chikankari embroidery artisan whose needlework preserves the delicate white-on-white tradition of Mughal courts.",
        story: "Fatima\u2019s fingers move like a dancer\u2019s \u2014 precise, rhythmic, unhurried. Chikankari, Lucknow\u2019s signature embroidery, involves 36 distinct stitches, each with a poetic name. Her grandmother stitched for nawabs; Fatima now creates for a global audience while training the next generation in her workshop of twenty women.",
        quote: "In Chikankari, you don\u2019t count hours. You count stitches. And each one must be worthy.",
        yearsOfPractice: 30,
        image: IMAGES.artisan5,
      },
    }),
    prisma.artisan.create({
      data: {
        slug: "devendra-suthar",
        name: "Devendra Suthar",
        craft: "Woodwork",
        region: "Saharanpur, Uttar Pradesh",
        state: "Uttar Pradesh",
        bio: "Master woodcarver transforming sheesham and walnut into intricate jali screens and decorative panels.",
        story: "The Suthar community has carved wood in Saharanpur for centuries. Devendra\u2019s workshop, tucked behind the old bazaar, smells of fresh sheesham shavings. He works without power tools, using only hand chisels and gouges inherited from his father. His jali screens \u2014 lattice panels with geometric cutwork \u2014 filter light the way Mughal architects intended.",
        quote: "Wood has memory. If you force it, it splits. If you follow its grain, it becomes art.",
        yearsOfPractice: 25,
        image: IMAGES.artisan6,
      },
    }),
    prisma.artisan.create({
      data: {
        slug: "zahira-shah",
        name: "Zahira Shah",
        craft: "Papier-mache",
        region: "Srinagar, Jammu & Kashmir",
        state: "Jammu & Kashmir",
        bio: "Papier-m\u00E2ch\u00E9 painter preserving Kashmir\u2019s centuries-old tradition of transforming paper pulp into gilded art objects.",
        story: "In the shadow of Dal Lake, Zahira paints with a squirrel-hair brush so fine it holds a single drop of pigment. Kashmiri papier-m\u00E2ch\u00E9 begins with soaked paper pounded into pulp, shaped over wooden molds, then coated with layers of gesso before the painting begins. Her designs \u2014 chinar leaves, paisley, Persian flowers \u2014 are applied in up to twenty layers of natural pigment and gold leaf.",
        quote: "Kashmir taught me that beauty takes patience. Twenty layers of paint, twenty seasons of practice.",
        yearsOfPractice: 18,
        image: IMAGES.artisan7,
      },
    }),
    prisma.artisan.create({
      data: {
        slug: "selvam-murugan",
        name: "Selvam Murugan",
        craft: "Stone Carving",
        region: "Mahabalipuram, Tamil Nadu",
        state: "Tamil Nadu",
        bio: "Temple stone carver whose family has sculpted granite since the Pallava dynasty, creating contemporary pieces rooted in ancient tradition.",
        story: "Mahabalipuram\u2019s shore temples were carved from living rock. Selvam\u2019s ancestors were among those sculptors. Today, he works in the same granite, using techniques unchanged for 1,400 years. Each strike of his chisel is deliberate \u2014 stone forgives nothing. His contemporary pieces carry temple geometry into modern homes.",
        quote: "Stone is eternal. When I carve, I\u2019m having a conversation with something older than civilization.",
        yearsOfPractice: 32,
        image: IMAGES.artisan8,
      },
    }),
    prisma.artisan.create({
      data: {
        slug: "priya-das",
        name: "Priya Das",
        craft: "Bamboo Craft",
        region: "Agartala, Tripura",
        state: "Tripura",
        bio: "Bamboo weaver creating contemporary home decor from the versatile grass that sustains Northeast India\u2019s craft traditions.",
        story: "In Tripura, bamboo is not just material \u2014 it\u2019s culture. Priya learned to split and weave bamboo from her mother, who learned from hers. She has modernized traditional forms: her lampshades, baskets, and room dividers bring bamboo\u2019s warmth into urban spaces. Each piece is woven from locally harvested bamboo, treated naturally with neem oil.",
        quote: "Bamboo bends but never breaks. That resilience is what makes it beautiful.",
        yearsOfPractice: 15,
        image: IMAGES.artisan9,
      },
    }),
    prisma.artisan.create({
      data: {
        slug: "nandini-patil",
        name: "Nandini Patil",
        craft: "Leather",
        region: "Shantiniketan, West Bengal",
        state: "West Bengal",
        bio: "Artisan leather worker carrying forward the Shantiniketan tradition of batik-printed leather goods first introduced at Tagore\u2019s university.",
        story: "Shantiniketan leather is unique in India \u2014 a craft born from the artistic vision of Rabindranath Tagore\u2019s university. Nandini uses vegetable-tanned goat leather, embossed and painted with motifs inspired by Bengali folk art. Each bag, journal, and accessory carries the distinctive earth tones and hand-painted designs that make this craft unmistakable.",
        quote: "Tagore believed art should be part of daily life. That\u2019s what I try to create \u2014 art you can carry.",
        yearsOfPractice: 20,
        image: IMAGES.artisan10,
      },
    }),
    prisma.artisan.create({
      data: {
        slug: "ramesh-kumhar",
        name: "Ramesh Kumhar",
        craft: "Pottery",
        region: "Kutch, Gujarat",
        state: "Gujarat",
        bio: "Kutchi potter creating rustic terracotta vessels and ritual objects using techniques passed down through the Prajapati community.",
        story: "The Rann of Kutch stretches to the horizon like a white desert, and from this austere landscape comes pottery of remarkable warmth. Ramesh\u2019s terracotta \u2014 unglazed, sun-baked, sometimes painted with white lime patterns \u2014 carries the simplicity of nomadic life. His water jugs keep water cool in 45\u00B0C summers, just as they have for centuries.",
        quote: "The earth gives freely. The potter\u2019s only job is to listen to what the clay wants to become.",
        yearsOfPractice: 38,
        image: IMAGES.artisan11,
      },
    }),
  ]);

  const artisanMap: Record<string, string> = {};
  for (const a of artisans) {
    artisanMap[a.slug] = a.id;
  }

  // ──────────────────────────────
  // PRODUCTS
  // ──────────────────────────────

  const products = await Promise.all([
    // Original 6 products
    prisma.product.create({
      data: {
        slug: "bp-001",
        name: "Indigo Dabu Table Runner",
        artisanId: artisanMap["meera-devi"],
        craft: "Block Printing",
        price: 2400,
        originalPrice: null,
        description: "Hand-printed with carved teak blocks using the ancient Dabu mud-resist technique. Each piece undergoes seven stages of printing and washing, creating layers of indigo that deepen with every wash.",
        details: JSON.stringify(["100% handspun cotton", "Natural indigo & Dabu mud-resist", "180cm \u00D7 35cm", "7-stage printing process", "Slight variations are marks of authenticity"]),
        careInstructions: "Hand wash cold with mild soap. Dry in shade. Iron on reverse.",
        timeToCreate: "3\u20135 days",
        tag: "Bestseller",
        colors: JSON.stringify(["Deep Indigo", "Soft Indigo"]),
        inStock: true,
        image: IMAGES.blockPrint1,
      },
    }),
    prisma.product.create({
      data: {
        slug: "bp-002",
        name: "Saffron Jaal Cushion Set",
        artisanId: artisanMap["meera-devi"],
        craft: "Block Printing",
        price: 1800,
        originalPrice: 2200,
        description: "A pair of cushion covers featuring the intricate \u2018jaal\u2019 (net) pattern, hand-stamped in warm saffron and turmeric tones on unbleached cotton.",
        details: JSON.stringify(["Set of 2 covers", "100% organic cotton", "Natural vegetable dyes", "45cm \u00D7 45cm each", "Zip closure"]),
        careInstructions: "Gentle machine wash. Avoid direct sunlight when drying.",
        timeToCreate: "2\u20133 days",
        tag: "New",
        colors: JSON.stringify(["Saffron", "Turmeric"]),
        inStock: true,
        image: IMAGES.blockPrint2,
      },
    }),
    prisma.product.create({
      data: {
        slug: "bm-001",
        name: "Ceremonial Brass Diya Set",
        artisanId: artisanMap["rajan-kumar"],
        craft: "Brass Metalwork",
        price: 3200,
        originalPrice: null,
        description: "A set of three hand-cast brass diyas with lotus petal bases. Created using the lost-wax method \u2014 each lamp is unique, carrying the subtle textures of hand-sculpted wax originals.",
        details: JSON.stringify(["Set of 3 diyas", "Pure brass, lost-wax cast", "Heights: 6cm, 8cm, 10cm", "Hand-polished satin finish", "Develops a living patina over time"]),
        careInstructions: "Clean with lemon and salt for brightness, or let natural patina develop.",
        timeToCreate: "5\u20137 days",
        tag: "Signature",
        colors: JSON.stringify(["Natural Brass"]),
        inStock: true,
        image: IMAGES.brass1,
      },
    }),
    prisma.product.create({
      data: {
        slug: "bm-002",
        name: "Rain Vessel",
        artisanId: artisanMap["rajan-kumar"],
        craft: "Brass Metalwork",
        price: 4800,
        originalPrice: 5500,
        description: "A sculptural brass vase with a hammered rain-texture finish. The surface is created by thousands of individual hammer strikes, each catching light differently \u2014 like rain on still water.",
        details: JSON.stringify(["Pure brass, hand-hammered", "Height: 24cm, Diameter: 12cm", "Watertight for fresh flowers", "4 days of hammering", "Signed by artisan"]),
        careInstructions: "Wipe with soft dry cloth. Water spots add to the rain aesthetic.",
        timeToCreate: "4 days",
        tag: "Limited Edition",
        colors: JSON.stringify(["Hammered Brass", "Oxidized Brass"]),
        inStock: true,
        image: IMAGES.brass2,
      },
    }),
    prisma.product.create({
      data: {
        slug: "hw-001",
        name: "Midnight Ikat Throw",
        artisanId: artisanMap["lakshmi-bai"],
        craft: "Handloom Weaving",
        price: 5600,
        originalPrice: null,
        description: "A generous throw blanket woven in the Pochampally double-ikat technique \u2014 where both warp and weft threads are resist-dyed before weaving. The geometric pattern floats between layers of midnight blue and cream.",
        details: JSON.stringify(["100% handloom cotton", "Double-ikat technique", "200cm \u00D7 150cm", "Natural dyes", "UNESCO Heritage craft"]),
        careInstructions: "Dry clean recommended for first wash. Subsequently, gentle hand wash in cold water.",
        timeToCreate: "15\u201321 days",
        tag: "Heritage",
        colors: JSON.stringify(["Midnight Blue", "Storm Grey"]),
        inStock: true,
        image: IMAGES.textile1,
      },
    }),
    prisma.product.create({
      data: {
        slug: "hw-002",
        name: "Temple Steps Saree",
        artisanId: artisanMap["lakshmi-bai"],
        craft: "Handloom Weaving",
        price: 8500,
        originalPrice: null,
        description: "A masterwork saree featuring the \u2018temple steps\u2019 border pattern \u2014 inspired by the stepped architecture of South Indian gopurams. Woven in warm cream with burnt sienna borders.",
        details: JSON.stringify(["Pure silk-cotton blend", "Single-ikat with supplementary weft borders", "5.5 meters with running blouse", "Temple steps & diamond motifs", "Certificate of authenticity"]),
        careInstructions: "Dry clean only. Store folded in muslin.",
        timeToCreate: "21\u201330 days",
        tag: "Masterwork",
        colors: JSON.stringify(["Cream & Sienna"]),
        inStock: true,
        image: IMAGES.saree,
      },
    }),

    // New products — Pottery
    prisma.product.create({
      data: {
        slug: "pt-001",
        name: "Mughal Blue Chai Set",
        artisanId: artisanMap["arjun-prajapati"],
        craft: "Pottery",
        price: 2800,
        originalPrice: null,
        description: "A six-piece chai set glazed in the distinctive Khurja blue, inspired by Mughal tilework. Each cup is wheel-thrown and individually glazed, ensuring no two are alike.",
        details: JSON.stringify(["Set of 6 cups with tray", "High-fired stoneware", "Food-safe lead-free glaze", "Cups: 8cm height", "Microwave safe"]),
        careInstructions: "Dishwasher safe. Avoid thermal shock.",
        timeToCreate: "7\u201310 days",
        tag: "New",
        colors: JSON.stringify(["Cobalt Blue", "Turquoise"]),
        inStock: true,
        image: IMAGES.pottery1,
      },
    }),
    prisma.product.create({
      data: {
        slug: "pt-002",
        name: "Earth Ritual Bowl",
        artisanId: artisanMap["arjun-prajapati"],
        craft: "Pottery",
        price: 1600,
        originalPrice: null,
        description: "A generous serving bowl with a speckled earth glaze that recalls the clay\u2019s origins. Perfect as a centerpiece or fruit bowl.",
        details: JSON.stringify(["Wheel-thrown stoneware", "Diameter: 28cm", "Earth-tone reactive glaze", "Each piece unique", "Food safe"]),
        careInstructions: "Hand wash recommended to preserve glaze character.",
        timeToCreate: "5\u20137 days",
        tag: null,
        colors: JSON.stringify(["Earth Brown", "Sage Green"]),
        inStock: true,
        image: IMAGES.pottery2,
      },
    }),
    prisma.product.create({
      data: {
        slug: "pt-003",
        name: "Kutchi Terracotta Water Jug",
        artisanId: artisanMap["ramesh-kumhar"],
        craft: "Pottery",
        price: 1200,
        originalPrice: null,
        description: "A traditional matka-style water jug that naturally cools water through evaporation. Decorated with white lime patterns characteristic of Kutch pottery.",
        details: JSON.stringify(["Unglazed terracotta", "Height: 30cm, Capacity: 3L", "Natural cooling properties", "White lime decoration", "Handmade by Prajapati community"]),
        careInstructions: "Rinse before first use. Air dry completely between uses.",
        timeToCreate: "2\u20133 days",
        tag: "Heritage",
        colors: JSON.stringify(["Natural Terracotta"]),
        inStock: true,
        image: IMAGES.pottery3,
      },
    }),

    // New products — Embroidery
    prisma.product.create({
      data: {
        slug: "em-001",
        name: "Chikankari Kurta Fabric",
        artisanId: artisanMap["fatima-bi"],
        craft: "Embroidery",
        price: 3800,
        originalPrice: 4200,
        description: "Unstitched kurta-length fabric in fine muslin with all-over Chikankari embroidery. Features the coveted \u2018tepchi\u2019 and \u2018murri\u2019 stitches in shadow-work technique.",
        details: JSON.stringify(["Pure cotton muslin", "2.5m unstitched length", "Hand-embroidered Chikankari", "36 traditional stitch types used", "Shadow work on white"]),
        careInstructions: "Hand wash with care. Starch lightly for best drape.",
        timeToCreate: "14\u201321 days",
        tag: "Signature",
        colors: JSON.stringify(["White on White", "Ivory"]),
        inStock: true,
        image: IMAGES.embroidery1,
      },
    }),
    prisma.product.create({
      data: {
        slug: "em-002",
        name: "Lucknowi Table Linen Set",
        artisanId: artisanMap["fatima-bi"],
        craft: "Embroidery",
        price: 4500,
        originalPrice: null,
        description: "A set of six napkins and a table runner with delicate Chikankari borders. The \u2018jali\u2019 (net) stitch creates a lace-like transparency that elevates any dining table.",
        details: JSON.stringify(["6 napkins + 1 runner", "Fine cotton cambric", "Jali & phanda stitches", "Runner: 150cm \u00D7 30cm", "Napkins: 40cm \u00D7 40cm"]),
        careInstructions: "Gentle hand wash. Do not wring. Iron while slightly damp.",
        timeToCreate: "10\u201314 days",
        tag: "Bestseller",
        colors: JSON.stringify(["White", "Ecru"]),
        inStock: true,
        image: IMAGES.embroidery2,
      },
    }),

    // New products — Woodwork
    prisma.product.create({
      data: {
        slug: "ww-001",
        name: "Jali Screen Panel",
        artisanId: artisanMap["devendra-suthar"],
        craft: "Woodwork",
        price: 7200,
        originalPrice: null,
        description: "A freestanding decorative panel featuring intricate jali (lattice) carving in sheesham wood. The geometric pattern filters light and creates dancing shadows, echoing Mughal architectural screens.",
        details: JSON.stringify(["Sheesham (Indian rosewood)", "60cm \u00D7 90cm panel", "Hand-carved lattice", "Natural oil finish", "Freestanding with base"]),
        careInstructions: "Dust with soft cloth. Oil annually with tung oil.",
        timeToCreate: "10\u201314 days",
        tag: "Limited Edition",
        colors: JSON.stringify(["Natural Sheesham", "Dark Walnut"]),
        inStock: true,
        image: IMAGES.woodwork1,
      },
    }),
    prisma.product.create({
      data: {
        slug: "ww-002",
        name: "Carved Spice Box",
        artisanId: artisanMap["devendra-suthar"],
        craft: "Woodwork",
        price: 2200,
        originalPrice: 2600,
        description: "A masala dabba reimagined \u2014 a traditional spice box with seven compartments, each lid carved with a different botanical motif. Practical beauty for the everyday kitchen.",
        details: JSON.stringify(["Walnut wood", "Diameter: 20cm", "7 compartments with lids", "Botanical carvings", "Food-safe beeswax finish"]),
        careInstructions: "Wipe with damp cloth. Re-apply beeswax every 6 months.",
        timeToCreate: "5\u20137 days",
        tag: "New",
        colors: JSON.stringify(["Natural Walnut"]),
        inStock: true,
        image: IMAGES.woodwork2,
      },
    }),

    // New products — Leather
    prisma.product.create({
      data: {
        slug: "lt-001",
        name: "Shantiniketan Tote Bag",
        artisanId: artisanMap["nandini-patil"],
        craft: "Leather",
        price: 3400,
        originalPrice: null,
        description: "A spacious tote bag in vegetable-tanned goat leather with batik-printed floral panels. The leather develops a rich patina over time, making each bag more beautiful with age.",
        details: JSON.stringify(["Vegetable-tanned goat leather", "Batik-printed panels", "40cm \u00D7 35cm \u00D7 12cm", "Cotton canvas lining", "Inner zip pocket"]),
        careInstructions: "Condition with leather balm. Keep away from water.",
        timeToCreate: "3\u20135 days",
        tag: "Bestseller",
        colors: JSON.stringify(["Tan", "Dark Brown"]),
        inStock: true,
        image: IMAGES.leather1,
      },
    }),
    prisma.product.create({
      data: {
        slug: "lt-002",
        name: "Batik Leather Journal",
        artisanId: artisanMap["nandini-patil"],
        craft: "Leather",
        price: 1400,
        originalPrice: null,
        description: "A hand-bound journal with a batik-printed leather cover and handmade cotton rag paper. 180 unlined pages that welcome ink, pencil, and watercolor.",
        details: JSON.stringify(["Goat leather cover", "Handmade cotton rag paper", "180 unlined pages", "14cm \u00D7 21cm", "Leather tie closure"]),
        careInstructions: "Store in a cool, dry place. Leather will patina beautifully.",
        timeToCreate: "2\u20133 days",
        tag: null,
        colors: JSON.stringify(["Russet", "Olive"]),
        inStock: true,
        image: IMAGES.leather2,
      },
    }),

    // New products — Papier-mache
    prisma.product.create({
      data: {
        slug: "pm-001",
        name: "Kashmir Chinar Leaf Box",
        artisanId: artisanMap["zahira-shah"],
        craft: "Papier-mache",
        price: 3600,
        originalPrice: null,
        description: "A jewelry box shaped and painted in the Kashmiri papier-m\u00E2ch\u00E9 tradition. The chinar leaf motif \u2014 Kashmir\u2019s iconic autumn symbol \u2014 is rendered in natural pigments with gold leaf accents.",
        details: JSON.stringify(["Paper pulp over wooden form", "Hand-painted natural pigments", "22-karat gold leaf accents", "15cm \u00D7 10cm \u00D7 6cm", "Velvet-lined interior"]),
        careInstructions: "Handle gently. Dust with soft brush. Keep away from moisture.",
        timeToCreate: "12\u201318 days",
        tag: "Signature",
        colors: JSON.stringify(["Crimson & Gold", "Emerald & Gold"]),
        inStock: true,
        image: IMAGES.papiermache1,
      },
    }),
    prisma.product.create({
      data: {
        slug: "pm-002",
        name: "Persian Garden Vase",
        artisanId: artisanMap["zahira-shah"],
        craft: "Papier-mache",
        price: 5200,
        originalPrice: 5800,
        description: "A tall decorative vase painted with intricate Persian garden scenes \u2014 birds, flowers, and flowing streams rendered in the distinctive Kashmiri style with real gold leaf borders.",
        details: JSON.stringify(["Paper pulp construction", "Height: 30cm", "20+ layers of paint & lacquer", "Real gold leaf borders", "Signed by artist"]),
        careInstructions: "Display away from direct sunlight. Dust gently.",
        timeToCreate: "20\u201325 days",
        tag: "Masterwork",
        colors: JSON.stringify(["Midnight Blue & Gold"]),
        inStock: true,
        image: IMAGES.papiermache2,
      },
    }),

    // New products — Stone Carving
    prisma.product.create({
      data: {
        slug: "sc-001",
        name: "Temple Geometry Bookend Set",
        artisanId: artisanMap["selvam-murugan"],
        craft: "Stone Carving",
        price: 4200,
        originalPrice: null,
        description: "A pair of granite bookends carved with temple mandala patterns. The weight of stone meets the precision of sacred geometry \u2014 functional art that anchors any bookshelf.",
        details: JSON.stringify(["Black granite", "Set of 2 bookends", "12cm \u00D7 10cm \u00D7 8cm each", "Temple mandala carving", "Felt base to protect surfaces"]),
        careInstructions: "Wipe with damp cloth. Stone requires no special care.",
        timeToCreate: "7\u201310 days",
        tag: null,
        colors: JSON.stringify(["Black Granite", "Grey Granite"]),
        inStock: true,
        image: IMAGES.stone1,
      },
    }),

    // New products — Bamboo Craft
    prisma.product.create({
      data: {
        slug: "bc-001",
        name: "Woven Bamboo Pendant Light",
        artisanId: artisanMap["priya-das"],
        craft: "Bamboo Craft",
        price: 2800,
        originalPrice: 3200,
        description: "A handwoven pendant lampshade that casts warm, patterned light through its lattice structure. Made from split bamboo strips, treated with natural neem oil for durability.",
        details: JSON.stringify(["Split bamboo strips", "Diameter: 35cm", "Neem oil treated", "E27 bulb compatible", "Includes ceiling mount"]),
        careInstructions: "Dust with soft brush. Avoid humid environments.",
        timeToCreate: "3\u20135 days",
        tag: "New",
        colors: JSON.stringify(["Natural Bamboo", "Smoked Bamboo"]),
        inStock: true,
        image: IMAGES.bamboo1,
      },
    }),
    prisma.product.create({
      data: {
        slug: "bc-002",
        name: "Bamboo Storage Basket Set",
        artisanId: artisanMap["priya-das"],
        craft: "Bamboo Craft",
        price: 1800,
        originalPrice: null,
        description: "A nesting set of three storage baskets in graduated sizes. The tight herringbone weave is both beautiful and practical \u2014 sturdy enough for everyday use.",
        details: JSON.stringify(["Set of 3 nesting baskets", "Herringbone weave pattern", "Large: 30cm, Medium: 24cm, Small: 18cm", "Neem oil treated bamboo", "Cotton canvas liner"]),
        careInstructions: "Keep dry. Wipe with damp cloth if needed.",
        timeToCreate: "4\u20136 days",
        tag: null,
        colors: JSON.stringify(["Natural", "Dark Stain"]),
        inStock: true,
        image: IMAGES.bamboo2,
      },
    }),

    // Additional products for variety and scroll
    prisma.product.create({
      data: {
        slug: "bp-003",
        name: "Ajrakh Bedspread",
        artisanId: artisanMap["meera-devi"],
        craft: "Block Printing",
        price: 4200,
        originalPrice: null,
        description: "A queen-sized bedspread printed in the Ajrakh tradition \u2014 geometric star patterns using natural indigo and madder red. The double-sided print makes it reversible.",
        details: JSON.stringify(["100% cotton, 300 thread count", "220cm \u00D7 250cm", "Ajrakh double-sided print", "Natural indigo & madder", "Pre-washed for softness"]),
        careInstructions: "Machine wash cold. Colors deepen with each wash.",
        timeToCreate: "5\u20137 days",
        tag: "Bestseller",
        colors: JSON.stringify(["Indigo & Red", "Indigo & Black"]),
        inStock: true,
        image: IMAGES.blockPrint1,
      },
    }),
    prisma.product.create({
      data: {
        slug: "bm-003",
        name: "Lotus Incense Holder",
        artisanId: artisanMap["rajan-kumar"],
        craft: "Brass Metalwork",
        price: 1400,
        originalPrice: null,
        description: "A brass incense holder shaped like an opening lotus. The petals catch ash while the flower form adds grace to any meditation corner.",
        details: JSON.stringify(["Solid brass", "Diameter: 10cm", "Holds standard incense sticks", "Hand-polished", "Anti-tarnish coating"]),
        careInstructions: "Wipe clean after use. Polish occasionally with brass cleaner.",
        timeToCreate: "2\u20133 days",
        tag: null,
        colors: JSON.stringify(["Polished Brass"]),
        inStock: true,
        image: IMAGES.brass1,
      },
    }),
    prisma.product.create({
      data: {
        slug: "em-003",
        name: "Phulkari Cushion Cover",
        artisanId: artisanMap["fatima-bi"],
        craft: "Embroidery",
        price: 2200,
        originalPrice: null,
        description: "A vibrant cushion cover featuring Punjab\u2019s iconic Phulkari (flower work) embroidery. Dense satin stitches in silk thread create a textile that\u2019s more embroidery than fabric.",
        details: JSON.stringify(["Cotton base with silk thread", "45cm \u00D7 45cm", "Hand-embroidered Phulkari", "Geometric floral pattern", "Zip closure"]),
        careInstructions: "Dry clean recommended. Store flat.",
        timeToCreate: "7\u201310 days",
        tag: "Heritage",
        colors: JSON.stringify(["Marigold & Red", "Pink & Orange"]),
        inStock: true,
        image: IMAGES.embroidery3,
      },
    }),
    prisma.product.create({
      data: {
        slug: "pt-004",
        name: "Blue Pottery Planter",
        artisanId: artisanMap["ramesh-kumhar"],
        craft: "Pottery",
        price: 1800,
        originalPrice: 2100,
        description: "A decorative planter in Jaipur\u2019s famous blue pottery style. Unlike traditional pottery, blue pottery uses no clay \u2014 it\u2019s made from quartz, glass, and gum, fired at low temperatures for a distinctive, lightweight result.",
        details: JSON.stringify(["Quartz & glass composite", "Height: 18cm, Diameter: 15cm", "Hand-painted floral motifs", "Drainage hole included", "Indoor use recommended"]),
        careInstructions: "Wipe clean. Handle with care \u2014 lighter than it looks.",
        timeToCreate: "4\u20136 days",
        tag: "New",
        colors: JSON.stringify(["Classic Blue & White", "Turquoise & White"]),
        inStock: true,
        image: IMAGES.pottery1,
      },
    }),
  ]);

  const productMap: Record<string, string> = {};
  for (const p of products) {
    productMap[p.slug] = p.id;
  }

  // ──────────────────────────────
  // COLLECTIONS
  // ──────────────────────────────

  const collections = await Promise.all([
    prisma.collection.create({
      data: {
        slug: "monsoon-edit",
        title: "The Monsoon Edit",
        subtitle: "Rain-inspired indigos & earthy textures",
        description: "A curated collection celebrating the poetry of the Indian monsoon \u2014 deep indigos, rain-washed greys, and the rich earth tones that emerge when the first drops meet dry soil.",
        season: "Monsoon 2026",
        color: "#1a3a4a",
        image: IMAGES.monsoon,
      },
    }),
    prisma.collection.create({
      data: {
        slug: "first-light",
        title: "First Light",
        subtitle: "Dawn-inspired brass & warm textiles",
        description: "Pieces that capture the golden warmth of early morning \u2014 hand-polished brass that catches light like sunrise, and textiles in saffron, turmeric, and soft cream.",
        season: "Spring 2026",
        color: "#8B6914",
        image: IMAGES.dawn,
      },
    }),
    prisma.collection.create({
      data: {
        slug: "earth-altar",
        title: "Earth & Altar",
        subtitle: "Sacred geometry in everyday objects",
        description: "Where devotion meets daily life. Temple-inspired patterns in brass, cloth, and natural dyes \u2014 objects that transform mundane rituals into moments of quiet reverence.",
        season: "Year-round",
        color: "#5C3D2E",
        image: IMAGES.earth,
      },
    }),
    prisma.collection.create({
      data: {
        slug: "artisan-home",
        title: "The Artisan Home",
        subtitle: "Handcrafted essentials for every room",
        description: "From kitchen to bedroom, a curated selection of handmade pieces that bring warmth, texture, and the unmistakable character of human craft into contemporary living spaces.",
        season: "Year-round",
        color: "#6B4E3D",
        image: IMAGES.collection4,
      },
    }),
    prisma.collection.create({
      data: {
        slug: "heritage-luxe",
        title: "Heritage Luxe",
        subtitle: "Masterwork pieces for the discerning collector",
        description: "Our most exquisite pieces \u2014 works that represent the pinnacle of their respective crafts. Each item is a testament to decades of mastery and centuries of tradition.",
        season: "Collector\u2019s Edition",
        color: "#2D1F14",
        image: IMAGES.collection5,
      },
    }),
  ]);

  // Collection-product relationships
  const collectionMap: Record<string, string> = {};
  for (const c of collections) {
    collectionMap[c.slug] = c.id;
  }

  await Promise.all([
    // Monsoon Edit
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["monsoon-edit"], productId: productMap["bp-001"], sortOrder: 0 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["monsoon-edit"], productId: productMap["hw-001"], sortOrder: 1 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["monsoon-edit"], productId: productMap["bm-002"], sortOrder: 2 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["monsoon-edit"], productId: productMap["pt-002"], sortOrder: 3 } }),
    // First Light
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["first-light"], productId: productMap["bm-001"], sortOrder: 0 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["first-light"], productId: productMap["hw-002"], sortOrder: 1 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["first-light"], productId: productMap["bp-002"], sortOrder: 2 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["first-light"], productId: productMap["bc-001"], sortOrder: 3 } }),
    // Earth & Altar
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["earth-altar"], productId: productMap["bm-001"], sortOrder: 0 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["earth-altar"], productId: productMap["bp-001"], sortOrder: 1 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["earth-altar"], productId: productMap["hw-001"], sortOrder: 2 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["earth-altar"], productId: productMap["sc-001"], sortOrder: 3 } }),
    // Artisan Home
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["artisan-home"], productId: productMap["pt-001"], sortOrder: 0 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["artisan-home"], productId: productMap["ww-002"], sortOrder: 1 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["artisan-home"], productId: productMap["bc-002"], sortOrder: 2 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["artisan-home"], productId: productMap["lt-001"], sortOrder: 3 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["artisan-home"], productId: productMap["em-002"], sortOrder: 4 } }),
    // Heritage Luxe
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["heritage-luxe"], productId: productMap["hw-002"], sortOrder: 0 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["heritage-luxe"], productId: productMap["ww-001"], sortOrder: 1 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["heritage-luxe"], productId: productMap["pm-002"], sortOrder: 2 } }),
    prisma.collectionProduct.create({ data: { collectionId: collectionMap["heritage-luxe"], productId: productMap["em-001"], sortOrder: 3 } }),
  ]);

  // ──────────────────────────────
  // PROMOTIONS
  // ──────────────────────────────

  await Promise.all([
    prisma.promotion.create({
      data: {
        code: "FIRSTCRAFT",
        discount: 15,
        type: "percentage",
        description: "15% off your first order",
        applicableProducts: "all",
        active: true,
      },
    }),
    prisma.promotion.create({
      data: {
        code: null,
        discount: null,
        type: "sale",
        description: "Monsoon Sale",
        applicableProducts: JSON.stringify(["bp-002", "bm-002"]),
        active: true,
      },
    }),
  ]);

  console.log("Seed complete:");
  console.log(`  ${artisans.length} artisans`);
  console.log(`  ${products.length} products`);
  console.log(`  ${collections.length} collections`);
  console.log("  2 promotions");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
