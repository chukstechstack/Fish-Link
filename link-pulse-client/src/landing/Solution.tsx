import React from 'react';
import { Sparkles, Zap, FolderCheck, BarChart3, ShieldCheck } from 'lucide-react';

export default function Solution() {
    return (
        <section className="relative w-full py-32 bg-slate-950 text-white overflow-hidden selection:bg-amber-600 selection:text-white">

            {/* Subtle Glow Accent */}
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 relative z-10">

                {/* Section Header */}
                <div className="space-y-4 max-w-3xl text-left">
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 backdrop-blur-xl text-xs font-bold text-yellow-300 uppercase tracking-widest">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        <span>The Ocean Solution</span>
                    </div>

                    <h2 className="text-5xl sm:text-7xl font-light tracking-tight leading-[1.05]">
                        One stream to unify <br />
                        <span className="font-extralight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-amber-300 drop-shadow-[0_0_35px_rgba(253,224,71,0.4)]">
                            all your web assets.
                        </span>
                    </h2>

                    <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed pt-2 max-w-2xl">
                        Fish Link replaces scattered tabs and forgotten bookmarks with a single, high-speed ecosystem backed by .NET 8 performance and instant telemetry analytics.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16">

                    {/* Card 1 */}
                    <div className="bg-slate-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl hover:border-yellow-300/40 transition duration-300 space-y-4 text-left">
                        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-yellow-300 rounded-2xl flex items-center justify-center font-bold">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold tracking-wide text-white">
                            Instant Shortening
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-normal">
                            Generate lightning-fast custom short URLs instantly with sub-millisecond redirect routing.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-slate-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl hover:border-yellow-300/40 transition duration-300 space-y-4 text-left">
                        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-yellow-300 rounded-2xl flex items-center justify-center font-bold">
                            <FolderCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold tracking-wide text-white">
                            Smart Collections
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-normal">
                            Group links into structured, taggable collections for personal research or team collaboration.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-slate-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl hover:border-yellow-300/40 transition duration-300 space-y-4 text-left">
                        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-yellow-300 rounded-2xl flex items-center justify-center font-bold">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold tracking-wide text-white">
                            Real-Time Telemetry
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-normal">
                            Monitor live click counts, geographic insights, and referral sources in crisp visual dashboards.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-slate-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl hover:border-yellow-300/40 transition duration-300 space-y-4 text-left">
                        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-yellow-300 rounded-2xl flex items-center justify-center font-bold">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold tracking-wide text-white">
                            Cloud Reliability
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-normal">
                            Powered by TiDB Cloud distributed SQL database to guarantee high availability and data persistence.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}