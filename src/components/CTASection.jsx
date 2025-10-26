import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ShieldCheck } from 'lucide-react';

export default function CTASection() {
  return (
    <section id="cta" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl p-8 sm:p-12 bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg overflow-hidden relative"
        >
          <div className="absolute -top-20 -right-10 h-56 w-56 bg-white/10 rounded-full blur-2xl"/>
          <div className="absolute -bottom-24 -left-10 h-56 w-56 bg-black/10 rounded-full blur-2xl"/>

          <h3 className="relative z-10 text-3xl md:text-4xl font-semibold tracking-tight">Launch the fully automated issue pipeline</h3>
          <p className="relative z-10 mt-3 text-white/90 max-w-2xl">Enable AI-powered categorization, routing, and real-time dashboards with a single click. Your city—optimized by automation.</p>
          <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
            <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white text-gray-900 hover:bg-white/90 font-medium transition">
              <Rocket size={18}/> Start Free
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white/10 ring-1 ring-white/30 hover:bg-white/20 text-white font-medium transition">
              <ShieldCheck size={18}/> See Live Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
