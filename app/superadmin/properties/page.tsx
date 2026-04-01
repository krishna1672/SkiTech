"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  Building2,
  MapPin,
  Users,
  Home,
  Activity,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronDown,
} from "lucide-react";

const properties = [
  { id: 1, name: "Summit Ridge Apartments", owner: "Mountain View Holdings", location: "Denver, CO", units: 148, staff: 12, occupancy: 94, health: 92, status: "active" },
  { id: 2, name: "Lakeside Residences", owner: "Horizon Property Group", location: "Austin, TX", units: 89, staff: 8, occupancy: 87, health: 85, status: "active" },
  { id: 3, name: "Pine Valley Estates", owner: "Cascade Management LLC", location: "Seattle, WA", units: 224, staff: 18, occupancy: 91, health: 88, status: "active" },
  { id: 4, name: "Cedar Heights", owner: "Urban Living Partners", location: "Portland, OR", units: 56, staff: 5, occupancy: 78, health: 71, status: "active" },
  { id: 5, name: "Riverside Commons", owner: "Pacific Northwest Properties", location: "Vancouver, WA", units: 112, staff: 9, occupancy: 96, health: 97, status: "active" },
  { id: 6, name: "Mountain View Terraces", owner: "Alpine Realty Group", location: "Salt Lake City, UT", units: 67, staff: 6, occupancy: 82, health: 79, status: "active" },
  { id: 7, name: "Harbor Point Condos", owner: "Coastal Properties Inc", location: "San Diego, CA", units: 183, staff: 14, occupancy: 89, health: 86, status: "active" },
  { id: 8, name: "Downtown Lofts", owner: "Metro Living LLC", location: "Phoenix, AZ", units: 94, staff: 7, occupancy: 73, health: 68, status: "inactive" },
  { id: 9, name: "Sunset Gardens", owner: "Desert Sun Management", location: "Las Vegas, NV", units: 131, staff: 10, occupancy: 91, health: 89, status: "active" },
  { id: 10, name: "Oakwood Manor", owner: "Heritage Homes Corp", location: "Nashville, TN", units: 78, staff: 6, occupancy: 85, health: 82, status: "active" },
];

const regions = ["All Regions", "West", "Southwest", "Midwest", "Southeast", "Northeast"];

export default function AllProperties() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null);

  const filteredProperties = properties.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.owner.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: properties.length,
    active: properties.filter((p) => p.status === "active").length,
    inactive: properties.filter((p) => p.status === "inactive").length,
    newThisMonth: 2,
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-emerald-600";
    if (health >= 75) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
          All Properties
        </h1>
        <p className="text-neutral-500 text-sm mt-0.5">Manage and monitor all platform properties</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white/70 backdrop-blur rounded-xl border border-black/10 shadow-sm p-4">
          <p className="text-sm text-neutral-500">Total Properties</p>
          <p className="text-2xl font-bold text-black mt-1">{stats.total}</p>
        </div>
        <div className="bg-white/70 backdrop-blur rounded-xl border border-black/10 shadow-sm p-4">
          <p className="text-sm text-neutral-500">Active</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.active}</p>
        </div>
        <div className="bg-white/70 backdrop-blur rounded-xl border border-black/10 shadow-sm p-4">
          <p className="text-sm text-neutral-500">Inactive</p>
          <p className="text-2xl font-bold text-red-500 mt-1">{stats.inactive}</p>
        </div>
        <div className="bg-white/70 backdrop-blur rounded-xl border border-black/10 shadow-sm p-4">
          <p className="text-sm text-neutral-500">New This Month</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{stats.newThisMonth}</p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur rounded-xl border border-black/10 shadow-sm">
        <div className="p-4 flex items-center gap-4 border-b border-black/10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/50 border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/50 border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-4 py-2 bg-white/50 border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Property
          </motion.button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/10">
                <th className="text-left p-4 text-sm font-medium text-neutral-500">Property Name</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-500">Owner/Tenant</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-500">Location</th>
                <th className="text-center p-4 text-sm font-medium text-neutral-500"># Units</th>
                <th className="text-center p-4 text-sm font-medium text-neutral-500"># Staff</th>
                <th className="text-center p-4 text-sm font-medium text-neutral-500">Occupancy %</th>
                <th className="text-center p-4 text-sm font-medium text-neutral-500">Health Score</th>
                <th className="text-center p-4 text-sm font-medium text-neutral-500">Status</th>
                <th className="text-center p-4 text-sm font-medium text-neutral-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property, i) => (
                <motion.tr
                  key={property.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-black/5 hover:bg-black/5 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-black">{property.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-neutral-600">{property.owner}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-neutral-600">
                      <MapPin className="w-4 h-4" />
                      {property.location}
                    </div>
                  </td>
                  <td className="p-4 text-center text-sm font-medium">{property.units}</td>
                  <td className="p-4 text-center text-sm">{property.staff}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${property.occupancy}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{property.occupancy}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Activity className={`w-4 h-4 ${getHealthColor(property.health)}`} />
                      <span className={`text-sm font-medium ${getHealthColor(property.health)}`}>{property.health}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      property.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {property.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setSelectedProperty(property)}
                        className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-neutral-600" />
                      </button>
                      <button className="p-2 hover:bg-black/5 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-neutral-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-black/10 shadow-xl p-6 w-full max-w-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                Add New Property
              </h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-black/5 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Property Name</label>
                <input
                  type="text"
                  placeholder="Enter property name"
                  className="w-full px-4 py-2.5 bg-white/50 border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Owner/Tenant</label>
                <input
                  type="text"
                  placeholder="Enter owner or tenant name"
                  className="w-full px-4 py-2.5 bg-white/50 border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="City, State"
                    className="w-full px-4 py-2.5 bg-white/50 border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1"># Units</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-2.5 bg-white/50 border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 border border-black/10 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/90 transition-colors">
                  Add Property
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedProperty(null)}
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-black/10 shadow-xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                Property Details
              </h2>
              <button onClick={() => setSelectedProperty(null)} className="p-2 hover:bg-black/5 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
                <Building2 className="w-12 h-12" />
                <div>
                  <h3 className="text-lg font-bold">{selectedProperty.name}</h3>
                  <p className="text-blue-100 text-sm">{selectedProperty.owner}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-black/5 rounded-lg">
                  <p className="text-xs text-neutral-500">Location</p>
                  <p className="text-sm font-medium mt-0.5">{selectedProperty.location}</p>
                </div>
                <div className="p-3 bg-black/5 rounded-lg">
                  <p className="text-xs text-neutral-500">Total Units</p>
                  <p className="text-sm font-medium mt-0.5">{selectedProperty.units}</p>
                </div>
                <div className="p-3 bg-black/5 rounded-lg">
                  <p className="text-xs text-neutral-500">Staff Count</p>
                  <p className="text-sm font-medium mt-0.5">{selectedProperty.staff}</p>
                </div>
                <div className="p-3 bg-black/5 rounded-lg">
                  <p className="text-xs text-neutral-500">Status</p>
                  <p className="text-sm font-medium mt-0.5 capitalize">{selectedProperty.status}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Occupancy</span>
                  <span className="font-medium">{selectedProperty.occupancy}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${selectedProperty.occupancy}%` }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Health Score</span>
                  <span className="font-medium">{selectedProperty.health}/100</span>
                </div>
                <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${selectedProperty.health}%` }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
