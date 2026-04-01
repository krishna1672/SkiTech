"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  AlertTriangle,
  AlertCircle,
  Database,
  Download,
  Filter,
  Search,
  User,
  Settings,
  Building2,
  Shield,
  Key,
  LogIn,
  FileText,
  Bell,
  ChevronDown,
} from "lucide-react";

const auditEvents = [
  { id: 1, timestamp: "2024-01-15 14:32:18", user: "Sarah Mitchell", action: "ROLE_CHANGED", resource: "User: James Chen", details: "Role changed from Staff to Manager", severity: "info" },
  { id: 2, timestamp: "2024-01-15 14:28:45", user: "System", action: "LOGIN_SUCCESS", resource: "Auth Service", details: "Successful login from 192.168.1.105", severity: "info" },
  { id: 3, timestamp: "2024-01-15 14:15:22", user: "David Thompson", action: "PROPERTY_UPDATE", resource: "Property: Cedar Heights", details: "Updated property amenities and facilities", severity: "info" },
  { id: 4, timestamp: "2024-01-15 13:58:11", user: "Maria Rodriguez", action: "USER_SUSPENDED", resource: "User: Robert Kim", details: "Account suspended due to policy violation", severity: "warning" },
  { id: 5, timestamp: "2024-01-15 13:42:33", user: "System", action: "CONFIG_CHANGE", resource: "Platform Settings", details: "Maintenance mode enabled by admin", severity: "warning" },
  { id: 6, timestamp: "2024-01-15 13:30:05", user: "Emily Watson", action: "API_KEY_CREATED", resource: "API Key: prod_key_8x7f", details: "New production API key generated", severity: "info" },
  { id: 7, timestamp: "2024-01-15 13:15:47", user: "Michael Park", action: "BILLING_UPDATE", resource: "Property: Mountain View Terraces", details: "Updated billing information and payment method", severity: "info" },
  { id: 8, timestamp: "2024-01-15 12:58:22", user: "Lisa Chang", action: "PROPERTY_CREATED", resource: "Property: Harbor Point Condos", details: "New property registered on platform", severity: "info" },
  { id: 9, timestamp: "2024-01-15 12:45:09", user: "System", action: "LOGIN_FAILED", resource: "Auth Service", details: "Failed login attempt - invalid credentials (3 attempts)", severity: "warning" },
  { id: 10, timestamp: "2024-01-15 12:30:18", user: "Jennifer Martinez", action: "ROLE_CHANGED", resource: "User: Amanda Foster", details: "Role changed from Owner to Superadmin", severity: "critical" },
  { id: 11, timestamp: "2024-01-15 12:15:44", user: "William Brown", action: "DATA_EXPORT", resource: "Property: Central Plaza", details: "Exported tenant data for Q4 report", severity: "info" },
  { id: 12, timestamp: "2024-01-15 11:58:33", user: "Christopher Lee", action: "SETTINGS_UPDATE", resource: "Notification Preferences", details: "Disabled email notifications for maintenance", severity: "info" },
  { id: 13, timestamp: "2024-01-15 11:42:17", user: "System", action: "DATABASE_BACKUP", resource: "Primary Database", details: "Automated daily backup completed successfully", severity: "info" },
  { id: 14, timestamp: "2024-01-15 11:25:55", user: "Sarah Mitchell", action: "INTEGRATION_CONNECTED", resource: "Slack Webhook", details: "Connected Slack integration for alerts", severity: "info" },
  { id: 15, timestamp: "2024-01-15 11:10:02", user: "James Chen", action: "API_KEY_REVOKED", resource: "API Key: staging_key_2k9p", details: "Revoked stale staging API key", severity: "warning" },
  { id: 16, timestamp: "2024-01-15 10:55:28", user: "System", action: "SECURITY_ALERT", resource: "Auth Service", details: "Multiple failed logins detected from unknown IP", severity: "critical" },
  { id: 17, timestamp: "2024-01-15 10:38:14", user: "David Thompson", action: "PERMISSION_GRANTED", resource: "User: Lisa Chang", details: "Granted billing admin permissions", severity: "warning" },
  { id: 18, timestamp: "2024-01-15 10:22:41", user: "Emily Watson", action: "BULK_IMPORT", resource: "Property: Riverside Commons", details: "Imported 45 new tenant records from CSV", severity: "info" },
];

const actionTypes = ["All Actions", "LOGIN_SUCCESS", "LOGIN_FAILED", "ROLE_CHANGED", "USER_SUSPENDED", "PROPERTY_UPDATE", "CONFIG_CHANGE", "API_KEY_CREATED", "API_KEY_REVOKED"];
const severities = ["All", "info", "warning", "critical"];

const getActionIcon = (action: string) => {
  if (action.includes("LOGIN")) return <LogIn className="w-4 h-4" />;
  if (action.includes("ROLE") || action.includes("PERMISSION")) return <Shield className="w-4 h-4" />;
  if (action.includes("PROPERTY")) return <Building2 className="w-4 h-4" />;
  if (action.includes("USER")) return <User className="w-4 h-4" />;
  if (action.includes("API")) return <Key className="w-4 h-4" />;
  if (action.includes("CONFIG") || action.includes("SETTINGS")) return <Settings className="w-4 h-4" />;
  if (action.includes("EXPORT") || action.includes("IMPORT")) return <FileText className="w-4 h-4" />;
  return <Clock className="w-4 h-4" />;
};

const getSeverityStyles = (severity: string) => {
  switch (severity) {
    case "info": return "bg-black/5 text-neutral-700 border-black/10";
    case "warning": return "bg-amber-100/50 text-amber-700 border-amber-200";
    case "critical": return "bg-red-100/50 text-red-700 border-red-200";
    default: return "bg-black/5 text-neutral-700 border-black/10";
  }
};

export default function AuditLog() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("All Actions");
  const [severityFilter, setSeverityFilter] = useState("All");

  const filteredEvents = auditEvents.filter((event) => {
    const matchesSearch = event.user.toLowerCase().includes(search.toLowerCase()) || event.details.toLowerCase().includes(search.toLowerCase());
    const matchesAction = actionFilter === "All Actions" || event.action.includes(actionFilter.replace("All Actions", ""));
    const matchesSeverity = severityFilter === "All" || event.severity === severityFilter;
    return matchesSearch && matchesAction && matchesSeverity;
  });

  const stats = {
    totalToday: auditEvents.length,
    warnings: auditEvents.filter((e) => e.severity === "warning").length,
    critical: auditEvents.filter((e) => e.severity === "critical").length,
    logSize: "2.4 MB",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
          Audit Log
        </h1>
        <p className="text-neutral-500 text-sm mt-0.5">Track all administrative actions and changes</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white/70 backdrop-blur rounded-xl border border-black/10 shadow-sm p-4">
          <p className="text-sm text-neutral-500">Events Today</p>
          <p className="text-2xl font-bold text-black mt-1">{stats.totalToday}</p>
        </div>
        <div className="bg-white/70 backdrop-blur rounded-xl border border-black/10 shadow-sm p-4">
          <p className="text-sm text-neutral-500">Warnings</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{stats.warnings}</p>
        </div>
        <div className="bg-white/70 backdrop-blur rounded-xl border border-black/10 shadow-sm p-4">
          <p className="text-sm text-neutral-500">Critical</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{stats.critical}</p>
        </div>
        <div className="bg-white/70 backdrop-blur rounded-xl border border-black/10 shadow-sm p-4">
          <p className="text-sm text-neutral-500">Log Size</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{stats.logSize}</p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur rounded-xl border border-black/10 shadow-sm">
        <div className="p-4 flex items-center gap-4 border-b border-black/10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by user or details..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/50 border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-2 bg-white/50 border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            {actionTypes.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <div className="flex gap-1 bg-black/5 p-1 rounded-lg">
            {severities.map((s) => (
              <button
                key={s}
                onClick={() => setSeverityFilter(s)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  severityFilter === s
                    ? "bg-white text-black shadow-sm"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                {s === "All" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Export Logs
          </motion.button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/10">
                <th className="text-left p-4 text-sm font-medium text-neutral-500">Timestamp</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-500">User</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-500">Action Type</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-500">Resource</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-500">Details</th>
                <th className="text-center p-4 text-sm font-medium text-neutral-500">Severity</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, i) => (
                <motion.tr
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-black/5 hover:bg-black/5 transition-colors"
                >
                  <td className="p-4 text-sm text-neutral-600 font-mono">{event.timestamp}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-neutral-700 to-neutral-900 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {event.user.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-sm font-medium text-black">{event.user}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      {getActionIcon(event.action)}
                      {event.action.replace(/_/g, " ")}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-neutral-600">{event.resource}</td>
                  <td className="p-4 text-sm text-neutral-600 max-w-xs truncate">{event.details}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getSeverityStyles(event.severity)}`}>
                      {event.severity}
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
