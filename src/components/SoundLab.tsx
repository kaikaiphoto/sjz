/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Square, Activity, Volume2, Sparkles, Sliders } from "lucide-react";
import { ScaleNote } from "../types";

const pentatonicScale: ScaleNote[] = [
  { name: "宫", pinyin: "GŌNG", western: "D4", frequency: 293.66, key: "A" },
  { name: "商", pinyin: "SHĀNG", western: "E4", frequency: 329.63, key: "S" },
  { name: "角", pinyin: "JIǍO", western: "F#4", frequency: 369.99, key: "D" },
  { name: "徵", pinyin: "ZHǏ", western: "A4", frequency: 440.00, key: "F" },
  { name: "羽", pinyin: "YǓ", western: "B4", frequency: 493.88, key: "G" },
  { name: "少宫", pinyin: "SHAO GŌNG", western: "D5", frequency: 587.33, key: "H" },
  { name: "少商", pinyin: "SHAO SHĀNG", western: "E5", frequency: 659.25, key: "J" },
];

export default function SoundLab() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [vibratoEnabled, setVibratoEnabled] = useState(true);
  const [vibratoRate, setVibratoRate] = useState(6); // Hz
  const [vibratoDepth, setVibratoDepth] = useState(15); // Cents
  const [reverbDepth, setReverbDepth] = useState(0.5); // Reverb wet mix
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [stringPosition, setStringPosition] = useState({ inner: 50, outer: 50 });

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterVolumeRef = useRef<GainNode | null>(null);
  const reverbNodeRef = useRef<ConvolverNode | null>(null);
  const wetGainRef = useRef<GainNode | null>(null);
  const dryGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  
  // Active Synth Nodes state
  const activeOscsRef = useRef<{ [key: string]: { osc: OscillatorNode, gain: GainNode, lfo?: OscillatorNode } }>({});
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize Web Audio
  const initAudio = async () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master volume
      const masterVolume = ctx.createGain();
      masterVolume.gain.value = 0.8;
      masterVolume.connect(ctx.destination);
      masterVolumeRef.current = masterVolume;

      // Analyser Node
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.connect(masterVolume);
      analyserRef.current = analyser;

      // Reverb / Delay Simulation (Using Feedback Delay for rich ambient effect)
      const delay = ctx.createDelay(1.0);
      delay.delayTime.value = 0.35;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.45;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1500;

      const dryGain = ctx.createGain();
      const wetGain = ctx.createGain();

      dryGain.gain.value = 1 - reverbDepth;
      wetGain.gain.value = reverbDepth;

      // Setup delay loop
      delay.connect(filter);
      filter.connect(feedback);
      feedback.connect(delay); // feedback loop
      feedback.connect(wetGain);

      dryGain.connect(analyser);
      wetGain.connect(analyser);

      dryGainRef.current = dryGain;
      wetGainRef.current = wetGain;

      setAudioEnabled(true);
      startVisualizer();
    } catch (err) {
      console.error("Failed to initialize Web Audio:", err);
    }
  };

  // Sound Synthesizer function representing Erhu acoustics
  const playFrequency = (frequency: number, noteName: string) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Stop existing instance of this note if playing
    stopNote(noteName);

    // Primary wave: combination of Sawtooth and Triangle for nasal Erhu resonance
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Formant Biquad Filter to mimic Erhu soundbox resonance (Qin Tong peak at 900Hz and 3000Hz)
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 950;
    bandpass.Q.value = 1.8;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 4000;

    // Gain node for envelope
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    // Smooth bow string envelope
    gainNode.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.1); // Attack
    gainNode.gain.setValueAtTime(0.35, ctx.currentTime + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2); // Decay

    // Connections
    osc.connect(bandpass);
    bandpass.connect(lowpass);
    lowpass.connect(gainNode);

    // Connect to dry/wet mixer
    if (dryGainRef.current && wetGainRef.current) {
      gainNode.connect(dryGainRef.current);
      gainNode.connect(wetGainRef.current);
    } else if (analyserRef.current) {
      gainNode.connect(analyserRef.current);
    }

    // LFO for Vibrato (揉弦)
    let lfo: OscillatorNode | undefined;
    if (vibratoEnabled) {
      lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      lfo.frequency.value = vibratoRate;
      lfoGain.gain.value = vibratoDepth; // Pitch modulation depth

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
    }

    osc.start();
    osc.stop(ctx.currentTime + 1.3);

    // Store reference
    activeOscsRef.current[noteName] = { osc, gain: gainNode, lfo };
    setActiveNote(noteName);

    // Auto-clear active status in UI
    setTimeout(() => {
      setActiveNote((curr) => (curr === noteName ? null : curr));
    }, 1200);
  };

  const stopNote = (noteName: string) => {
    const active = activeOscsRef.current[noteName];
    if (active) {
      try {
        active.osc.stop();
        if (active.lfo) active.lfo.stop();
      } catch (e) {}
      delete activeOscsRef.current[noteName];
    }
  };

  // Handle dry/wet reverb change
  useEffect(() => {
    if (dryGainRef.current && wetGainRef.current) {
      dryGainRef.current.gain.value = 1 - reverbDepth;
      wetGainRef.current.gain.value = reverbDepth;
    }
  }, [reverbDepth]);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!audioEnabled) return;
      const uppercaseKey = e.key.toUpperCase();
      const scaleNote = pentatonicScale.find((n) => n.key === uppercaseKey);
      if (scaleNote) {
        playFrequency(scaleNote.frequency, scaleNote.name);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [audioEnabled, vibratoEnabled, vibratoRate, vibratoDepth]);

  // Audio visualizer on Canvas
  const startVisualizer = () => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!canvasRef.current) return;
      animationFrameRef.current = requestAnimationFrame(draw);

      const width = canvas.width;
      const height = canvas.height;

      analyser.getByteFrequencyData(dataArray);

      // Clean background with a very subtle trail
      ctx.fillStyle = "rgba(9, 9, 10, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // Draw ink-like smooth wave
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      
      // Traditional gold and cinnabar gradient
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "#D22B2B");
      gradient.addColorStop(0.5, "#C5A880");
      gradient.addColorStop(1, "#D22B2B");
      ctx.strokeStyle = gradient;

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0; // scale
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, height - y);
        } else {
          // Curved bezier lines
          const cx = x - sliceWidth / 2;
          const prevY = (dataArray[i-1] / 128.0) * height / 2;
          ctx.quadraticCurveTo(cx, height - prevY, x, height - y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Draw central reflecting line
      ctx.beginPath();
      ctx.strokeStyle = "rgba(197, 168, 128, 0.05)";
      ctx.lineWidth = 0.5;
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
    };

    draw();
  };

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Simulating bow slide movement on mouse over vertical string lines
  const handleStringMove = (stringType: "inner" | "outer", e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const yPercentage = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Update visual string bending
    setStringPosition((prev) => ({
      ...prev,
      [stringType]: yPercentage,
    }));

    // Trigger organic string drone
    // Pitch depends on height: lower is higher pitch (simulating pressing down the string)
    const baseFreq = stringType === "inner" ? 293.66 : 440.00; // D4 or A4
    const freqFactor = 1 + (1 - (e.clientY - rect.top) / rect.height) * 0.8; // Up to 1.8x freq
    
    // Debounced trigger to prevent overlapping overload
    if (Math.random() > 0.85) {
      playFrequency(baseFreq * freqFactor, stringType === "inner" ? "内弦吟啸" : "外弦吟啸");
    }
  };

  const resetString = (stringType: "inner" | "outer") => {
    setStringPosition((prev) => ({
      ...prev,
      [stringType]: 50,
    }));
  };

  return (
    <section id="soundlab" className="relative py-28 bg-ink-black overflow-hidden border-t border-zinc-900">
      
      {/* Absolute Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-transparent to-transparent pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono text-cinnabar tracking-widest uppercase">
              ACOUSTIC RESONANCE / 04
            </span>
            <h2 className="text-3xl md:text-5xl font-serif-china font-bold text-silk-white tracking-widest mt-2">
              听弦 · 交互音室
            </h2>
          </div>
          <p className="text-zinc-500 font-serif-china text-sm md:text-base max-w-md font-light leading-relaxed text-left">
            “声音是灵魂的指纹。” 开启您的音频引擎，点击或通过键盘热键，跨越时空弹奏一曲具有浓郁宣泄感的东方国乐。
          </p>
        </div>

        {/* Dynamic Studio Dashboard */}
        {!audioEnabled ? (
          // Audio Enable Gateway
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-16 rounded-2xl border border-satin-gold/20 bg-charcoal/40 backdrop-blur-md flex flex-col items-center justify-center text-center min-h-[450px]"
          >
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-cinnabar/10 border border-cinnabar/30 mb-6">
              <Volume2 className="text-cinnabar animate-pulse" size={28} />
              <div className="absolute inset-0 rounded-full border border-satin-gold/20 animate-ping"></div>
            </div>
            <h3 className="text-2xl font-serif-china text-silk-white tracking-widest mb-3">
              进入徐正宏的交互国乐声室
            </h3>
            <p className="text-sm font-serif-china text-zinc-400 max-w-lg leading-relaxed mb-8">
              本模块使用 Web Audio API 物理建模合成器，模拟胡琴摩擦声腔。为了给您带来最前卫空灵的听觉震撼，请点击下方按钮启动数字声学室。
            </p>
            <button
              onClick={initAudio}
              className="px-8 py-4 bg-cinnabar hover:bg-cinnabar/90 text-silk-white font-serif-china rounded-full text-sm tracking-widest flex items-center gap-2.5 transition-all duration-300 shadow-lg shadow-cinnabar/20 cursor-pointer"
            >
              <Sparkles size={16} />
              启用音频引擎 RESUME ACOUSTICS
            </button>
          </motion.div>
        ) : (
          // Interactive Synthesizer Area
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Box: Control Knobs & Key Scales */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Sound Wave Canvas Box */}
              <div className="p-6 rounded-2xl border border-white/5 bg-zinc-950/90 relative overflow-hidden h-40 flex flex-col justify-between">
                <div className="flex items-center justify-between text-left select-none">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-cinnabar animate-pulse" />
                    <span className="text-xs font-serif-china text-satin-gold tracking-wider">
                      实时声学共鸣示波器 (FFT ANALYSER)
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600">60 FPS REALTIME</span>
                </div>
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" width={600} height={160} />
              </div>

              {/* Interactive Pentatonic Keyboard */}
              <div className="p-8 rounded-2xl border border-white/5 bg-charcoal/30 backdrop-blur-md flex flex-col gap-6">
                <div className="flex items-center justify-between text-left border-b border-zinc-800 pb-4">
                  <div>
                    <h3 className="text-lg font-serif-china font-semibold text-silk-white tracking-wider">
                      五声音律板 · 宫商角徵羽
                    </h3>
                    <p className="text-[10px] font-serif-china text-zinc-500 mt-1">
                      传统五声调式（D调），对应键盘 A, S, D, F, G, H, J 键
                    </p>
                  </div>
                  <Volume2 size={16} className="text-satin-gold" />
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-7 gap-4">
                  {pentatonicScale.map((note) => (
                    <button
                      key={note.name}
                      onClick={() => playFrequency(note.frequency, note.name)}
                      className={`relative aspect-[3/4] rounded-xl border flex flex-col justify-between p-4 text-left transition-all duration-300 group cursor-pointer ${
                        activeNote === note.name
                          ? "bg-cinnabar border-cinnabar shadow-lg shadow-cinnabar/20 -translate-y-1"
                          : "bg-charcoal/80 border-white/5 hover:border-satin-gold/40 hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span
                          className={`text-2xl font-serif-china font-bold transition-colors ${
                            activeNote === note.name ? "text-white" : "text-satin-gold"
                          }`}
                        >
                          {note.name}
                        </span>
                        <span
                          className={`text-[8px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                            activeNote === note.name
                              ? "bg-white/20 text-white"
                              : "bg-zinc-900 text-zinc-500"
                          }`}
                        >
                          {note.key}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <p
                          className={`text-[9px] font-mono tracking-widest ${
                            activeNote === note.name ? "text-white/80" : "text-zinc-500"
                          }`}
                        >
                          {note.pinyin}
                        </p>
                        <p
                          className={`text-[10px] font-semibold font-mono ${
                            activeNote === note.name ? "text-white" : "text-zinc-300"
                          }`}
                        >
                          {note.western} ({Math.round(note.frequency)}Hz)
                        </p>
                      </div>

                      {/* Spark element for active indicator */}
                      {activeNote === note.name && (
                        <span className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: String Simulator & Modulation Knobs */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Vertical string play station */}
              <div className="p-6 rounded-2xl border border-white/5 bg-charcoal/30 backdrop-blur-md flex-1 flex flex-col">
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider text-left block mb-6">
                  双弦滑动拉奏室 (STRING DRONE)
                </span>

                <div className="flex-1 flex justify-around items-stretch min-h-[220px] bg-zinc-950/60 rounded-xl border border-zinc-900 relative p-4">
                  
                  {/* Inner String (D4) */}
                  <div
                    onMouseMove={(e) => handleStringMove("inner", e)}
                    onMouseLeave={() => resetString("inner")}
                    className="relative w-16 group flex justify-center cursor-ns-resize"
                  >
                    {/* String line */}
                    <div
                      style={{
                        transform: `scaleX(${stringPosition.inner !== 50 ? 1.5 : 1})`,
                        borderColor: stringPosition.inner !== 50 ? "#D22B2B" : "#52525b"
                      }}
                      className="absolute inset-y-0 w-0 border-l border-zinc-600 transition-all duration-75"
                    />
                    
                    {/* Hover Glow string effect */}
                    <div className="absolute inset-y-0 w-[4px] bg-cinnabar/0 group-hover:bg-cinnabar/10 blur-[1px] transition-colors" />

                    {/* Touch / mouse bridge cursor */}
                    {stringPosition.inner !== 50 && (
                      <div
                        style={{ top: `${stringPosition.inner}%` }}
                        className="absolute w-2 h-2 rounded-full bg-cinnabar -translate-y-1/2 shadow-lg shadow-cinnabar/80 pointer-events-none"
                      />
                    )}

                    <span className="absolute bottom-2 text-[9px] font-serif-china text-zinc-500 group-hover:text-cinnabar tracking-wider">
                      内弦 (D)
                    </span>
                  </div>

                  {/* Outer String (A4) */}
                  <div
                    onMouseMove={(e) => handleStringMove("outer", e)}
                    onMouseLeave={() => resetString("outer")}
                    className="relative w-16 group flex justify-center cursor-ns-resize"
                  >
                    {/* String line */}
                    <div
                      style={{
                        transform: `scaleX(${stringPosition.outer !== 50 ? 1.5 : 1})`,
                        borderColor: stringPosition.outer !== 50 ? "#C5A880" : "#71717a"
                      }}
                      className="absolute inset-y-0 w-0 border-l border-zinc-500 transition-all duration-75"
                    />

                    {/* Hover Glow string effect */}
                    <div className="absolute inset-y-0 w-[4px] bg-satin-gold/0 group-hover:bg-satin-gold/10 blur-[1px] transition-colors" />

                    {/* Touch / mouse bridge cursor */}
                    {stringPosition.outer !== 50 && (
                      <div
                        style={{ top: `${stringPosition.outer}%` }}
                        className="absolute w-2 h-2 rounded-full bg-satin-gold -translate-y-1/2 shadow-lg shadow-satin-gold/80 pointer-events-none"
                      />
                    )}

                    <span className="absolute bottom-2 text-[9px] font-serif-china text-zinc-500 group-hover:text-satin-gold tracking-wider">
                      外弦 (A)
                    </span>
                  </div>

                </div>
                <p className="text-[10px] font-serif-china text-zinc-500 text-center mt-4">
                  鼠标在双弦上滑行，能模拟琴弓上下摩擦的古朴长音
                </p>
              </div>

              {/* Adjustive Audio Parameters (Knobs/Sliders) */}
              <div className="p-6 rounded-2xl border border-white/5 bg-charcoal/30 backdrop-blur-md text-left space-y-5">
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <Sliders size={14} className="text-satin-gold" />
                  <span className="text-xs font-serif-china text-silk-white tracking-wider">
                    声学调制控制器 (ACOUSTIC COUPLING)
                  </span>
                </div>

                {/* Vibrato Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-serif-china text-zinc-300">揉弦效果 (Vibrato)</span>
                    <span className="text-[9px] text-zinc-500">模拟指尖微颤揉弦的音色变化</span>
                  </div>
                  <button
                    onClick={() => setVibratoEnabled(!vibratoEnabled)}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                      vibratoEnabled ? "bg-cinnabar" : "bg-zinc-800"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                        vibratoEnabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Reverb Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-serif-china text-zinc-400">
                    <span>殿堂余音 (Space Reverb)</span>
                    <span className="font-mono text-satin-gold">{Math.round(reverbDepth * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={reverbDepth}
                    onChange={(e) => setReverbDepth(parseFloat(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cinnabar"
                  />
                </div>

                {/* Vibrato Speed Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-serif-china text-zinc-400">
                    <span>揉弦频率 (Vibrato Rate)</span>
                    <span className="font-mono text-satin-gold">{vibratoRate} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="9"
                    step="0.5"
                    value={vibratoRate}
                    disabled={!vibratoEnabled}
                    onChange={(e) => setVibratoRate(parseFloat(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cinnabar disabled:opacity-30"
                  />
                </div>

                {/* Vibrato Depth Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-serif-china text-zinc-400">
                    <span>揉弦幅度 (Vibrato Depth)</span>
                    <span className="font-mono text-satin-gold">{vibratoDepth} Cents</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    step="1"
                    value={vibratoDepth}
                    disabled={!vibratoEnabled}
                    onChange={(e) => setVibratoDepth(parseInt(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cinnabar disabled:opacity-30"
                  />
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
