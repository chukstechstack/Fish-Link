import React from 'react';
import { Layers, HelpCircle, EyeOff, ShieldAlert } from 'lucide-react';

export default function Problem() {
  return (
    <section className="relative w-full py-32 bg-slate-950 text-white overflow-hidden selection:bg-amber-600 selection:text-white">
      
      {/* Subtle Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-xl text-xs font-bold text-amber-400 uppercase tracking-widest">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>The Digital Chaos</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-light tracking-tight leading-[1.05]">
            Web resources are scattered. <br />
            <span className="font-extralight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-400 drop-shadow-[0_0_30px_rgba(253,224,71,0.35)]">
              Most of them get lost.
            </span>
          </h2>

          <p className="text-slate-400 text-lg sm:text-xl font-normal leading-relaxed pt-2">
            The modern web moves fast. We save links across browsers, chats, and note apps—only to never find them again when we actually need them.
          </p>
        </div>

        {/* 3-Column Glass Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
          
          {/* Card 1 */}
          <div className="bg-slate-900/40 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl hover:border-amber-500/30 transition duration-300 space-y-4 text-left">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-yellow-300 rounded-2xl flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold tracking-wide text-white">
              Tab & Bookmark Overload
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed font-normal">
              Hundreds of open tabs and unorganized bookmark bars slowing down your workflow and cluttering your head space.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/40 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl hover:border-amber-500/30 transition duration-300 space-y-4 text-left">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-yellow-300 rounded-2xl flex items-center justify-center font-bold">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold tracking-wide text-white">
              Zero Performance Visibility
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed font-normal">
              You share short links into the void without knowing who clicked, when they engaged, or where traffic came from.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/40 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl hover:border-amber-500/30 transition duration-300 space-y-4 text-left">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-yellow-300 rounded-2xl flex items-center justify-center font-bold">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold tracking-wide text-white">
              Siloed Across Apps
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed font-normal">
              Links trapped inside Telegram chats, Slack messages, Notion docs, and browser history with no unified search.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}