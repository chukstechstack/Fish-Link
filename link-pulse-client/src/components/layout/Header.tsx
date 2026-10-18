import { useAuth } from '../../context/AuthContext';
import { ArrowUpRight, Link2 } from 'lucide-react';

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-stone-200/80 bg-white/90 px-6 shadow-[0_1px_2px_rgba(28,25,23,0.03)] backdrop-blur-xl">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-900 text-white shadow-sm shadow-stone-900/15">
          <Link2 className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <span className="text-[15px] font-semibold tracking-[-0.03em] text-stone-900">FishLink</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs font-medium text-stone-500">user@work.com</span>
        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200/80 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm transition-all duration-200 hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60 focus-visible:ring-offset-2"
        >
          Logout
          <ArrowUpRight className="h-3.5 w-3.5 text-stone-400" />
        </button>
      </div>
    </header>
  );
}