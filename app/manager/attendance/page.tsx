"use client";

import { motion } from "framer-motion";
import { Users, UserCheck, UserX, Clock, Calendar, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const todayStaff = [
  { name: "Ahmed K.", dept: "Front Desk", in: "08:00", out: "—", status: "in", initials: "AK", color: "#3B82F6", hours: "4h 30m" },
  { name: "Fatima A.", dept: "Housekeeping", in: "07:45", out: "—", status: "in", initials: "FA", color: "#10B981", hours: "4h 45m" },
  { name: "Raj P.", dept: "Maintenance", in: "09:00", out: "—", status: "in", initials: "RP", color: "#6366F1", hours: "3h 30m" },
  { name: "Maria S.", dept: "F&B", in: "—", out: "—", status: "absent", initials: "MS", color: "#EF4444", hours: "—" },
  { name: "Yusuf I.", dept: "Security", in: "08:30", out: "—", status: "in", initials: "YI", color: "#8B5CF6", hours: "4h" },
  { name: "Sarah M.", dept: "Front Desk", in: "08:00", out: "—", status: "in", initials: "SM", color: "#0EA5E9", hours: "4h 30m" },
  { name: "James L.", dept: "Concierge", in: "08:15", out: "—", status: "in", initials: "JL", color: "#F59E0B", hours: "4h 15m" },
  { name: "Lisa Chen", dept: "Housekeeping", in: "07:30", out: "—", status: "in", initials: "LC", color: "#10B981", hours: "5h" },
  { name: "Omar F.", dept: "F&B", in: "—", out: "—", status: "absent", initials: "OF", color: "#EF4444", hours: "—" },
  { name: "Nina P.", dept: "Spa", in: "09:30", out: "—", status: "in", initials: "NP", color: "#EC4899", hours: "3h" },
];

const weeklyAttendance = [
  { day: "Mon", present: 14, absent: 1 },
  { day: "Tue", present: 13, absent: 2 },
  { day: "Wed", present: 15, absent: 0 },
  { day: "Thu", present: 12, absent: 3 },
  { day: "Fri", present: 14, absent: 1 },
  { day: "Sat", present: 13, absent: 2 },
  { day: "Sun", present: 15, absent: 0 },
];

export default function AttendancePage() {
  const totalStaff = todayStaff.length;
  const presentStaff = todayStaff.filter(s => s.status === "in").length;
  const absentStaff = totalStaff - presentStaff;
  const attendanceRate = Math.round((presentStaff / totalStaff) * 100);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900" style={{ fontSize: "1.4rem", fontWeight: 800 }}>Attendance Monitoring</h1>
          <p className="text-slate-500 text-sm mt-0.5">Track staff attendance and working hours — {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-sm shadow-sm hover:border-slate-300 transition-colors"
          style={{ fontWeight: 600 }}
        >
          <Download className="w-4 h-4" /> Export Report
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total Staff", value: totalStaff, color: "#3B82F6" },
          { icon: UserCheck, label: "Present Today", value: presentStaff, color: "#10B981" },
          { icon: UserX, label: "Absent", value: absentStaff, color: "#EF4444" },
          { icon: Clock, label: "Attendance Rate", value: `${attendanceRate}%`, color: "#6366F1" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: stat.color + "15" }}>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <div className="text-slate-900" style={{ fontSize: "1.6rem", fontWeight: 800 }}>{stat.value}</div>
            <div className="text-slate-500 text-sm mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Chart */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-slate-900" style={{ fontWeight: 700 }}>Weekly Attendance Trend</h3>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#3B82F6]" />
              <span className="text-slate-600">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#EF4444]" />
              <span className="text-slate-600">Absent</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weeklyAttendance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0" }} />
            <Bar dataKey="present" name="Present" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="absent" name="Absent" fill="#EF4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Today's Staff */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-slate-900" style={{ fontWeight: 700 }}>Today's Staff ({todayStaff.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-3 text-left text-xs text-slate-600" style={{ fontWeight: 600 }}>Staff Member</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600" style={{ fontWeight: 600 }}>Department</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600" style={{ fontWeight: 600 }}>Check In</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600" style={{ fontWeight: 600 }}>Check Out</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600" style={{ fontWeight: 600 }}>Hours</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600" style={{ fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {todayStaff.map((s, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}99)`, fontWeight: 700 }}
                      >
                        {s.initials}
                      </div>
                      <span className="text-slate-800 text-sm" style={{ fontWeight: 600 }}>{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{s.dept}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${s.status === "in" ? "text-slate-800" : "text-slate-400"}`} style={{ fontWeight: 500 }}>
                      {s.in}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{s.out}</td>
                  <td className="px-6 py-4">
                    <span className="text-slate-700 text-sm" style={{ fontWeight: 500 }}>{s.hours}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full ${
                        s.status === "in" ? "bg-[#F0FDF4] text-[#10B981]" : "bg-[#FEF2F2] text-[#EF4444]"
                      }`}
                      style={{ fontWeight: 600 }}
                    >
                      {s.status === "in" ? "Present" : "Absent"}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}