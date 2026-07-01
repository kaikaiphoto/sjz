/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music, Menu, X, Globe, User } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "序章", english: "PROLOGUE" },
    { id: "bio", label: "乐纪", english: "CHRONICLE" },
    { id: "instrument", label: "释物", english: "ANATOMY" },
    { id: "soundlab", label: "听弦", english: "RESONANCE" },
    { id: "booking", label: "雅集", english: "DIALOGUE" },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ink-black/85 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="relative w-9 h-9 flex items-center justify-center rounded-full border border-cinnabar/30 group-hover:border-cinnabar transition-colors duration-500">
              <span className="text-xs font-serif-china text-cinnabar font-bold group-hover:scale-110 transition-transform duration-300">
                徐
              </span>
              <div className="absolute inset-0 rounded-full border border-satin-gold/10 animate-spin-slow group-hover:border-satin-gold/40"></div>
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-widest font-serif-china text-silk-white">
                徐正宏 <span className="text-[10px] text-satin-gold font-light tracking-normal ml-1">XU ZHEN_HONG</span>
              </h1>
              <p className="text-[9px] text-zinc-500 tracking-widest uppercase font-mono mt-0.5">
                ERHU PERFORMER
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative py-2 group text-left cursor-pointer"
              >
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-serif-china tracking-widest transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-cinnabar"
                        : "text-zinc-400 group-hover:text-silk-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`text-[8px] font-mono tracking-widest transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-satin-gold"
                        : "text-zinc-600 group-hover:text-satin-gold/70"
                    }`}
                  >
                    {item.english}
                  </span>
                </div>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-cinnabar"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleNavClick("soundlab")}
              className="px-4 py-2 border border-satin-gold/30 hover:border-cinnabar hover:text-cinnabar rounded-full text-xs font-serif-china tracking-widest text-satin-gold transition-all duration-500 bg-transparent flex items-center gap-2 cursor-pointer"
            >
              <Music size={12} className="animate-pulse" />
              互动试听
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-silk-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-ink-black/95 backdrop-blur-lg border-b border-white/5 py-8 md:hidden px-6"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center justify-between py-2 border-b border-zinc-900 text-left w-full cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-base font-serif-china tracking-widest ${
                        activeSection === item.id ? "text-cinnabar" : "text-zinc-300"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 tracking-widest mt-0.5">
                      {item.english}
                    </span>
                  </div>
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeSection === item.id ? "bg-cinnabar" : "bg-transparent"
                    }`}
                  />
                </button>
              ))}
              <button
                onClick={() => handleNavClick("soundlab")}
                className="w-full mt-2 py-3 bg-cinnabar/10 hover:bg-cinnabar/20 border border-cinnabar/30 text-cinnabar rounded-md text-sm font-serif-china tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Music size={14} />
                听弦 · 交互音室
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
