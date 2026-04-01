"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Search, Eye, Edit3, Archive, CheckCircle2, Plus,
  X, ChevronDown, AlertCircle, Clock, Users,
} from "lucide-react";
import { useSharedStore, SOP } from "../../../store/SharedStore";

const deptsList = ["All", "Front Desk", "Housekeeping", "F&B", "Security", "Maintenance", "Wellness"];
const statusList = ["All", "active", "review", "draft", "archived"];

const DEPT_OPTIONS = ["Front Desk", "Housekeeping", "F&B", "Security", "Maintenance", "Wellness", "All Departments"];
const ASSIGN_OPTIONS = ["Front Desk", "Housekeeping", "F&B", "Security", "Maintenance", "Wellness", "All Departments"];

const statusConfig: Record<string, { bg: string; icon: typeof CheckCircle2; color: string }> = {
  active: { bg: "bg-black/[0.04] text-black", icon: CheckCircle2, color: "#10B981" },
  review: { bg: "bg-black/[0.04] text-neutral-600", icon: Clock, color: "#F59E0B" },
  draft: { bg: "bg-black/[0.04] text-neutral-500", icon: AlertCircle, color: "#94A3B8" },
  archived: { bg: "bg-black/[0.04] text-black", icon: Archive, color: "#EF4444" },
};

/* ─── Compact Edit Modal (manager view — no step editing) ─── */
function SOPModal({ sop, onClose, onSave }: {
  sop: SOP | null;
  onClose: () => void;
  onSave: (s: SOP) => void;
}) {
  const now = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const blank: SOP = {
    id: Date.now(), title: "", dept: "Front Desk", version: "v1.0",
    status: "draft", compliance: 0, updated: now, author: "Manager",
    description: "", steps: [], assignedTo: [],
  };
  const [form, setForm] = useState<SOP>(sop ?? blank);
  const [error, setError] = useState("");

  const toggleDept = (dept: string) =>
    setForm(f => ({
      ...f,
      assignedTo: f.assignedTo.includes(dept)
        ? f.assignedTo.filter(d => d !== dept)
        : [...f.assignedTo, dept],
    }));

  const handleSave = () => {
    if (!form.title.trim()) { setError("Title is required"); return; }
    onSave({ ...form, updated: now });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white/70 backdrop-blur rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 bg-gradient-to-r from-[#0B1628] to-[#1E293B]">
          <h2 className="text-white" style={{ fontWeight: 700 }}>{sop ? "Edit SOP" : "Create New SOP"}</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-neutral-300 hover:bg-white/20 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-neutral-700 text-sm mb-1.5" style={{ fontWeight: 600 }}>SOP Title <span className="text-red-500">*</span></label>
            <input
              value={form.title} onChange={e => { setForm(f => ({ ...f, title: e.target.value })); setError(""); }}
              placeholder="e.g. Front Desk Check-In Procedure"
              className={`w-full bg-[#F8FAFC] border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/20 focus:ring-2 focus:ring-[#3B82F6]/10 transition-all ${error ? "border-red-300" : "border-black/10"}`}
            />
            {error && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
          </div>

          {/* Dept + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-700 text-sm mb-1.5" style={{ fontWeight: 600 }}>Department</label>
              <div className="relative">
                <select
                  value={form.dept} onChange={e => setForm(f => ({ ...f, dept: e.target.value }))}
                  className="w-full appearance-none bg-[#F8FAFC] border border-black/10 rounded-xl px-4 py-2.5 pr-8 text-sm focus:outline-none focus:border-black/20 transition-all"
                >
                  {DEPT_OPTIONS.map(d => <option key={d}>{d}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-neutral-700 text-sm mb-1.5" style={{ fontWeight: 600 }}>Status</label>
              <div className="relative">
                <select
                  value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as SOP["status"] }))}
                  className="w-full appearance-none bg-[#F8FAFC] border border-black/10 rounded-xl px-4 py-2.5 pr-8 text-sm focus:outline-none focus:border-black/20 transition-all"
                >
                  {["active", "review", "draft", "archived"].map(s => <option key={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Version */}
          <div>
            <label className="block text-neutral-700 text-sm mb-1.5" style={{ fontWeight: 600 }}>Version</label>
            <input
              value={form.version} onChange={e => setForm(f => ({ ...f, version: e.target.value }))}
              placeholder="v1.0"
              className="w-full bg-[#F8FAFC] border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/20 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-neutral-700 text-sm mb-1.5" style={{ fontWeight: 600 }}>Description</label>
            <textarea
              value={form.description ?? ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Brief description of this SOP's purpose..." rows={2}
              className="w-full bg-[#F8FAFC] border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/20 transition-all resize-none"
            />
          </div>

          {/* Assign to */}
          <div>
            <label className="flex items-center gap-1.5 text-neutral-700 text-sm mb-2" style={{ fontWeight: 600 }}>
              <Users className="w-3.5 h-3.5 text-neutral-400" /> Assign to Departments
            </label>
            <div className="flex flex-wrap gap-2">
              {ASSIGN_OPTIONS.map(d => (
                <button
                  key={d} onClick={() => toggleDept(d)}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${form.assignedTo.includes(d) ? "bg-black/[0.04] border-[#3B82F6] text-black" : "bg-[#F8FAFC] border-black/10 text-neutral-500 hover:border-black/20"}`}
                  style={{ fontWeight: form.assignedTo.includes(d) ? 600 : 400 }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-black/10 bg-white/50 flex gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-black/10 text-neutral-600 text-sm hover:bg-black/[0.04] transition-colors" style={{ fontWeight: 600 }}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl bg-black text-white text-sm shadow-md"
            style={{ fontWeight: 600 }}
          >
            {sop ? "Save Changes" : "Create SOP"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── View Modal ─── */
function ViewSOPModal({ sop, onClose, onEdit }: { sop: SOP; onClose: () => void; onEdit: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white/70 backdrop-blur rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 bg-gradient-to-r from-[#0B1628] to-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white text-sm" style={{ fontWeight: 700 }}>{sop.version}</p>
              <p className="text-neutral-400 text-xs">{sop.dept}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onEdit} className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs hover:bg-white/20 transition-colors flex items-center gap-1.5" style={{ fontWeight: 600 }}>
              <Edit3 className="w-3 h-3" /> Edit
            </button>
            <button onClick={onClose} className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-neutral-300 hover:bg-white/20 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-black mb-3" style={{ fontWeight: 800, fontSize: "1.1rem" }}>{sop.title}</h2>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {sop.status in statusConfig && (
              <span className={`text-xs px-2.5 py-1 rounded-full capitalize ${statusConfig[sop.status].bg}`} style={{ fontWeight: 600 }}>{sop.status}</span>
            )}
            <span className="text-neutral-400 text-xs">Updated {sop.updated}</span>
            <span className="text-neutral-400 text-xs">·</span>
            <span className="text-neutral-400 text-xs">By {sop.author}</span>
          </div>

          {sop.assignedTo.length > 0 && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs text-neutral-500" style={{ fontWeight: 600 }}>Assigned to:</span>
              {sop.assignedTo.map(d => (
                <span key={d} className="text-xs px-2 py-0.5 rounded-full bg-black/[0.04] text-black" style={{ fontWeight: 600 }}>{d}</span>
              ))}
            </div>
          )}

          {sop.description && (
            <div className="bg-white/50 rounded-xl p-4 mb-5">
              <p className="text-neutral-600 text-sm leading-relaxed">{sop.description}</p>
            </div>
          )}

          {sop.status === "active" && (
            <div className="bg-white border border-black/10 rounded-xl p-4 mb-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-neutral-500 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-black" /> Compliance</span>
                <span style={{ fontWeight: 700, color: sop.compliance >= 90 ? "#10B981" : "#F59E0B", fontSize: "0.85rem" }}>{sop.compliance}%</span>
              </div>
              <div className="h-2 bg-black/[0.04] rounded-full">
                <div className="h-2 rounded-full bg-black" style={{ width: `${sop.compliance}%` }} />
              </div>
            </div>
          )}

          {sop.steps && sop.steps.length > 0 && (
            <div>
              <h3 className="text-neutral-700 text-sm mb-3" style={{ fontWeight: 700 }}>Procedure Steps</h3>
              <div className="space-y-2.5">
                {sop.steps.map((step, idx) => (
                  <div key={step.id} className="flex items-start gap-3 bg-white/50 rounded-xl px-4 py-3">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-black to-neutral-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5" style={{ fontWeight: 700 }}>
                      {idx + 1}
                    </div>
                    <p className="text-neutral-700 text-sm leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ManagerSOPPage() {
  const { sops, addSOP, updateSOP, archiveSOP } = useSharedStore();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalSop, setModalSop] = useState<SOP | null | "new">(null);
  const [viewingSop, setViewingSop] = useState<SOP | null>(null);

  const filtered = sops.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.dept.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || s.dept === deptFilter;
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const handleSave = (s: SOP) => {
    const exists = sops.find(x => x.id === s.id);
    if (exists) updateSOP(s);
    else addSOP(s);
    setModalSop(null);
  };

  const handleEditFromView = () => {
    setModalSop(viewingSop);
    setViewingSop(null);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-black" style={{ fontSize: "1.4rem", fontWeight: 800 }}>SOP Management</h1>
          <p className="text-neutral-500 text-sm mt-0.5">{sops.filter(s => s.status === "active").length} active SOPs across all departments</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setModalSop("new")}
          className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-sm shadow-md"
          style={{ fontWeight: 600 }}
        >
          <Plus className="w-4 h-4" /> Create SOP
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total SOPs", value: sops.length, color: "#3B82F6" },
          { label: "Active", value: sops.filter(s => s.status === "active").length, color: "#10B981" },
          { label: "In Review", value: sops.filter(s => s.status === "review").length, color: "#F59E0B" },
          { label: "Drafts", value: sops.filter(s => s.status === "draft").length, color: "#94A3B8" },
        ].map((s, i) => (
          <div key={i} className="bg-white/70 backdrop-blur rounded-xl p-5 border border-black/10 shadow-sm">
            <p className="text-neutral-500 text-xs mb-1">{s.label}</p>
            <p style={{ fontSize: "1.8rem", fontWeight: 800, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-black/10 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)} placeholder="Search SOPs..."
            className="w-full bg-white/50 border border-black/10 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-black/20 focus:ring-2 focus:ring-[#3B82F6]/10 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="appearance-none bg-white/50 border border-black/10 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:border-black/20 transition-all">
              {deptsList.map(d => <option key={d}>{d}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="appearance-none bg-white/50 border border-black/10 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:border-black/20 transition-all capitalize">
              {statusList.map(s => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* SOP Table */}
      <div className="bg-white/70 backdrop-blur rounded-xl border border-black/10 shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-[2.5fr,1fr,1fr,1fr,1fr,auto] gap-4 px-6 py-3 bg-white/50 border-b border-black/10">
          {["SOP Title", "Department", "Version", "Last Updated", "Status", "Actions"].map(h => (
            <span key={h} className="text-neutral-500 text-xs uppercase tracking-wider" style={{ fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        <div className="divide-y divide-slate-50">
          {filtered.map((sop, i) => {
            const cfg = statusConfig[sop.status] ?? statusConfig.draft;
            const StatusIcon = cfg.icon;
            return (
              <motion.div
                key={sop.id}
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className="flex flex-col md:grid md:grid-cols-[2.5fr,1fr,1fr,1fr,1fr,auto] gap-2 md:gap-4 items-start md:items-center px-6 py-4 hover:bg-white/50/60 transition-colors"
               >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/[0.04] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <p className="text-black text-sm" style={{ fontWeight: 600 }}>{sop.title}</p>
                    {sop.assignedTo.length > 0 && (
                      <p className="text-neutral-400 text-xs mt-0.5">Assigned to: {sop.assignedTo.join(", ")}</p>
                    )}
                  </div>
                </div>
                <span className="text-neutral-600 text-xs bg-black/[0.04] px-2.5 py-1 rounded-full" style={{ fontWeight: 500 }}>{sop.dept}</span>
                <span className="text-neutral-500 text-sm hidden md:block">{sop.version}</span>
                <span className="text-neutral-500 text-xs hidden md:block">{sop.updated}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full capitalize flex items-center gap-1.5 w-fit ${cfg.bg}`} style={{ fontWeight: 600 }}>
                  <StatusIcon className="w-3 h-3" />{sop.status}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setViewingSop(sop)} className="p-1.5 text-neutral-400 hover:text-black hover:bg-black/[0.04] rounded-lg transition-colors" title="View">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => setModalSop(sop)} className="p-1.5 text-neutral-400 hover:text-black hover:bg-black/[0.04] rounded-lg transition-colors" title="Edit">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {sop.status !== "archived" && (
                    <button onClick={() => archiveSOP(sop.id)} className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-black/[0.04] rounded-lg transition-colors" title="Archive">
                      <Archive className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-14 text-neutral-400">
              <FileText className="w-8 h-8 mb-2 opacity-30" />
              <p className="text-sm">No SOPs match your filters</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {modalSop !== null && (
          <SOPModal sop={modalSop === "new" ? null : modalSop} onClose={() => setModalSop(null)} onSave={handleSave} />
        )}
        {viewingSop && !modalSop && (
          <ViewSOPModal sop={viewingSop} onClose={() => setViewingSop(null)} onEdit={handleEditFromView} />
        )}
      </AnimatePresence>
    </div>
  );
}