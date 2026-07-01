/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Award, BookOpen, GraduationCap, Music, Users } from "lucide-react";
import { BioEvent } from "../types";

const ABSTRACT_INK = "/src/assets/images/abstract_ink_music_1782908113676.jpg";

const timelineEvents: BioEvent[] = [
  {
    year: "1978",
    title: "缘起：上音附中",
    description: "以极其优异的天赋考入上海音乐学院附中，正式开启系统的二胡专业演奏学习。在这里，汲取了最扎实的传统民族器乐养分，确立了终身奉献国乐的理想。",
    category: "education",
    location: "上海音乐学院附中"
  },
  {
    year: "师承",
    title: "德艺双馨，名师指路",
    description: "在艺术成长道路上，先后师从李作明、唐春贵、林心铭等二胡界名宿与教育家。承袭了严谨的弓法、纯正的音色以及深沉的曲意表达，将多位名师的演奏神髓熔于一炉。",
    category: "education"
  },
  {
    year: "历任",
    title: "乐团统筹，中流砥柱",
    description: "曾任上海滑稽剧团乐队主任、上海文广民族乐团管理部主任。在长期的乐团艺术实践与管理工作中，不仅磨砺了精湛的合奏与领奏技艺，也积累了深厚的乐团管理及大型演出策划经验。",
    category: "career",
    location: "上海滑稽剧团 / 上海文广民族乐团"
  },
  {
    year: "当下",
    title: "飞云副团，传承不辍",
    description: "现任飞云民族乐团副团长。作为乐团的艺术和行政领导者之一，带领乐团探索中国传统民族音乐在当代的表达与传播，扶持青年二胡人才，推动民族器乐走向世界舞台。",
    category: "career",
    location: "飞云民族乐团"
  },
  {
    year: "名誉",
    title: "业界肯定，崇高地位",
    description: "荣膺国家一级演奏员（教授级高级职称）。系上海音乐家协会会员、上海音协二胡专业委员会常务理事。在二胡学术研究、专业评审以及行业规范方面发挥着积极的重要影响。",
    category: "achievement",
    location: "上海音乐家协会"
  }
];

export default function Bio() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "education":
        return <GraduationCap size={16} className="text-satin-gold" />;
      case "career":
        return <Users size={16} className="text-cinnabar" />;
      case "achievement":
        return <Award size={16} className="text-cinnabar" />;
      default:
        return <Music size={16} className="text-zinc-400" />;
    }
  };

  return (
    <section id="bio" className="relative py-28 bg-ink-black overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono text-cinnabar tracking-widest uppercase">
              ARTIST CHRONICLE / 02
            </span>
            <h2 className="text-3xl md:text-5xl font-serif-china font-bold text-silk-white tracking-widest mt-2">
              乐年纪 · 艺无涯
            </h2>
          </div>
          <p className="text-zinc-500 font-serif-china text-sm md:text-base max-w-md font-light leading-relaxed">
            “师法名门，执首乐团；几十载寒暑，执着于一弓双弦之间的气韵沉淀。”
          </p>
        </div>

        {/* Content Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Abstract Art Image & Teacher Linage */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-charcoal group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent z-10" />
              <img
                src={ABSTRACT_INK}
                alt="Abstract Music Ink Art"
                className="w-full aspect-[4/5] object-cover filter brightness-75 contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <span className="text-[10px] font-mono text-satin-gold tracking-widest uppercase">LINEAGE OF MASTERS</span>
                <h3 className="text-xl font-serif-china text-silk-white mt-1 tracking-wider">
                  先后师从：李作明、唐春贵、林心铭老师
                </h3>
                <div className="w-12 h-[1px] bg-cinnabar mt-3"></div>
                <p className="text-xs font-serif-china text-zinc-400 mt-2 font-light leading-relaxed">
                  融汇江南丝竹的温婉细腻，注入近代北派二胡的豪迈气骨。在名师的悉心指点下，徐正宏形成了独树一帜、刚柔并蓄的演奏风范。
                </p>
              </div>
            </div>

            {/* Custom Interactive Quote */}
            <div className="p-6 bg-charcoal/50 border border-white/5 rounded-xl text-left">
              <p className="text-sm font-serif-china text-satin-gold tracking-wide italic font-light">
                “乐，是流动的哲学。二胡更因其近似人声的质感，能直通人的心底。我学二胡至今，感触最深的便是用纯正的韵，去诉说当代人的爱与愁。”
              </p>
              <p className="text-xs font-mono text-zinc-500 text-right mt-3">— 徐正宏 · 演奏感言</p>
            </div>
          </div>

          {/* Right Column: Timeline Chronicle */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative border-l border-zinc-800/80 ml-4 md:ml-6 pl-6 md:pl-10 py-2 space-y-8">
              
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className="relative group text-left"
                >
                  {/* Timeline Node Dot */}
                  <div
                    className={`absolute -left-[31px] md:-left-[47px] top-1 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      hoverIndex === index
                        ? "bg-cinnabar border-cinnabar scale-125 shadow-lg shadow-cinnabar/30"
                        : "bg-ink-black border-zinc-700 group-hover:border-satin-gold"
                    }`}
                  >
                    <div className="w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Card wrapper */}
                  <div
                    className={`p-6 rounded-xl border transition-all duration-500 ${
                      hoverIndex === index
                        ? "bg-charcoal border-satin-gold/40 shadow-xl shadow-satin-gold/5"
                        : "bg-charcoal/40 border-white/5 hover:border-zinc-800"
                    }`}
                  >
                    {/* Tag, Year and Location header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-mono font-bold tracking-tight text-satin-gold">
                          {event.year}
                        </span>
                        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                          {getCategoryIcon(event.category)}
                          <span className="text-[10px] text-zinc-400 font-serif-china tracking-wider">
                            {event.category === "education" ? "师承" : event.category === "career" ? "职履" : "荣誉"}
                          </span>
                        </div>
                      </div>
                      {event.location && (
                        <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                          {event.location}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-serif-china text-silk-white font-medium group-hover:text-cinnabar transition-colors duration-300 tracking-wider">
                      {event.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm font-serif-china text-zinc-400 leading-relaxed font-light mt-2.5">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
