import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Shield, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative flex items-center min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-gray-50" />
        <div className="absolute -top-20 -left-20 w-[36rem] h-[36rem] rounded-full bg-indigo-200/30 blur-3xl"/>
        <div className="absolute -bottom-32 -right-10 w-[40rem] h-[40rem] rounded-full bg-fuchsia-200/30 blur-3xl"/>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider bg-indigo-600/10 text-indigo-700 px-3 py-1 rounded-full ring-1 ring-indigo-600/20 mb-4">
            <Sparkles size={14}/> AI-powered civic platform
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            Transform your community with intelligent issue reporting
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-xl">
            Snap a photo of potholes, broken lights, or trash. Our AI categorizes issues instantly so your city can respond faster.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#report" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition">
              <Camera size={18}/> Report an Issue
            </a>
            <a href="#issues" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white hover:bg-gray-50 text-gray-900 font-medium transition border border-gray-200">
              View Issues
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600"><Shield size={16} className="text-emerald-600"/> Trusted by communities</div>
            <div className="flex items-center gap-2 text-gray-600"><MapPin size={16} className="text-indigo-600"/> Location-accurate</div>
            <div className="flex items-center gap-2 text-gray-600"><Sparkles size={16} className="text-fuchsia-600"/> AI-assisted</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="relative rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 p-4 sm:p-6">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-fuchsia-500" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-xl bg-indigo-500/20 blur-2xl"/>
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-xl bg-fuchsia-500/20 blur-2xl"/>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
