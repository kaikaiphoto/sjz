/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Mail, Compass, Send, CheckCircle2, Music, Ticket } from "lucide-react";
import { BookingInquiry } from "../types";

export default function Booking() {
  const [formData, setFormData] = useState<BookingInquiry>({
    name: "",
    email: "",
    date: "",
    type: "performance",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("请填写完整的预约信息 / Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulate database submission
    setTimeout(() => {
      // Create random Ticket/Invitation ID for high-end look
      const generatedId = `ZH-INV-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedId);

      // Save to localStorage for client side local storage tracking
      const existing = JSON.parse(localStorage.getItem("xu_bookings") || "[]");
      existing.push({ ...formData, id: generatedId, timestamp: new Date().toISOString() });
      localStorage.setItem("xu_bookings", JSON.stringify(existing));

      setIsSubmitting(false);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        date: "",
        type: "performance",
        message: "",
      });
    }, 1500);
  };

  const concerts = [
    {
      title: "《二泉·听风》徐正宏二胡独奏巡回音乐会",
      date: "2026-10-15",
      hall: "上海音乐厅 (Shanghai Concert Hall)",
      status: "预约通道已开启"
    },
    {
      title: "《国乐交响》飞云民族乐团当代跨界乐章",
      date: "2026-12-05",
      hall: "国家大剧院 (National Centre for the Performing Arts)",
      status: "筹备中"
    }
  ];

  return (
    <section id="booking" className="relative py-28 bg-ink-black overflow-hidden border-t border-zinc-900">
      {/* Background soft red light */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cinnabar/5 rounded-full filter blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono text-cinnabar tracking-widest uppercase">
              RESERVATION & COLLABORATION / 06
            </span>
            <h2 className="text-3xl md:text-5xl font-serif-china font-bold text-silk-white tracking-widest mt-2">
              雅集 · 演出预约与合作
            </h2>
          </div>
          <p className="text-zinc-500 font-serif-china text-sm md:text-base max-w-md font-light leading-relaxed text-left">
            “广结琴友，雅韵共赏。” 无论是商业演出、大师讲坛，还是跨界先锋碰撞，在此提交您的雅集邀约。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact details & concert tickets list */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <h3 className="text-xl font-serif-china font-bold text-silk-white tracking-widest mb-4">
                近斯演出日程 · CONCERTS
              </h3>
              <p className="text-xs font-serif-china text-zinc-500 mb-6">
                徐正宏先生与飞云民族乐团近期公开演出筹备详情
              </p>

              <div className="space-y-4">
                {concerts.map((c, i) => (
                  <div key={i} className="p-5 bg-charcoal border border-white/5 rounded-xl flex items-start gap-4">
                    <Calendar size={18} className="text-cinnabar shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-satin-gold tracking-widest block uppercase">
                        {c.date} · {c.status}
                      </span>
                      <h4 className="text-sm font-serif-china font-medium text-silk-white leading-relaxed tracking-wider">
                        {c.title}
                      </h4>
                      <p className="text-xs font-serif-china text-zinc-500">
                        {c.hall}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Info cards */}
            <div className="p-6 bg-charcoal/30 border border-white/5 rounded-2xl space-y-4">
              <h4 className="text-xs font-serif-china font-bold text-satin-gold tracking-widest uppercase">
                官方事务联络 / OFFICIAL SECRETARIAT
              </h4>
              <div className="flex items-center gap-3 text-zinc-400 hover:text-silk-white transition-colors">
                <Mail size={14} className="text-cinnabar" />
                <span className="text-xs font-mono select-all">booking@feiyun-orchestra.com</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400 hover:text-silk-white transition-colors">
                <Compass size={14} className="text-satin-gold" />
                <span className="text-xs font-serif-china">飞云民族乐团管理部 · 上海市徐汇区艺术大厦</span>
              </div>
            </div>
          </div>

          {/* Right Column: Submission Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!success ? (
                // Booking Form
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleSubmit}
                  className="p-8 md:p-10 bg-charcoal border border-white/5 rounded-2xl text-left space-y-6 shadow-2xl"
                >
                  <h3 className="text-lg font-serif-china font-semibold text-silk-white tracking-widest border-b border-zinc-800 pb-4">
                    发送合作雅集函 / COLLABORATION INQUIRY
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-serif-china text-zinc-400 tracking-wider">
                        姓名 / 预约单位名称 <span className="text-cinnabar">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="例如：上海交响音乐堂 / 李先生"
                        className="w-full bg-zinc-950/60 border border-zinc-800 focus:border-cinnabar focus:outline-none rounded-lg px-4 py-3 text-sm text-silk-white font-serif-china transition-colors"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-serif-china text-zinc-400 tracking-wider">
                        联络电子邮箱 <span className="text-cinnabar">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="例如：contact@domain.com"
                        className="w-full bg-zinc-950/60 border border-zinc-800 focus:border-cinnabar focus:outline-none rounded-lg px-4 py-3 text-sm text-silk-white font-mono transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Date */}
                    <div className="space-y-2">
                      <label className="text-xs font-serif-china text-zinc-400 tracking-wider">
                        意向日期 (Target Date)
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-zinc-950/60 border border-zinc-800 focus:border-cinnabar focus:outline-none rounded-lg px-4 py-3 text-sm text-silk-white font-mono transition-colors"
                      />
                    </div>

                    {/* Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-serif-china text-zinc-400 tracking-wider">
                        合作类目 (Type of Event)
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full bg-zinc-950/60 border border-zinc-800 focus:border-cinnabar focus:outline-none rounded-lg px-4 py-3 text-sm text-silk-white font-serif-china transition-colors"
                      >
                        <option value="performance">专场独奏 / Concert Solo</option>
                        <option value="lecture">学术讲座 / Academic Seminar</option>
                        <option value="collab">国乐重奏跨界 / Cross-over Collab</option>
                        <option value="other">大师班授课 / Master Class</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-serif-china text-zinc-400 tracking-wider">
                      项目细节与留言 (Message Details) <span className="text-cinnabar">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="请详细描述您的演出规划、时间、场地规格或授课项目细节..."
                      className="w-full bg-zinc-950/60 border border-zinc-800 focus:border-cinnabar focus:outline-none rounded-lg p-4 text-sm text-silk-white font-serif-china transition-colors resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-cinnabar hover:bg-cinnabar/90 disabled:bg-zinc-800 text-silk-white rounded-lg text-xs font-serif-china tracking-widest flex items-center justify-center gap-2.5 transition-all duration-300 font-semibold shadow-lg shadow-cinnabar/25 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send size={14} />
                        提交预约函 SUBMIT INQUIRY
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                // Success Voucher Ticket Screen
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="p-8 md:p-10 bg-charcoal border border-satin-gold/30 rounded-2xl text-center space-y-6 shadow-2xl relative overflow-hidden"
                >
                  {/* Decorative background circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-dashed border-satin-gold/5 pointer-events-none animate-spin-slow"></div>

                  <div className="relative z-10 space-y-4">
                    <div className="w-16 h-16 bg-satin-gold/10 border border-satin-gold rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={28} className="text-satin-gold" />
                    </div>

                    <h3 className="text-2xl font-serif-china font-bold text-silk-white tracking-widest">
                      预约函提交成功！
                    </h3>
                    <p className="text-sm font-serif-china text-zinc-400 max-w-md mx-auto leading-relaxed">
                      尊贵的邀约人，我们已经妥善收到您的雅集咨询。飞云民族乐团管理秘书处将在 48 小时内审核并与您取得邮件联络。
                    </p>

                    {/* Virtual Invite Ticket Design */}
                    <div className="my-8 p-6 bg-zinc-950 rounded-xl border border-satin-gold/20 text-left space-y-4 relative">
                      {/* Ticket sides notch punches */}
                      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-charcoal border-r border-satin-gold/20"></div>
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-charcoal border-l border-satin-gold/20"></div>

                      <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                        <div className="flex items-center gap-1.5 text-satin-gold">
                          <Ticket size={14} />
                          <span className="text-[9px] font-mono tracking-widest">ZHENHONG COOPERATION INVITATION</span>
                        </div>
                        <span className="text-xs font-mono text-zinc-500">SECURE LOG</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs font-serif-china">
                        <div>
                          <span className="text-zinc-600 block text-[9px] font-mono">INVITATION CODE</span>
                          <span className="text-satin-gold font-mono font-bold tracking-wider">{ticketId}</span>
                        </div>
                        <div>
                          <span className="text-zinc-600 block text-[9px] font-mono">STATUS</span>
                          <span className="text-cinnabar tracking-wider font-semibold">审核受理中 / PENDING</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-500 font-serif-china">
                        <span>雅集·弦歌未央官方记录卡</span>
                        <span className="font-mono">{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-satin-gold/30 text-satin-gold rounded-full text-xs font-serif-china tracking-widest transition-all duration-300 cursor-pointer"
                    >
                      重新提交 / New Inquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
