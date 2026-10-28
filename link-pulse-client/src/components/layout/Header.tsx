import { useAuth } from '../../context/AuthContext';
import { ArrowUpRight } from 'lucide-react';

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-amber-100/80 bg-white/90 px-4 shadow-[0_8px_24px_rgba(120,83,9,0.06)] backdrop-blur-2xl sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 p-1.5 shadow-lg shadow-amber-900/15 ring-1 ring-amber-300/30">
          <img src="/fish-mark.svg" alt="" className="h-full w-full rounded-xl" />
        </span>
        <span className="text-base font-extrabold tracking-[-0.045em] text-slate-900">Fish<span className="text-amber-600">Link</span></span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-600 shadow-sm transition-all duration-200 hover:border-amber-300 hover:bg-amber-50 hover:text-stone-900 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2"
        >
          Logout
          <ArrowUpRight className="h-3.5 w-3.5 text-stone-400" />
        </button>
      </div>
    </header>
  );
}