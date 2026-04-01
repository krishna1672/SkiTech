"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Search, X, AlertCircle, ChevronRight, User,
} from "lucide-react";

interface StaffMember {
  id: number;
  name: string;
  role: string;
  property: string;
  dept: string;
  shift: string;
  status: string;
  initials: string;
  color: string;
}

const AVATAR_COLORS = [
  "#3B82F6", "#10B981", "#6366F1", "#F59E0B",
  "#8B5CF6", "#EF4444", "#0EA5E9", "#14B8A6",
];

const initialStaff: StaffMember[] = [
  { id: 1, name: "Ahmed Khalid", role: "Front Desk Agent", property: "Grand Horizon", dept: "Front Office", shift: "Morning", status: "present", initials: "AK", color: "#3B82F6" },
  { id: 2, name: "Fatima Al Ali", role: "Housekeeping Supervisor", property: "Grand Horizon", dept: "Housekeeping", shift: "Morning", status: "present", initials: "FA", color: "#10B981" },
  { id: 3, name: "Raj Patel", role: "Maintenance Technician", property: "Skyline Suites", dept: "Engineering", shift: "Afternoon", status: "present", initials: "RP", color: "#6366F1" },
  { id: 4, name: "Maria Santos", role: "F&B Attendant", property: "Amiras", dept: "F&B", shift: "Morning", status: "off", initials: "MS", color: "#F59E0B" },
  { id: 5, name: "Yusuf Ibrahim", role: "Security Guard", property: "Grand Horizon", dept: "Security", shift: "Night", status: "present", initials: "YI", color: "#8B5CF6" },
  { id: 6, name: "Lina Mansour", role: "Receptionist", property: "Skyline Suites", dept: "Front Office", shift: "Afternoon", status: "present", initials: "LM", color: "#EF4444" },
];

const depts = ["All", "Front Office", "Housekeeping", "F&B", "Engineering", "Security"];

const DEPT_OPTIONS = ["Front Office", "Housekeeping", "F&B", "Engineering", "Security", "Management", "Finance", "Spa & Wellness"];
const ROLE_OPTIONS: Record<string, string[]> = {
  "Front Office": ["Front Desk Agent", "Receptionist", "Concierge", "Night Auditor", "Bell Boy"],
  "Housekeeping": ["Room Attendant", "Housekeeping Supervisor", "Laundry Attendant", "Public Area Cleaner"],
  "F&B": ["F&B Attendant", "Waiter / Waitress", "Bartender", "Chef", "Kitchen Helper"],
  "Engineering": ["Maintenance Technician", "Electrician", "Plumber", "HVAC Technician"],
  "Security": ["Security Guard", "Security Supervisor", "CCTV Operator"],
  "Management": ["Property Manager", "Assistant Manager", "Department Head"],
  "Finance": ["Accountant", "Finance Officer", "Payroll Specialist"],
  "Spa & Wellness": ["Spa Therapist", "Fitness Instructor", "Wellness Coordinator"],
};
const PROPERTIES = ["Grand Horizon", "Skyline Suites", "Amiras"];
const SHIFTS = ["Morning", "Afternoon", "Night"];
const STATUSES = ["present", "off"];

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
}

function Overlay({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      onClick={onClick}
    />
  );
}

/* ─── Add Staff Modal ─── */
interface AddStaffModalProps {
  onClose: () => void;
  onAdd: (member: StaffMember) => void;
}

function AddStaffModal({ onClose, onAdd }: AddStaffModalProps) {
  const [name, setName] = useState("");
  const [dept, setDept] = useState(DEPT_OPTIONS[0]);
  const [role, setRole] = useState(ROLE_OPTIONS[DEPT_OPTIONS[0]][0]);
  const [property, setProperty] = useState(PROPERTIES[0]);
  const [shift, setShift] = useState(SHIFTS[0]);
  const [status, setStatus] = useState("present");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleDeptChange = (d: string) => {
    setDept(d);
    setRole(ROLE_OPTIONS[d][0]);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required";
    if (name.trim().split(" ").length < 2) e.name = "Please enter first and last name";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;
    const colorIdx = Math.floor(Math.random() * AVATAR_COLORS.length);
    onAdd({
      id: Date.now(),
      name: name.trim(),
      role,
      property,
      dept,
      shift,
      status,
      initials: getInitials(name.trim()),
      color: AVATAR_COLORS[colorIdx],
    });
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black/[0.04] flex items-center justify-center">
              <User className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-black" style={{ fontWeight: 800, fontSize: "1rem" }}>Add Staff Member</h2>
              <p className="text-neutral-400 text-xs mt-0.5">Register a new team member</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-black/[0.04] rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Avatar preview */}
          <div className="flex items-center justify-center py-2">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
              style={{ background: "linear-gradient(135deg, #3B82F6, #4F46E5)", fontSize: "1.4rem", fontWeight: 800 }}
            >
              {name ? getInitials(name) : <User className="w-7 h-7 opacity-70" />}
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs text-neutral-600 mb-1.5" style={{ fontWeight: 600 }}>Full Name <span className="text-red-400">*</span></label>
            <input
              value={name} onChange={e => setName(e.target.value)}
              placeholder="e.g. Ahmed Khalid"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${errors.name ? "border-red-300" : "border-black/10 focus:border-black/20"}`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs text-neutral-600 mb-1.5" style={{ fontWeight: 600 }}>Department</label>
            <select value={dept} onChange={e => handleDeptChange(e.target.value)} className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/20 bg-white">
              {DEPT_OPTIONS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs text-neutral-600 mb-1.5" style={{ fontWeight: 600 }}>Job Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/20 bg-white">
              {(ROLE_OPTIONS[dept] || []).map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          {/* Property */}
          <div>
            <label className="block text-xs text-neutral-600 mb-1.5" style={{ fontWeight: 600 }}>Assigned Property</label>
            <select value={property} onChange={e => setProperty(e.target.value)} className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black/20 bg-white">
              {PROPERTIES.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          {/* Shift */}
          <div>
            <label className="block text-xs text-neutral-600 mb-2" style={{ fontWeight: 600 }}>Shift</label>
            <div className="grid grid-cols-3 gap-2">
              {SHIFTS.map(s => (
                <button
                  key={s}
                  onClick={() => setShift(s)}
                  className={`py-2.5 rounded-xl text-sm transition-all border ${shift === s ? "bg-black text-white border-transparent shadow-sm" : "border-black/10 text-neutral-600 hover:border-black/20"}`}
                  style={{ fontWeight: 600 }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs text-neutral-600 mb-2" style={{ fontWeight: 600 }}>Initial Status</label>
            <div className="grid grid-cols-2 gap-2">
              {STATUSES.map(s => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`py-2.5 rounded-xl text-sm capitalize transition-all border ${status === s ? "bg-black text-white border-transparent shadow-sm" : "border-black/10 text-neutral-600 hover:border-black/20"}`}
                  style={{ fontWeight: 600 }}
                >
                  {s === "present" ? "Present" : "Day Off"}
                </button>
              ))}
            </div>
          </div>

          {/* Preview card */}
          {name.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white/50 rounded-xl p-4 border border-black/10"
            >
              <p className="text-xs text-neutral-400 mb-2" style={{ fontWeight: 600 }}>Preview</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #3B82F6, #4F46E5)", fontWeight: 700 }}
                >
                  {getInitials(name.trim())}
                </div>
                <div>
                  <p className="text-black text-sm" style={{ fontWeight: 700 }}>{name.trim()}</p>
                  <p className="text-neutral-400 text-xs">{role} · {dept} · {property}</p>
                </div>
                <div className="ml-auto">
                  <span className={`text-xs px-2.5 py-1 rounded-full ${shift === "Morning" ? "bg-black/[0.04] text-black" : shift === "Afternoon" ? "bg-black/[0.04] text-neutral-600" : "bg-black/[0.04] text-black"}`} style={{ fontWeight: 600 }}>
                    {shift}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-black/10 flex items-center gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-black/10 text-neutral-600 text-sm hover:bg-white/50 transition-colors" style={{ fontWeight: 600 }}>
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            className="flex-1 py-2.5 rounded-xl bg-black text-white text-sm shadow-md flex items-center justify-center gap-2"
            style={{ fontWeight: 600 }}
          >
            <ChevronRight className="w-4 h-4" /> Add Staff Member
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

/* ─── Main Page ─── */
export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = staff.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "All" || s.dept === dept;
    return matchSearch && matchDept;
  });

  const handleAdd = (member: StaffMember) => {
    setStaff(prev => [member, ...prev]);
    setShowAdd(false);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-black" style={{ fontSize: "1.4rem", fontWeight: 800 }}>Staff</h1>
          <p className="text-neutral-500 text-sm mt-0.5">{staff.length} staff members across all properties</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-sm shadow-md"
          style={{ fontWeight: 600 }}
        >
          <Plus className="w-4 h-4" /> Add Staff
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search staff..."
            className="w-full bg-white border border-black/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-black/20 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {depts.map(d => (
            <button
              key={d} onClick={() => setDept(d)}
              className={`px-3 py-2 rounded-xl text-sm transition-all ${dept === d ? "bg-black text-white shadow-sm" : "bg-white border border-black/10 text-neutral-600 hover:border-black/20"}`}
              style={{ fontWeight: dept === d ? 600 : 400 }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Present Today", value: staff.filter(s => s.status === "present").length, color: "#10B981" },
          { label: "On Leave / Off", value: staff.filter(s => s.status === "off").length, color: "#F59E0B" },
          { label: "Night Shift", value: staff.filter(s => s.shift === "Night").length, color: "#6366F1" },
        ].map((s, i) => (
          <div key={i} className="bg-white/70 backdrop-blur rounded-xl p-4 border border-black/10 shadow-sm text-center">
            <div className="text-2xl" style={{ fontWeight: 800, color: s.color }}>{s.value}</div>
            <div className="text-neutral-500 text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white/70 backdrop-blur rounded-2xl border border-black/10 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-white/50 border-b border-black/10">
              {["Staff Member", "Role", "Property", "Department", "Shift", "Status"].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-neutral-500 text-xs uppercase tracking-wider" style={{ fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <motion.tr
                key={s.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="border-t border-black/5 hover:bg-white/50/50 transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}90)`, fontWeight: 700 }}
                    >
                      {s.initials}
                    </div>
                    <span className="text-black text-sm" style={{ fontWeight: 600 }}>{s.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-neutral-600 text-sm">{s.role}</td>
                <td className="px-5 py-4 text-neutral-600 text-sm">{s.property}</td>
                <td className="px-5 py-4 text-neutral-600 text-sm">{s.dept}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full ${
                    s.shift === "Morning" ? "bg-black/[0.04] text-black" :
                    s.shift === "Afternoon" ? "bg-black/[0.04] text-neutral-600" :
                    "bg-black/[0.04] text-black"
                  }`} style={{ fontWeight: 600 }}>
                    {s.shift}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full ${s.status === "present" ? "bg-black/[0.04] text-black" : "bg-black/[0.04] text-neutral-500"}`} style={{ fontWeight: 600 }}>
                    {s.status === "present" ? "Present" : "Off"}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-neutral-400">
            <User className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm" style={{ fontWeight: 600 }}>No staff found</p>
          </div>
        )}
      </div>

      {/* Add Staff Modal */}
      <AnimatePresence>
        {showAdd && <AddStaffModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
      </AnimatePresence>
    </div>
  );
}
