"use client";

import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Projects', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 font-bold text-xl tracking-tight">
            INGERI<span className="text-blue-500">.</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="outline-none mobile-menu-button"
            >
              <svg className="w-6 h-6 text-gray-300 hover:text-blue-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" /> // X Icon
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" /> // Hamburger Icon
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-slate-800 pb-4 px-4`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="block py-2 text-sm hover:bg-blue-500 transition-all duration-200 rounded px-2"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}