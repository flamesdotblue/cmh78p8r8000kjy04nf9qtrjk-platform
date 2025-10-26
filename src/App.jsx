import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ImpactMetricsSection from './components/ImpactMetricsSection';
import Ending from './components/Ending';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <ImpactMetricsSection />
        <Ending />
      </main>
    </div>
  );
}

export default App;
