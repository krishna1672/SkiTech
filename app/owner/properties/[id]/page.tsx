"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Building2, MapPin, Users, TrendingUp, Activity, Edit2, Trash2 } from "lucide-react";

const propertiesData: Record<string, {
  id: number;
  name: string;
  location: string;
  type: string;
  rooms: number;
  staff: number;
  occ: number;
  revenue: string;
  manager: string;
  status: string;
  img: string;
  owner: string;
  contact: string;
  health: number;
}> = {
  "1": {
    id: 1,
    name: "Grand Horizon Property",
    location: "Dubai Marina, UAE",
    type: "5-Star Hotel",
    rooms: 142,
    staff: 28,
    occ: 87,
    revenue: "$8,420",
    manager: "Sarah Mitchell",
    status: "active",
    img: "https://images.unsplash.com/photo-1761926488116-9a5040fb1384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    owner: "Al Mansouri Holdings",
    contact: "+971 50 123 4567",
    health: 92,
  },
  "2": {
    id: 2,
    name: "Skyline Suites",
    location: "Business Bay, UAE",
    type: "Business Hotel",
    rooms: 68,
    staff: 14,
    occ: 74,
    revenue: "$3,960",
    manager: "James Chen",
    status: "active",
    img: "https://images.unsplash.com/photo-1711114378455-b1f479d94a19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    owner: "Skyline Hospitality Group",
    contact: "+971 50 987 6543",
    health: 85,
  },
  "3": {
    id: 3,
    name: "The Amiras Residence",
    location: "Palm Jumeirah, UAE",
    type: "Boutique Property",
    rooms: 55,
    staff: 11,
    occ: 91,
    revenue: "$4,200",
    manager: "Priya Sharma",
    status: "active",
    img: "https://images.unsplash.com/photo-1759412954551-107b6be24dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    owner: "Amiras Group",
    contact: "+971 55 111 2233",
    health: 88,
  },
};

const recentActivity = [
  { text: "Monthly revenue report submitted", date: "Today, 10:30 AM" },
  { text: "Staff meeting: Morning shift briefing", date: "Today, 08:00 AM" },
  { text: "Maintenance request: Room 301 AC", date: "Yesterday, 4:15 PM" },
  { text: "KRA compliance report approved", date: "Mar 25, 2026" },
  { text: "New staff onboarding: Ahmed K.", date: "Mar 23, 2026" },
];

export default function PropertyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;
  const property = propertiesData[propertyId];

  if (!property) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-20">
          <h2 className="text-xl font-bold text-slate-950 mb-2">Property Not Found</h2>
          <p className="text-slate-500 mb-6">The property you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push("/owner/properties")}
            className="px-4 py-2 bg-slate-950 text-white rounded-xl text-sm font-medium"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const getHealthColor = (health: number) => {
    if (health >= 90) return "#10B981";
    if (health >= 75) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/owner/properties")}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-950 tracking-tight">{property.name}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500 text-sm">{property.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
            property.status === "active"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
              : "bg-red-50 text-red-700 border border-red-200/60"
          }`}>
            {property.status === "active" ? "Active" : "Inactive"}
          </span>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <Edit2 className="w-4 h-4" /> Edit
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors">
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: Building2, label: "Total Rooms", value: property.rooms, color: "#3B82F6" },
          { icon: Users, label: "Total Staff", value: property.staff, color: "#6366F1" },
          { icon: TrendingUp, label: "Daily Revenue", value: property.revenue, color: "#10B981" },
          { icon: Activity, label: "Health Score", value: `${property.health}/100`, color: getHealthColor(property.health) },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm overflow-hidden"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${stat.color}15` }}>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <div className="text-2xl font-bold text-slate-950 tracking-tight">{stat.value}</div>
            <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)` }}
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="font-bold text-slate-950 text-lg mb-5">Performance Metrics</h3>
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Occupancy Rate</span>
                  <span className="text-sm font-bold text-slate-950">{property.occ}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${property.occ}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Health Score</span>
                  <span className="text-sm font-bold text-slate-950">{property.health}/100</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${property.health}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-slate-500 text-xs mb-1">Property Type</p>
                  <p className="text-slate-950 text-sm font-semibold">{property.type}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-slate-500 text-xs mb-1">Manager</p>
                  <p className="text-slate-950 text-sm font-semibold">{property.manager}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="font-bold text-slate-950 text-lg mb-5">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-slate-700 text-sm">{activity.text}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="relative h-48">
              <img src={property.img} alt={property.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-slate-500 text-xs mb-1">Property Name</p>
                <p className="text-slate-950 text-sm font-semibold">{property.name}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-1">Location</p>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <p className="text-slate-950 text-sm font-semibold">{property.location}</p>
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-1">Property Owner</p>
                <p className="text-slate-950 text-sm font-semibold">{property.owner}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-1">Contact</p>
                <p className="text-slate-950 text-sm font-semibold">{property.contact}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="font-bold text-slate-950 text-lg mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => router.push("/owner/staff")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left"
              >
                <Users className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">View Staff</span>
              </button>
              <button
                onClick={() => router.push("/owner/reports")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left"
              >
                <TrendingUp className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">View Reports</span>
              </button>
              <button
                onClick={() => router.push("/owner/kra")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left"
              >
                <Activity className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">KRA Monitoring</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
