"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, CreditCard, Globe, Save } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-slate-900" style={{ fontSize: "1.4rem", fontWeight: 800 }}>Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your account and platform preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar tabs */}
        <div className="lg:w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-2">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all mb-0.5 ${tab === t.id ? "bg-gradient-to-r from-[#3B82F6]/10 to-[#4F46E5]/10 text-[#3B82F6]" : "text-slate-600 hover:bg-slate-50"}`}
                style={{ fontWeight: tab === t.id ? 600 : 400 }}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {tab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h2 className="text-slate-900 mb-6" style={{ fontWeight: 700, fontSize: "1.05rem" }}>Profile Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#4F46E5] flex items-center justify-center text-white" style={{ fontWeight: 800, fontSize: "1.3rem" }}>
                  OW
                </div>
                <div>
                  <button className="text-sm text-[#3B82F6] border border-[#3B82F6]/30 px-4 py-2 rounded-lg hover:bg-[#EFF6FF] transition-colors">
                    Change Photo
                  </button>
                  <p className="text-slate-400 text-xs mt-1.5">JPG, PNG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: "First Name", value: "Property" },
                  { label: "Last Name", value: "Owner" },
                  { label: "Email Address", value: "owner@grandhoriz.com" },
                  { label: "Phone Number", value: "+971 50 000 1111" },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="block text-slate-700 text-sm mb-2" style={{ fontWeight: 500 }}>{f.label}</label>
                    <input
                      defaultValue={f.value}
                      className="w-full bg-[#F8F9FB] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <label className="block text-slate-700 text-sm mb-2" style={{ fontWeight: 500 }}>Company / Portfolio Name</label>
                <input
                  defaultValue="Grand Horizon Property Group"
                  className="w-full bg-[#F8F9FB] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className={`mt-6 flex items-center gap-2 px-6 py-3 rounded-xl text-sm shadow-md transition-all ${saved ? "bg-[#10B981] text-white" : "bg-gradient-to-r from-[#3B82F6] to-[#4F46E5] text-white"}`}
                style={{ fontWeight: 600 }}
              >
                <Save className="w-4 h-4" />
                {saved ? "Saved!" : "Save Changes"}
              </motion.button>
            </motion.div>
          )}

          {tab === "notifications" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h2 className="text-slate-900 mb-6" style={{ fontWeight: 700, fontSize: "1.05rem" }}>Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: "Daily Revenue Summary", desc: "Receive a daily email with revenue metrics", enabled: true },
                  { label: "KRA Compliance Alerts", desc: "Get notified when compliance drops below 80%", enabled: true },
                  { label: "Low Stock Alerts", desc: "Alert when inventory falls below minimum level", enabled: true },
                  { label: "Staff Attendance", desc: "Daily attendance summary report", enabled: false },
                  { label: "Task Overdue Alerts", desc: "Immediate notification for overdue KRA tasks", enabled: true },
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-slate-100">
                    <div>
                      <p className="text-slate-800 text-sm" style={{ fontWeight: 600 }}>{n.label}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{n.desc}</p>
                    </div>
                    <div className={`relative w-11 h-6 rounded-full cursor-pointer transition-colors ${n.enabled ? "bg-[#3B82F6]" : "bg-slate-200"}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${n.enabled ? "left-6" : "left-1"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === "security" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h2 className="text-slate-900 mb-6" style={{ fontWeight: 700, fontSize: "1.05rem" }}>Security</h2>
              <div className="space-y-5">
                {["Current Password", "New Password", "Confirm New Password"].map((f, i) => (
                  <div key={i}>
                    <label className="block text-slate-700 text-sm mb-2" style={{ fontWeight: 500 }}>{f}</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-[#F8F9FB] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3B82F6] transition-all" />
                  </div>
                ))}
                <button className="bg-gradient-to-r from-[#3B82F6] to-[#4F46E5] text-white px-6 py-3 rounded-xl text-sm shadow-md" style={{ fontWeight: 600 }}>
                  Update Password
                </button>
              </div>
            </motion.div>
          )}

          {tab === "billing" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h2 className="text-slate-900 mb-6" style={{ fontWeight: 700, fontSize: "1.05rem" }}>Billing & Plan</h2>
              <div className="bg-gradient-to-br from-[#EFF6FF] to-[#EEF2FF] rounded-2xl p-6 border border-[#3B82F6]/20 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">Current Plan</p>
                    <p className="text-slate-900" style={{ fontWeight: 800, fontSize: "1.3rem" }}>Professional</p>
                    <p className="text-slate-500 text-sm mt-1">$99/month · Renews Feb 1, 2025</p>
                  </div>
                  <div className="text-right">
                    <button className="bg-gradient-to-r from-[#3B82F6] to-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm shadow-md" style={{ fontWeight: 600 }}>
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>
              <h3 className="text-slate-800 mb-4" style={{ fontWeight: 600, fontSize: "0.95rem" }}>Billing History</h3>
              <div className="space-y-2">
                {["Jan 1, 2025 — $99.00", "Dec 1, 2024 — $99.00", "Nov 1, 2024 — $99.00"].map((b, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 text-sm">
                    <span className="text-slate-700">{b}</span>
                    <span className="text-[#10B981]" style={{ fontWeight: 600 }}>Paid</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
