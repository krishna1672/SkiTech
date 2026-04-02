"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Search, Clock, CheckCircle2, ChevronRight, BookOpen, AlertTriangle } from "lucide-react";

const sops = [
  {
    id: 1,
    title: "Guest Room Cleaning Procedure",
    category: "Housekeeping",
    lastUpdated: "Mar 15, 2026",
    readTime: "5 min",
    status: "read",
    priority: "high",
    sections: 8
  },
  {
    id: 2,
    title: "Check-in and Check-out Protocol",
    category: "Front Desk",
    lastUpdated: "Mar 20, 2026",
    readTime: "7 min",
    status: "read",
    priority: "high",
    sections: 12
  },
  {
    id: 3,
    title: "Emergency Evacuation Plan",
    category: "Safety",
    lastUpdated: "Feb 28, 2026",
    readTime: "4 min",
    status: "read",
    priority: "critical",
    sections: 6
  },
  {
    id: 4,
    title: "Minibar Restocking Guidelines",
    category: "Housekeeping",
    lastUpdated: "Mar 10, 2026",
    readTime: "3 min",
    status: "unread",
    priority: "medium",
    sections: 4
  },
  {
    id: 5,
    title: "Pool Maintenance Daily Checklist",
    category: "Maintenance",
    lastUpdated: "Mar 18, 2026",
    readTime: "4 min",
    status: "unread",
    priority: "medium",
    sections: 5
  },
  {
    id: 6,
    title: "Fire Safety and extinguisher Use",
    category: "Safety",
    lastUpdated: "Jan 15, 2026",
    readTime: "6 min",
    status: "read",
    priority: "critical",
    sections: 9
  },
];

const categories = ["All", "Housekeeping", "Front Desk", "Safety", "Maintenance", "F&B"];
const statusFilter = ["All", "Read", "Unread"];

const priorityConfig = {
  critical: { color: "#EF4444", bg: "bg-red-50 text-red-700 border border-red-200", label: "Critical" },
  high: { color: "#F59E0B", bg: "bg-amber-50 text-amber-700 border border-amber-200", label: "High" },
  medium: { color: "#3B82F6", bg: "bg-blue-50 text-blue-700 border border-blue-200", label: "Medium" },
  low: { color: "#10B981", bg: "bg-emerald-50 text-emerald-700 border border-emerald-200", label: "Low" },
};

const categoryIcons: Record<string, typeof FileText> = {
  Housekeeping: FileText,
  "Front Desk": FileText,
  Safety: AlertTriangle,
  Maintenance: FileText,
  "F&B": FileText,
};

export default function StaffSOPsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredSOPs = sops.filter(sop => {
    const matchesSearch = sop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sop.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || sop.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" ||
                          (selectedStatus === "Read" && sop.status === "read") ||
                          (selectedStatus === "Unread" && sop.status === "unread");
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const readCount = sops.filter(s => s.status === "read").length;
  const unreadCount = sops.filter(s => s.status === "unread").length;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 tracking-tight">SOPs & Guidelines</h1>
          <p className="text-slate-500 text-sm mt-1">Standard operating procedures for your role</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1.5 rounded-full">
            {readCount} Read
          </span>
          <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200/60 px-3 py-1.5 rounded-full">
            {unreadCount} Pending Review
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search SOPs by title or category..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-950/10 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1.5">
          {statusFilter.map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedStatus === status
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredSOPs.map((sop, i) => {
          const priorityCfg = priorityConfig[sop.priority as keyof typeof priorityConfig];
          const CategoryIcon = categoryIcons[sop.category] || FileText;
          const isExpanded = expandedId === sop.id;

          return (
            <motion.div
              key={sop.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : sop.id)}
                className="w-full flex items-center gap-4 px-6 py-5 hover:bg-slate-50/50 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${priorityCfg.color}15` }}
                >
                  <CategoryIcon className="w-6 h-6" style={{ color: priorityCfg.color }} />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-950">{sop.title}</h3>
                    {sop.status === "unread" && (
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="px-2 py-0.5 bg-slate-100 rounded">{sop.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {sop.readTime} read
                    </span>
                    <span>{sop.sections} sections</span>
                    <span>Updated {sop.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${priorityCfg.bg}`}>
                    {priorityCfg.label}
                  </span>
                  <span className={`text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1 ${
                    sop.status === "read"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}>
                    {sop.status === "read" && <CheckCircle2 className="w-3 h-3" />}
                    {sop.status === "read" ? "Read" : "Unread"}
                  </span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </motion.div>
                </div>
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-slate-100 bg-slate-50/50"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <button className="flex items-center gap-2 bg-slate-950 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
                        <BookOpen className="w-4 h-4" />
                        Read SOP
                      </button>
                      <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
                        Download PDF
                      </button>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <p className="text-sm text-slate-600">
                        This SOP covers the complete procedure for <strong>{sop.title.toLowerCase()}</strong>. 
                        It includes {sop.sections} sections covering all aspects of the process, 
                        safety guidelines, and best practices. Please review carefully and ensure 
                        compliance during your daily operations.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
