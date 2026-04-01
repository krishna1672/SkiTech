"use client";

import { motion } from "framer-motion";
import { Users, ClipboardList, Clock, TrendingUp, CheckCircle2, AlertCircle, Plus, ChevronRight } from "lucide-react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { icon: Users, label: "Staff Present", value: "12/15", change: "3 absent", positive: false, color: "#3B82F6" },
  { icon: ClipboardList, label: "Tasks Pending", value: "7", change: "2 overdue", positive: false, color: "#F59E0B" },
  { icon: Clock, label: "Check-ins Today", value: "12", change: "+4 vs yesterday", positive: true, color: "#6366F1" },
  { icon: TrendingUp, label: "Daily Revenue", value: "$8,420", change: "+9.1%", positive: true, color: "#10B981" },
];

const tasks = [
  { task: "Housekeeping inspection — Floor 1-3", assignee: "Fatima A.", due: "10:00 AM", status: "done" },
  { task: "Minibar restocking — All rooms", assignee: "Ahmed K.", due: "11:30 AM", status: "pending" },
  { task: "Maintenance check — Pool area", assignee: "Raj P.", due: "01:00 PM", status: "pending" },
  { task: "Evening shift briefing", assignee: "Whole team", due: "04:00 PM", status: "upcoming" },
  { task: "Revenue reconciliation report", assignee: "Sarah M.", due: "05:00 PM", status: "upcoming" },
];

const staffAttendance = [
  { name: "Ahmed K.", dept: "Front Desk", in: "08:00", status: "in", initials: "AK", color: "#3B82F6" },
  { name: "Fatima A.", dept: "Housekeeping", in: "07:45", status: "in", initials: "FA", color: "#10B981" },
  { name: "Raj P.", dept: "Maintenance", in: "09:00", status: "in", initials: "RP", color: "#6366F1" },
  { name: "Maria S.", dept: "F&B", in: "—", status: "absent", initials: "MS", color: "#EF4444" },
  { name: "Yusuf I.", dept: "Security", in: "08:30", status: "in", initials: "YI", color: "#8B5CF6" },
];

const weeklyTasks = [
  { day: "Mon", done: 14, total: 16 },
  { day: "Tue", done: 12, total: 14 },
  { day: "Wed", done: 16, total: 18 },
  { day: "Thu", done: 10, total: 15 },
  { day: "Fri", done: 13, total: 14 },
  { day: "Sat", done: 11, total: 12 },
  { day: "Sun", done: 7, total: 10 },
];

const statusConfig = {
  done: { color: "#10B981", bg: "bg-[#F0FDF4] text-[#10B981]", label: "Done" },
  pending: { color: "#F59E0B", bg: "bg-[#FFFBEB] text-[#F59E0B]", label: "Pending" },
  upcoming: { color: "#3B82F6", bg: "bg-[#EFF6FF] text-[#3B82F6]", label: "Upcoming" },
};

export default function ManagerDashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900" style={{ fontSize: "1.4rem", fontWeight: 800 }}>Manager Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Skyline Suites — Today's operations</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-2 h-2 rounded-full bg-[#10B981]" />
          Morning Shift Active
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: s.color + "15" }}>
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <div className="text-slate-900" style={{ fontSize: "1.6rem", fontWeight: 800 }}>{s.value}</div>
            <div className="text-slate-500 text-sm mt-0.5">{s.label}</div>
            <div className={`text-xs mt-2 ${s.positive ? "text-[#10B981]" : "text-[#F59E0B]"}`}>{s.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Tasks + Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Tasks */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <h3 className="text-slate-900" style={{ fontWeight: 700 }}>Today's Tasks</h3>
            <button className="flex items-center gap-1.5 text-[#3B82F6] text-sm hover:underline">
              <Plus className="w-3.5 h-3.5" /> Assign Task
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {tasks.map((t, i) => {
              const cfg = statusConfig[t.status as keyof typeof statusConfig];
              return (
                <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0`} style={{ backgroundColor: cfg.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 text-sm truncate">{t.task}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{t.assignee} · Due {t.due}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full flex-shrink-0 ${cfg.bg}`} style={{ fontWeight: 600 }}>
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attendance */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <h3 className="text-slate-900" style={{ fontWeight: 700 }}>Staff Today</h3>
            <span className="text-xs text-slate-500">12/15 present</span>
          </div>
          <div className="divide-y divide-slate-50">
            {staffAttendance.map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-3.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}90)`, fontWeight: 700 }}
                >
                  {s.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 text-sm" style={{ fontWeight: 600 }}>{s.name}</p>
                  <p className="text-slate-400 text-xs">{s.dept}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs ${s.status === "in" ? "text-[#10B981]" : "text-[#EF4444]"}`} style={{ fontWeight: 600 }}>
                    {s.status === "in" ? `In ${s.in}` : "Absent"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-slate-900 mb-5" style={{ fontWeight: 700 }}>Task Completion — This Week</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyTasks}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0" }} />
            <Bar dataKey="total" name="Total" fill="#EFF6FF" radius={[6, 6, 0, 0]} />
            <Bar dataKey="done" name="Completed" fill="#3B82F6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}