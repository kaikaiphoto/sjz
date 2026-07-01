/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowDown, Award, Compass, Music4 } from "lucide-react";

// Use the generated image path
const ERHU_BG = "/src/assets/images/erhu_art_background_1782908099461.jpg";

interface HeroProps {
  onScrollToNext: () => void;
}

export default function Hero({ onScrollToNext }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-ink-black overflow-hidden pt-20"
    >
      {/* Background String Lines - 2 fine lines simulating Erhu's strings */}
      <div className="absolute inset-y-0 left-1/3 w-[1px] bg-gradient-to-b from-transparent via-satin-gold/20 to-transparent z-10 hidden lg:block"></div>
      <div className="absolute inset-y-0 left-[35.5%] w-[1px] bg-gradient-to-b from-transparent via-cinnabar/20 to-transparent z-10 hidden lg:block"></div>

      {/* Background Image with Ink Gradient Mask */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-ink-black via-ink-black/80 to-transparent lg:z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-ink-black/50 z-10" />
        <img
          src={ERHU_BG}
          alt="Erhu Artistic Background"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-125 select-none pointer-events-none opacity-45 lg:opacity-75"
        />
      </div>

      {/* Hero Content Grid */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-20">
        {/* Left Side: Editorial Typography & Title */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Subtle Accent Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-2 px-3 py-1 bg-cinnabar/10 border border-cinnabar/20 rounded-full text-[10px] text-cinnabar tracking-widest font-mono uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cinnabar animate-pulse"></span>
            NATIONAL FIRST-CLASS PERFORMER
          </motion.div>

          {/* Main Name & Title */}
          <div className="space-y-2 relative">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-satin-gold font-serif-china text-lg tracking-widest font-light"
            >
              二胡演奏家 / 飞云民族乐团副团长
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-serif-china font-bold text-silk-white tracking-widest leading-none"
            >
              徐正宏
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
              className="text-2xl md:text-4xl font-mono text-zinc-500 font-extralight tracking-widest uppercase mt-3"
            >
              XU ZHENHONG
            </motion.h2>
          </div>

          {/* Poetical description of Erhu playing */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.5 }}
            className="text-zinc-400 font-serif-china text-base md:text-lg max-w-xl leading-relaxed mt-8 font-light"
          >
            “两弦一弓，拉出万水千山。承先辈之风骨，探国乐之当代。”
            以深厚的传统功底，融汇前卫的现代气象，将国乐胡琴之神韵，传扬于当代之林。
          </motion.p>

          {/* Core Badges/Details Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-charcoal border border-white/5 rounded-lg">
              <Award size={14} className="text-cinnabar" />
              <span className="text-xs text-zinc-300 font-serif-china tracking-wider">国家一级演奏员</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-charcoal border border-white/5 rounded-lg">
              <Compass size={14} className="text-satin-gold" />
              <span className="text-xs text-zinc-300 font-serif-china tracking-wider">上海音协二胡常务理事</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-charcoal border border-white/5 rounded-lg">
              <Music4 size={14} className="text-cinnabar" />
              <span className="text-xs text-zinc-300 font-serif-china tracking-wider">飞云民族乐团副团长</span>
            </div>
          </motion.div>

          {/* CTA & Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="mt-12 flex items-center gap-6"
          >
            <button
              onClick={onScrollToNext}
              className="group h-12 px-8 bg-cinnabar hover:bg-cinnabar/80 text-silk-white rounded-full text-xs font-serif-china tracking-widest flex items-center gap-2 transition-all duration-300 relative overflow-hidden shadow-lg shadow-cinnabar/20 cursor-pointer"
            >
              <span className="relative z-10">探索艺术世界</span>
              <ArrowDown size={14} className="relative z-10 group-hover:translate-y-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </motion.div>
        </div>

        {/* Right Side: Avant-garde Visual Floating Frame */}
        <div className="lg:col-span-5 relative flex justify-center items-center h-full">
          {/* Subtle graphic circular shape matching user's uploaded portrait style */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border border-satin-gold/25 p-4 flex items-center justify-center bg-zinc-900/10 backdrop-blur-3xl group"
          >
            {/* Spinning background lines */}
            <div className="absolute inset-0 rounded-full border border-dashed border-zinc-800/60 animate-spin-slow"></div>
            <div className="absolute inset-8 rounded-full border border-cinnabar/10"></div>

            {/* Inner Graphic Area - Displaying Real Portrait of Xu Zhenhong */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-satin-gold/60 shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
              <img
                src="https://photos.1804078.xyz/42hu/xzh.png"
                alt="二胡演奏家 徐正宏"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center select-none"
              />
              {/* Subtle elegant gradient border overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-black/45 via-transparent to-transparent z-10 pointer-events-none" />
            </div>

            {/* Orbiting note nodes */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-cinnabar rounded-full flex items-center justify-center shadow-lg shadow-cinnabar/50">
                <span className="text-[7px] text-white font-serif-china font-bold">宫</span>
              </div>
              <div className="absolute top-1/4 right-0 w-4 h-4 bg-satin-gold rounded-full flex items-center justify-center shadow-lg shadow-satin-gold/50">
                <span className="text-[7px] text-zinc-900 font-serif-china font-bold">商</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative vertical texts */}
      <div className="absolute right-8 bottom-12 flex-col items-center gap-2 hidden lg:flex select-none">
        <span className="text-[8px] font-mono text-zinc-600 tracking-widest uppercase [writing-mode:vertical-lr]">
          TRADITION & TRANSFORMATION
        </span>
        <div className="w-[1px] h-12 bg-zinc-800"></div>
      </div>

      <div className="absolute left-8 bottom-12 flex-col items-center gap-2 hidden lg:flex select-none">
        <span className="text-[9px] text-satin-gold/60 font-serif-china tracking-widest [writing-mode:vertical-lr]">
          徐正宏艺术官方主页
        </span>
        <div className="w-[1px] h-12 bg-satin-gold/30"></div>
      </div>
    </section>
  );
}
