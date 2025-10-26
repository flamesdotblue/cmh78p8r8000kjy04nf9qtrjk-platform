import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section id="home" className="relative h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/vc19ejtcC5VJjy5v/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-white"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full ring-1 ring-white/20 mb-4">
            <Sparkles size={14}/> AI-powered civic platform
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Transform your community with intelligent issue reporting
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl">
            Snap a photo of a pothole, broken light, or trash pile. Our AI analyzes and categorizes issues in real-time so cities can respond faster.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#get-started" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition">
              <Camera size={18}/> Report an Issue
            </a>
            <a href="#impact" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition ring-1 ring-white/30">
              See Impact
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
