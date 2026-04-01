"use client";

import { Pricing } from "@/components/marketing/Pricing";
import { FAQ } from "@/components/marketing/FAQ";
import { motion } from "motion/react";
import { Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const comparisonRows = [
  { feature: "Properties", starter: "Up to 3", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Employees", starter: "50", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "SOP Management", starter: true, pro: true, enterprise: true },
  { feature: "KRA Dashboards", starter: false, pro: true, enterprise: true },
  { feature: "Advanced Analytics", starter: false, pro: true, enterprise: true },
  { feature: "Role-based Access", starter: false, pro: true, enterprise: true },
  { feature: "Custom Integrations", starter: false, pro: false, enterprise: true },
  { feature: "White-label", starter: false, pro: false, enterprise: true },
  { feature: "Dedicated Manager", starter: false, pro: false, enterprise: true },
  { feature: "Support", starter: "Email", pro: "Priority", enterprise: "24/7 SLA" },
];

function Cell({ val }: { val: string | boolean }) {
  if (typeof val === "boolean") {
    return val ? (
      <Check className="w-4 h-4 text-[#10B981] mx-auto" />
    ) : (
      <X className="w-4 h-4 text-slate-300 mx-auto" />
    );
  }
  return <span className="text-slate-700 text-sm">{val}</span>;
}

export default function PricingPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#060D1A] py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#3B82F6]/10 to-[#4F46E5]/10 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[#60A5FA] text-xs uppercase tracking-widest mb-4" style={{ fontWeight: 700 }}>Pricing</p>
            <h1
              className="text-white max-w-2xl mx-auto"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em" }}
            >
              Plans for every{" "}
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#818CF8] bg-clip-text text-transparent">
                stage of growth
              </span>
            </h1>
            <p className="text-slate-400 mt-5 text-sm max-w-md mx-auto leading-relaxed">
              Start free, scale as you grow. No hidden fees. Cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <Pricing />

      {/* Comparison Table */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <h2 className="text-slate-900" style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
              Full Feature Comparison
            </h2>
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200">
              <div className="p-5 text-slate-600 text-sm" style={{ fontWeight: 600 }}>Feature</div>
              {["Starter", "Professional", "Enterprise"].map((plan, i) => (
                <div key={i} className={`p-5 text-center text-sm ${i === 1 ? "bg-[#EFF6FF] text-[#3B82F6]" : "text-slate-700"}`} style={{ fontWeight: 700 }}>
                  {plan}
                </div>
              ))}
            </div>
            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                <div className="p-4 pl-5 text-slate-700 text-sm">{row.feature}</div>
                <div className="p-4 text-center"><Cell val={row.starter} /></div>
                <div className="p-4 text-center bg-[#F0F7FF]/60"><Cell val={row.pro} /></div>
                <div className="p-4 text-center"><Cell val={row.enterprise} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Bottom CTA */}
      <section className="py-20 bg-[#060D1A] text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-white mb-4" style={{ fontSize: "1.8rem", fontWeight: 800 }}>Still have questions?</h2>
          <p className="text-slate-400 text-sm mb-8">Talk to our team and we&apos;ll help you find the right plan for your operations.</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#4F46E5] text-white px-7 py-3.5 rounded-xl shadow-lg shadow-blue-900/40"
              style={{ fontWeight: 600 }}
            >
              Talk to Sales <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="text-slate-400 hover:text-white text-sm transition-colors px-4">
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}