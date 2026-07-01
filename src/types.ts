/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BioEvent {
  year: string;
  title: string;
  description: string;
  category: "education" | "career" | "achievement";
  location?: string;
}

export interface InstrumentPart {
  id: string;
  name: string;
  pinyin: string;
  english: string;
  description: string;
  position: { x: number; y: number }; // Percentage coordinate for hotspot overlay
}

export interface ScaleNote {
  name: string;      // 宫, 商, 角, 徵, 羽
  pinyin: string;    // Gong, Shang, Jiao, Zhi, Yu
  western: string;   // C, D, E, G, A
  frequency: number; // Hz
  key: string;       // Keyboard shortcut
}

export interface BookingInquiry {
  name: string;
  email: string;
  date: string;
  type: string; // "performance" | "lecture" | "collab" | "other"
  message: string;
}
