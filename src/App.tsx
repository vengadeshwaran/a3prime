import React, { useState, useMemo, useEffect } from "react";
import { 
  COMPANY_INFO, 
  CATEGORIES, 
  PRODUCTS, 
  HIGHLIGHTS, 
  TESTIMONIALS 
} from "./data";
import { Product, ProductCategory } from "./types";
import ProductDetailsModal from "./components/ProductDetailsModal";
import AdminPanel from "./components/AdminPanel";
import { Lock } from "lucide-react";

// Safe, type-safe Lucide icon mapping
import { 
  Wrench, 
  Hammer, 
  LayoutGrid, 
  ShieldAlert, 
  BadgeCheck, 
  TrendingDown, 
  Truck, 
  Users, 
  HelpCircle,
  Menu,
  X,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Search,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Star,
  Sparkles,
  Award,
  ArrowUpRight
} from "lucide-react";

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "Wrench": return <Wrench className={className} />;
    case "Hammer": return <Hammer className={className} />;
    case "LayoutGrid": return <LayoutGrid className={className} />;
    case "ShieldAlert": return <ShieldAlert className={className} />;
    case "BadgeCheck": return <BadgeCheck className={className} />;
    case "TrendingDown": return <TrendingDown className={className} />;
    case "Truck": return <Truck className={className} />;
    case "Users": return <Users className={className} />;
    default: return <HelpCircle className={className} />;
  }
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Separate page state router (no external package dependency needed)
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Dynamic state loaded from localStorage with static fallbacks
  const [companyInfo, setCompanyInfo] = useState(() => {
    const saved = localStorage.getItem("a3_company_info");
    return saved ? JSON.parse(saved) : COMPANY_INFO;
  });
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("a3_products");
    let loaded: Product[] = saved ? JSON.parse(saved) : PRODUCTS;
    
    // Auto-sync default product images with PRODUCTS data so any updated high-quality photos apply immediately
    if (saved) {
      let changed = false;
      const updated = loaded.map(p => {
        const fresh = PRODUCTS.find(f => f.id === p.id);
        if (fresh && p.image !== fresh.image && (p.image.includes("unsplash.com") || p.image === "")) {
          changed = true;
          return { ...p, image: fresh.image };
        }
        return p;
      });
      if (changed) {
        loaded = updated;
        localStorage.setItem("a3_products", JSON.stringify(updated));
      }
    }
    return loaded;
  });

  const handleProductsChange = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("a3_products", JSON.stringify(newProducts));
  };

  const handleSettingsChange = (newSettings: any) => {
    setCompanyInfo(newSettings);
    localStorage.setItem("a3_company_info", JSON.stringify(newSettings));
  };

  // Smooth scroll helper
  const handleScrollTo = (elementId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // When clicking Category "Enquire", auto-filter products and scroll
  const handleCategoryEnquire = (categoryId: string) => {
    setSelectedCategoryFilter(categoryId);
    const element = document.getElementById("products-catalog");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter products based on search query and category pill
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategoryFilter === "all" || product.category === selectedCategoryFilter;
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.spec.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategoryFilter, searchQuery]);

  // General WhatsApp click
  const triggerGeneralWhatsapp = () => {
    const text = encodeURIComponent(`Hello ${companyInfo.name}, I am looking to enquire about HEPO furniture fittings and fasteners. Kindly share your catalog and price list.`);
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${text}`, "_blank");
  };

  if (currentPath === "/admin") {
    return (
      <AdminPanel 
        products={products} 
        onProductsChange={handleProductsChange}
        settings={companyInfo}
        onSettingsChange={handleSettingsChange}
        onClose={() => navigate("/")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. Sticky Navbar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm" id="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
                        {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleScrollTo("home")}>
              <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Wrench className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-display font-bold tracking-tight text-slate-900 block uppercase">
                  {companyInfo.name}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-amber-600 font-mono font-bold block">
                  {companyInfo.dealerBadge}
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center space-x-7">
              <button onClick={() => handleScrollTo("home")} className="text-slate-600 hover:text-amber-600 text-xs font-semibold transition cursor-pointer">Home</button>
              <button onClick={() => handleScrollTo("products-catalog")} className="text-slate-600 hover:text-amber-600 text-xs font-semibold transition cursor-pointer">Products</button>
              <button onClick={() => handleScrollTo("why-us")} className="text-slate-600 hover:text-amber-600 text-xs font-semibold transition cursor-pointer">Why Us</button>
              <button onClick={() => handleScrollTo("about")} className="text-slate-600 hover:text-amber-600 text-xs font-semibold transition cursor-pointer">About</button>
              <button onClick={() => handleScrollTo("contact")} className="text-slate-600 hover:text-amber-600 text-xs font-semibold transition cursor-pointer">Contact</button>
              
              {/* Premium Admin Panel toggle in Desktop Navbar */}
              <button 
                onClick={() => navigate("/admin")}
                className="text-amber-700 hover:text-amber-800 text-xs font-bold flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg transition cursor-pointer"
                id="btn-nav-admin"
              >
                <Lock className="w-3.5 h-3.5" /> Admin Console
              </button>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Fallback Admin button for mid-sized screens */}
              <button 
                onClick={() => navigate("/admin")}
                className="xl:hidden text-amber-700 hover:text-amber-800 text-xs font-bold flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
                id="btn-nav-admin-fallback"
              >
                <Lock className="w-3 h-3" /> Admin
              </button>
              
              <a 
                href={`tel:${companyInfo.phone}`}
                className="text-slate-700 hover:text-slate-900 hover:bg-slate-100/50 flex items-center gap-2 text-xs font-mono border border-slate-200 px-3 py-1.5 rounded-lg transition"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" /> {companyInfo.phone}
              </a>
              <button 
                onClick={triggerGeneralWhatsapp}
                className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-amber-500/20"
                id="btn-nav-whatsapp"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Enquiry
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition"
                id="btn-mobile-menu"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-md animate-slide-down">
            <button 
              onClick={() => handleScrollTo("home")} 
              className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-amber-600 transition"
            >
              Home
            </button>
            <button 
              onClick={() => handleScrollTo("products-catalog")} 
              className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-amber-600 transition"
            >
              Products
            </button>
            <button 
              onClick={() => handleScrollTo("why-us")} 
              className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-amber-600 transition"
            >
              Why Us
            </button>
            <button 
              onClick={() => handleScrollTo("about")} 
              className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-amber-600 transition"
            >
              About
            </button>
            <button 
              onClick={() => handleScrollTo("contact")} 
              className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-amber-600 transition"
            >
              Contact
            </button>
            
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              {/* Mobile Admin Trigger */}
              <button
                onClick={() => { setMobileMenuOpen(false); navigate("/admin"); }}
                className="w-full text-center py-2.5 px-4 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                id="btn-mobile-admin"
              >
                <Lock className="w-4 h-4" /> Unlock Admin Panel
              </button>

              <a 
                href={`tel:${companyInfo.phone}`}
                className="w-full text-center py-2 px-4 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-500" /> Call {companyInfo.phone}
              </a>
              <button 
                onClick={triggerGeneralWhatsapp}
                className="w-full bg-amber-500 text-slate-950 font-semibold py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                id="btn-mobile-whatsapp"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Enquiry
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <section id="home" className="relative pt-8 pb-20 lg:pt-16 lg:pb-32 overflow-hidden bg-white">
        {/* Background Gradients & Hardware Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50"></div>
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Authorized Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
                <Award className="w-4 h-4 text-amber-600" /> {companyInfo.dealerBadge}
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Premium Hardware. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  Trusted Fittings.
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Welcome to <strong className="text-slate-900 font-semibold">{companyInfo.name}</strong> — {companyInfo.subtitle}. Authorized reseller of genuine <strong className="text-amber-600 font-semibold">HEPO India</strong> furniture fittings, heavy-duty slides, wardrobe accessories, and precision screws. Engineered for reliability, crafted for perfection.
              </p>

              {/* Trust Taglines */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-2 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Genuine HEPO
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> GST Invoice Available
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Best Wholesale Rates
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => handleScrollTo("products-catalog")}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 cursor-pointer shadow-lg shadow-amber-500/25"
                  id="hero-btn-browse"
                >
                  Browse HEPO Catalog <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  onClick={triggerGeneralWhatsapp}
                  className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-semibold px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                  id="hero-btn-whatsapp"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" /> WhatsApp Enquiry
                </button>
              </div>
            </div>

            {/* Hero Right Visuals (Bento-styled product representation) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[380px] sm:max-w-[420px] lg:max-w-none">
                
                {/* Main Card */}
                <div className="relative bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-700 font-mono text-[9px] px-2.5 py-1 rounded-bl-xl border-l border-b border-slate-200/80 uppercase font-bold">
                    Official Reseller Tag
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs text-slate-500 font-mono">Store Open & Live Enquiries</span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-slate-950 mb-2">HEPO Product Inventory</h3>
                  <p className="text-xs text-slate-500 mb-6 font-medium">High-performance furniture fitting solutions in-stock:</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-500/50 hover:bg-white transition shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">Soft Close Hinges</span>
                          <span className="text-[10px] text-slate-500 block font-mono">Tested to 80K cycles</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">In Stock</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-500/50 hover:bg-white transition shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                          <LayoutGrid className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">Tandem Drawers</span>
                          <span className="text-[10px] text-slate-500 block font-mono">Slate Grey, 45kg load</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">In Stock</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-500/50 hover:bg-white transition shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                          <Hammer className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">Plywood Wood Screws</span>
                          <span className="text-[10px] text-slate-500 block font-mono">Yellow Zinc, non-slip</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">In Stock</span>
                    </div>
                  </div>

                  {/* Contractor Rating micro badge */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center text-amber-500 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-1 font-medium">Trusted by 250+ Bangalore Contractors</span>
                    </div>

                    <div className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 text-right">
                      <span className="text-[10px] text-slate-500 block font-medium">GST Tax Rate</span>
                      <span className="text-xs font-bold text-slate-900 font-mono">Flat 18% Invoice</span>
                    </div>
                  </div>

                </div>

                {/* Ambient glow accent tags */}
                <div className="absolute -bottom-6 -right-6 bg-white border border-slate-200 rounded-xl p-3 shadow-xl hidden sm:flex items-center gap-3 animate-bounce" style={{ animationDuration: "3s" }}>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-mono">AUTHORIZED DEALER</span>
                    <span className="text-xs font-bold text-slate-950">HEPO 100% Genuine</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Product Categories Grid */}
      <section id="categories" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest font-mono mb-2">
              Browse by Department
            </h2>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Genuine HEPO Product Segments
            </h3>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
              We supply the complete catalogs of HEPO India. Select a category below to filter our featured items, view active technical specs, and request bulk rates.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/50 hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                id={`cat-card-${cat.id}`}
              >
                <div>
                  {/* Category Image Placeholder */}
                  <div className="h-44 overflow-hidden relative bg-slate-100 border-b border-slate-100">
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                    
                    {/* Category Icon */}
                    <div className="absolute bottom-3 left-3 bg-white/95 border border-slate-200/80 p-2.5 rounded-xl text-amber-600 shadow-md">
                      <DynamicIcon name={cat.iconName} className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h4 className="text-lg font-display font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Footer button */}
                <div className="px-5 pb-5 pt-2">
                  <button
                    onClick={() => handleCategoryEnquire(cat.id)}
                    className="w-full bg-slate-50 hover:bg-amber-500 text-slate-700 hover:text-slate-950 font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-200 hover:border-amber-500 shadow-sm"
                    id={`btn-cat-enquire-${cat.id}`}
                  >
                    View & Enquire <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Featured Products Section (E-Commerce Catalog) */}
      <section id="products-catalog" className="py-20 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest font-mono mb-2">
                Featured Catalog
              </h2>
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
                Our Top-Selling HEPO Solutions
              </h3>
              <p className="text-slate-600 mt-2 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
                Click on any product to see full dimensions, load capacities, and available packs. Easily compile bulk quantities and request builder pricing.
              </p>
            </div>

            {/* Live Search Bar */}
            <div className="relative w-full lg:max-w-xs shrink-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search hinges, screws, model codes..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="catalog-search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-700"
                  id="btn-clear-search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Filtering Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedCategoryFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition cursor-pointer ${
                selectedCategoryFilter === "all"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-50 shadow-sm"
              }`}
              id="pill-filter-all"
            >
              All Products
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition cursor-pointer ${
                  selectedCategoryFilter === cat.id
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "bg-white border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-50 shadow-sm"
                }`}
                id={`pill-filter-${cat.id}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Catalog Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl bg-white shadow-sm">
              <Search className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h4 className="text-base font-semibold text-slate-700">No products found</h4>
              <p className="text-slate-500 text-xs mt-1">Try resetting your search query or choosing another category.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategoryFilter("all"); }}
                className="mt-4 bg-slate-50 border border-slate-200 hover:border-amber-500 text-slate-700 px-4 py-2 rounded-xl text-xs transition font-semibold"
                id="btn-reset-filters"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                // Individual direct WhatsApp enquire message for this product
                const waText = `Hello ${companyInfo.name}, I saw the *${product.name} (Code: ${product.code})* on your website catalog and want to check wholesale pricing for a project. Please advise on stock.`;
                const waLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(waText)}`;

                return (
                  <div 
                    key={product.id}
                    className="group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/50 hover:shadow-lg transition-all duration-300"
                    id={`product-card-${product.id}`}
                  >
                    <div>
                      {/* Product Thumbnail */}
                      <div 
                        className="h-48 overflow-hidden bg-slate-50 border-b border-slate-100 relative cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <img 
                          src={product.image} 
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-white/95 text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-md border border-slate-200/50 uppercase tracking-wider flex items-center gap-1.5">
                            <Search className="w-3.5 h-3.5 text-amber-600" /> View Clear Specs
                          </span>
                        </div>
                        
                        {/* Genuine Badge & Code Overlay */}
                        <div className="absolute bottom-2.5 left-2.5 bg-white/95 border border-slate-200 text-[9px] font-mono text-amber-600 font-bold px-2 py-0.5 rounded shadow-sm">
                          {product.code}
                        </div>
                        
                        <div className="absolute top-2.5 right-2.5 bg-white/95 border border-slate-200 text-[9px] text-slate-600 px-2 py-0.5 rounded shadow-sm">
                          GST Invoice
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div className="text-[10px] text-amber-600 uppercase font-bold tracking-wider font-mono">
                          HEPO RESELLER RANGE
                        </div>
                        <h4 
                          className="text-sm font-semibold text-slate-900 hover:text-amber-600 transition-colors line-clamp-2 cursor-pointer font-display min-h-[40px]"
                          onClick={() => setSelectedProduct(product)}
                        >
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium line-clamp-2 min-h-[32px]">
                          {product.spec}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="p-4 pt-0">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full bg-slate-50 hover:bg-amber-500 hover:text-slate-950 text-slate-700 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition border border-slate-200/80 hover:border-amber-500 cursor-pointer"
                        id={`btn-product-details-${product.id}`}
                      >
                        View Details & Specifications
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section id="why-us" className="py-20 bg-slate-50 border-t border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest font-mono mb-2">
              The A3 Prime Hub Promise
            </h2>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Why Contractors Trust Us
            </h3>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed font-medium">
              We understand modular furniture production. Our business is built on supplying genuine hardware with uncompromised integrity.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HIGHLIGHTS.map((hl) => (
              <div 
                key={hl.id}
                className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-amber-500/50 transition duration-300 relative overflow-hidden group shadow-sm hover:shadow-md"
              >
                {/* Visual decoration */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500/0 group-hover:bg-amber-500 transition-all"></div>
                
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-5 border border-amber-500/10">
                  <DynamicIcon name={hl.iconName} className="w-6 h-6" />
                </div>

                <h4 className="text-lg font-display font-bold text-slate-900 mb-2">
                  {hl.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {hl.description}
                </p>
              </div>
            ))}
          </div>

          {/* Trust Seal Banner */}
          <div className="mt-16 bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Full GST Invoicing Compliant</h4>
                <p className="text-xs text-slate-500 mt-1 font-medium">We supply correct HSN codes for fittings and screws. Easy business tax compliance for developers.</p>
              </div>
            </div>
            <button 
              onClick={triggerGeneralWhatsapp}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 px-6 py-3 rounded-xl flex items-center gap-2 transition shrink-0 cursor-pointer shadow-sm"
              id="btn-tax-enquire"
            >
              Request Corporate Account <ArrowUpRight className="w-4 h-4 text-amber-600" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-100/40 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest font-mono mb-2">
              Carpenter Voices
            </h2>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              What Local Craftsmen Say
            </h3>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed font-medium">
              We stand by our clients. From small carpenters to large modular kitchen factories, here is how we serve our community.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id}
                className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between relative shadow-sm hover:shadow-md transition"
              >
                <span className="text-6xl font-serif text-amber-500/15 absolute top-2 left-4 pointer-events-none">“</span>
                
                <div className="relative z-10">
                  {/* Rating Stars */}
                  <div className="flex text-amber-500 gap-0.5 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 italic leading-relaxed font-medium">
                    "{t.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center font-bold text-amber-600">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{t.name}</h5>
                    <span className="text-[10px] text-slate-500 block mt-0.5 font-semibold">{t.role}</span>
                    {t.company && (
                      <span className="text-[10px] text-slate-400 block font-mono font-semibold">{t.company}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. About Section */}
      <section id="about" className="py-20 bg-white border-t border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* About Visual Placeholder */}
            <div className="lg:col-span-5 space-y-4">
              <div className="aspect-video lg:aspect-square bg-slate-100 border border-slate-200 rounded-2xl relative overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=600&q=80" 
                  alt="A3 Prime Hub Hardware Showcase"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 font-mono">BENGALURU CENTRAL HUB</span>
                  <h4 className="text-lg font-display font-bold mt-1">Authorized Hepo Reseller Store</h4>
                  <p className="text-xs text-slate-200 mt-1 font-medium">Dedicated counter for woodcraft and fittings architecture.</p>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase font-mono">
                Who We Are
              </div>
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
                About {companyInfo.name}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                Established as a multi-tier architectural hardware hub, <strong className="text-slate-950 font-bold">{companyInfo.name}</strong> serves as an authorized dealer and trusted reseller partner for <strong className="text-amber-600 font-bold">HEPO India</strong>. Our massive showroom and storage warehouse cater directly to carpenter shops, modular kitchen designers, interior decorators, and furniture manufacturing plants across Bangalore.
              </p>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                We believe premium fittings shouldn't carry an inflated price tag. By forging direct procurement lines with HEPO, we maintain robust, immediate ready-to-dispatch stocks of high-cycle hinges, slim drawer tandem systems, sliding tracks, and industrial fasteners. Whether you are constructing a single residential wardrobe or setting up a multi-apartment modular cabinet fitout, A3 Prime Hub is your hardware backbone.
              </p>

              {/* Counter details */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 font-mono">
                <div>
                  <span className="text-2xl font-bold text-amber-600 block">5+ Years</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Expert Team</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-amber-600 block">10k+</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">SKUs Stocked</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-amber-600 block">4.8★</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Contractor Rated</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Contact / Footer Section */}
      <section id="contact" className="bg-slate-50 border-t border-slate-200 text-slate-600 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            
            {/* Footer Col 1 - Brand Info */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-slate-950">
                  <Wrench className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-lg font-display font-bold text-slate-900">{companyInfo.name}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm font-medium">
                Authorized dealer of HEPO brand products. Direct distribution point for heavy-duty furniture cabinet fittings, fasteners, screws, and wardrobe systems.
              </p>
              
              <div className="pt-2">
                <span className="block text-xs font-bold text-slate-700 mb-1">Business GSTIN Registered</span>
                <span className="inline-block bg-white border border-slate-200 text-[10px] text-slate-600 font-mono px-3 py-1 rounded shadow-sm font-semibold">
                  GST invoices issued for all wholesale orders.
                </span>
              </div>
            </div>

            {/* Footer Col 2 - Address & Hours */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase font-display">
                Location & Hours
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-600">{companyInfo.address}</span>
                </div>
                <div className="flex items-start gap-2.5 pt-1">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    {companyInfo.businessHours.map((bh: any, idx: number) => (
                      <div key={idx} className="flex justify-between gap-4 font-mono text-[11px] font-semibold">
                        <span className="text-slate-500">{bh.days}:</span>
                        <span className="text-amber-600 font-bold">{bh.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Col 3 - Maps Embed & Direct Contact */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase font-display">
                Google Maps Location
              </h4>
              
              {/* Actual Google Maps iframe Embed */}
              <div className="w-full h-36 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner relative group">
                <iframe 
                  src={companyInfo.googleMapsEmbedUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="A3 Prime Hub Location Map"
                  className="opacity-90 group-hover:opacity-100 transition duration-300"
                ></iframe>
              </div>

              {/* Clickable Quick Dial Actions */}
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <a 
                  href={`tel:${companyInfo.phone}`}
                  className="bg-white hover:bg-slate-50 border border-slate-200 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition text-slate-700 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" /> Dial Call
                </a>
                <button
                  onClick={triggerGeneralWhatsapp}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer font-bold shadow-md shadow-emerald-500/15"
                  id="btn-footer-whatsapp"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Chat WhatsApp
                </button>
              </div>
            </div>

          </div>

          {/* Social Links & Copyright */}
          <div className="border-t border-slate-200 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
            <p>
              &copy; {new Date().getFullYear()} {companyInfo.name}. All Rights Reserved. All brand names and logos such as HEPO are trademarks of their respective owners.
            </p>
            
            <div className="flex items-center space-x-6">
              <a href={companyInfo.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition">Facebook</a>
              <a href={companyInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition">Instagram</a>
              <a href={companyInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition">LinkedIn</a>
            </div>
          </div>

        </div>
      </section>

      {/* 9. Floating WhatsApp Action Button */}
      <button
        onClick={triggerGeneralWhatsapp}
        className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group cursor-pointer"
        title="Chat on WhatsApp"
        id="fab-whatsapp"
      >
        <MessageSquare className="w-6 h-6 stroke-[2.5]" />
        
        {/* Hover label */}
        <span className="absolute right-14 bg-slate-900 border border-slate-800 text-white font-semibold text-xs py-1 px-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap shadow-xl">
          Order on WhatsApp (Direct Counter)
        </span>
      </button>

      {/* 10. Product Details Modal Drawer */}
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

    </div>
  );
}
