
import Hero from './Hero';
import Problem from './Problem';
import Solution from './Solution';
import Features from './Features';
import Footer from './Footer';

export default function LandingIndex() {
    return (
        <div className="min-h-screen w-full bg-slate-950 text-slate-100 overflow-x-hidden">
            <Hero />
            <Problem />
            <Solution />
            <Features />
            <Footer />
        </div>
    );
}