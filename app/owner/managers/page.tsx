"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Search, Mail, Phone, Building2, CheckCircle2 } from "lucide-react";

const managers = [
  { id: 1, name: "Sarah Mitchell", email: "sarah@grandhoriz.com", phone: "+971 50 111 2222", property: "Grand Horizon property", dept: "Operations", kra: 94, status: "active", initials: "SM", color: "#3B82F6" },
  { id: 2, name: "James Chen", email: "james@skylinesuits.com", phone: "+971 50 333 4444", property: "Skyline Suites", dept: "Front Desk", kra: 88, status: "active", initials: "JC", color: "#6366F1" },
  { id: 3, name: "Priya Sharma", email: "priya@amiras.com", phone: "+971 50 555 6666", property: "The Amiras Residence", dept: "F&B", kra: 91, status: "active", initials: "PS", color: "#10B981" },
  { id: 4, name: "Omar Al Rashid", email: "omar@grandhoriz.com", phone: "+971 50 777 8888", property: "Grand Horizon property", dept: "Housekeeping", kra: 82, status: "active", initials: "OA", color: "#F59E0B" },
];

export default function ManagersPage() {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  // Fix: filter logic was a bit loose, ensure safe access
  const filtered = managers.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.property.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-slate-900" style={{ fontSize: "1.4rem", fontWeight: 800 }}>Managers</h1>
          <p className="text-slate-500 text-sm mt-0.5">{managers.length} managers across all properties</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#4F46E5] text-white px-4 py-2.5 rounded-xl text-sm shadow-md"
          style={{ fontWeight: 600 }}
        >
          <Plus className="w-4 h-4" /> Add Manager
        </motion.button>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search managers..."
          className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md"
                style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}99)`, fontWeight: 700 }}
              >
                {m.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-slate-900" style={{ fontWeight: 700 }}>{m.name}</h3>
                  <span className="bg-[#F0FDF4] text-[#10B981] text-xs px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>Active</span>
                </div>
                <p className="text-slate-500 text-xs mt-0.5">{m.dept}</p>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                {m.property}
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                {m.email}
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                {m.phone}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> KRA Compliance
                </div>
                <span className="text-slate-800 text-sm" style={{ fontWeight: 700 }}>{m.kra}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.kra}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-1.5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#4F46E5]"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl"
          >
            <h2 className="text-slate-900 mb-6" style={{ fontWeight: 800, fontSize: "1.2rem" }}>Add Manager</h2>
            <div className="space-y-4">
              {["Full Name", "Email Address", "Phone Number", "Assign Property", "Department"].map((f, i) => (
                <div key={i}>
                  <label className="block text-slate-700 text-sm mb-1.5" style={{ fontWeight: 500 }}>{f}</label>
                  <input className="w-full bg-[#F8F9FB] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3B82F6] transition-colors" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#4F46E5] text-white text-sm shadow-md" style={{ fontWeight: 600 }}>Add Manager</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
