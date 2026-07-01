/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Compass, Sparkles, Feather } from "lucide-react";

export default function Philosophy() {
  const principles = [
    {
      icon: <Feather className="text-cinnabar" size={20} />,
      title: "虚实相生 · 阴阳和合",
      english: "VOID AND REALITY",
      description: "二胡独特的‘两弦夹弓’结构，马尾在内弦与外弦之间推拉摩擦。内弦低沉醇厚，属阴；外弦清澈明亮，属阳。弓在双弦之间，一推一拉，虚实转化，拉奏出的是东方哲学中万物和谐、刚柔相济的生命律律。"
    },
    {
      icon: <Compass className="text-satin-gold" size={20} />,
      title: "气韵贯通 · 人琴合一",
      english: "RESONANT VITALITY",
      description: "二胡没有指板，全靠左手按弦的虚实与揉弦的幅度来确定音高和情感。每一次揉弦都是指尖与琴弦最纯粹的血肉触碰。徐正宏先生倡导：‘拉琴不是在拨弄木石，而是用自己的呼吸和血脉去激活那根翠竹和蟒皮的魂魄。’"
    },
    {
      icon: <Sparkles className="text-cinnabar" size={20} />,
      title: "承古拓今 · 国乐无界",
      english: "HERITAGE & FUTURE",
      description: "真正的国乐绝非抱残守缺，而是在对经典的极端敬畏中，勇敢地进行当代的重构。在飞云民族乐团，徐正宏始终致力于推动二胡与现代交响、电子音乐、戏剧先锋的多维跨界，用最古老的声音，说最前卫的现代语言。"
    }
  ];

  return (
    <section className="relative py-28 bg-ink-black overflow-hidden border-t border-zinc-900">
      {/* Background decoration string */}
      <div className="absolute inset-y-0 right-1/4 w-[1px] bg-zinc-900 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Decorative Title watermark */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-cinnabar tracking-widest uppercase">
            ARTISTIC PHILOSOPHY / 05
          </span>
          <h2 className="text-3xl md:text-5xl font-serif-china font-bold text-silk-white tracking-widest mt-2">
            艺道 · 弦歌未央
          </h2>
          <div className="w-12 h-[1px] bg-satin-gold mx-auto mt-4"></div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="p-8 rounded-2xl bg-charcoal/30 border border-white/5 hover:border-satin-gold/20 hover:bg-charcoal/50 transition-all duration-500 flex flex-col justify-between text-left group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-cinnabar/30 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif-china font-semibold text-silk-white tracking-wider">
                  {item.title}
                </h3>
                <span className="text-[8px] font-mono text-satin-gold tracking-widest block mt-0.5 mb-6 uppercase">
                  {item.english}
                </span>
                <p className="text-sm font-serif-china text-zinc-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              {/* Elegant bottom indicator */}
              <div className="w-full h-[1px] bg-zinc-900 group-hover:bg-cinnabar/30 transition-colors mt-8"></div>
            </motion.div>
          ))}
        </div>

        {/* Large Aesthetic Callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mt-20 p-12 rounded-3xl bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-charcoal via-ink-black to-ink-black border border-white/5 relative overflow-hidden text-center max-w-4xl mx-auto"
        >
          {/* Accent vertical lines like strings */}
          <div className="absolute inset-x-0 top-0 h-16 flex justify-center gap-1.5 opacity-20">
            <div className="w-[1px] h-full bg-satin-gold"></div>
            <div className="w-[1px] h-full bg-cinnabar"></div>
          </div>

          <p className="text-lg md:text-2xl font-serif-china text-satin-gold tracking-widest leading-relaxed font-light relative z-10">
            “弦无调，则音不准；人无骨，则曲无魂。”
          </p>
          <p className="text-xs font-serif-china text-zinc-500 mt-4 tracking-widest uppercase">
            — 徐正宏 · 国乐美学观
          </p>
        </motion.div>

      </div>
    </section>
  );
}
