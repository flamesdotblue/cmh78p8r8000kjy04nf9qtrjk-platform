import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function Ending() {
  return (
    <section id="get-started" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl p-8 sm:p-12 bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg"
        >
          <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">Join Eaiser.ai and help improve your city</h3>
          <p className="mt-3 text-white/90 max-w-2xl">Create an account to report issues, track resolution progress, and visualize impact across your community.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#signup" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white text-gray-900 hover:bg-white/90 font-medium transition">
              <Rocket size={18}/> Get Started Free
            </a>
            <a href="#learn" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white/10 ring-1 ring-white/30 hover:bg-white/20 text-white font-medium transition">
              Learn more
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
