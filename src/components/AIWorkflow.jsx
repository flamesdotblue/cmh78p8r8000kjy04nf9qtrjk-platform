import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Brain, MapPin, CheckCircle2, Bell, BarChart3 } from 'lucide-react';

const steps = [
  {
    title: 'Snap & Submit',
    desc: 'Capture an issue using your phone camera. Drag & drop or upload images instantly.',
    icon: Camera,
    color: 'from-indigo-500 to-blue-500'
  },
  {
    title: 'AI Classification',
    desc: 'Our models auto-detect category, severity, and relevant departments within seconds.',
    icon: Brain,
    color: 'from-fuchsia-500 to-rose-500'
  },
  {
    title: 'Location Intelligence',
    desc: 'Geo-tagging pins the exact location so teams can plan the fastest route.',
    icon: MapPin,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Smart Routing',
    desc: 'Issues are auto-routed to the right crews with SLAs and alerts configured.',
    icon: Bell,
    color: 'from-amber-500 to-orange-500'
  },
  {
    title: 'Live Dashboard',
    desc: 'Track open, in-progress, and resolved issues with real-time analytics.',
    icon: BarChart3,
    color: 'from-violet-500 to-indigo-500'
  },
  {
    title: 'Verified Resolution',
    desc: 'Completion proof and status updates are shared back to residents transparently.',
    icon: CheckCircle2,
    color: 'from-green-500 to-emerald-500'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
};

export default function AIWorkflow() {
  return (
    <section id="workflow" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">Hands-off automation powered by AI</h2>
          <p className="mt-3 text-gray-600">From photo to resolution—every step is automated so communities get fixes faster with minimal human effort.</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {steps.map((s) => (
            <motion.div
              key={s.title}
              variants={item}
              className="rounded-xl p-6 bg-white ring-1 ring-gray-100 shadow-sm hover:shadow-md transition group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${s.color} text-white shadow`}>
                <s.icon size={20} />
              </div>
              <div className="mt-4 text-lg font-semibold text-gray-900 tracking-tight">{s.title}</div>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              <div className="mt-4 h-1 w-0 group-hover:w-full transition-all bg-gradient-to-r from-indigo-500/70 to-fuchsia-500/70 rounded-full"/>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
