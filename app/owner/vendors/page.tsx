"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Search, Filter, Edit2, Trash2, X, ChevronDown,
  Phone, Mail, Building2, Link2, Unlink, CheckCircle2,
  MoreHorizontal, Package, Wrench, Zap, Truck, Brush, Shield
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────
const serviceCategories = [
  "All Categories", "Cleaning", "Maintenance", "Security", "Catering",
  "Electrical", "Plumbing", "Laundry", "Pest Control", "Landscaping",
];

const properties = [
  { id: 1, name: "Grand Horizon Property" },
  { id: 2, name: "Skyline Suites" },
  { id: 3, name: "The Amiras Residence" },
];

const serviceIcons: Record<string, React.ElementType> = {
  Cleaning: Brush, Maintenance: Wrench, Security: Shield,
  Catering: Package, Electrical: Zap, Plumbing: Truck,
  Laundry: Brush, "Pest Control": Shield, Landscaping: Truck,
};

const serviceColors: Record<string, string> = {
  Cleaning: "#6366F1", Maintenance: "#F59E0B", Security: "#3B82F6",
  Catering: "#10B981", Electrical: "#0EA5E9", Plumbing: "#0EA5E9",
  Laundry: "#8B5CF6", "Pest Control": "#EF4444", Landscaping: "#14B8A6",
};

const initVendors = [
  { id: 1, name: "Al Noor Cleaning Services", category: "Cleaning", phone: "+971 4 234 5678", email: "contact@alnoor.ae", address: "Deira, Dubai, UAE", properties: [1, 2], status: true },
  { id: 2, name: "Gulf Maintenance Co.", category: "Maintenance", phone: "+971 4 876 5432", email: "info@gulfmaint.ae", address: "Al Quoz, Dubai, UAE", properties: [1, 3], status: true },
  { id: 3, name: "SecureGuard UAE", category: "Security", phone: "+971 50 111 9999", email: "ops@secureguard.ae", address: "Business Bay, Dubai, UAE", properties: [2], status: true },
  { id: 4, name: "Emirates Catering", category: "Catering", phone: "+971 4 555 3333", email: "sales@emcatering.ae", address: "JAFZA, Dubai, UAE", properties: [1, 2, 3], status: false },
  { id: 5, name: "Sparkle Laundry", category: "Laundry", phone: "+971 50 777 4444", email: "hello@sparkle.ae", address: "Jumeirah, Dubai, UAE", properties: [3], status: true },
  { id: 6, name: "PowerTech Electrical", category: "Electrical", phone: "+971 4 333 7777", email: "team@powertech.ae", address: "Al Barsha, Dubai, UAE", properties: [1], status: true },
];

type Vendor = typeof initVendors[0];

// ─── Reusable UI ─────────────────────────────────────────────────────────────
function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: color + "15", color, fontWeight: 600 }}>
      {children}
    </span>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`w-10 h-5.5 rounded-full transition-colors relative flex-shrink-0 ${value ? "bg-[#3B82F6]" : "bg-slate-200"}`} style={{ height: "22px", width: "40px" }}>
      <span className="absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-all" style={{ left: value ? "calc(100% - 20px)" : "2px" }} />
    </button>
  );
}

// ─── Add/Edit Modal ───────────────────────────────────────────────────────────
function VendorModal({ vendor, onClose, onSave }: {
  vendor: Vendor | null;
  onClose: () => void;
  onSave: (v: Vendor) => void;
}) {
  const [form, setForm] = useState<Vendor>(
    vendor ?? { id: Date.now(), name: "", category: "Cleaning", phone: "", email: "", address: "", properties: [], status: true }
  );

  const toggleProperty = (id: number) => {
    setForm(f => ({ ...f, properties: f.properties.includes(id) ? f.properties.filter(p => p !== id) : [...f.properties, id] }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-[#0B1628] to-[#1E293B]">
          <h2 className="text-white" style={{ fontWeight: 700, fontSize: "1rem" }}>{vendor ? "Edit Vendor" : "Add New Vendor"}</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-slate-300 hover:bg-white/20 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Vendor Name */}
          <div>
            <label className="block text-slate-700 text-sm mb-1.5" style={{ fontWeight: 600 }}>Vendor Name <span className="text-red-500">*</span></label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Al Noor Cleaning Services"
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all" />
          </div>

          {/* Category */}
          <div>
            <label className="block text-slate-700 text-sm mb-1.5" style={{ fontWeight: 600 }}>Service Category</label>
            <div className="relative">
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full appearance-none bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all pr-8">
                {serviceCategories.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 text-sm mb-1.5" style={{ fontWeight: 600 }}>Phone</label>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+971 4 000 0000"
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all" />
            </div>
            <div>
              <label className="block text-slate-700 text-sm mb-1.5" style={{ fontWeight: 600 }}>Email</label>
              <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="vendor@email.com"
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all" />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-slate-700 text-sm mb-1.5" style={{ fontWeight: 600 }}>Address</label>
            <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
              placeholder="Street, City, UAE"
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all" />
          </div>

          {/* Properties */}
          <div>
            <label className="block text-slate-700 text-sm mb-2" style={{ fontWeight: 600 }}>Associated Properties</label>
            <div className="space-y-2">
              {properties.map(p => (
                <label key={p.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${form.properties.includes(p.id) ? "border-[#3B82F6] bg-[#EFF6FF]" : "border-slate-200 bg-[#F8FAFC] hover:border-slate-300"}`}>
                  <input type="checkbox" checked={form.properties.includes(p.id)} onChange={() => toggleProperty(p.id)} className="w-4 h-4 accent-[#3B82F6]" />
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-800" style={{ fontWeight: form.properties.includes(p.id) ? 600 : 400 }}>{p.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-[#F8FAFC] border border-slate-200 rounded-xl">
            <div>
              <p className="text-slate-800 text-sm" style={{ fontWeight: 500 }}>Vendor Status</p>
              <p className="text-slate-400 text-xs">Active vendors appear in assignments</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${form.status ? "text-[#10B981]" : "text-slate-400"}`} style={{ fontWeight: 500 }}>
                {form.status ? "Active" : "Inactive"}
              </span>
              <Toggle value={form.status} onChange={() => setForm(f => ({ ...f, status: !f.status }))} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-100 transition-colors">Cancel</button>
          <button
            onClick={() => { if (form.name.trim()) onSave(form); }}
            disabled={!form.name.trim()}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#4F46E5] text-white text-sm shadow-md hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontWeight: 600 }}
          >
            {vendor ? "Save Changes" : "Add Vendor"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Property Association Panel ───────────────────────────────────────────────
function AssociationPanel({ vendor, onClose }: { vendor: Vendor; onClose: () => void }) {
  const [linked, setLinked] = useState(vendor.properties);

  const toggleLink = (id: number) => setLinked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-[#0B1628] to-[#1E293B] flex items-center justify-between">
          <div>
            <h2 className="text-white" style={{ fontWeight: 700 }}>Property Associations</h2>
            <p className="text-slate-400 text-xs mt-0.5">{vendor.name}</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-slate-300 hover:bg-white/20 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Vendor card */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: (serviceColors[vendor.category] ?? "#3B82F6") + "15" }}>
              {(() => { const Icon = serviceIcons[vendor.category] ?? Package; return <Icon className="w-5 h-5" style={{ color: serviceColors[vendor.category] ?? "#3B82F6" }} />; })()}
            </div>
            <div>
              <p className="text-slate-900 text-sm" style={{ fontWeight: 700 }}>{vendor.name}</p>
              <p className="text-slate-500 text-xs">{vendor.category} · {linked.length} properties linked</p>
            </div>
          </div>
        </div>

        {/* Properties */}
        <div className="p-5 space-y-3">
          <p className="text-slate-600 text-xs" style={{ fontWeight: 600 }}>LINK / UNLINK PROPERTIES</p>
          {properties.map(p => {
            const isLinked = linked.includes(p.id);
            return (
              <div key={p.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${isLinked ? "border-[#3B82F6] bg-[#EFF6FF]" : "border-slate-200 bg-[#F8FAFC]"}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isLinked ? "bg-[#3B82F6]/10" : "bg-slate-100"}`}>
                  <Building2 className={`w-4 h-4 ${isLinked ? "text-[#3B82F6]" : "text-slate-400"}`} />
                </div>
                <span className="flex-1 text-sm text-slate-800" style={{ fontWeight: isLinked ? 600 : 400 }}>{p.name}</span>
                <button
                  onClick={() => toggleLink(p.id)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${isLinked ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-[#EFF6FF] text-[#3B82F6] hover:bg-[#DBEAFE]"}`}
                  style={{ fontWeight: 500 }}
                >
                  {isLinked ? <><Unlink className="w-3 h-3" /> Unlink</> : <><Link2 className="w-3 h-3" /> Link</>}
                </button>
              </div>
            );
          })}
        </div>

        <div className="px-5 pb-5">
          <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#4F46E5] text-white text-sm shadow-md" style={{ fontWeight: 600 }}>
            Save Associations
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function VendorPage() {
  const [vendors, setVendors] = useState(initVendors);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All Categories");
  const [modalOpen, setModalOpen] = useState(false);
  const [editVendor, setEditVendor] = useState<Vendor | null>(null);
  const [assocVendor, setAssocVendor] = useState<Vendor | null>(null);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const filtered = vendors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All Categories" || v.category === catFilter;
    return matchSearch && matchCat;
  });

  const handleSave = (v: Vendor) => {
    setVendors(prev => prev.find(x => x.id === v.id) ? prev.map(x => x.id === v.id ? v : x) : [v, ...prev]);
    setModalOpen(false);
    setEditVendor(null);
  };

  const handleDelete = (id: number) => {
    setVendors(prev => prev.filter(v => v.id !== id));
    setMenuOpen(null);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900" style={{ fontSize: "1.4rem", fontWeight: 800 }}>Vendor Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">{vendors.length} vendors across all properties</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => { setEditVendor(null); setModalOpen(true); }}
          className="flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#4F46E5] text-white px-4 py-2.5 rounded-xl text-sm shadow-md"
          style={{ fontWeight: 600 }}
        >
          <Plus className="w-4 h-4" /> Add Vendor
        </motion.button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Vendors", value: vendors.length, color: "#3B82F6" },
          { label: "Active", value: vendors.filter(v => v.status).length, color: "#10B981" },
          { label: "Inactive", value: vendors.filter(v => !v.status).length, color: "#94A3B8" },
          { label: "Categories", value: new Set(vendors.map(v => v.category)).size, color: "#6366F1" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-xs mb-1">{s.label}</p>
            <p style={{ fontSize: "1.8rem", fontWeight: 800, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search vendors..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <div className="relative">
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all">
              {serviceCategories.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-[2fr,1.2fr,1.5fr,1.5fr,1.2fr,auto,auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100">
          {["Vendor Name", "Service Type", "Phone", "Email", "Linked Properties", "Status", "Actions"].map(h => (
            <span key={h} className="text-slate-500 text-xs uppercase tracking-wider" style={{ fontWeight: 600 }}>{h}</span>
          ))}
        </div>

        <div className="divide-y divide-slate-50">
          {filtered.map((v, i) => {
            const Icon = serviceIcons[v.category] ?? Package;
            const color = serviceColors[v.category] ?? "#3B82F6";
            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex flex-col md:grid md:grid-cols-[2fr,1.2fr,1.5fr,1.5fr,1.2fr,auto,auto] gap-2 md:gap-4 items-start md:items-center px-6 py-4 hover:bg-slate-50/60 transition-colors"
              >
                {/* Vendor Name */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + "15" }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm" style={{ fontWeight: 600 }}>{v.name}</p>
                    <p className="text-slate-400 text-xs md:hidden">{v.category}</p>
                  </div>
                </div>
                {/* Service Type */}
                <div className="hidden md:block">
                  <Badge color={color}>{v.category}</Badge>
                </div>
                {/* Phone */}
                <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs md:text-sm">{v.phone}</span>
                </div>
                {/* Email */}
                <div className="flex items-center gap-1.5 text-slate-600 text-sm hidden md:flex">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs truncate">{v.email}</span>
                </div>
                {/* Linked Properties */}
                <div className="hidden md:flex items-center gap-1.5">
                  <span className="text-slate-900 text-sm" style={{ fontWeight: 600 }}>{v.properties.length}</span>
                  <span className="text-slate-400 text-xs">properties</span>
                </div>
                {/* Status */}
                <div>
                  <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ${v.status ? "bg-[#F0FDF4] text-[#10B981]" : "bg-slate-100 text-slate-500"}`} style={{ fontWeight: 600 }}>
                    <span className={`w-1.5 h-1.5 rounded-full ${v.status ? "bg-[#10B981]" : "bg-slate-400"}`} />
                    {v.status ? "Active" : "Inactive"}
                  </span>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-1 relative">
                  <button onClick={() => setAssocVendor(v)} className="p-1.5 text-slate-400 hover:text-[#3B82F6] hover:bg-[#EFF6FF] rounded-lg transition-colors" title="Manage Properties">
                    <Link2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => { setEditVendor(v); setModalOpen(true); }} className="p-1.5 text-slate-400 hover:text-[#3B82F6] hover:bg-[#EFF6FF] rounded-lg transition-colors" title="Edit">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <div className="relative">
                    <button onClick={() => setMenuOpen(menuOpen === v.id ? null : v.id)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {menuOpen === v.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute right-0 top-8 bg-white border border-slate-200 rounded-xl shadow-lg z-10 min-w-[140px] overflow-hidden"
                        >
                          <button
                            onClick={() => handleDelete(v.id)}
                            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete Vendor
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <Package className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">No vendors found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {modalOpen && <VendorModal vendor={editVendor} onClose={() => { setModalOpen(false); setEditVendor(null); }} onSave={handleSave} />}
        {assocVendor && <AssociationPanel vendor={assocVendor} onClose={() => setAssocVendor(null)} />}
      </AnimatePresence>
    </div>
  );
}
