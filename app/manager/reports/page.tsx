"use client";

import { motion } from "framer-motion";
import { FileText, Download, TrendingUp, TrendingDown, Users, DollarSign, Percent } from "lucide-react";
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

const AreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-slate-400 text-xs mb-1">{label}</p>
        <p className="text-white font-semibold text-lg">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const LineTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-slate-400 text-xs mb-1">{label}</p>
        <p className="text-white font-semibold text-lg">{payload[0].value}%</p>
        <p className="text-slate-400 text-xs">Occupancy Rate</p>
      </div>
    );
  }
  return null;
};

const BarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-slate-400 text-xs mb-2">{label}</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500" />
          <span className="text-slate-300 text-xs">Score:</span>
          <span className="text-white font-semibold">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function ManagerReportsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 tracking-tight">Operational Reports</h1>
          <p className="text-slate-500 text-sm mt-1">Daily performance metrics and analytics</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2.5 bg-slate-950 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-slate-950/20 hover:bg-slate-800 transition-colors"
        >
          <Download className="w-4 h-4" /> Export Report
        </motion.button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
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
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all duration-300 group overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: metric.color + '15' }}>
                <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                metric.positive 
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60" 
                  : "bg-amber-50 text-amber-700 border border-amber-200/60"
              }`}>
                {metric.positive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {metric.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-950 tracking-tight">{metric.value}</div>
            <div className="text-slate-500 text-sm mt-1">{metric.label}</div>
            <div 
              className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(90deg, ${metric.color}, ${metric.color}80)` }}
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <div className="mb-5">
            <h3 className="font-bold text-slate-950 text-lg">Weekly Revenue Trend</h3>
            <p className="text-slate-500 text-sm mt-0.5">Daily revenue breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenueMg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.15}/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 500 }} axisLine={false} tickLine={false} dy={12} />
              <YAxis tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 500 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} width={55} />
              <Tooltip content={<AreaTooltip />} cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                strokeWidth={2.5} 
                fill="url(#colorRevenueMg)"
                dot={{ fill: '#3B82F6', strokeWidth: 0, r: 4 }}
                activeDot={{ fill: '#3B82F6', r: 6, stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <div className="mb-5">
            <h3 className="font-bold text-slate-950 text-lg">Occupancy Rate</h3>
            <p className="text-slate-500 text-sm mt-0.5">Daily occupancy percentage</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={occupancyData}>
              <CartesianGrid strokeDasharray="0" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 500 }} axisLine={false} tickLine={false} dy={12} />
              <YAxis tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 500 }} axisLine={false} tickLine={false} domain={[60, 100]} tickFormatter={v => `${v}%`} width={50} />
              <Tooltip content={<LineTooltip />} cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Line 
                type="monotone" 
                dataKey="occupancy" 
                stroke="#10B981" 
                strokeWidth={2.5} 
                dot={{ fill: '#10B981', strokeWidth: 0, r: 4 }}
                activeDot={{ fill: '#10B981', r: 6, stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm">
        <div className="mb-5">
          <h3 className="font-bold text-slate-950 text-lg">Department Performance Scores</h3>
          <p className="text-slate-500 text-sm mt-0.5">Performance metrics by department</p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={departmentPerformance} layout="vertical" barGap={8}>
            <CartesianGrid strokeDasharray="0" horizontal={true} vertical={false} stroke="#E2E8F0" />
            <XAxis type="number" tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 500 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <YAxis dataKey="dept" type="category" tick={{ fontSize: 12, fill: '#64748B', fontWeight: 500 }} axisLine={false} tickLine={false} width={100} />
            <Tooltip content={<BarTooltip />} cursor={{ fill: '#F8FAFC' }} />
            <Bar dataKey="score" fill="#6366F1" radius={[6, 6, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { title: "Daily Operations Summary", desc: "Complete breakdown of today's activities", icon: FileText, color: "#3B82F6" },
          { title: "Staff Performance Report", desc: "Individual and team metrics", icon: Users, color: "#6366F1" },
          { title: "Revenue Analysis", desc: "Detailed revenue by source", icon: DollarSign, color: "#10B981" },
        ].map((report, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white border border-slate-200/60 rounded-2xl p-5 text-left hover:border-slate-300/80 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: report.color + '15' }}>
              <report.icon className="w-5 h-5" style={{ color: report.color }} />
            </div>
            <h4 className="text-slate-950 font-semibold mb-1.5">{report.title}</h4>
            <p className="text-slate-500 text-sm mb-4">{report.desc}</p>
            <span className="text-slate-700 text-sm font-medium group-hover:text-slate-950 transition-colors flex items-center gap-1">
              Generate Report 
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}