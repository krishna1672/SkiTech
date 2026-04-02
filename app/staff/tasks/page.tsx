"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle, Calendar, Filter, Search, MapPin } from "lucide-react";

const myTasks = [
  { id: 1, task: "Room 201 - Housekeeping inspection", location: "Floor 2, Room 201", due: "10:00 AM", priority: "high", status: "done" },
  { id: 2, task: "Lobby area - Daily cleaning", location: "Main Lobby", due: "12:00 PM", priority: "medium", status: "pending" },
  { id: 3, task: "Minibar restocking - Floor 2", location: "Floor 2", due: "02:00 PM", priority: "low", status: "pending" },
  { id: 4, task: "Corridor mopping - West wing", location: "West Wing", due: "03:00 PM", priority: "low", status: "upcoming" },
  { id: 5, task: "Pool area - Pre-opening check", location: "Pool Area", due: "05:00 PM", priority: "medium", status: "upcoming" },
  { id: 6, task: "End of shift room inspection", location: "All Floors", due: "05:30 PM", priority: "high", status: "upcoming" },
];

const statusConfig = {
  done: { color: "#10B981", bg: "bg-emerald-50 text-emerald-700 border border-emerald-200/60", label: "Done", icon: CheckCircle2 },
  pending: { color: "#F59E0B", bg: "bg-amber-50 text-amber-700 border border-amber-200/60", label: "In Progress", icon: Clock },
  upcoming: { color: "#3B82F6", bg: "bg-blue-50 text-blue-700 border border-blue-200/60", label: "Upcoming", icon: Calendar },
  overdue: { color: "#EF4444", bg: "bg-red-50 text-red-700 border border-red-200/60", label: "Overdue", icon: AlertCircle },
};

const priorityConfig = {
  high: { color: "#EF4444", label: "High" },
  medium: { color: "#F59E0B", label: "Medium" },
  low: { color: "#10B981", label: "Low" },
};

export default function StaffTasksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [taskList, setTaskList] = useState(myTasks);

  const filteredTasks = taskList.filter(t => {
    const matchesSearch = t.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || t.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const toggleTask = (id: number) => {
    setTaskList(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === "done" ? "pending" : "done" } : t
    ));
  };

  const completedCount = taskList.filter(t => t.status === "done").length;
  const totalCount = taskList.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 tracking-tight">My Tasks</h1>
          <p className="text-slate-500 text-sm mt-1">Your assigned tasks for today</p>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 bg-emerald-50 border border-emerald-200/60 px-4 py-2 rounded-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {completedCount}/{totalCount} Complete
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-950">Today's Progress</h3>
          <span className="text-sm font-medium text-slate-600">{progress}%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tasks or locations..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-950/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-950/10 transition-all"
            >
              <option value="all">All Status</option>
              <option value="done">Done</option>
              <option value="pending">In Progress</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-950">All Tasks ({filteredTasks.length})</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {filteredTasks.map((t, i) => {
            const statusCfg = statusConfig[t.status as keyof typeof statusConfig];
            const priorityCfg = priorityConfig[t.priority as keyof typeof priorityConfig];
            const StatusIcon = statusCfg.icon;

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors"
              >
                <button
                  onClick={() => toggleTask(t.id)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                    t.status === "done"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${t.status === "done" ? "line-through text-slate-400" : "text-slate-950"}`}>
                    {t.task}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {t.location}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Due {t.due}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: `${priorityCfg.color}15`,
                      color: priorityCfg.color
                    }}
                  >
                    {priorityCfg.label}
                  </span>
                  <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${statusCfg.bg}`}>
                    {statusCfg.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
