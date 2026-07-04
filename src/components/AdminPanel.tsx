import React, { useState } from "react";
import { Product, ProductCategory } from "../types";
import { CATEGORIES } from "../data";
import { 
  X, 
  Lock, 
  Unlock, 
  Settings, 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  RefreshCw, 
  CheckCircle, 
  LogOut, 
  BarChart3, 
  Info,
  Phone,
  MessageSquare,
  MapPin,
  Mail,
  Clock,
  Sparkles,
  Link,
  ChevronRight,
  Eye,
  Download,
  Upload
} from "lucide-react";

interface AdminPanelProps {
  products: Product[];
  onProductsChange: (newProducts: Product[]) => void;
  settings: any;
  onSettingsChange: (newSettings: any) => void;
  onClose: () => void;
}

export default function AdminPanel({ 
  products, 
  onProductsChange, 
  settings, 
  onSettingsChange, 
  onClose 
}: AdminPanelProps) {
  // Passcode gate state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("a3_admin_authenticated") === "true";
  });
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // Tabs: 'dashboard' | 'products' | 'settings'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'settings'>('dashboard');

  // Product management states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [productSearch, setProductSearch] = useState<string>("");
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>("all");

  // Form states for adding/editing product
  const [prodForm, setProdForm] = useState<{
    name: string;
    category: string;
    spec: string;
    code: string;
    price: number;
    originalPrice: number;
    image: string;
    description: string;
    features: string; // Comma separated initially, will split
    packSize: string;
    material: string;
    finish: string;
    sizeOptions: string; // Comma separated
  }>({
    name: "",
    category: "furniture-fittings",
    spec: "",
    code: "",
    price: 0,
    originalPrice: 0,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    description: "",
    features: "Genuine HEPO Product, Heavy-duty performance, Easy installation",
    packSize: "Piece",
    material: "High Grade Metal",
    finish: "Nickel Plated",
    sizeOptions: "Standard"
  });

  // Settings form states
  const [settingsForm, setSettingsForm] = useState({
    name: settings.name,
    subtitle: settings.subtitle,
    dealerBadge: settings.dealerBadge,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    email: settings.email,
    address: settings.address,
    googleMapsEmbedUrl: settings.googleMapsEmbedUrl,
    businessHoursWeekday: settings.businessHours?.[0]?.hours || "9:30 AM - 8:00 PM",
    businessHoursSunday: settings.businessHours?.[1]?.hours || "10:30 AM - 2:30 PM (Only Enquiries)",
    facebook: settings.socials?.facebook || "",
    instagram: settings.socials?.instagram || "",
    linkedin: settings.socials?.linkedin || ""
  });

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const triggerNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleExportJSON = () => {
    try {
      const exportData = {
        products,
        settings
      };
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `a3_prime_hub_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerNotification("success", "Backup JSON exported successfully!");
    } catch (err) {
      triggerNotification("error", "Failed to export backup data.");
    }
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && Array.isArray(parsed.products)) {
          onProductsChange(parsed.products);
          if (parsed.settings) {
            onSettingsChange(parsed.settings);
          }
          triggerNotification("success", "Catalog data imported successfully! Page will update.");
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        } else {
          triggerNotification("error", "Invalid backup format. Must contain a valid products list.");
        }
      } catch (err) {
        triggerNotification("error", "Failed to parse file. Make sure it is valid JSON.");
      }
    };
    reader.readAsText(file);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("a3_admin_authenticated", "true");
      setAuthError("");
    } else {
      setAuthError("Incorrect passcode. Hint: Use admin123");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("a3_admin_authenticated");
  };

  // Restores default products from backup
  const handleRestoreDefaults = () => {
    if (window.confirm("Are you sure you want to restore original default HEPO products? This will erase custom additions.")) {
      localStorage.removeItem("a3_products");
      // Fetch original from data.ts is handled by App.tsx reloading, we will reload page or invoke parent handler
      window.location.reload();
    }
  };

  // Product submission handler
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const featuresArray = prodForm.features.split(",").map(f => f.trim()).filter(Boolean);
    const sizeOptionsArray = prodForm.sizeOptions.split(",").map(s => s.trim()).filter(Boolean);

    const formattedProduct: Product = {
      id: editingProduct ? editingProduct.id : `hepo-custom-${Date.now()}`,
      name: prodForm.name,
      category: prodForm.category,
      spec: prodForm.spec,
      code: prodForm.code || `HP-GEN-${Math.floor(Math.random() * 900 + 100)}`,
      price: Number(prodForm.price),
      originalPrice: prodForm.originalPrice ? Number(prodForm.originalPrice) : undefined,
      image: prodForm.image || "https://images.unsplash.com/photo-1597423498219-019c72136c45?auto=format&fit=crop&w=500&q=80",
      description: prodForm.description,
      features: featuresArray,
      packSize: prodForm.packSize,
      material: prodForm.material,
      finish: prodForm.finish,
      sizeOptions: sizeOptionsArray
    };

    let updatedProducts: Product[] = [];
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? formattedProduct : p);
      triggerNotification("success", "Product updated successfully!");
    } else {
      updatedProducts = [formattedProduct, ...products];
      triggerNotification("success", "New product added successfully!");
    }

    onProductsChange(updatedProducts);
    setIsAddingNew(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setProdForm({
      name: product.name,
      category: product.category,
      spec: product.spec,
      code: product.code,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      image: product.image,
      description: product.description,
      features: product.features.join(", "),
      packSize: product.packSize,
      material: product.material || "",
      finish: product.finish || "",
      sizeOptions: product.sizeOptions ? product.sizeOptions.join(", ") : ""
    });
    setIsAddingNew(true);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      const updated = products.filter(p => p.id !== id);
      onProductsChange(updated);
      triggerNotification("success", "Product deleted successfully");
    }
  };

  const startAddNew = () => {
    setEditingProduct(null);
    setProdForm({
      name: "",
      category: "furniture-fittings",
      spec: "e.g., 3D Adjustment | Clip-on Mechanism",
      code: `HP-NEW-${Math.floor(Math.random() * 900 + 100)}`,
      price: 150,
      originalPrice: 200,
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
      description: "Enter a professional description for the carpenter / builder.",
      features: "Tested for cycles, Rustproof coating, Smooth mechanism",
      packSize: "Piece",
      material: "Solid Alloy",
      finish: "Matte Nickel",
      sizeOptions: "Standard, Large"
    });
    setIsAddingNew(true);
  };

  // Settings submission handler
  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedSettings = {
      name: settingsForm.name,
      subtitle: settingsForm.subtitle,
      dealerBadge: settingsForm.dealerBadge,
      phone: settingsForm.phone,
      whatsapp: settingsForm.whatsapp,
      email: settingsForm.email,
      address: settingsForm.address,
      googleMapsEmbedUrl: settingsForm.googleMapsEmbedUrl,
      businessHours: [
        { days: "Monday - Saturday", hours: settingsForm.businessHoursWeekday },
        { days: "Sunday", hours: settingsForm.businessHoursSunday }
      ],
      socials: {
        facebook: settingsForm.facebook,
        instagram: settingsForm.instagram,
        linkedin: settingsForm.linkedin
      }
    };

    onSettingsChange(updatedSettings);
    triggerNotification("success", "Store configuration settings saved!");
  };

  // Filtered list of products for list view
  const filteredProducts = products.filter(p => {
    const matchesCat = productCategoryFilter === "all" || p.category === productCategoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.code.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      
      {/* 1. Authenticated Panel */}
      {isAuthenticated ? (
        <div className="flex-1 flex flex-col md:flex-row bg-white min-h-screen w-full">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-slate-950 font-extrabold">
                  A3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-wide">A3 Prime Hub</h3>
                  <span className="text-[10px] text-amber-700 font-bold font-mono">ADMIN CONTROL</span>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1.5 pt-4">
                <button
                  onClick={() => { setActiveTab('dashboard'); setIsAddingNew(false); }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
                    activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" /> Dashboard Overview
                </button>
                <button
                  onClick={() => { setActiveTab('products'); }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
                    activeTab === 'products' ? 'bg-amber-500 text-slate-950' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <Package className="w-4 h-4" /> Manage Products ({products.length})
                </button>
                <button
                  onClick={() => { setActiveTab('settings'); setIsAddingNew(false); }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
                    activeTab === 'settings' ? 'bg-amber-500 text-slate-950' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <Settings className="w-4 h-4" /> Store Settings & Logo
                </button>
              </nav>

              {/* Backup & Restore JSON Widget */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <span className="text-[10px] text-slate-500 font-mono font-bold block uppercase tracking-wider">Backup & Restore</span>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={handleExportJSON}
                    className="w-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 py-2 px-3 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer justify-center"
                    title="Export JSON backup"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-600" /> Export JSON
                  </button>
                  <label className="w-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 py-2 px-3 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer justify-center">
                    <Upload className="w-3.5 h-3.5 text-amber-600" /> Import JSON
                    <input 
                      type="file" 
                      accept=".json" 
                      onChange={handleImportJSON} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Logout/Footer */}
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <button
                onClick={handleRestoreDefaults}
                className="w-full bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 px-3 py-2 rounded-xl text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Restore original products
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-rose-100 hover:bg-rose-200 text-rose-700 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 p-6 lg:p-8 relative bg-white">
            
            {/* Close Button top-right */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 hover:text-slate-950 text-xs font-bold transition text-slate-600 shadow-sm cursor-pointer z-10 flex items-center gap-1.5"
              title="Exit to Storefront"
            >
              <LogOut className="w-3.5 h-3.5" /> Exit to Storefront
            </button>

            {/* Notifications */}
            {notification && (
              <div className="fixed top-6 right-6 z-50 bg-white border-l-4 border-amber-500 shadow-2xl p-4 rounded-r-xl max-w-sm flex items-center gap-3 animate-slide-in">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-xs text-slate-700 font-bold">{notification.message}</p>
              </div>
            )}

            {/* -------------------- TAB: DASHBOARD -------------------- */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h1 className="text-2xl font-display font-bold text-slate-900">Admin Dashboard</h1>
                  <p className="text-slate-600 text-xs mt-1 font-medium">Real-time status of A3 Prime Hub database and client transactions.</p>
                </div>

                {/* Stats Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl shadow-sm">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider font-mono">Catalog Count</span>
                    <span className="text-3xl font-extrabold text-slate-900 block mt-1">{products.length}</span>
                    <span className="text-[10px] text-amber-700 mt-2 block font-bold">HEPO genuine items active</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl shadow-sm">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider font-mono">Store Status</span>
                    <span className="text-3xl font-extrabold text-emerald-600 block mt-1">LIVE</span>
                    <span className="text-[10px] text-slate-500 mt-2 block font-medium">WhatsApp routing online</span>
                  </div>
                </div>

                {/* Info Alert Box */}
                <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Client-Side Persistence Active</h4>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                      All custom products, modified contact rates, and configurations you change in this panel are securely stored in your local storage. Homeowners, carpenters, and designers visiting your browser workspace will instantly see these updated catalog items!
                    </p>
                  </div>
                </div>

                {/* Quick actions panel */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide border-b border-slate-200 pb-3 mb-4">Quick Store Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => { setActiveTab('products'); startAddNew(); }}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-amber-500/15"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" /> Add New Product
                    </button>
                    <button 
                      onClick={() => { setActiveTab('settings'); }}
                      className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                    >
                      <Settings className="w-4 h-4" /> Edit Contact Details
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------- TAB: PRODUCTS CATALOG -------------------- */}
            {activeTab === 'products' && (
              <div className="space-y-6 animate-fade-in">
                {isAddingNew ? (
                  // ADD / EDIT FORM FOR PRODUCTS
                  <form onSubmit={handleProductSubmit} className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{editingProduct ? "Edit HEPO Product" : "Add New HEPO Product"}</h3>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">Define specs and packaging options for clean catalog listing.</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setIsAddingNew(false)}
                        className="text-xs text-slate-600 hover:text-slate-950 border border-slate-200 bg-white shadow-sm font-bold px-3 py-1.5 rounded-xl animate-none"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Product Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., HEPO 3D Clip-on Auto Hinge"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={prodForm.name}
                          onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                        />
                      </div>

                      {/* Model Code */}
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Model / Catalog Code *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., HP-3DH-101"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-mono font-bold shadow-sm"
                          value={prodForm.code}
                          onChange={(e) => setProdForm({ ...prodForm, code: e.target.value })}
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Category *</label>
                        <select
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm cursor-pointer"
                          value={prodForm.category}
                          onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                        >
                          {CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Sub-specification details */}
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Short Specification tag *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., 3D Adjustment | 110° Opening | Nickel Plated"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={prodForm.spec}
                          onChange={(e) => setProdForm({ ...prodForm, spec: e.target.value })}
                        />
                      </div>

                      {/* Image URL */}
                      <div className="md:col-span-2">
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Product Image URL (Unsplash or direct asset)</label>
                        <input
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-mono font-semibold shadow-sm"
                          value={prodForm.image}
                          onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                        />
                        <span className="text-[10px] text-slate-500 mt-1 block font-medium">Provides a realistic visual. Paste any image address.</span>
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2">
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Detailed Description *</label>
                        <textarea
                          rows={3}
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={prodForm.description}
                          onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                        />
                      </div>

                      {/* Features */}
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Bullet Highlights (comma-separated)</label>
                        <input
                          type="text"
                          placeholder="tested for 80000 cycles, rustproof finish, silent damping"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={prodForm.features}
                          onChange={(e) => setProdForm({ ...prodForm, features: e.target.value })}
                        />
                      </div>

                      {/* Pack size */}
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Packaging size (e.g., Pair, Box of 200)</label>
                        <input
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={prodForm.packSize}
                          onChange={(e) => setProdForm({ ...prodForm, packSize: e.target.value })}
                        />
                      </div>

                      {/* Material */}
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Material (optional)</label>
                        <input
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={prodForm.material}
                          onChange={(e) => setProdForm({ ...prodForm, material: e.target.value })}
                        />
                      </div>

                      {/* Finish */}
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Finish (optional)</label>
                        <input
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={prodForm.finish}
                          onChange={(e) => setProdForm({ ...prodForm, finish: e.target.value })}
                        />
                      </div>

                      {/* Size Options */}
                      <div className="md:col-span-2">
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Available Sizes/Cranks (comma-separated)</label>
                        <input
                          type="text"
                          placeholder="Full Overlay (0 Crank), Half Overlay (8 Crank), Inset (15 Crank)"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={prodForm.sizeOptions}
                          onChange={(e) => setProdForm({ ...prodForm, sizeOptions: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                      <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2.5 px-6 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-amber-500/15"
                      >
                        <Save className="w-4 h-4" /> Save Product
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingNew(false)}
                        className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs py-2.5 px-6 rounded-xl transition shadow-sm"
                      >
                        Back to List
                      </button>
                    </div>
                  </form>
                ) : (
                  // VIEW PRODUCTS LIST TABLE
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                      <div>
                        <h2 className="text-xl font-display font-bold text-slate-900">Catalog Items Manager</h2>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">Create, edit, and delete elements in the A3 Prime Hub database.</p>
                      </div>
                      
                      <button
                        onClick={startAddNew}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer self-start sm:self-auto shadow-md shadow-amber-500/15"
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" /> Add New Item
                      </button>
                    </div>

                    {/* Filter toolbar */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Search product name or model code..."
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                      />
                      
                      <select
                        className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-bold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm cursor-pointer"
                        value={productCategoryFilter}
                        onChange={(e) => setProductCategoryFilter(e.target.value)}
                      >
                        <option value="all">All Categories</option>
                        {CATEGORIES.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Responsive List representation */}
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-sm">
                      {filteredProducts.length === 0 ? (
                        <div className="p-12 text-center text-slate-400 text-xs font-semibold">
                          No products match your filters. Try search adjustments.
                        </div>
                      ) : (
                        filteredProducts.map((p) => (
                          <div key={p.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition">
                            <div className="flex items-center gap-3">
                              <img 
                                src={p.image} 
                                alt={p.name} 
                                className="w-12 h-12 rounded-lg object-cover bg-slate-50 border border-slate-200 shrink-0 shadow-sm"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[9px] bg-amber-500/10 text-amber-700 px-1.5 py-0.5 rounded font-bold">{p.code}</span>
                                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold font-mono">
                                    {CATEGORIES.find(c => c.id === p.category)?.name || p.category}
                                  </span>
                                </div>
                                <h4 className="text-xs font-bold text-slate-800 mt-1">{p.name}</h4>
                                <span className="text-[10px] text-slate-500 block mt-0.5 font-bold font-mono">Pack: {p.packSize} | Spec: {p.spec}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5 self-end sm:self-auto">
                              <button
                                onClick={() => handleEditClick(p)}
                                className="p-2 rounded-lg bg-white hover:bg-slate-50 text-amber-600 border border-slate-200 shadow-sm transition"
                                title="Edit Product"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                className="p-2 rounded-lg bg-white hover:bg-rose-50 text-rose-500 border border-slate-200 shadow-sm transition"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* -------------------- TAB: STORE PROFILE SETTINGS -------------------- */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSettingsSubmit} className="space-y-6 animate-fade-in">
                <div className="border-b border-slate-200 pb-4">
                  <h2 className="text-xl font-display font-bold text-slate-900">Store Configuration settings</h2>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">Customize your brand identity, contact numbers, map widgets, and social connections.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Brand Branding */}
                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-xs font-bold text-amber-700 uppercase tracking-widest font-mono border-b border-slate-200 pb-1">1. Showroom Branding</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Store Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={settingsForm.name}
                          onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Sub-Header / Tagline *</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={settingsForm.subtitle}
                          onChange={(e) => setSettingsForm({ ...settingsForm, subtitle: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Dealer Tagline Badge *</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={settingsForm.dealerBadge}
                          onChange={(e) => setSettingsForm({ ...settingsForm, dealerBadge: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Numbers */}
                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-xs font-bold text-amber-700 uppercase tracking-widest font-mono border-b border-slate-200 pb-1">2. Direct Customer Routes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Primary Telephone *</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={settingsForm.phone}
                          onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">WhatsApp Endpoint Number (No '+' or space) *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., 919845012345"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-mono font-bold shadow-sm"
                          value={settingsForm.whatsapp}
                          onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Corporate Email *</label>
                        <input
                          type="email"
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={settingsForm.email}
                          onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Showroom Physical coordinates */}
                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-xs font-bold text-amber-700 uppercase tracking-widest font-mono border-b border-slate-200 pb-1">3. Physical Store Coordinates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Physical Address *</label>
                        <textarea
                          rows={3}
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={settingsForm.address}
                          onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Google Maps iframe Embed Source URL</label>
                        <textarea
                          rows={3}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[10px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-mono font-semibold shadow-sm"
                          value={settingsForm.googleMapsEmbedUrl}
                          onChange={(e) => setSettingsForm({ ...settingsForm, googleMapsEmbedUrl: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-xs font-bold text-amber-700 uppercase tracking-widest font-mono border-b border-slate-200 pb-1">4. Showroom Business Hours</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Weekdays Hours (Monday - Saturday)</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={settingsForm.businessHoursWeekday}
                          onChange={(e) => setSettingsForm({ ...settingsForm, businessHoursWeekday: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Sunday Hours</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={settingsForm.businessHoursSunday}
                          onChange={(e) => setSettingsForm({ ...settingsForm, businessHoursSunday: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Handles */}
                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-xs font-bold text-amber-700 uppercase tracking-widest font-mono border-b border-slate-200 pb-1">5. Social Network Handlers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Facebook Link</label>
                        <input
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={settingsForm.facebook}
                          onChange={(e) => setSettingsForm({ ...settingsForm, facebook: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">Instagram Link</label>
                        <input
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={settingsForm.instagram}
                          onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-bold">LinkedIn Link</label>
                        <input
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                          value={settingsForm.linkedin}
                          onChange={(e) => setSettingsForm({ ...settingsForm, linkedin: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-3 px-8 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-amber-500/15"
                  >
                    <Save className="w-4 h-4 stroke-[2.5]" /> Save Showroom Configuration
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      ) : (
        // Passcode Gate modal block
        <div className="flex-1 flex items-center justify-center bg-slate-50 p-4 min-h-screen">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl relative text-slate-800 animate-scale-up">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white border border-slate-200 hover:border-amber-500 transition text-slate-500 hover:text-amber-600 shadow-sm cursor-pointer flex items-center justify-center"
              title="Return to Storefront"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-700 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <Lock className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-xl font-display font-bold text-slate-900">A3 Prime Hub Admin Gate</h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">Unlock console to customize inventory catalog items and showroom phone/address profiles.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 pt-2">
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="Enter admin passcode"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-center text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-mono font-bold shadow-sm tracking-wider"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                  />
                </div>

                {authError && (
                  <p className="text-xs text-rose-600 font-bold bg-rose-50/10 py-1.5 px-3 rounded-lg border border-rose-200">
                    {authError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-amber-500/15"
                >
                  <Unlock className="w-4 h-4 stroke-[2.5]" /> Unlock Console
                </button>
              </form>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-[10px] text-slate-600 font-bold font-mono uppercase">
                  Passcode: <span className="text-amber-700 font-extrabold">admin123</span>
                </span>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-semibold text-slate-500 hover:text-amber-600 transition"
                >
                  &larr; Back to Public Store
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
