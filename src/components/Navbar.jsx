import React, { useEffect, useState } from 'react';
import { Menu, X, Home, LayoutDashboard, LogIn } from 'lucide-react';

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-white/60 rounded-md transition"
  >
    {children}
  </a>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition ${
        scrolled ? 'bg-white/80 backdrop-blur shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-indigo-600 text-white font-bold">EA</div>
          <span className="text-lg font-semibold tracking-tight">EAISER</span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          <NavLink href="#home"><span className="inline-flex items-center gap-1"><Home size={16}/> Home</span></NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#impact">Impact</NavLink>
          <NavLink href="#dashboard"><span className="inline-flex items-center gap-1"><LayoutDashboard size={16}/> Dashboard</span></NavLink>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="#signin" className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-gray-200 hover:bg-white transition">
            <LogIn size={16}/> Sign in
          </a>
          <a href="#get-started" className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
            Get Started
          </a>
        </div>
        <button
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18}/> : <Menu size={18}/>}        
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 flex flex-col gap-1">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#impact">Impact</NavLink>
            <NavLink href="#dashboard">Dashboard</NavLink>
            <div className="h-px bg-gray-100 my-2"/>
            <a href="#signin" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">Sign in</a>
            <a href="#get-started" className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Get Started</a>
          </div>
        </div>
      )}
    </header>
  );
}
