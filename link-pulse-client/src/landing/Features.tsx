import React from 'react';
import { Cpu, Globe, Link, MousePointerClick, Search, Sparkles, Tag } from 'lucide-react';

export default function Features() {
  return (
    <section className="relative w-full py-32 bg-slate-950 text-white overflow-hidden selection:bg-amber-600 selection:text-white">
      
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 backdrop-blur-xl text-xs font-bold text-yellow-300 uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5 text-yellow-300" />
            <span>Core Capabilities</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-light tracking-tight leading-[1.05]">
            Built for speed. <br />
            <span className="font-extralight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-amber-300 drop-shadow-[0_0_35px_rgba(253,224,71,0.4)]">
              Designed for clarity.
            </span>
          </h2>

          <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed pt-2">
            Everything you need to orchestrate your web ecosystem, packaged inside an ultra-responsive interface.
          </p>
        </div>

        {/* Feature Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-16">
          
          {/* Main Feature: Glossy Simulated App UI Dashboard (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900/60 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-2xl shadow-2xl flex flex-col justify-between space-y-8 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-yellow-300">
                <Sparkles className="w-4 h-4" />
                <span>Central Management Console</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white">
                All your links, organized in real-time.
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                Quickly search, filter by tag, and track live engagement without leaving your workspace dashboard.
              </p>
            </div>

            {/* Simulated Glass Interface Preview */}
            <div className="bg-slate-950/80 border border-white/15 p-4 sm:p-6 rounded-2xl space-y-4 shadow-inner">
              
              {/* Search Bar Simulation */}
              <div className="flex items-center space-x-3 bg-slate-900/90 border border-white/10 px-4 py-2.5 rounded-xl text-xs text-slate-400">
                <Search className="w-4 h-4 text-slate-500" />
                <span>Search links, tags, or domains...</span>
              </div>

              {/* Sample Link Rows */}
              <div className="space-y-3 pt-1">
                
                {/* Row 1 */}
                <div className="flex items-center justify-between p-3 bg-slate-900/40 border border-white/10 rounded-xl hover:border-amber-500/40 transition">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-500/20 text-yellow-300 rounded-lg flex items-center justify-center font-bold text-xs">
                      <Link className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">fish.link/react-docs</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[180px] sm:max-w-xs">https://react.dev/reference/react</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-yellow-300">
                      <Tag className="w-3 h-3 mr-1" /> Frontend
                    </span>
                    <span className="text-xs font-extrabold text-slate-200 flex items-center gap-1">
                      <MousePointerClick className="w-3.5 h-3.5 text-yellow-300" /> 1,420
                    </span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex items-center justify-between p-3 bg-slate-900/40 border border-white/10 rounded-xl hover:border-amber-500/40 transition">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-500/20 text-yellow-300 rounded-lg flex items-center justify-center font-bold text-xs">
                      <Link className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">fish.link/net8-api</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[180px] sm:max-w-xs">https://learn.microsoft.com/dotnet/api</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-yellow-300">
                      <Tag className="w-3 h-3 mr-1" /> Backend
                    </span>
                    <span className="text-xs font-extrabold text-slate-200 flex items-center gap-1">
                      <MousePointerClick className="w-3.5 h-3.5 text-yellow-300" /> 890
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Secondary Feature Cards (4 cols) */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            
            {/* Top Card */}
            <div className="bg-slate-900/60 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl hover:border-amber-500/40 transition text-left space-y-4 flex-1">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-yellow-300 rounded-2xl flex items-center justify-center font-bold">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Custom Slugs</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Brand your links with recognizable custom aliases that build click confidence across channels.
              </p>
            </div>

            {/* Bottom Card */}
            <div className="bg-slate-900/60 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl hover:border-amber-500/40 transition text-left space-y-4 flex-1">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-yellow-300 rounded-2xl flex items-center justify-center font-bold">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Tag Collections</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Categorize your resources by project, topic, or priority for immediate one-click retrieval.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}