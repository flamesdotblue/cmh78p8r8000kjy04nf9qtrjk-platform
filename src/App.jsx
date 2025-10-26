import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ReportIssuePanel from './components/ReportIssuePanel';
import IssuesFeed from './components/IssuesFeed';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="pt-16">
        <section id="home" className="scroll-mt-16">
          <Hero />
        </section>

        <section id="report" className="scroll-mt-16">
          <ReportIssuePanel />
        </section>

        <section id="issues" className="scroll-mt-16">
          <IssuesFeed />
        </section>

        <footer className="border-t border-gray-200 mt-16 py-8 text-center text-sm text-gray-500">
          <div className="max-w-7xl mx-auto px-4">© {new Date().getFullYear()} Eaiser.ai — AI-powered community issue reporting</div>
        </footer>
      </main>
    </div>
  );
}
