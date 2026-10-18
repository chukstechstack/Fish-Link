import React from 'react';
import { Link } from 'react-router-dom';
import { Fish, Link2, FolderKanban, LineChart, Download, ArrowRight, Sparkles } from 'lucide-react';

import heroBgImage from '../assets/Fish Link.jpg';

export default function Hero() {
    return (
        <div className="relative h-screen w-full bg-slate-950 flex flex-col justify-between overflow-hidden selection:bg-amber-600 selection:text-white font-sans text-left">

            {/* 1. Pure Bright Background */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: `url(${heroBgImage})` }}
            />

            {/* 2. Top Header Navigation */}
            <header className="w-full pt-8 flex items-center justify-between relative z-10 pl-6 sm:pl-12 pr-6 sm:pr-12">

                {/* Logo Capsule */}
                <div className="flex items-center space-x-3 bg-slate-950/40 backdrop-blur-2xl p-2.5 pr-6 rounded-2xl border border-white/20 shadow-2xl">
                    <div className="w-9 h-9 bg-amber-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-amber-900/30">
                        <Fish className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <span className="font-extrabold text-xl tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        Fish Link
                    </span>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-2 backdrop-blur-2xl bg-slate-950/40 p-1.5 rounded-2xl border border-white/20 shadow-2xl">
                    <Link
                        to="/login"
                        className="text-xs font-bold text-white hover:text-yellow-300 transition px-4 py-2 tracking-wide uppercase"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="text-xs font-black text-white bg-amber-600 hover:bg-amber-500 transition px-5 py-2.5 rounded-xl shadow-lg shadow-amber-900/30 uppercase tracking-wider"
                    >
                        Register
                    </Link>
                </div>
            </header>

            {/* 3. Main Hero Content */}
            <main className="w-full flex-grow flex items-center relative z-10 pl-6 sm:pl-12">
                <div className="w-full lg:w-7/12 space-y-6">

                    {/* Subtle Electric Badge */}
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-xl border border-yellow-300/40 text-xs font-bold text-yellow-300 shadow-lg tracking-wide uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        <span>Link Management Evolved</span>
                    </div>

                    {/* Big, Lightweight, Glossy Headline */}
                    <h1 className="text-6xl sm:text-8xl font-light tracking-tight text-white leading-[1.02] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                        Fish Links. <br />
                        <span className="font-extralight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-amber-300 drop-shadow-[0_0_35px_rgba(253,224,71,0.6)]">
                            Don't lose them.
                        </span>
                    </h1>

                    {/* Lightweight Glass Info Card */}
                    <div className="bg-slate-950/40 backdrop-blur-2xl border border-white/20 p-5 rounded-2xl max-w-lg shadow-2xl">
                        <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            One clean, lightning-fast workspace to centralize, organize, and track your scattered web resources.
                        </p>
                    </div>

                    {/* Mini Feature Pills */}
                    <div className="grid grid-cols-3 gap-3 max-w-md w-full">
                        <div className="flex items-center space-x-2 bg-slate-950/40 border border-white/20 p-2.5 rounded-xl backdrop-blur-xl shadow-lg">
                            <Link2 className="w-4 h-4 text-yellow-300 shrink-0" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Shorten</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-slate-950/40 border border-white/20 p-2.5 rounded-xl backdrop-blur-xl shadow-lg">
                            <FolderKanban className="w-4 h-4 text-yellow-300 shrink-0" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Organize</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-slate-950/40 border border-white/20 p-2.5 rounded-xl backdrop-blur-xl shadow-lg">
                            <LineChart className="w-4 h-4 text-yellow-300 shrink-0" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Track</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* 4. Bottom Glossy Action Console */}
            <footer className="w-full pb-8 relative z-10 pl-6 sm:pl-12 pr-6 sm:pr-12">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/40 backdrop-blur-2xl border border-white/20 p-4 rounded-3xl shadow-2xl">

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        {/* Deep Dark Amber Button with crisp white text */}
                        <Link
                            to="/register"
                            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-amber-900/30 transition transform hover:-translate-y-0.5 uppercase tracking-wider"
                        >
                            <span>Launch Your Workspace</span>
                            <ArrowRight className="w-4 h-4 text-white stroke-[3]" />
                        </Link>

                        <a
                            href="/downloads/fish-link-setup.exe"
                            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-slate-900/50 border border-white/20 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl backdrop-blur-xl transition uppercase tracking-wider"
                        >
                            <Download className="w-4 h-4 text-yellow-300" />
                            <span>Download for PC</span>
                        </a>
                    </div>

                    <p className="text-[11px] text-slate-200 font-bold tracking-wider uppercase drop-shadow">
                        Powered by <span className="text-yellow-300">.NET 8</span> + <span className="text-yellow-300">TiDB</span>
                    </p>

                </div>
            </footer>

        </div>
    );
}