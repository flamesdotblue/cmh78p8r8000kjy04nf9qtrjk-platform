import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIWorkflow from './components/AIWorkflow';
import CTASection from './components/CTASection';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <AIWorkflow />
        <CTASection />
      </main>
    </div>
  );
}
