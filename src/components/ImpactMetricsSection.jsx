import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, BarChart3, Clock } from 'lucide-react';

const metrics = [
  { label: 'Issues Reported', value: '8,420+', icon: AlertTriangle, color: 'from-rose-500 to-orange-500' },
  { label: 'Issues Resolved', value: '6,980+', icon: CheckCircle2, color: 'from-emerald-500 to-teal-500' },
  { label: 'AI Accuracy', value: '95%', icon: BarChart3, color: 'from-indigo-500 to-blue-500' },
  { label: 'Avg. Response', value: '12h', icon: Clock, color: 'from-violet-500 to-fuchsia-500' },
];

export default function ImpactMetricsSection() {
  return (
    <section id="impact" className="relative py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">Real impact you can measure</h2>
          <p className="mt-3 text-gray-600">Transparent metrics updated in real-time so communities and residents stay informed.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-lg p-6 bg-white shadow-sm ring-1 ring-gray-100 hover:shadow-md transition"
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-md bg-gradient-to-br ${m.color} text-white`}> 
                <m.icon size={20} />
              </div>
              <div className="mt-4 text-3xl font-bold tracking-tight">{m.value}</div>
              <div className="text-sm text-gray-600">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
