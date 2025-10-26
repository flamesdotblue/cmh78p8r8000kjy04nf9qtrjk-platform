import React, { useEffect, useState } from 'react';
import { Menu, X, Home, Camera, ListChecks } from 'lucide-react';

const NavLink = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
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

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition ${
        scrolled ? 'bg-white/90 backdrop-blur shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" onClick={(e)=>handleSmoothScroll(e,'home')} className="flex items-center gap-2">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-indigo-600 text-white font-bold">EA</div>
          <span className="text-lg font-semibold tracking-tight">EAISER</span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          <NavLink href="#home" onClick={(e)=>handleSmoothScroll(e,'home')}>
            <span className="inline-flex items-center gap-1"><Home size={16}/> Home</span>
          </NavLink>
          <NavLink href="#report" onClick={(e)=>handleSmoothScroll(e,'report')}>
            <span className="inline-flex items-center gap-1"><Camera size={16}/> Report</span>
          </NavLink>
          <NavLink href="#issues" onClick={(e)=>handleSmoothScroll(e,'issues')}>
            <span className="inline-flex items-center gap-1"><ListChecks size={16}/> Issues</span>
          </NavLink>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#report"
            onClick={(e)=>handleSmoothScroll(e,'report')}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Report an Issue
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
            <NavLink href="#home" onClick={(e)=>handleSmoothScroll(e,'home')}>Home</NavLink>
            <NavLink href="#report" onClick={(e)=>handleSmoothScroll(e,'report')}>Report</NavLink>
            <NavLink href="#issues" onClick={(e)=>handleSmoothScroll(e,'issues')}>Issues</NavLink>
            <div className="h-px bg-gray-100 my-2"/>
            <a
              href="#report"
              onClick={(e)=>handleSmoothScroll(e,'report')}
              className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >Report an Issue</a>
          </div>
        </div>
      )}
    </header>
  );
}
