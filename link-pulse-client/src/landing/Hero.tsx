import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Fish, Link2, FolderKanban, LineChart, Download, ArrowRight, Sparkles, Menu, X } from 'lucide-react';

import heroBgImage from '../assets/Fish Link.jpg';

export default function Hero() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="relative min-h-screen w-full bg-slate-950 flex flex-col justify-between overflow-x-hidden selection:bg-amber-600 selection:text-white font-sans text-left">

            {/* 1. Background Image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: `url(${heroBgImage})` }}
            />

            {/* 2. Top Header Navigation */}
            <header className="w-full pt-6 sm:pt-8 flex items-center justify-between relative z-20 px-4 sm:px-12">

                {/* Logo Capsule */}
                <div className="flex items-center space-x-3 bg-slate-950/70 backdrop-blur-2xl p-2 sm:p-2.5 pr-4 sm:pr-6 rounded-2xl border border-white/20 shadow-2xl">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-amber-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-amber-900/30">
                        <Fish className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    </div>
                    <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        Fish Link
                    </span>
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center space-x-2 backdrop-blur-2xl bg-slate-950/70 p-1.5 rounded-2xl border border-white/20 shadow-2xl">
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

                {/* Custom Premium Glass Hamburger Button (Mobile Only) */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Navigation Menu"
                    className="md:hidden relative w-11 h-11 bg-slate-950/70 backdrop-blur-2xl border border-white/20 rounded-2xl flex items-center justify-center text-white shadow-2xl transition hover:bg-slate-900 focus:outline-none"
                >
                    {mobileMenuOpen ? (
                        <X className="w-5 h-5 text-yellow-300 animate-spin-once" />
                    ) : (
                        <Menu className="w-5 h-5 text-white" />
                    )}
                </button>
            </header>

            {/* Mobile Dropdown Navigation Overlay */}
            {mobileMenuOpen && (
                <div className="absolute top-20 inset-x-4 z-30 bg-slate-950/90 backdrop-blur-3xl border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col space-y-4 md:hidden animate-fadeIn">
                    <div className="flex flex-col space-y-2">
                        <Link
                            to="/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full text-center py-3 bg-slate-900/80 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 transition"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full text-center py-3 bg-amber-600 hover:bg-amber-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-900/40 transition"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}

            {/* 3. Main Hero Content */}
            <main className="w-full flex-grow flex items-center relative z-10 px-4 sm:px-12 py-8">
                <div className="w-full lg:w-7/12 space-y-5 sm:space-y-6">

                    {/* Subtle Electric Badge */}
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-xl border border-yellow-300/40 text-xs font-bold text-yellow-300 shadow-lg tracking-wide uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        <span>Link Management Evolved</span>
                    </div>

                    {/* Big, Lightweight, Glossy Headline with Enhanced Mobile Readability */}
                    <h1 className="text-4xl sm:text-6xl lg:text-8xl font-semibold tracking-tight text-white leading-[1.1] sm:leading-[1.02] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                        Fish Links. <br />
                        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                            Save & Don't lose them.
                        </span>
                    </h1>

                    {/* Premium Frosted Glass Info Card */}
                    <div className="bg-slate-950/70 backdrop-blur-2xl border border-white/20 p-4 sm:p-5 rounded-2xl max-w-lg shadow-2xl">
                        <p className="text-slate-100 text-sm sm:text-lg leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            One clean, lightning-fast workspace to centralize, organize, and track your scattered web resources.
                        </p>
                    </div>

                    {/* Mini Feature Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 max-w-md w-full">
                        <div className="flex items-center space-x-2 bg-slate-950/70 border border-white/20 p-3 sm:p-2.5 rounded-xl backdrop-blur-xl shadow-lg">
                            <Link2 className="w-4 h-4 text-yellow-300 shrink-0" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Shorten</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-slate-950/70 border border-white/20 p-3 sm:p-2.5 rounded-xl backdrop-blur-xl shadow-lg">
                            <FolderKanban className="w-4 h-4 text-yellow-300 shrink-0" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Organize</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-slate-950/70 border border-white/20 p-3 sm:p-2.5 rounded-xl backdrop-blur-xl shadow-lg">
                            <LineChart className="w-4 h-4 text-yellow-300 shrink-0" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Track</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* 4. Bottom Glossy Action Console */}
            <footer className="w-full pb-6 sm:pb-8 relative z-10 px-4 sm:px-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-slate-950/70 backdrop-blur-2xl border border-white/20 p-4 sm:p-5 rounded-3xl shadow-2xl">

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                        <Link
                            to="/register"
                            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-amber-900/30 transition transform hover:-translate-y-0.5 uppercase tracking-wider"
                        >
                            <span>Launch Your Workspace</span>
                            <ArrowRight className="w-4 h-4 text-white stroke-[3]" />
                        </Link>

                        <a
                            href="/downloads/fish-link-setup.exe"
                            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-slate-900/60 border border-white/20 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl backdrop-blur-xl transition uppercase tracking-wider"
                        >
                            <Download className="w-4 h-4 text-yellow-300" />
                            <span>Download for PC</span>
                        </a>
                    </div>

                    <p className="text-[11px] text-slate-200 font-bold tracking-wider uppercase drop-shadow text-center">
                        Powered by <span className="text-yellow-300">.NET 8</span> + <span className="text-yellow-300">TiDB</span>
                    </p>

                </div>
            </footer>

        </div>
    );
}