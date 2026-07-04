import React, { useState } from "react";
import { PRODUCTS as DEFAULT_PRODUCTS, COMPANY_INFO as DEFAULT_COMPANY_INFO } from "../data";
import { Product } from "../types";
import { Calculator, Plus, Trash2, Copy, Send, RotateCcw, Check, Sparkles } from "lucide-react";

interface QuoteItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  gstRate: number; // usually 18% for hardware
}

interface GstCalculatorProps {
  products?: Product[];
  companyInfo?: any;
}

export default function GstCalculator({ 
  products = DEFAULT_PRODUCTS, 
  companyInfo = DEFAULT_COMPANY_INFO 
}: GstCalculatorProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || "");
  const [customItemName, setCustomItemName] = useState<string>("");
  const [customItemPrice, setCustomItemPrice] = useState<number>(0);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  
  const [quantity, setQuantity] = useState<number>(10);
  const [gstRate, setGstRate] = useState<number>(18);
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  // Auto populate price when product changes
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prodId = e.target.value;
    setSelectedProductId(prodId);
    if (prodId === "custom") {
      setIsCustom(true);
      setCustomItemName("");
      setCustomItemPrice(100);
    } else {
      setIsCustom(false);
      const prod = products.find(p => p.id === prodId);
      if (prod) {
        setCustomItemPrice(prod.price);
      }
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    let itemName = "";
    let itemPrice = 0;

    if (isCustom) {
      if (!customItemName.trim()) return;
      itemName = customItemName;
      itemPrice = customItemPrice;
    } else {
      const prod = products.find(p => p.id === selectedProductId);
      if (!prod) return;
      itemName = prod.name;
      itemPrice = prod.price;
    }

    const newItem: QuoteItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: itemName,
      price: itemPrice,
      quantity: quantity,
      gstRate: gstRate
    };

    setItems([...items, newItem]);
    
    // Reset defaults
    setCustomItemName("");
    setQuantity(10);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    setItems([]);
  };

  // Calculations
  const calculateTotals = () => {
    let subtotal = 0;
    let totalGst = 0;

    items.forEach(item => {
      const itemSubtotal = item.price * item.quantity;
      const itemGst = itemSubtotal * (item.gstRate / 100);
      subtotal += itemSubtotal;
      totalGst += itemGst;
    });

    const grandTotal = subtotal + totalGst;
    return { subtotal, totalGst, grandTotal };
  };

  const { subtotal, totalGst, grandTotal } = calculateTotals();

  // Logs quotation to local storage for the Admin Panel
  const logEstimateToStore = (itemsList: QuoteItem[], grandTotalVal: number) => {
    try {
      const saved = localStorage.getItem("a3_recent_estimates");
      const currentList = saved ? JSON.parse(saved) : [];
      const newQuote = {
        items: itemsList.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
        grandTotal: grandTotalVal,
        timestamp: new Date().toLocaleString("en-IN")
      };
      // Keep last 30 quotes
      const updatedList = [newQuote, ...currentList].slice(0, 30);
      localStorage.setItem("a3_recent_estimates", JSON.stringify(updatedList));
    } catch (err) {
      console.error("Failed to log estimate", err);
    }
  };

  // Generate copyable text format
  const generateQuotationText = () => {
    let text = `📋 *${companyInfo.name.toUpperCase()} (${companyInfo.dealerBadge})*\n`;
    text += `*Quick Hardware Quotation / Estimate*\n`;
    text += `-------------------------------------------\n`;
    items.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      text += `${index + 1}. ${item.name}\n`;
      text += `   Qty: ${item.quantity} | Rate: ₹${item.price} | Total: ₹${itemTotal}\n`;
    });
    text += `-------------------------------------------\n`;
    text += `*Subtotal (Before Tax):* ₹${subtotal.toLocaleString("en-IN")}\n`;
    text += `*GST (Calculated):* ₹${totalGst.toLocaleString("en-IN")}\n`;
    text += `*Estimated Grand Total:* ₹${grandTotal.toLocaleString("en-IN")}\n`;
    text += `-------------------------------------------\n`;
    text += `_Note: This is an estimated price. To lock in contractor discount rates and check stock availability, kindly send this over to us._\n`;
    text += `\n*Please confirm order availability.*`;
    return text;
  };

  const handleCopy = () => {
    const text = generateQuotationText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    logEstimateToStore(items, grandTotal);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToWhatsapp = () => {
    const text = encodeURIComponent(generateQuotationText());
    logEstimateToStore(items, grandTotal);
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <div id="gst-calculator" className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 text-slate-800 relative overflow-hidden shadow-xl">
      {/* Background design accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide mb-2 uppercase font-mono">
              <Sparkles className="w-3 h-3" /> For Carpenters & Contractors
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-amber-600" />
              GST Calculator & Estimate Builder
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl font-medium">
              Quickly build dynamic estimations with the standard <span className="text-amber-600 font-bold font-mono">18% Hardware GST</span>. Share with your clients or send to us directly on WhatsApp to check stock!
            </p>
          </div>
          
          {items.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-500 transition cursor-pointer font-bold"
              id="btn-clear-estimate"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear Estimate
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Side */}
          <form onSubmit={handleAddItem} className="lg:col-span-5 bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-4">
            <h4 className="text-sm font-bold tracking-wide text-slate-700 uppercase border-b border-slate-200 pb-2">
              Add Hardware Item
            </h4>
            
            {/* Item Source Selector */}
            <div>
              <label className="block text-xs text-slate-600 mb-1 font-bold">Select Product</label>
              <select
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition cursor-pointer shadow-sm"
                onChange={handleProductChange}
                value={isCustom ? "custom" : selectedProductId}
                id="select-hardware-product"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (₹{p.price})</option>
                ))}
                <option value="custom">+ Custom Custom Product</option>
              </select>
            </div>

            {/* Custom inputs if selected */}
            {isCustom ? (
              <div className="space-y-3 animate-fade-in">
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-bold">Custom Item Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., HEPO Corner Carousel System"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                    value={customItemName}
                    onChange={(e) => setCustomItemName(e.target.value)}
                    id="input-custom-name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-bold">Base Price Per Unit (₹)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="Price in ₹"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                    value={customItemPrice || ""}
                    onChange={(e) => setCustomItemPrice(Number(e.target.value))}
                    id="input-custom-price"
                  />
                </div>
              </div>
            ) : null}

            {/* Quantity and GST Rate Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-bold">Quantity</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition shadow-sm"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  id="input-hardware-qty"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-bold">GST Rate (%)</label>
                <select
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition cursor-pointer shadow-sm"
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                  id="select-gst-rate"
                >
                  <option value={18}>18% (Standard Hardware)</option>
                  <option value={12}>12% (Contract Service)</option>
                  <option value={28}>28% (Luxury Fittings)</option>
                  <option value={0}>0% (Exempt)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/25 cursor-pointer animate-pulse"
              id="btn-add-to-estimate"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Add to Estimate
            </button>
          </form>

          {/* Quotation Side */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 min-h-[250px]">
                <Calculator className="w-12 h-12 text-slate-400 mb-3 animate-pulse" />
                <p className="text-slate-600 text-sm font-bold">Your estimate is currently empty.</p>
                <p className="text-slate-500 text-xs mt-1 max-w-xs font-medium">
                  Choose a product from the list on the left, enter quantity, and click "Add to Estimate" to compile a quote.
                </p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-between border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
                
                {/* List of items */}
                <div className="p-4 flex-1 overflow-y-auto max-h-[280px] custom-scrollbar divide-y divide-slate-100">
                  {items.map((item, idx) => {
                    const itemTotal = item.price * item.quantity;
                    return (
                      <div key={item.id} className="py-3 flex items-start justify-between gap-3 group animate-fade-in">
                        <div className="flex-1">
                          <div className="flex items-start gap-1.5">
                            <span className="text-xs font-mono text-amber-600 font-bold mt-0.5">{idx + 1}.</span>
                            <h5 className="text-sm font-bold text-slate-800">{item.name}</h5>
                          </div>
                          <div className="text-xs text-slate-500 mt-1 pl-4 flex flex-wrap gap-x-3 gap-y-1 font-medium">
                            <span>Qty: <strong className="text-slate-800 font-bold">{item.quantity}</strong></span>
                            <span>Rate: <strong className="text-slate-800 font-bold">₹{item.price}</strong></span>
                            <span>GST: <strong className="text-amber-600 font-bold">{item.gstRate}%</strong></span>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <span className="text-sm font-bold text-slate-900">₹{itemTotal.toLocaleString("en-IN")}</span>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-slate-400 hover:text-rose-500 p-1 rounded hover:bg-slate-50 transition"
                            title="Remove item"
                            id={`btn-remove-item-${idx}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Totals Panel */}
                <div className="bg-slate-50 border-t border-slate-200 p-4 space-y-2">
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span>Subtotal Base Amount</span>
                    <span className="font-bold text-slate-700">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span>Estimated GST (18% Average)</span>
                    <span className="text-amber-600 font-bold">+ ₹{totalGst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="border-t border-slate-200 my-2 pt-2 flex justify-between text-sm font-semibold text-slate-800">
                    <span className="flex items-center gap-1 font-bold">
                      Grand Total <span className="text-[10px] bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase font-mono font-extrabold">GST Inc</span>
                    </span>
                    <span className="text-lg text-amber-600 font-mono font-bold">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>

                  {/* Actions Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
                      id="btn-copy-quote"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy Quote to Clipboard
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleSendToWhatsapp}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-emerald-500/15"
                      id="btn-send-quote-wa"
                    >
                      <Send className="w-4 h-4" /> Send Quote to WhatsApp
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
