import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, MapPin } from 'lucide-react';

const features = [
  {
    title: 'AI-assisted categorization',
    desc: 'Photos are analyzed instantly to detect category and severity for faster triage.',
    icon: Zap,
  },
  {
    title: 'Trust and transparency',
    desc: 'Track each issue from report to resolution with clear status and timestamps.',
    icon: ShieldCheck,
  },
  {
    title: 'Location-aware reports',
    desc: 'Pinpoint exact locations to help crews arrive prepared and fix issues quickly.',
    icon: MapPin,
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">Easier reporting, faster resolution</h2>
          <p className="mt-3 text-gray-600">Eaiser.ai streamlines how citizens report local issues and how municipalities respond. Together, we create safer, cleaner, and more efficient cities.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-lg p-6 bg-gray-50 ring-1 ring-gray-100 hover:bg-white hover:shadow-sm transition"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-md bg-indigo-600 text-white">
                <f.icon size={20} />
              </div>
              <div className="mt-4 text-lg font-semibold text-gray-900">{f.title}</div>
              <p className="mt-1 text-gray-600 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
