import React, { useState } from "react";
import { Product } from "../types";
import { COMPANY_INFO } from "../data";
import { X, Check, ArrowRight, ShieldCheck, HelpCircle, Sparkles, ZoomIn } from "lucide-react";

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailsModal({ product, onClose }: ProductDetailsModalProps) {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-scale-up text-slate-800"
        id={`product-modal-${product.id}`}
      >
        {/* Header / Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white border border-slate-200 hover:border-amber-500 hover:text-amber-600 text-slate-500 shadow-sm transition-colors cursor-pointer z-10"
          title="Close Modal"
          id="btn-close-modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 lg:p-8">
          
          {/* Left Column - Product Image & Badge */}
          <div className="md:col-span-5 space-y-4">
            <div 
              className="aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative group cursor-zoom-in shadow-sm hover:border-amber-500/50 transition-colors"
              onClick={() => setIsZoomed(true)}
              title="Click to zoom image"
            >
              <img 
                src={product.image} 
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-display font-bold text-xs uppercase px-2.5 py-1 rounded tracking-wide shadow-md">
                Genuine HEPO
              </div>
              <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-white/95 text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-md border border-slate-200/50 uppercase tracking-wider flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-600" /> Click to Zoom
                </span>
              </div>
            </div>

            {/* Quick Specs Panel */}
            <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-4 space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Specifications</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block font-medium">Model Code</span>
                  <span className="font-mono text-amber-600 font-bold">{product.code}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Pack Size</span>
                  <span className="text-slate-800 font-bold">{product.packSize}</span>
                </div>
                {product.material && (
                  <div>
                    <span className="text-slate-500 block font-medium">Material</span>
                    <span className="text-slate-800 font-bold">{product.material}</span>
                  </div>
                )}
                {product.finish && (
                  <div>
                    <span className="text-slate-500 block font-medium">Finish</span>
                    <span className="text-slate-800 font-bold">{product.finish}</span>
                  </div>
                )}
              </div>

              {product.sizeOptions && product.sizeOptions.length > 0 && (
                <div className="pt-2 border-t border-slate-200 mt-2">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Available Sizes / Varieties</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.sizeOptions.map((sz, i) => (
                      <span key={i} className="bg-white border border-slate-200 text-[10px] text-slate-700 px-2 py-0.5 rounded font-mono font-semibold shadow-sm">
                        {sz}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Product Info & Enquiry Form */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-700 font-bold uppercase tracking-widest mb-1.5">
                <ShieldCheck className="w-4 h-4" /> Authorized Reseller Partner
              </div>
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-slate-900 tracking-tight">
                {product.name}
              </h2>
              <div className="text-sm text-slate-600 mt-2 font-mono flex items-center gap-2">
                <span>Model: <strong className="text-amber-600 font-bold">{product.code}</strong></span>
                <span className="text-slate-300">|</span>
                <span className="bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-xs text-amber-800 font-bold">GST Invoice Available</span>
              </div>

              <p className="text-slate-600 text-sm mt-4 leading-relaxed font-medium">
                {product.description}
              </p>

              {/* Features List */}
              <div className="mt-5 space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Highlights</h4>
                <ul className="space-y-1.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-semibold">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Store Inquiry Guidance */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider">Official Reseller Support</h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                    A3 Prime Hub is an authorized dealer of genuine HEPO India products. All supplies are covered under official manufacturer warranties with standard GST invoices.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest font-mono">How to Enquire</span>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  As we are a premium wholesale catalog reseller, we do not list pricing or support direct checkouts online. To check bulk stock availability, custom sizes, or to request a project estimation:
                </p>
                <div className="bg-white border border-slate-200 p-3.5 rounded-xl space-y-1.5 shadow-sm text-xs font-medium">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>Note down the model code: <strong className="font-mono text-amber-600 font-bold">{product.code}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>Click the general <strong className="text-slate-900">WhatsApp Enquiry</strong> button in the header or bottom corner</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>Or visit our showroom in <strong className="text-slate-900">Kalyan Nagar, Bengaluru</strong> for direct purchase and support</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Fullscreen Lightbox Portal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-md cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            onClick={() => setIsZoomed(false)}
            title="Close Full Image"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-xl border border-white/10 bg-black flex flex-col items-center justify-center p-2 shadow-2xl">
            <img 
              src={product.image} 
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <div className="text-white text-xs font-semibold mt-4 bg-white/10 px-4 py-2 rounded-full backdrop-blur font-mono border border-white/10">
              {product.name} — Clear Close-up Spec Photo
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
