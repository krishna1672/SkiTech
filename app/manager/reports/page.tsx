"use client";

import { motion } from "framer-motion";
import { FileText, Download, TrendingUp, Users, DollarSign, Percent } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { day: "Mon", revenue: 8420 },
  { day: "Tue", revenue: 9150 },
  { day: "Wed", revenue: 7890 },
  { day: "Thu", revenue: 10200 },
  { day: "Fri", revenue: 9560 },
  { day: "Sat", revenue: 12340 },
  { day: "Sun", revenue: 11200 },
];

const occupancyData = [
  { day: "Mon", occupancy: 72 },
  { day: "Tue", occupancy: 68 },
  { day: "Wed", occupancy: 75 },
  { day: "Thu", occupancy: 71 },
  { day: "Fri", occupancy: 82 },
  { day: "Sat", occupancy: 91 },
  { day: "Sun", occupancy: 87 },
];

const departmentPerformance = [
  { dept: "Housekeeping", score: 94 },
  { dept: "Front Desk", score: 88 },
  { dept: "F&B", score: 91 },
  { dept: "Maintenance", score: 86 },
  { dept: "Concierge", score: 93 },
];

export default function ManagerReportsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900" style={{ fontSize: "1.4rem", fontWeight: 800 }}>Operational Reports</h1>
          <p className="text-slate-500 text-sm mt-0.5">Daily performance metrics and analytics</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#4F46E5] text-white px-5 py-2.5 rounded-xl text-sm shadow-md"
          style={{ fontWeight: 600 }}
        >
          <Download className="w-4 h-4" /> Export Report
        </motion.button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: DollarSign, label: "Today's Revenue", value: "$11,200", change: "+8.2%", positive: true, color: "#10B981" },
          { icon: Percent, label: "Occupancy Rate", value: "87%", change: "+4% vs yesterday", positive: true, color: "#3B82F6" },
          { icon: Users, label: "Guest Satisfaction", value: "4.6/5", change: "214 reviews", positive: true, color: "#F59E0B" },
          { icon: TrendingUp, label: "Avg Daily Rate", value: "$165", change: "+$12", positive: true, color: "#6366F1" },
        ].map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: metric.color + "15" }}>
              <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
            </div>
            <div className="text-slate-900" style={{ fontSize: "1.6rem", fontWeight: 800 }}>{metric.value}</div>
            <div className="text-slate-500 text-sm mt-0.5">{metric.label}</div>
            <div className={`text-xs mt-2 ${metric.positive ? "text-[#10B981]" : "text-[#EF4444]"}`}>{metric.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-slate-900 mb-5" style={{ fontWeight: 700 }}>Weekly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0" }} />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-slate-900 mb-5" style={{ fontWeight: 700 }}>Occupancy Rate (%)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0" }} />
              <Line type="monotone" dataKey="occupancy" stroke="#10B981" strokeWidth={3} dot={{ fill: "#10B981", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-slate-900 mb-5" style={{ fontWeight: 700 }}>Department Performance Scores</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={departmentPerformance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis dataKey="dept" type="category" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={100} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0" }} />
            <Bar dataKey="score" fill="#6366F1" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "Daily Operations Summary", desc: "Complete breakdown of today's activities", icon: FileText, color: "#3B82F6" },
          { title: "Staff Performance Report", desc: "Individual and team metrics", icon: Users, color: "#6366F1" },
          { title: "Revenue Analysis", desc: "Detailed revenue by source", icon: DollarSign, color: "#10B981" },
        ].map((report, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            whileHover={{ y: -4 }}
            className="bg-white border border-slate-200 rounded-xl p-5 text-left hover:border-slate-300 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: report.color + "15" }}>
              <report.icon className="w-5 h-5" style={{ color: report.color }} />
            </div>
            <h4 className="text-slate-900 mb-1 text-sm" style={{ fontWeight: 700 }}>{report.title}</h4>
            <p className="text-slate-500 text-xs mb-3">{report.desc}</p>
            <span className="text-[#3B82F6] text-xs group-hover:underline" style={{ fontWeight: 600 }}>Generate Report →</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}