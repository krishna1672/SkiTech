"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Download } from "lucide-react";

const revenueData = [
  { month: "Aug", grand: 42000, skyline: 18000, amiras: 21000 },
  { month: "Sep", grand: 48000, skyline: 21000, amiras: 24000 },
  { month: "Oct", grand: 53000, skyline: 19000, amiras: 28000 },
  { month: "Nov", grand: 61000, skyline: 25000, amiras: 31000 },
  { month: "Dec", grand: 72000, skyline: 31000, amiras: 38000 },
  { month: "Jan", grand: 68000, skyline: 28000, amiras: 35000 },
];

const occData = [
  { month: "Aug", occ: 72 },
  { month: "Sep", occ: 78 },
  { month: "Oct", occ: 82 },
  { month: "Nov", occ: 79 },
  { month: "Dec", occ: 91 },
  { month: "Jan", occ: 84 },
];

const deptRevPie = [
  { name: "Rooms", value: 68, color: "#3B82F6" },
  { name: "F&B", value: 18, color: "#6366F1" },
  { name: "Spa", value: 8, color: "#10B981" },
  { name: "Other", value: 6, color: "#F59E0B" },
];

export default function ReportsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-black" style={{ fontSize: "1.4rem", fontWeight: 800 }}>Reports & Analytics</h1>
          <p className="text-neutral-500 text-sm mt-0.5">Performance data across all properties</p>
        </div>
        <button className="flex items-center gap-2 border border-black/10 text-neutral-700 px-4 py-2.5 rounded-xl text-sm hover:bg-white/50 transition-colors">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Revenue (MTD)", value: "$131,000", change: "+18.4%", positive: true },
          { label: "Avg. Occupancy", value: "84%", change: "+6.2%", positive: true },
          { label: "RevPAR", value: "$112", change: "+14.1%", positive: true },
          { label: "Guest Satisfaction", value: "4.7/5", change: "+0.2", positive: true },
        ].map((k, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white/70 backdrop-blur rounded-2xl p-5 border border-black/10 shadow-sm"
          >
            <div className="text-neutral-500 text-xs mb-2">{k.label}</div>
            <div className="text-black" style={{ fontSize: "1.5rem", fontWeight: 800 }}>{k.value}</div>
            <div className="text-black text-xs mt-1">{k.change} vs last month</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Revenue by Property */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur rounded-2xl p-6 border border-black/10 shadow-sm">
          <h3 className="text-black mb-5" style={{ fontWeight: 700 }}>Revenue by Property (6 months)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0" }} formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
              <Bar dataKey="grand" name="Grand Horizon" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="skyline" name="Skyline" fill="#6366F1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="amiras" name="Amiras" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Mix */}
        <div className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-black/10 shadow-sm">
          <h3 className="text-black mb-5" style={{ fontWeight: 700 }}>Revenue Mix</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={deptRevPie} innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {deptRevPie.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`, ""]} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Occupancy trend */}
      <div className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-black/10 shadow-sm">
        <h3 className="text-black mb-5" style={{ fontWeight: 700 }}>Occupancy Trend</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={occData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[60, 100]} tickFormatter={v => `${v}%`} />
            <Tooltip contentStyle={{ borderRadius: 12 }} formatter={(v: number) => [`${v}%`, "Occupancy"]} />
            <Line type="monotone" dataKey="occ" stroke="#3B82F6" strokeWidth={2.5} dot={{ fill: "#3B82F6", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
