import React from 'react';
import { Link } from 'react-router-dom';
import { Fish, ArrowRight, Download, ShieldCheck } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative w-full bg-slate-950 text-white overflow-hidden selection:bg-amber-600 selection:text-white pt-20 pb-12">

            {/* Background Yellow Tang Glow Accent */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 relative z-10 space-y-24">

                {/* 1. High-Impact Call to Action (CTA) Box */}
                <div className="bg-slate-900/60 border border-white/15 p-8 sm:p-16 rounded-3xl backdrop-blur-3xl shadow-2xl text-left flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                    <div className="space-y-4 max-w-2xl">
                        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-950/60 border border-amber-500/30 text-xs font-bold text-yellow-300 uppercase tracking-widest">
                            <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />
                            <span>Ready for high-speed flow?</span>
                        </div>

                        <h2 className="text-4xl sm:text-6xl font-light tracking-tight leading-[1.05]">
                            Streamline your links <br />
                            <span className="font-extralight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-amber-300 drop-shadow-[0_0_35px_rgba(253,224,71,0.5)]">
                                in seconds.
                            </span>
                        </h2>

                        <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed">
                            Join creators and engineers organizing their web resources with sub-millisecond telemetry.
                        </p>
                    </div>

                    {/* Action CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
                        <Link
                            to="/register"
                            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-amber-900/30 transition transform hover:-translate-y-0.5 uppercase tracking-wider"
                        >
                            <span>Get Started Free</span>
                            <ArrowRight className="w-4 h-4 text-white stroke-[3]" />
                        </Link>

                        <a
                            href="/downloads/fish-link-setup.exe"
                            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 bg-slate-950/60 border border-white/20 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl backdrop-blur-xl transition uppercase tracking-wider"
                        >
                            <Download className="w-4 h-4 text-yellow-300" />
                            <span>Download Desktop</span>
                        </a>
                    </div>

                </div>

                {/* 2. Footer Navigation & Branding Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-16 text-left">

                    {/* Brand Column */}
                    <div className="md:col-span-5 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 bg-amber-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-amber-900/30">
                                <Fish className="w-5 h-5 stroke-[2.5]" />
                            </div>
                            <span className="font-extrabold text-xl tracking-tight text-white">
                                Fish Link
                            </span>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            The minimalist, Framer-grade link management workspace engineered with .NET 8, React, and TiDB Cloud.
                        </p>

                        {/* Social Icons (Inline SVGs) */}
                        <div className="flex items-center space-x-4 pt-2 text-slate-400">
                            <a href="https://github.com/chukstechstack/Fish-Link" target="_blank" rel="noreferrer" className="hover:text-yellow-300 transition">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                            </a>

                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">

                        {/* Column 1 */}
                        <div className="space-y-3">
                            <p className="font-bold text-white uppercase text-xs tracking-widest text-amber-400">Product</p>
                            <ul className="space-y-2 text-slate-400 font-medium">
                                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                                <li><a href="#telemetry" className="hover:text-white transition">Telemetry</a></li>
                                <li><a href="#desktop" className="hover:text-white transition">Desktop App</a></li>
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-3">
                            <p className="font-bold text-white uppercase text-xs tracking-widest text-amber-400">Resources</p>
                            <ul className="space-y-2 text-slate-400 font-medium">
                                <li><a href="#docs" className="hover:text-white transition">API Documentation</a></li>
                                <li><a href="#status" className="hover:text-white transition">System Status</a></li>
                                <li><a href="#github" className="hover:text-white transition">GitHub Repository</a></li>
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-3">
                            <p className="font-bold text-white uppercase text-xs tracking-widest text-amber-400">Account</p>
                            <ul className="space-y-2 text-slate-400 font-medium">
                                <li><Link to="/login" className="hover:text-white transition">Sign In</Link></li>
                                <li><Link to="/register" className="hover:text-white transition">Create Account</Link></li>
                            </ul>
                        </div>

                    </div>

                </div>

                {/* 3. Bottom Copyright Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 text-left">
                    <p>© {new Date().getFullYear()} Fish Link SaaS. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#privacy" className="hover:text-slate-400 transition">Privacy Policy</a>
                        <a href="#terms" className="hover:text-slate-400 transition">Terms of Service</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}