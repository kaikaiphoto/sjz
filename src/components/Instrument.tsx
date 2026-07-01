/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Info, ShieldAlert } from "lucide-react";
import { InstrumentPart } from "../types";

const erhuParts: InstrumentPart[] = [
  {
    id: "qintong",
    name: "琴筒",
    pinyin: "QÍN TÓNG",
    english: "Resonator / Soundbox",
    description: "二胡的共鸣箱。通常采用红木、紫檀等上等硬木制成，前口呈六角形或扁圆形，蒙上特制的野生蟒蛇皮。琴筒是二胡音色醇厚、温暖、富于人声共鸣感的灵魂所在，其木料年份越久、蟒皮鳞片越均匀，共振越完美。",
    position: { x: 50, y: 78 }
  },
  {
    id: "qingan",
    name: "琴杆",
    pinyin: "QÍN GĀN",
    english: "Neck / Shaft",
    description: "二胡的支柱，通常由与琴筒相同的木材雕刻而成。琴杆需要承受琴弦的巨大拉力，并保持挺直不弯，其长度与倾斜度经过精密设计，使演奏者在各把位换指、滑音时手感圆滑，保证发音平稳。",
    position: { x: 50, y: 45 }
  },
  {
    id: "qinzhou",
    name: "琴轴",
    pinyin: "QÍN ZHŌU",
    english: "Tuning Pegs",
    description: "位于琴杆顶部的两个调音轴。传统为木轴或机械铜轴，用以调节内弦（d1）与外弦（a1）的张力。琴轴是控制音高的核心，徐正宏先生演奏时常通过细致调整，使双弦达成空灵完美的纯五度和谐律动。",
    position: { x: 38, y: 22 }
  },
  {
    id: "qianjin",
    name: "千斤",
    pinyin: "QIĀN JĪN",
    english: "Nut / String Binder",
    description: "连接琴杆和琴弦的丝线或金属搭扣，固定在琴杆上方合适高度。它不仅限定了二胡空弦的有效振动弦长，更是内外交替、指法按压的音域起点。千斤丝线的材质与缠绕圈数会微妙地过滤高频杂音，令发音温润。",
    position: { x: 50, y: 32 }
  },
  {
    id: "gongzi",
    name: "琴弓",
    pinyin: "QÍN GÕNG",
    english: "Bow",
    description: "由细竹和野生马尾制成，置于内、外双弦之间摩擦发音。弓毛需保持均匀松紧度，涂抹天然松香。二胡特有的“弓弦一体”结构，令琴弓能完成连弓、顿弓、跳弓等繁复技法，是音色千变万化的第一动力源泉。",
    position: { x: 75, y: 55 }
  }
];

export default function Instrument() {
  const [selectedPart, setSelectedPart] = useState<InstrumentPart>(erhuParts[0]);

  return (
    <section id="instrument" className="relative py-28 bg-ink-black overflow-hidden border-t border-zinc-900">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-satin-gold/5 rounded-full filter blur-[120px] pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
          <div>
            <span className="text-xs font-mono text-cinnabar tracking-widest uppercase">
              INSTRUMENT ANATOMY / 03
            </span>
            <h2 className="text-3xl md:text-5xl font-serif-china font-bold text-silk-white tracking-widest mt-2">
              释物 · 胡琴大观
            </h2>
          </div>
          <p className="text-zinc-500 font-serif-china text-sm md:text-base max-w-md font-light leading-relaxed">
            “千磨百折竹一竿，野蟒鳞张筒底宽。” 剖析两根细弦、一根翠竹、一块良木中蕴藏的东方物理声学。
          </p>
        </div>

        {/* Blueprint Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Diagram (Minimalist vector wireframe) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative p-8 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-sm min-h-[550px]">
            {/* Title Overlay */}
            <div className="absolute top-6 left-6 text-left select-none">
              <span className="text-[10px] font-mono text-zinc-500 tracking-wider">TECHNICAL VECTOR DIALECT</span>
              <h3 className="text-sm font-serif-china text-satin-gold tracking-widest uppercase mt-0.5">
                二胡构造精密矢量图
              </h3>
            </div>

            {/* Custom SVG Erhu Diagram Wireframe */}
            <div className="relative w-72 h-[450px]">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full stroke-zinc-700 fill-none stroke-[0.4] transition-all duration-500"
              >
                {/* 1. Base / Qintong Resonator */}
                <path d="M 40,78 L 60,78 L 57,85 L 43,85 Z" className="stroke-zinc-600 fill-zinc-900/40" />
                <path d="M 43,78 L 41,75 L 59,75 L 57,78 Z" className="stroke-zinc-600 fill-zinc-950/80" />
                <ellipse cx="50" cy="76.5" rx="9" ry="1.5" className="stroke-satin-gold/40" />
                {/* Python Skin pattern details */}
                <path d="M 45,76.5 L 55,76.5 M 48,76 L 52,77 M 47,77 L 53,76" className="stroke-zinc-800" />

                {/* 2. Qin Gan - Shaft */}
                <line x1="50" y1="15" x2="50" y2="85" className="stroke-zinc-500 stroke-[1]" />
                
                {/* 3. Top / Head Scroll Ornament */}
                <path d="M 50,15 C 47,12 43,15 40,13 C 38,11 41,8 44,9" className="stroke-satin-gold/60" />

                {/* 4. Pegs (Tuning Pegs) */}
                {/* Peg 1 (Inner string) */}
                <line x1="50" y1="21" x2="35" y2="23" className="stroke-zinc-500 stroke-[1.2]" />
                <ellipse cx="34" cy="23.2" rx="1.5" ry="2.5" className="stroke-zinc-600 fill-zinc-900" />
                
                {/* Peg 2 (Outer string) */}
                <line x1="50" y1="26" x2="33" y2="28" className="stroke-zinc-500 stroke-[1.2]" />
                <ellipse cx="32" cy="28.2" rx="1.5" ry="2.5" className="stroke-zinc-600 fill-zinc-900" />

                {/* 5. Qianjin - Nut */}
                <rect x="48" y="32" width="4" height="1.5" className="stroke-satin-gold/60 fill-zinc-950" />
                <line x1="48" y1="32.7" x2="52" y2="32.7" className="stroke-satin-gold" />

                {/* 6. Strings */}
                {/* Inner String */}
                <line x1="49" y1="21" x2="49" y2="76" className="stroke-zinc-300 stroke-[0.5]" />
                {/* Outer String */}
                <line x1="51" y1="26" x2="51" y2="76" className="stroke-zinc-400 stroke-[0.3]" />

                {/* Bridge (Qinya) */}
                <rect x="48" y="75" width="4" height="2" className="stroke-satin-gold/80 fill-satin-gold/25" />

                {/* 7. Bow (Qingong) */}
                <path d="M 45,52 C 55,53 65,54 77,55" className="stroke-satin-gold/50 stroke-[0.6]" />
                <path d="M 47,53.5 C 57,54.5 67,55.5 76,56" className="stroke-zinc-500 stroke-[0.3]" />
                {/* Bow Stick */}
                <path d="M 30,51 C 45,51.5 60,52.5 82,54" className="stroke-zinc-600 stroke-[0.8]" />
              </svg>

              {/* Hotspot overlay buttons mapped based on percentage coordinates */}
              {erhuParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setSelectedPart(part)}
                  style={{ top: `${part.position.y}%`, left: `${part.position.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-30 cursor-pointer"
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span
                      className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping transition-all duration-300 ${
                        selectedPart.id === part.id ? "bg-cinnabar" : "bg-satin-gold"
                      }`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-3.5 w-3.5 items-center justify-center text-[7px] font-mono font-bold text-ink-black shadow-lg transition-all duration-300 ${
                        selectedPart.id === part.id
                          ? "bg-cinnabar text-white scale-125"
                          : "bg-satin-gold hover:scale-110"
                      }`}
                    >
                      {erhuParts.indexOf(part) + 1}
                    </span>
                  </span>
                  
                  {/* Floating labels with pinyin */}
                  <span
                    className={`absolute left-7 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded text-[10px] font-serif-china tracking-widest whitespace-nowrap bg-charcoal/90 border border-white/5 backdrop-blur-sm transition-all duration-300 ${
                      selectedPart.id === part.id
                        ? "text-cinnabar border-cinnabar/30 opacity-100 translate-x-0"
                        : "text-zinc-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1"
                    }`}
                  >
                    {part.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Helper text */}
            <div className="absolute bottom-6 flex items-center gap-1.5 text-[10px] text-zinc-500 font-serif-china">
              <Info size={12} className="text-satin-gold" />
              <span>点击数字脉冲，解构胡琴构件极其声学特质</span>
            </div>
          </div>

          {/* Right Column: Dynamic Component Card Details */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPart.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="p-8 md:p-10 bg-charcoal border border-satin-gold/20 rounded-2xl text-left relative shadow-2xl"
              >
                {/* Traditional Background Design watermarks */}
                <div className="absolute right-8 top-8 text-8xl font-serif-china text-white/5 font-extrabold select-none">
                  {selectedPart.name}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  {/* Index badge */}
                  <span className="text-xs font-mono px-2.5 py-1 bg-cinnabar/10 border border-cinnabar/30 rounded text-cinnabar">
                    0{erhuParts.indexOf(selectedPart) + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif-china font-bold text-silk-white tracking-widest">
                      {selectedPart.name}
                    </h3>
                    <p className="text-[10px] font-mono text-satin-gold tracking-widest uppercase mt-0.5">
                      {selectedPart.pinyin} · {selectedPart.english}
                    </p>
                  </div>
                </div>

                <div className="w-12 h-[2px] bg-cinnabar mb-8"></div>

                <p className="text-sm md:text-base font-serif-china text-zinc-300 leading-relaxed font-light mb-8">
                  {selectedPart.description}
                </p>

                {/* Extra insight card from artist */}
                <div className="p-4 bg-zinc-950/50 border border-white/5 rounded-xl flex items-start gap-3">
                  <Compass size={18} className="text-satin-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-serif-china font-medium text-satin-gold tracking-wider">
                      徐正宏之择琴法则
                    </h4>
                    <p className="text-[11px] font-serif-china text-zinc-500 leading-relaxed mt-1">
                      {selectedPart.id === "qintong" && "“蟒皮松紧须合度。拉北派曲子需刚健透亮，拉南派则需含蓄温婉。挑选共振均匀的陈年旧料，方能在大合奏或独奏中收放自如。”"}
                      {selectedPart.id === "qingan" && "“杆须直，手感须滑。换把时手掌如行云流水，绝不能有半点滞涩。琴杆的良木硬度，决定了指尖颤音的反馈细腻度。”"}
                      {selectedPart.id === "qinzhou" && "“调音即调气。木轴虽重手感，机械轴虽便，但上台前一丝一毫的纯五度校音，都必须以耳朵之极境细细感知，差之一厘则意境尽失。”"}
                      {selectedPart.id === "qianjin" && "“丝线千斤能有效过滤高频杂音，使二胡的中低音部分更为厚重。徐正宏先生坚持古法缠绕，保留音色最质朴的木石底色。”"}
                      {selectedPart.id === "gongzi" && "“马尾须饱满。琴弓如武士之剑。轻重拿捏要极度贴手。在跳弓、顿弓时，弓杆的反弹张力与手腕的抖动节奏必须浑然一体。”"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Part selection tabs footer */}
            <div className="flex flex-wrap gap-2 mt-6 justify-start">
              {erhuParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setSelectedPart(part)}
                  className={`px-4 py-2 text-xs font-serif-china rounded-md transition-all duration-300 cursor-pointer ${
                    selectedPart.id === part.id
                      ? "bg-cinnabar text-white font-medium"
                      : "bg-charcoal/40 text-zinc-400 border border-white/5 hover:text-silk-white hover:border-zinc-800"
                  }`}
                >
                  {part.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
