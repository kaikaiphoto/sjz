/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Music, Compass, ChevronUp, Github, Linkedin, Calendar, Send } from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Bio from "./components/Bio";
import Instrument from "./components/Instrument";
import SoundLab from "./components/SoundLab";
import Philosophy from "./components/Philosophy";
import Booking from "./components/Booking";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Setup scroll progress spring
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track scroll position to update active section & Scroll To Top visibility
  useEffect(() => {
    const handleScroll = () => {
      // Toggle scroll to top button
      setShowScrollTop(window.scrollY > 500);

      const sections = ["hero", "bio", "instrument", "soundlab", "booking"];
      const scrollPos = window.scrollY + 200; // Offset for navbar

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-ink-black text-silk-white min-h-screen relative font-sans selection:bg-cinnabar selection:text-white antialiased">
      
      {/* Scroll Progress Bar at the top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-cinnabar origin-left z-55"
        style={{ scaleX }}
      />

      {/* Modern, floating background decorative lines */}
      <div className="fixed inset-y-0 left-1/12 w-[1px] bg-white/2 pointer-events-none z-0 hidden xl:block" />
      <div className="fixed inset-y-0 right-1/12 w-[1px] bg-white/2 pointer-events-none z-0 hidden xl:block" />

      {/* Floating navigation overlay */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Pages Sections layout */}
      <main className="relative z-10">
        
        {/* Section 1: Hero Prologue */}
        <Hero onScrollToNext={() => handleNavigate("bio")} />

        {/* Section 2: Bio Chronicle */}
        <Bio />

        {/* Section 3: Erhu Anatomy */}
        <Instrument />

        {/* Section 4: Acoustic Resonance Room */}
        <SoundLab />

        {/* Section 5: Artistic Philosophy */}
        <Philosophy />

        {/* Section 6: Booking Dialog */}
        <Booking />

      </main>

      {/* Creative high-end Footer */}
      <footer className="relative bg-zinc-950 border-t border-zinc-900 py-16 z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Footer Branding */}
          <div className="text-left space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cinnabar"></span>
              <h2 className="text-base font-serif-china font-semibold tracking-widest text-silk-white">
                徐正宏 · 官方艺术空间
              </h2>
            </div>
            <p className="text-xs font-serif-china text-zinc-500 max-w-sm leading-relaxed">
              国家一级演奏家 · 上海音协二胡常务理事 · 飞云民族乐团副团长
            </p>
          </div>

          {/* Core Affiliation Seals */}
          <div className="flex items-center gap-6 text-zinc-600 font-serif-china text-[10px] tracking-widest">
            <span>飞云民族乐团成员</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
            <span>上海音乐家协会</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
            <span>上音附中校友会</span>
          </div>

          {/* Social icons / Copyright */}
          <div className="text-right space-y-1">
            <p className="text-xs font-mono text-zinc-500">
              © {new Date().getFullYear()} XU ZHENHONG. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
              TRADITIONAL RESONANCE · AVANT-GARDE COUPLING
            </p>
          </div>

        </div>
      </footer>

      {/* Interactive Back to Top scroll control */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-8 w-11 h-11 rounded-full bg-charcoal hover:bg-cinnabar border border-white/5 hover:border-cinnabar flex items-center justify-center text-zinc-400 hover:text-white shadow-xl hover:shadow-cinnabar/20 transition-all duration-300 z-50 cursor-pointer"
        >
          <ChevronUp size={18} />
        </motion.button>
      )}

    </div>
  );
}
