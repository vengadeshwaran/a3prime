import { ProductCategory, Product, Testimonial, WhyHighlight } from "./types";

export const COMPANY_INFO = {
  name: "A3 Prime Hub",
  subtitle: "Premium Hardware & Architectural Fittings",
  dealerBadge: "Authorized HEPO Reseller",
  phone: "+91 98450 12345",
  whatsapp: "919845012345",
  email: "info@a3primehub.com",
  address: "Shop No. 12, Ground Floor, Hardware Plaza, Outer Ring Road, Bengaluru, Karnataka - 560043",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.2651475734493!2d77.64321287515152!3d13.018751387301036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae172ed4f6cf7d%3A0xbc2a6d47b52467d2!2sKalyan%20Nagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1704123456789!5m2!1sen!2sin",
  businessHours: [
    { days: "Monday - Saturday", hours: "9:30 AM - 8:00 PM" },
    { days: "Sunday", hours: "10:30 AM - 2:30 PM (Only Enquiries)" }
  ],
  socials: {
    facebook: "https://facebook.com/a3primehub",
    instagram: "https://instagram.com/a3primehub",
    linkedin: "https://linkedin.com/company/a3primehub"
  }
};

export const CATEGORIES: ProductCategory[] = [
  {
    id: "furniture-fittings",
    name: "Furniture Fittings",
    description: "High-durability soft-close auto hinges, telescopic drawer channels, and premium G-type profile handles.",
    iconName: "Wrench",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "screws-fasteners",
    name: "Screws & Fasteners",
    description: "Anti-rust yellow zinc chipboard screws, drywall black screws, and self-drilling precision screws.",
    iconName: "Hammer",
    image: "https://images.unsplash.com/photo-1530124566582-ab61277bd50c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "kitchen-wardrobe",
    name: "Kitchen & Wardrobe",
    description: "Sleek double-wall tandem boxes, pneumatic lift-ups, stainless steel wire baskets, and wardrobe accessories.",
    iconName: "LayoutGrid",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "general-hardware",
    name: "General Hardware",
    description: "Multi-purpose drawer & wardrobe locks, sturdy brackets, castor wheels, and mortise door handles.",
    iconName: "ShieldAlert",
    image: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=600&q=80"
  }
];

export const PRODUCTS: Product[] = [
  // CATEGORY 1: FURNITURE FITTINGS (15 Products)
  {
    id: "hepo-clipon-full-crank-hinge",
    name: "HEPO 3D Clip-on Hinge (Full Crank)",
    category: "furniture-fittings",
    spec: "3D Adjustment | 15° Inset Crank | Hydraulic Damping",
    code: "HP-CH-101",
    price: 0,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    description: "German-engineered heavy-duty inset auto hinges. The full crank design is perfect for doors positioned inside the cabinet carcass side wall. Features advanced soft-close technology.",
    features: [
      "Designed for 15mm deep inset cabinet structures",
      "Hydraulic cylinder for silent, slow closing action",
      "Tested for over 80,000 continuous opening cycles",
      "Saves installation time with instant clip-on bracket mounting"
    ],
    packSize: "Pair (2 hinges + mounting plates)",
    material: "Cold Rolled Steel",
    finish: "Multi-Layer Nickel Plated",
    sizeOptions: ["15 Crank (Inset)", "Standard Screw-On Base", "3D Adjustment Plate"]
  },
  {
    id: "hepo-clipon-half-crank-hinge",
    name: "HEPO 3D Clip-on Hinge (Half Crank)",
    category: "furniture-fittings",
    spec: "3D Adjustment | 8° Half Overlay Crank | Soft-Close Damping",
    code: "HP-CH-102",
    price: 0,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80",
    description: "Premium clip-on hinges for back-to-back doors sharing a single partition board. Seamless lateral alignment via built-in adjustment screws.",
    features: [
      "Specifically configured for half overlay cabinet doors",
      "Advanced fluid damper eliminates wooden door slamming",
      "Interchangeable snap-fit mounting technology",
      "Double layer coating against humid bathroom environments"
    ],
    packSize: "Pair",
    material: "Cold Rolled Steel",
    finish: "Nickel Plated",
    sizeOptions: ["8 Crank (Half Overlay)"]
  },
  {
    id: "hepo-clipon-full-overlay-hinge",
    name: "HEPO 3D Clip-on Hinge (Full Overlay)",
    category: "furniture-fittings",
    spec: "3D Adjustment | 0° Straight Crank | Smooth hydraulic buffer",
    code: "HP-CH-103",
    price: 0,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    description: "The classic straight arm hinge for kitchen and wardrobe outer doors. Fully overlays the cabinet carcass edge for a clean external visual line.",
    features: [
      "Best for kitchen cabinets and single-standing wardrobes",
      "Silent hydraulic soft-close system",
      "3-way horizontal, vertical, and depth micro settings",
      "Heavy duty cup with 35mm drilling diameter"
    ],
    packSize: "Pair",
    material: "High Grade Carbon Steel",
    finish: "Bright Nickel",
    sizeOptions: ["0 Crank (Full Overlay)"]
  },
  {
    id: "hepo-auto-hinge-economical",
    name: "HEPO Standard Auto-Close Hinges",
    category: "furniture-fittings",
    spec: "Mechanical Spring-Loaded | Robust Mounting | High-Dwell Clip",
    code: "HP-AH-501",
    price: 0,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
    description: "Highly durable mechanical spring auto hinges for budget residential and commercial utility cabinets. Provides snap-shut security without extra damping elements.",
    features: [
      "Rigid construction resists warping or sagging",
      "Strong dual-tension return spring prevents door gaps",
      "Rustproof electroplated surface treatment",
      "Universal screw pattern fits standard woodworking machines"
    ],
    packSize: "Pair",
    material: "Mild Steel",
    finish: "Zinc Nickel",
    sizeOptions: ["Full Overlay", "Half Overlay", "Inset"]
  },
  {
    id: "hepo-telescopic-drawer-slide-standard",
    name: "HEPO Heavy Duty Telescopic Channels",
    category: "furniture-fittings",
    spec: "45mm Width | Full Extension | Solid Steel Ball Bearings",
    code: "HP-TDC-201",
    price: 0,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    description: "Heavy duty non-damping slide rails for deep file drawers, kitchen slideouts, and tool storage. Smooth linear transition under extreme loads.",
    features: [
      "Rated for continuous load of up to 45kg",
      "Three-bead ball guide tracks for high lateral stability",
      "Easy disconnect inner slide trigger lever",
      "Tested to maintain perfect alignment over 50,000 cycles"
    ],
    packSize: "Pair (Left & Right channel)",
    material: "Cold Rolled Steel",
    finish: "Electrophoretic Black Zinc",
    sizeOptions: ["10 Inch (250mm)", "12 Inch (300mm)", "14 Inch (350mm)", "16 Inch (400mm)", "18 Inch (450mm)", "20 Inch (500mm)", "22 Inch (550mm)", "24 Inch (600mm)"]
  },
  {
    id: "hepo-telescopic-drawer-slide-soft",
    name: "HEPO Premium Soft-Close Telescopic Channels",
    category: "furniture-fittings",
    spec: "45mm Width | Quad-Dampener Soft Close | Anti-Slam Mechanism",
    code: "HP-TDC-202",
    price: 0,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    description: "Quiet and protective full-extension drawer runners with built-in self-closing hydraulic cylinders. Automatically catches and gently pulls the drawer shut.",
    features: [
      "Double spring and dual piston buffer system",
      "Zero bounce design prevents items shifting inside",
      "High strength ball cage keeps drawer gliding straight",
      "Heavy gauge metal prevents flexing at full extension"
    ],
    packSize: "Pair",
    material: "Hardened Carbon Steel",
    finish: "Zinc Passivated / Slate Black",
    sizeOptions: ["14 Inch (350mm)", "16 Inch (400mm)", "18 Inch (450mm)", "20 Inch (500mm)", "22 Inch (550mm)"]
  },
  {
    id: "hepo-minifix-connectors",
    name: "HEPO Heavy Duty Minifix Connectors",
    category: "furniture-fittings",
    spec: "15mm Cam Lock | Expanding Dowel Pin | Nylon Sleeve",
    code: "HP-MF-301",
    price: 0,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    description: "High-integrity knocked-down (KD) furniture joints. Standard minifix fasteners ideal for modular wardrobes, beds, and study desks.",
    features: [
      "Precision-cast zinc alloy cam head avoids stripping",
      "Extremely strong tension lock to prevent panel wiggle",
      "Standard drilling sizes for quick automated manufacture",
      "Allows clean panel-by-panel packing and assembly on site"
    ],
    packSize: "Box of 100 Sets (Cams, Dowels & Sleeves)",
    material: "Die-Cast Zinc & Nylon",
    finish: "Galvanized Zinc",
    sizeOptions: ["Standard M6 thread", "Rapid Expanding Dowel"]
  },
  {
    id: "hepo-steel-shelf-pins",
    name: "HEPO Cylindrical Steel Shelf Pins",
    category: "furniture-fittings",
    spec: "5mm Pin Diameter | Ribbed Collar | Slip-Proof Flat Peg",
    code: "HP-SP-302",
    price: 0,
    image: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=600&q=80",
    description: "Solid metal supporting dowels for adjustable bookshelves, crockery racks, and closet partitions. Sleek profile with heavy weight capacity.",
    features: [
      "Smooth solid body avoids scratching wooden shelves",
      "Ring collar stops pins sliding too deep into side panels",
      "Excellent shear strength resists heavy book stacks",
      "Allows easy adjustments of levels without any tools"
    ],
    packSize: "Packet of 200 Pieces",
    material: "Solid Alloy Steel",
    finish: "Polished Chrome",
    sizeOptions: ["5mm Pin Diameter", "6mm Pin Diameter"]
  },
  {
    id: "hepo-magnetic-catcher-double",
    name: "HEPO Ultra-Power Magnetic Catchers",
    category: "furniture-fittings",
    spec: "Dual-Magnet Holding | Heavy-Duty ABS Housing | Steel Strike",
    code: "HP-MC-401",
    price: 0,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    description: "Commercial grade high-hold double magnetic door catchers for large storage wardrobe units and service cabinets.",
    features: [
      "Dual magnetic cores deliver up to 6kg of holding force",
      "High-impact ABS frame survives dry indoor weather",
      "Long slotted screw holes for fast alignment tweaks",
      "Sleek profile remains hidden beneath wooden shelves"
    ],
    packSize: "Pack of 10 Pieces with steel strike plates",
    material: "ABS Plastic & Neodymium Magnets",
    finish: "Brown / White ABS",
    sizeOptions: ["Single Catcher", "Double Heavy-Duty Catcher"]
  },
  {
    id: "hepo-ball-catcher-brass",
    name: "HEPO Solid Brass Ball Catches",
    category: "furniture-fittings",
    spec: "Adjustable Tension | Dual Ball Bearings | Brass Faceplate",
    code: "HP-BC-402",
    price: 0,
    image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80",
    description: "Premium solid brass bullet catches for pantry doors, hidden closet panels, and swing storage doors where locks are not required.",
    features: [
      "Adjustable screw mechanism permits custom ball tension",
      "Heavy duty compression coil springs prevent sticking",
      "Premium solid brass face guarantees zero rust",
      "Quiet rolling friction action"
    ],
    packSize: "Pack of 5 Pieces",
    material: "Solid Extruded Brass",
    finish: "Satin Brass / Antique Bronze",
    sizeOptions: ["Medium size", "Jumbo heavy duty"]
  },
  {
    id: "hepo-ss-d-handles",
    name: "HEPO SS heavy duty cabinet handles",
    category: "furniture-fittings",
    spec: "Solid SS-304 | Round D-Profile | Clean Threaded Bushes",
    code: "HP-HND-501",
    price: 0,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    description: "Sleek, minimalist round pull-bars from HEPO for kitchen cupboards, wardrobe drawers, and commercial storage. Features internal high-grip thread inserts.",
    features: [
      "Grade 304 stainless steel resists sweat and acidic kitchen moisture",
      "No sharp corners - child safe rounded design",
      "Threaded brass sleeves embedded to prevent screw stripping",
      "Clean brushed finish hides finger smudges"
    ],
    packSize: "Piece with breakout screws",
    material: "Stainless Steel 304",
    finish: "Brushed Satin SS",
    sizeOptions: ["96mm CTC", "128mm CTC", "160mm CTC", "224mm CTC"]
  },
  {
    id: "hepo-brass-knobs-modern",
    name: "HEPO Minimalist Solid Brass Knobs",
    category: "furniture-fittings",
    spec: "Hexagonal Geometric Profile | Single Bolt | Knurled Finish",
    code: "HP-KNB-502",
    price: 0,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    description: "Add a premium touch to vanity cabinets and custom chests of drawers. Exquisite knurled grid texture provides slip-proof traction.",
    features: [
      "Machined from continuous solid brass rod",
      "High resistance to wear, oil, and tarnish",
      "Modern knurled design matches upscale interiors",
      "Installs in seconds via single back-mounting M4 screw"
    ],
    packSize: "Piece",
    material: "Pure Brass",
    finish: "Gold Knurled / Matte Black Brass",
    sizeOptions: ["Standard 25mm", "Large 30mm"]
  },
  {
    id: "hepo-gtype-profile-handles",
    name: "HEPO Premium G-Type Profile Handles",
    category: "furniture-fittings",
    spec: "Edge Mount Concealed Profile | Seamless Aluminum | Satin Black",
    code: "HP-PH-601",
    price: 0,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    description: "Integrated handle profile to create completely flat, handleless modern modular cabinet aesthetics. Snaps onto the top edge of wooden shutters.",
    features: [
      "Continuous run profiles create a beautiful horizontal line",
      "Satin powder-coated aluminum is light and extremely strong",
      "Requires minimal routing of wooden doors to seat",
      "Provides ergonomic grip along the entire door width"
    ],
    packSize: "3 Meter Continuous Runner Length",
    material: "Extruded Aluminum Alloy",
    finish: "Anodized Black / Champagne Gold / Silver Satin",
    sizeOptions: ["8 Feet length", "10 Feet length"]
  },
  {
    id: "hepo-adjustable-sofa-legs",
    name: "HEPO Adjustable Sofa Legs (SS 304)",
    category: "furniture-fittings",
    spec: "Height Adjustable | Up to 150kg per Leg | Non-Slip Rubber Base",
    code: "HP-SFL-701",
    price: 0,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    description: "Heavy duty furniture legs to lift cabinets, sofas, TV units, and beds. Features a micro-adjustment screw ring for uneven flooring.",
    features: [
      "Supports extreme static loads of up to 150kg per leg",
      "Premium thick walls prevent bending or shearing",
      "Integrated nylon bottom pad protects Italian marble & laminate",
      "Adjust height up to +15mm to fix uneven tile joints"
    ],
    packSize: "Set of 4 Legs with solid top plate",
    material: "Grade 304 Stainless Steel",
    finish: "Hairline Satin Finish",
    sizeOptions: ["4 Inch (100mm)", "6 Inch (150mm)", "8 Inch (200mm)"]
  },
  {
    id: "hepo-hanging-brackets-cabinet",
    name: "HEPO Heavy Duty Wall Hanging Brackets",
    category: "furniture-fittings",
    spec: "Adjustable Height & Depth | 3D Suspension | 120kg Load",
    code: "HP-HGB-702",
    price: 0,
    image: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=600&q=80",
    description: "Precision cabinet wall-hanging organizers. Ideal for modular kitchen top cabinets and floating washbasins.",
    features: [
      "High strength steel bracket casing",
      "Dual screwdriver dials allow rapid vertical and forward alignment",
      "Comes with steel anchor wall plates",
      "Ensures cabinets sit perfectly level against wavy plaster walls"
    ],
    packSize: "Pair (Left & Right hanger + covers)",
    material: "Reinforced Galvanized Steel & ABS",
    finish: "Zinc Steel with white ABS cover caps",
    sizeOptions: ["Standard wall mount"]
  },

  // CATEGORY 2: SCREWS & FASTENERS (11 Products)
  {
    id: "hepo-csk-chipboard-screws",
    name: "HEPO Premium Yellow Zinc CSK Screws",
    category: "screws-fasteners",
    spec: "Countersunk Head | Pozi Star Drive | Deep Coarse Wood Thread",
    code: "HP-SCR-101",
    price: 0,
    image: "https://images.unsplash.com/photo-1530124566582-ab61277bd50c?auto=format&fit=crop&w=600&q=80",
    description: "High tensile professional wood/chipboard screws. Specifically configured for dense plywood and MDF to prevent cracking while maintaining maximum holding power.",
    features: [
      "Wax-dipped coarse thread cuts effortlessly with zero friction",
      "Pozi star recess stops screwdriver cam-out and slippage",
      "Yellow zinc passivated surface acts as an rust barrier",
      "No pilot hole needed for standard softwoods"
    ],
    packSize: "Box of 200 Pieces",
    material: "Hardened Carbon Steel",
    finish: "Yellow Zinc Passivated",
    sizeOptions: ["4.0 x 20mm (3/4\")", "4.0 x 25mm (1\")", "4.0 x 35mm (1.25\")", "4.0 x 50mm (2\")"]
  },
  {
    id: "hepo-csk-black-screws",
    name: "HEPO Black Oxide CSK Chipboard Screws",
    category: "screws-fasteners",
    spec: "Countersunk Head | Deep Pozi Recess | Sleek Black Coating",
    code: "HP-SCR-102",
    price: 0,
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80",
    description: "Aesthetic black countersunk wood screws. Designed for fixing black auto hinges, slate drawer channels, and dark cabinetry fittings.",
    features: [
      "Sleek black oxide treatment looks invisible on dark laminates",
      "Self-embedding nibs beneath head sink flush into plywood",
      "High torsional strength prevents screw head snapping during power-drill drive",
      "Hardened threads stay sharp"
    ],
    packSize: "Box of 200 Pieces",
    material: "Hardened Carbon Steel",
    finish: "Black Oxide Rust Resistant",
    sizeOptions: ["3.5 x 16mm (5/8\")", "4.0 x 20mm (3/4\")", "4.0 x 25mm (1\")"]
  },
  {
    id: "hepo-drywall-screws-fine",
    name: "HEPO Black Phosphate Drywall Screws",
    category: "screws-fasteners",
    spec: "Sharp Needle Point | Fine Thread | Bugle Head | Philips Drive",
    code: "HP-SCR-201",
    price: 0,
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80",
    description: "Sharp drywall screws to anchor plasterboards, gypsum panels, and ceiling frames securely to wooden rafters or metal frames.",
    features: [
      "Sharp needle point pierces thin sheet metal instantly without slipping",
      "Phosphate coating resists alkaline corrosion from plaster cement",
      "Bugle shape head sinks nicely without ripping drywall face paper",
      "Standard Philips No.2 drive"
    ],
    packSize: "Box of 500 Pieces",
    material: "Hardened Steel",
    finish: "Black Phosphate Coated",
    sizeOptions: ["3.5 x 25mm (1\")", "3.5 x 35mm (1.5\")", "3.5 x 50mm (2\")"]
  },
  {
    id: "hepo-self-drilling-hex",
    name: "HEPO Heavy Hex Head Self-Drilling Screws",
    category: "screws-fasteners",
    spec: "Built-in Drill Bit | Hex Flanged Head | EPDM Rubber Washer",
    code: "HP-SDS-301",
    price: 0,
    image: "https://images.unsplash.com/photo-1530124566582-ab61277bd50c?auto=format&fit=crop&w=600&q=80",
    description: "Heavy duty roofing and structural metal screws. Drill, tap, and fasten in one single rapid operation.",
    features: [
      "Precision forged drill point pierces up to 6mm steel plate",
      "EPDM rubber gasket sealing washer prevents roof water leakage",
      "Flanged head spreads pressure evenly",
      "Excellent shear strength ratings"
    ],
    packSize: "Box of 100 Pieces",
    material: "High Tensile Carbon Steel",
    finish: "Ruspert Anti-Corrosion / Zinc Coat",
    sizeOptions: ["5.5 x 25mm", "5.5 x 50mm", "5.5 x 75mm"]
  },
  {
    id: "hepo-ss-wood-screws-rustproof",
    name: "HEPO Stainless Steel SS Wood Screws",
    category: "screws-fasteners",
    spec: "Solid SS-304 | Torx Star Drive | High Acid & Humidity Proof",
    code: "HP-SSW-401",
    price: 0,
    image: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=600&q=80",
    description: "Marine grade stainless steel screws. Best for outdoor pergolas, seaside furniture, premium balconies, and high humidity modular bathrooms.",
    features: [
      "Grade 304 stainless steel guarantees zero red rust",
      "Premium Torx Star drive prevents strip out on tough hardwoods",
      "Deep undercut head sits totally flush",
      "Excellent resistance to wood preservative chemicals"
    ],
    packSize: "Box of 100 Pieces",
    material: "Stainless Steel 304",
    finish: "Natural Brushed Stainless Steel",
    sizeOptions: ["4.0 x 25mm", "4.5 x 40mm", "5.0 x 50mm"]
  },
  {
    id: "hepo-wall-plugs-nylon",
    name: "HEPO Heavy Duty Nylon Wall Plugs",
    category: "screws-fasteners",
    spec: "M-Tooth Expanding Ribs | Genuine PA6 Nylon | High Anchor Force",
    code: "HP-WP-501",
    price: 0,
    image: "https://images.unsplash.com/photo-1530124566582-ab61277bd50c?auto=format&fit=crop&w=600&q=80",
    description: "Professional grade nylon wall plugs. Designed for high-holding anchors in solid brick, concrete block, and stone walls.",
    features: [
      "High grade PA6 polyamide won't degrade, rot, or crack over time",
      "4-way expansion lock prevents anchor plug turning inside drill holes",
      "Generous anchor neck absorbs expansion pressure to protect plaster plaster",
      "Compatible with any wood or chipboard screw sizes"
    ],
    packSize: "Pack of 500 Pieces",
    material: "Premium PA6 Polyamide Nylon",
    finish: "Industrial Grey",
    sizeOptions: ["6mm Drill Diameter (Length 30mm)", "8mm Drill Diameter (Length 40mm)", "10mm Drill Diameter (Length 50mm)"]
  },
  {
    id: "hepo-wooden-dowels-beechwood",
    name: "HEPO Fluted Beechwood Dowels",
    category: "screws-fasteners",
    spec: "Pre-Dried Solid Beechwood | Multi-Fluted | Beveled Edges",
    code: "HP-WD-502",
    price: 0,
    image: "https://images.unsplash.com/photo-1530124566582-ab61277bd50c?auto=format&fit=crop&w=600&q=80",
    description: "Premium kiln-dried beechwood joinery pins. Spiral fluted grooves allow glue to spread evenly when pressed into cabinet frames.",
    features: [
      "Kiln-dried hardwood avoids expansion or shrinking in damp weather",
      "Beveled ends make hammer insertion smooth and precise",
      "Multi-grooves increase adhesion surface area for maximum joinery joint strength",
      "Eco-friendly natural sustainable wood"
    ],
    packSize: "Bag of 500 Pieces",
    material: "Solid European Beechwood",
    finish: "Natural Untreated Wood",
    sizeOptions: ["8 x 30mm", "8 x 40mm", "10 x 40mm", "10 x 50mm"]
  },
  {
    id: "hepo-machine-screws-nuts",
    name: "HEPO Machine Screws with Nuts Set",
    category: "screws-fasteners",
    spec: "Metric Thread M4/M6 | Zinc Plated | Pan Head Slotted Drive",
    code: "HP-MS-601",
    price: 0,
    image: "https://images.unsplash.com/photo-1530124566582-ab61277bd50c?auto=format&fit=crop&w=600&q=80",
    description: "Precision engineered metallic bolts and nuts. Crucial for hardware assembly, shelf support structures, brackets, and furniture locks.",
    features: [
      "Precise ISO metric threads prevent cross threading",
      "Comes complete with hexagonal matching nuts and safety washers",
      "Pan-shaped low profile head with flat load bearing seating",
      "Bright zinc plated coating protects against corrosion"
    ],
    packSize: "Box of 200 Sets (Screw + Washer + Nut)",
    material: "Mild Steel Alloy",
    finish: "Zinc Plated Silver",
    sizeOptions: ["M4 x 16mm", "M4 x 25mm", "M6 x 30mm", "M6 x 50mm"]
  },
  {
    id: "hepo-sleeve-anchor-fasteners",
    name: "HEPO Expansion Sleeve Anchor Fasteners",
    category: "screws-fasteners",
    spec: "Heavy Duty Expansion Casing | Zinc Plated Steel | Flanged Nut",
    code: "HP-SAF-701",
    price: 0,
    image: "https://images.unsplash.com/photo-1530124566582-ab61277bd50c?auto=format&fit=crop&w=600&q=80",
    description: "Extremely tough safety bolts. Perfect for hanging metal heavy channel frameworks, store displays, massive fans, and heavy main gates in raw concrete walls.",
    features: [
      "Heavy gauge steel sleeve splits smoothly for maximum wall friction and anchor force",
      "Slotted tip on threaded cone stops rotation during tightening",
      "Meets professional weight limits for ceiling hang loads",
      "Easy socket wrench installation"
    ],
    packSize: "Box of 50 Pieces",
    material: "Hardened Carbon Steel Alloy",
    finish: "Yellow Zinc Plated / White Zinc Plated",
    sizeOptions: ["M8 x 50mm", "M10 x 75mm", "M12 x 100mm"]
  },
  {
    id: "hepo-wood-hex-coach-screw",
    name: "HEPO Hex Head Wood Coach Screws",
    category: "screws-fasteners",
    spec: "Hexagonal Head | Deep Woods Lag Thread | High Shear Support",
    code: "HP-CS-801",
    price: 0,
    image: "https://images.unsplash.com/photo-1530124566582-ab61277bd50c?auto=format&fit=crop&w=600&q=80",
    description: "Heavy duty structural lag screws to mount thick wooden structural beams, pergolas, and heavy industrial hardware brackets.",
    features: [
      "Deep thread profiles bite wood fibers directly with maximum pullout resistance",
      "Thick shank supports outstanding shear weights",
      "Requires hex socket wrench to drive",
      "Zinc coated for rust barriers"
    ],
    packSize: "Box of 50 Pieces",
    material: "Hardened Carbon Steel",
    finish: "Zinc Plated",
    sizeOptions: ["6.0 x 50mm", "8.0 x 75mm", "10.0 x 100mm"]
  },
  {
    id: "hepo-drywall-collated-tape",
    name: "HEPO Collated Drywall Screws (Tape)",
    category: "screws-fasteners",
    spec: "Collated plastic strip | Black phosphate | Auto screw-gun ready",
    code: "HP-SCR-901",
    price: 0,
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80",
    description: "Pre-aligned drywall screws packed on continuous flexible plastic tapes. Optimized for rapid automatic drywall drilling machine tools.",
    features: [
      "Increases screw placement speed by up to 300% on scaffolding",
      "Saves labor costs on commercial high-rise projects",
      "Zero jam risk in automatic feeding tools",
      "Ultra sharp bugle head"
    ],
    packSize: "Box of 1000 Screws (20 strips of 50)",
    material: "Hardened Manganese Steel",
    finish: "Anti-Corrosive Black Phosphate",
    sizeOptions: ["3.5 x 25mm", "3.5 x 35mm"]
  },

  // CATEGORY 3: KITCHEN & WARDROBE (11 Products)
  {
    id: "hepo-slim-tandem-slate",
    name: "HEPO Slim Double-Wall Tandem Box",
    category: "kitchen-wardrobe",
    spec: "Ultra-Sleek 13mm Profiles | Slate Grey Matte Finish | 45kg load",
    code: "HP-TDB-101",
    price: 0,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    description: "A luxury double-wall drawer system by HEPO. The straight 13mm wall saves drawer volume, making modular kitchen drawers more spacious and visually stunning.",
    features: [
      "Synchronized runner tracks for silent, glide-like linear movements",
      "Carries heavy pots, utensils, and stone organizers of up to 45kg",
      "Built-in 3D dials for simple front shutter level adjustments",
      "Advanced hydraulic buffer eliminates slamming under heavy momentum"
    ],
    packSize: "Complete drawer kit (Side walls, runners, back brackets)",
    material: "Reinforced Powder Coated Steel",
    finish: "Matte Slate Grey (Anti-Fingerprint)",
    sizeOptions: ["Height: 84mm (M1 Drawer)", "Height: 150mm (M2 Drawer)", "Height: 199mm (M3 Deep Drawer)"]
  },
  {
    id: "hepo-deep-drawer-tandem-accessories",
    name: "HEPO Deep Drawer Tandem Internal dividers",
    category: "kitchen-wardrobe",
    spec: "Adjustable Steel Partition Crossbars | Slide-to-Fit | Graphite Grey",
    code: "HP-TDA-102",
    price: 0,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    description: "Organize deep pots, bulk grocery bottles, and container boxes inside your high HEPO tandem box drawers.",
    features: [
      "Cross partitions adjust instantly along the drawer length",
      "High strength clips lock tight onto side rails with zero rattling",
      "Separates spices, bulk pantry flour bags, and oil bottles cleanly",
      "Coated to prevent grease stains or moisture rot"
    ],
    packSize: "Set of 3 adjustable dividing crossbars",
    material: "Alloy Steel & Nylon connectors",
    finish: "Graphite Grey Coated",
    sizeOptions: ["For 450mm drawer", "For 500mm drawer"]
  },
  {
    id: "hepo-wire-basket-plate-rack",
    name: "HEPO SS-304 Heavy Plate-Rack Baskets",
    category: "kitchen-wardrobe",
    spec: "Thick SS Wire Cages | Dedicated Plate Loops | Rustproof",
    code: "HP-WBS-201",
    price: 0,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    description: "Stainless steel heavy-wire baskets with deep loops to securely hold flat dinner plates, clay pots, and saucers without clattering.",
    features: [
      "Made of food-safe SS-304 wire that prevents black spots",
      "Argon-arc wire joints have zero sharp metal burrs",
      "Heavy load bearing outer framing supports up to 30 plates",
      "Fits standard kitchen cabinetry widths with telescopic side slides"
    ],
    packSize: "Single basket with bottom drip trays",
    material: "Stainless Steel 304",
    finish: "Electro-polished Mirror Chrome",
    sizeOptions: ["Width 15 Inch x Depth 20 Inch", "Width 17 Inch x Depth 20 Inch", "Width 21 Inch x Depth 20 Inch"]
  },
  {
    id: "hepo-wire-basket-cup-saucer",
    name: "HEPO SS Cup & Saucer Wire Baskets",
    category: "kitchen-wardrobe",
    spec: "Precision Steel Mesh | Heavy Weight Wire | Low Profile Outer",
    code: "HP-WBS-202",
    price: 0,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    description: "Sturdy modular drawer baskets with custom horizontal steel grids. Ideal for organizing small tea cups, glassware, coffee mugs, and soup bowls.",
    features: [
      "Low vertical profile maximizes space inside modular counter cabinets",
      "Flat steel wires prevent thin glasses tipping over",
      "Fully corrosion resistant, easy to wash and wipe down",
      "Compatible with any telescopic drawer runners"
    ],
    packSize: "Single wire mesh basket",
    material: "Stainless Steel 304",
    finish: "High Gloss Polish Chrome",
    sizeOptions: ["Width 15 x Depth 20 Inch", "Width 17 x Depth 20 Inch"]
  },
  {
    id: "hepo-wire-basket-partition",
    name: "HEPO Modular Partition Wire Baskets",
    category: "kitchen-wardrobe",
    spec: "SS-304 | Adjustable Wire dividers | For Spoons & Bowls",
    code: "HP-WBS-203",
    price: 0,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    description: "Highly versatile wire drawer basket featuring slideable divider bars. Custom configure internal grids to sort spice jars, forks, knives, and kitchen utensils.",
    features: [
      "Infinite grid sizing possibilities to avoid clutter",
      "Pure SS construction resists rust even when damp utensils are placed",
      "Heavy load-bearing steel rings resist warping",
      "Smooth silent slide-fit guides"
    ],
    packSize: "Single basket with 4 partition panels",
    material: "Stainless Steel 304",
    finish: "Mirror Chrome Finish",
    sizeOptions: ["Width 15 x Depth 20", "Width 17 x Depth 20"]
  },
  {
    id: "hepo-ss-cutlery-trays-adjustable",
    name: "HEPO SS Cutlery Trays (Adjustable)",
    category: "kitchen-wardrobe",
    spec: "Brush Satin Steel | Slideable dividers | For modular drawers",
    code: "HP-SCT-301",
    price: 0,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    description: "Luxury stainless steel compartmentalized trays. Designed to rest inside top drawer systems to sort spoons, butter knives, and dessert forks.",
    features: [
      "Staggered deep wells keep cutlery items neatly organized",
      "Brushed steel is hygienic, odor-free, and prevents bacterial film",
      "Solid rubberized feet prevent the tray moving inside when drawer opens",
      "Adjustable horizontal dividers to fit soup ladles and spatulas"
    ],
    packSize: "Piece",
    material: "Stainless Steel 304 Frame with ABS partitions",
    finish: "Brushed Satin Metal",
    sizeOptions: ["For 450mm width cabinet", "For 600mm width cabinet"]
  },
  {
    id: "hepo-gas-liftup-supports",
    name: "HEPO Pneumatic Cabinet Gas Springs",
    category: "kitchen-wardrobe",
    spec: "100N Lifting Force | Leak-Proof Copper Cylinder | Silent Buffer",
    code: "HP-GLS-401",
    price: 0,
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&w=600&q=80",
    description: "Pneumatic cylinder shock absorbers for top kitchen cabinet shutters that open upwards. Provides slow lifting and balanced holding open.",
    features: [
      "Solid copper core piston prevents oil leaks or pressure drop",
      "Rated for up to 100 Newtons (ideal for standard wooden doors of 4-6kg)",
      "Universal clip brackets click on instantly without special tools",
      "Smooth gas buffer stops door bouncing back at the top limit"
    ],
    packSize: "Pair (2 cylinders + all brackets & fasteners)",
    material: "Steel / Copper Core",
    finish: "Electro-Metallic Satin Silver",
    sizeOptions: ["80N Force", "100N Force", "120N Force", "150N Force"]
  },
  {
    id: "hepo-flap-stays-friction",
    name: "HEPO Mechanical Friction Flap Stays",
    category: "kitchen-wardrobe",
    spec: "Adjustable Friction Braking | Multi-Angle Stop | Heavy-Duty",
    code: "HP-MFS-402",
    price: 0,
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&w=600&q=80",
    description: "Adjustable folding stays for storage cabinets and downward opening chest desks. Holds door open securely at any desired angle.",
    features: [
      "Hex dial allows instant tuning of friction braking resistance",
      "Keeps wooden door locked steady at 45°, 75°, or 90°",
      "Zinc alloy build provides long wear resistance",
      "Reversible mounting for left or right side of cabinets"
    ],
    packSize: "Piece with hex wrench",
    material: "High Strength Die-Cast Zinc Alloy",
    finish: "Polished Nickel Plating",
    sizeOptions: ["Standard lift stay"]
  },
  {
    id: "hepo-bottle-pullouts-ss",
    name: "HEPO Double-Tier Bottle Pullouts",
    category: "kitchen-wardrobe",
    spec: "2-Tier Wire Tray | Built-In Slide Guides | Space Saving",
    code: "HP-BPO-501",
    price: 0,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    description: "Sleek, slim sliding spice shelves for modern kitchens. Stores oil bottles, vinegar jars, sauces, and condiment cans in a narrow 200mm space.",
    features: [
      "Compact footprint utilizes vertical spaces efficiently",
      "Comes integrated with heavy telescopic bottom runners",
      "Features high wire rails to stop tall bottles tipping over",
      "Smooth closing action avoids spice container rattling"
    ],
    packSize: "Single slideout unit with runners",
    material: "Stainless Steel 304",
    finish: "Mirror Polish Chrome",
    sizeOptions: ["Width 150mm (6 Inch)", "Width 200mm (8 Inch)"]
  },
  {
    id: "hepo-corner-carousel-revolving",
    name: "HEPO Corner Carousel (Revolving)",
    category: "kitchen-wardrobe",
    spec: "270° Rotation | 2-Tier Semi-Circle Trays | Adjustable Shaft",
    code: "HP-CCR-502",
    price: 0,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    description: "Turn blind kitchen corners into fully accessible storage. This revolving carousel spins smoothly to bring stored pots and boxes directly within reach.",
    features: [
      "Adjustable height metal post fits standard counter cabinet heights",
      "Semi-circular tray shapes allow cabinet shutters to close cleanly",
      "Anti-slip wire frames prevent spice containers sliding off during spins",
      "Each tray supports up to 15kg easily"
    ],
    packSize: "Complete set (2 revolving wire trays, center post, pivots)",
    material: "Stainless Steel & Steel Core",
    finish: "High-Gloss Silver Chrome",
    sizeOptions: ["Diameter 24 Inch (600mm)", "Diameter 28 Inch (700mm)"]
  },
  {
    id: "hepo-wardrobe-hanger-rod",
    name: "HEPO Oval Wardrobe Hanger Rods",
    category: "kitchen-wardrobe",
    spec: "Sleek Oval Profile | High-load | Side Brackets Included",
    code: "HP-WHR-601",
    price: 0,
    image: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=600&q=80",
    description: "Extruded closet hanger rods. Features an elegant oval shape that prevents hangers from rotating or slipping.",
    features: [
      "Rigid hollow steel core holds up to 60 heavy winter coats without flexing",
      "Comes with heavy zinc alloy side-mounting wall brackets",
      "Includes top sound-dampening buffer strip to prevent scratching metal hangers",
      "Can be cut down using standard metal saw tools to fit custom closets"
    ],
    packSize: "Piece (Length 3 Meters + 2 Brackets)",
    material: "Hardened Carbon Steel Alloy / Aluminum",
    finish: "Bright Chrome Plated / Anodized Black",
    sizeOptions: ["4 Feet length", "8 Feet length"]
  },

  // CATEGORY 4: GENERAL HARDWARE (13 Products)
  {
    id: "hepo-multipurpose-drawer-locks",
    name: "HEPO Premium Multipurpose Drawer Lock",
    category: "general-hardware",
    spec: "Zinc Alloy Casting | High Security Dimple Keys | Anti-Pick",
    code: "HP-LK-101",
    price: 0,
    image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80",
    description: "Heavy duty security locks for wooden drawers, filing cabinets, office tables, and wardrobes. Engineered to survive years of daily use.",
    features: [
      "Supplied with 2 high security reversible brass dimple keys",
      "Thick 22mm threaded cylinder body fits standard 18mm ply boards",
      "Solid zinc alloy cast lock bolt resists violent break-ins",
      "Brass pins inside lock avoid jam failures in humid weather"
    ],
    packSize: "Single Lock Piece with rosette, strike and 2 keys",
    material: "High Density Zinc Alloy",
    finish: "Polished Mirror Chrome Finish",
    sizeOptions: ["22mm Cylinder Length", "32mm Cylinder Length"]
  },
  {
    id: "hepo-wardrobe-deadbolt-lock",
    name: "HEPO Double-Throw Deadbolt Lock",
    category: "general-hardware",
    spec: "Double-throw brass bolt | Extra deep reach | Satin Nickel",
    code: "HP-LK-102",
    price: 0,
    image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80",
    description: "Heavy duty multi-lever deadbolt locks for master wardrobes, premium wood cupboards, and double closet doors.",
    features: [
      "Double-throw sliding bolt shoots 24mm deep for high security",
      "6-lever internal brass safety plates resist picking attempts",
      "Rigid steel casing protects lock mechanisms from dust",
      "Elegant satin face plate matches designer cabinetry"
    ],
    packSize: "Single Lock with safety strike and 3 Keys",
    material: "Brass Deadbolt and steel casing",
    finish: "Satin Nickel / Antique Brass",
    sizeOptions: ["Standard Wardrobe Mortise"]
  },
  {
    id: "hepo-aldrops-brass-heavy",
    name: "HEPO Heavy Solid Brass Aldrops",
    category: "general-hardware",
    spec: "Solid Extruded Brass | 16mm thick rod | Antique finish",
    code: "HP-ALD-201",
    price: 0,
    image: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=600&q=80",
    description: "Stately main door aldrop locking bars. Hand-crafted classic hardware to secure wooden entrance doors, villas, and showrooms.",
    features: [
      "Solid brass rod defies hacksaw attempts",
      "Antique lacquered finish prevents green aging marks",
      "Comes with thick cast brass locking brackets and heavy carriage screws",
      "Accommodates massive heavy padlocks"
    ],
    packSize: "Set (Rod, brackets, plates & bolts)",
    material: "Extruded Brass",
    finish: "Antique Polish Lacquered / Satin Chrome",
    sizeOptions: ["10 Inch (250mm)", "12 Inch (300mm)", "14 Inch (350mm)"]
  },
  {
    id: "hepo-ss-towerbolts-heavy",
    name: "HEPO Heavy Duty SS Tower Bolts",
    category: "general-hardware",
    spec: "Grade-304 Stainless Steel | 10mm thick bolt rod | Anti-Rattle",
    code: "HP-TWB-202",
    price: 0,
    image: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=600&q=80",
    description: "Classic vertical and horizontal sliding bolt locks. Provides physical backup safety for main doors, balcony sliders, and bathroom doors.",
    features: [
      "100% rustproof SS-304 construction is perfect for wet weather",
      "Knurled brass knob slider resists loosening",
      "Built-in internal nylon washer stops rattling during wind storms",
      "Flush countersunk screw mounting guide holes"
    ],
    packSize: "Pack of 5 Pieces",
    material: "Stainless Steel 304",
    finish: "Satin Brush Stainless Steel",
    sizeOptions: ["4 Inch (100mm)", "6 Inch (150mm)", "8 Inch (200mm)", "12 Inch (300mm)"]
  },
  {
    id: "hepo-doorstopper-magnetic-brass",
    name: "HEPO Magnetic Door Stoppers (Solid Brass)",
    category: "general-hardware",
    spec: "High Power Magnet Core | Spring Buffer | Floor/Wall Mount",
    code: "HP-DST-301",
    price: 0,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    description: "Elegant and highly powerful magnetic door holders. Stops slamming on windy days while keeping doors wide open.",
    features: [
      "Neodymium magnet holds heavy solid-wood doors securely",
      "Internal mechanical spring damper cushions fast impacts silently",
      "Screw thread hides underneath casing for flat clean visual lines",
      "Supplied with expanding steel bolts for tile floor drilling"
    ],
    packSize: "Piece with expansion anchor bolts",
    material: "Solid Brass & Cast Alloys",
    finish: "Satin Nickel / Gloss Gold / Polished Chrome",
    sizeOptions: ["Standard Floor Mount", "Wall Mount Extension Rod"]
  },
  {
    id: "hepo-heavy-l-brackets-steel",
    name: "HEPO Heavy Duty Reinforced L Brackets",
    category: "general-hardware",
    spec: "Thick Galvanized Steel | Double Gusset Ribs | Heavy Load",
    code: "HP-LBR-302",
    price: 0,
    image: "https://images.unsplash.com/photo-1530124566582-ab61277bd50c?auto=format&fit=crop&w=600&q=80",
    description: "Structural connection brackets. Crucial for heavy granite kitchen slab framing, heavy wooden bed frames, and garage shelves.",
    features: [
      "Reinforced steel center gusset prevents bracket flexing",
      "Thick 4mm sheet steel supports extreme shear forces",
      "Zinc coated finish survives humid areas underneath sinks",
      "Staggered screw slots fit standard masonry anchor bolts"
    ],
    packSize: "Pack of 10 Brackets",
    material: "Hot Rolled Steel",
    finish: "Hot Dipped Galvanized / White Epoxy",
    sizeOptions: ["2 x 2 Inch", "3 x 3 Inch", "4 x 4 Inch", "6 x 6 Inch"]
  },
  {
    id: "hepo-castorwheels-braketype",
    name: "HEPO Heavy Industrial Castor Wheels",
    category: "general-hardware",
    spec: "360° Swivel | Dual-bearing | Red PU non-mark tread | Brake",
    code: "HP-CST-401",
    price: 0,
    image: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=600&q=80",
    description: "Premium smooth castor wheels for rolling tables, furniture showcases, office file units, and heavy warehouse carts.",
    features: [
      "Quiet red polyurethane tire won't track or stain white floor tiles",
      "Tough dual ball races in swivel head ensure smooth spins",
      "Dual foot brake locks both swivel rotation and wheel rolling simultaneously",
      "Excellent shock absorption and vibration damping"
    ],
    packSize: "Set of 4 Wheels (2 with brakes + 2 swivel plain)",
    material: "Polyurethane Wheel & Heavy Steel Fork",
    finish: "Zinc Steel Frame / Red PU Wheel",
    sizeOptions: ["1.5 Inch (40mm)", "2.0 Inch (50mm)", "3.0 Inch (75mm)"]
  },
  {
    id: "hepo-maindoor-pull-handles-ss",
    name: "HEPO Designer Main Door Pull Handles",
    category: "general-hardware",
    spec: "Back-to-Back pair | Stainless Steel 304 | Solid Grip",
    code: "HP-DPH-402",
    price: 0,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    description: "Magnificent entrance door pulls from HEPO. Create a luxury first impression on solid teakwood doors, glass office entryways, and villas.",
    features: [
      "Constructed from 1.2mm wall thick premium SS-304 tubing",
      "Universal mounting kit fits wood, metal, and thick glass doors",
      "Solid brass screw mounting points prevent handle wobble",
      "Superior satin finish requires zero maintenance"
    ],
    packSize: "Pair (2 matching handles for inside and outside of single door)",
    material: "Stainless Steel 304",
    finish: "Satin Brushed and Polish Gold mix",
    sizeOptions: ["Length 12 Inch (300mm)", "Length 18 Inch (450mm)", "Length 24 Inch (600mm)"]
  },
  {
    id: "hepo-mortise-handle-sets-classic",
    name: "HEPO Mortise Handle sets (With Lock)",
    category: "general-hardware",
    spec: "Classic Plate Style | Double-action lock | Solid Zinc alloy",
    code: "HP-MHS-501",
    price: 0,
    image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80",
    description: "Complete security mortise door handle plate sets. Includes smooth brass cylinder lock body, keys, strike plate, and handles.",
    features: [
      "Solid zinc alloy handles are cast as single bodies to prevent snapping",
      "Heavy duty return spring prevents handle drooping over years of use",
      "Includes premium double throw lock body with solid brass bolt",
      "Supplied with 3 computerized dimple keys"
    ],
    packSize: "Complete box (2 handle plates, 1 lock body, 1 cylinder & keys)",
    material: "Zinc Alloy Handles & Brass Cylinder",
    finish: "Antique Brass / Satin Chrome / Black Sand",
    sizeOptions: ["Standard 200mm Plate Length"]
  },
  {
    id: "hepo-curtain-bracket-fancy",
    name: "HEPO Fancy Curtain Bracket Finials",
    category: "general-hardware",
    spec: "Universal 1 Inch pipe diameter | Heavy cast alloy | Satin finish",
    code: "HP-CRB-601",
    price: 0,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    description: "Decorative end cap bracket finials for modular curtain poles. Elegant patterns to suit both traditional and ultra-modern drapery lines.",
    features: [
      "Fits standard 1 inch (25mm) steel or wooden curtain poles",
      "Precision thumbscrew locks pole tightly inside bracket",
      "Thick baseplate prevents bracket pullout from plaster walls",
      "Scratch-proof satin electroplated finish"
    ],
    packSize: "Pair (2 matching bracket finials)",
    material: "Cast Zinc Alloy",
    finish: "Satin Nickel Finish / Antique Gold",
    sizeOptions: ["For 1 Inch Pipe"]
  },
  {
    id: "hepo-silicon-bufferpad-clear",
    name: "HEPO Clear Silicon Buffer Pads",
    category: "general-hardware",
    spec: "Self-Adhesive | Soft Cushioning Rubber | Invisible transparent",
    code: "HP-SBP-602",
    price: 0,
    image: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=600&q=80",
    description: "Quiet and protective self-adhesive silicon bump dots. Mutes wooden doors slamming while preventing glass sliding.",
    features: [
      "Premium soft clear elastomer absorbs cabinet impacts completely",
      "High-bond pressure adhesive sticks instantly to wood, glass, and laminate",
      "100% transparent compound won't yellow over time",
      "Protects expensive drawer fronts from chipping"
    ],
    packSize: "Sheet of 100 soft adhesive bumper dots",
    material: "Silicon Rubber Elastomer",
    finish: "Water Clear Crystal",
    sizeOptions: ["8mm Diameter x 2mm Height", "10mm Diameter x 3mm Height"]
  },
  {
    id: "hepo-glass-shelf-bracket-dtype",
    name: "HEPO D-Type Glass Shelf Brackets",
    category: "general-hardware",
    spec: "Clamp-on design | Rubber protective pads | For 6-12mm glass",
    code: "HP-GSB-701",
    price: 0,
    image: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=600&q=80",
    description: "Heavy duty wall brackets for washbasin shelves, custom mirrors, and retail wall glass racks.",
    features: [
      "Adjustable clamp screw accommodates varying glass panel thicknesses",
      "Supplied with thick soft rubber layers to prevent glass crushing and slipout",
      "Supports massive static loads when anchored using masonry steel expansion plug bolts",
      "Elegant curved modern layout"
    ],
    packSize: "Pack of 4 brackets",
    material: "Solid Zinc Alloy / Stainless Steel",
    finish: "Mirror Polish Chrome Finish",
    sizeOptions: ["Small (6-8mm Glass)", "Medium (8-10mm Glass)", "Large (10-12mm Glass)"]
  },
  {
    id: "hepo-curtain-concealed-bracket",
    name: "HEPO Heavy Concealed Curtain Support Brackets",
    category: "general-hardware",
    spec: "Solid wall anchor | Concealed screw channel | Polished Nickel",
    code: "HP-CRB-801",
    price: 0,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    description: "Add clean structural supports to long running modular curtain systems. Features a completely invisible wall screw face.",
    features: [
      "Heavy duty collar holds pole load without flex",
      "Sleek thread-on covers conceal all raw mounting screws",
      "Smooth rounded profile",
      "Resists moist environment in bathroom shower rails"
    ],
    packSize: "Pair",
    material: "Cast Zinc Alloy",
    finish: "Satin Nickel Plated",
    sizeOptions: ["For 1 Inch Pipe"]
  }
];

export const HIGHLIGHTS: WhyHighlight[] = [
  {
    id: "genuine",
    title: "Authorized HEPO Products",
    description: "We are direct resellers of HEPO India. Say goodbye to cheap duplicates — get 100% genuine products with manufacturer warranties.",
    iconName: "BadgeCheck"
  },
  {
    id: "pricing",
    title: "Wholesale Support",
    description: "Exclusive volume discounts for carpenters, interior designers, and hardware retailers, paired with robust bulk stock ready-to-dispatch.",
    iconName: "TrendingDown"
  },
  {
    id: "delivery",
    title: "Same-Day / Fast Dispatch",
    description: "In-stock hardware is shipped within hours. Local site delivery across Bengaluru to keep your project deadlines running on schedule.",
    iconName: "Truck"
  },
  {
    id: "guidance",
    title: "Expert Contractor Support",
    description: "Our in-house technical experts help you choose the correct hinge cranks, load ratings, and screw sizes for your wood panels.",
    iconName: "Users"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Mallesha Gowda",
    role: "Proprietor & Master Carpenter",
    company: "Mallesha Wooden Creations, Kalyan Nagar",
    rating: 5,
    comment: "I have been using HEPO hinges and telescopic slides from A3 Prime Hub for the past 2 years. Their prompt wholesale supply is the best in Bangalore and they always issue GST tax invoices properly which keeps my corporate clients happy. Highly recommended!"
  },
  {
    id: "t2",
    name: "Vikram R. Shah",
    role: "Lead Interior Designer",
    company: "SpaceCraft Studio Interiors",
    rating: 5,
    comment: "For all our premium kitchen wardrobe designs, we stick to HEPO hardware because it offers German-standard quality at a fraction of other luxury brands' prices. A3 Prime Hub is super fast with dispatch and their customer support knows every product specification inside-out."
  },
  {
    id: "t3",
    name: "Mohammad Yusuf",
    role: "Civil Contractor & Modular Kitchen Manufacturer",
    company: "Yusuf Modulars & Decor",
    rating: 5,
    comment: "The staff at A3 Prime Hub are extremely professional. They helped me choose the correct 150mm and 199mm slim tandem box sizes and gas springs. Their customer service is an incredible time-saver on-site!"
  }
];
