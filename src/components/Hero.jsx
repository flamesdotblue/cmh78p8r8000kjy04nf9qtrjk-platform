import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Wand2 } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const float = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, 1, -1, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
  }
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(45rem_30rem_at_120%_10%,rgba(79,70,229,0.25),transparent)]"/>
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/40 to-white"/>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.span variants={item} className="inline-flex items-center gap-2 text-xs uppercase tracking-wider bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full ring-1 ring-indigo-200">
            <Sparkles size={14}/> AI-powered community upkeep
          </motion.span>
          <motion.h1 variants={item} className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Transform your city with automated issue reporting
          </motion.h1>
          <motion.p variants={item} className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl">
            Snap a photo, and our AI handles the rest—categorization, severity, routing, and real-time dashboards. Minimal effort, maximum impact.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#cta" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition">
              <Camera size={18}/> Report an Issue
            </a>
            <a href="#workflow" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white ring-1 ring-gray-200 text-gray-900 hover:bg-gray-50 font-medium transition">
              <Wand2 size={18}/> See AI in Action
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute -right-10 top-24 hidden md:block"
        variants={float}
        animate="animate"
      >
        <div className="h-64 w-64 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 backdrop-blur shadow-2xl"/>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute right-24 bottom-16 hidden md:block"
        variants={float}
        animate="animate"
      >
        <div className="h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 backdrop-blur shadow-xl"/>
      </motion.div>
    </section>
  );
}
