"use client";

import { motion } from "motion/react";
import { Building2, Users, TrendingUp, ClipboardList, ArrowUpRight, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Link from "next/link";

const stats = [
  { icon: Building2, label: "Total Properties", value: "3", change: "+1 this month", positive: true, color: "#3B82F6" },
  { icon: Users, label: "Total Staff", value: "47", change: "+3 this week", positive: true, color: "#6366F1" },
  { icon: TrendingUp, label: "Daily Revenue", value: "$16,580", change: "+12.4% vs yesterday", positive: true, color: "#10B981" },
  { icon: ClipboardList, label: "Pending Tasks", value: "8", change: "2 overdue", positive: false, color: "#F59E0B" },
];

const revenueData = [
  { day: "Mon", revenue: 12400 },
  { day: "Tue", revenue: 13800 },
  { day: "Wed", revenue: 11200 },
  { day: "Thu", revenue: 15600 },
  { day: "Fri", revenue: 14200 },
  { day: "Sat", revenue: 18400 },
  { day: "Sun", revenue: 16580 },
];

export default function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome back, Owner</h2>
           <p className="text-slate-500 text-sm">Here's your operations snapshot for today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-shadow shadow-md shadow-blue-500/20">
            Add Property
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-100">
                <stat.icon className="w-5 h-5 text-slate-600" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.positive ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Chart */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Revenue Trend</h3>
            <select className="text-xs border border-slate-200 rounded-md px-2 py-1 text-slate-500 focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                   </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                   dataKey="day" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{fontSize: 12, fill: '#64748b'}} 
                   dy={10}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{fontSize: 12, fill: '#64748b'}} 
                   tickFormatter={(val) => `$${val/1000}k`}
                />
                <Tooltip 
                   contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}}
                   itemStyle={{color: '#fff'}}
                />
                <Area 
                   type="monotone" 
                   dataKey="revenue" 
                   stroke="#3B82F6" 
                   strokeWidth={2} 
                   fillOpacity={1} 
                   fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm p-6 overflow-hidden flex flex-col">
           <h3 className="font-bold text-slate-800 mb-6">Recent Alerts</h3>
           <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
             {[
                { icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-50", title: "Low inventory: Towels", time: "10 mins ago", prop: "Grand Horizon" },
                { icon: Clock, color: "text-amber-500", bg: "bg-amber-50", title: "Late check-in", time: "32 mins ago", prop: "Skyline Suites" },
                { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50", title: "Maintenance completed", time: "1 hr ago", prop: "Front Desk" },
                { icon: Users, color: "text-blue-500", bg: "bg-blue-50", title: "Shift change: Housekeeping", time: "2 hrs ago", prop: "Grand Horizon" },
             ].map((item, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">{item.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">{item.prop}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-xs text-slate-400">{item.time}</span>
                    </div>
                  </div>
                </div>
             ))}
           </div>
           <button className="w-full mt-4 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
              View All Alerts
           </button>
        </div>
      </div>
    </div>
  );
}
