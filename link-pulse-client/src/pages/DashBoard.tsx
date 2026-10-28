import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import AddLinkForm from '../components/links/AddLinkForm';
import LinkGrid from '../components/links/LinkGrid';
import { getAllLinks } from '../services/linkService';
import type { LinkItem } from '../types';
import { ArrowUpRight, CloudUpload, FileText } from 'lucide-react';

export default function DashBoard() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const data = await getAllLinks();
      setLinks(data);
      setError(null);
    } catch (err) {
      setError('Could not fetch saved links from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(ellipse_at_75%_0%,rgba(251,191,36,0.12),transparent_35%),linear-gradient(145deg,#faf8f3_0%,#f5f4ef_48%,#f3f6f4_100%)]">
      <Header />

      <div className="flex flex-1">
        <Sidebar 
          activeCategory={activeCategory} 
          onSelectCategory={(cat) => setActiveCategory(cat)} 
        />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="https://word.cloud.microsoft/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:p-6"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                    <FileText className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
                      Ready to write?
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-stone-900">
                      Open Microsoft Word
                    </h2>
                    <p className="mt-1 break-all text-sm font-medium text-blue-700">
                      word.cloud.microsoft
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition group-hover:bg-blue-800 group-hover:shadow-md">
                  Go to Word
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>

              <a
                href="https://drive.google.com/drive/my-drive"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:p-6"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                    <CloudUpload className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                      Store and share files
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-stone-900">
                      Open Google Drive
                    </h2>
                    <p className="mt-1 break-all text-sm font-medium text-emerald-700">
                      drive.google.com
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition group-hover:bg-emerald-800 group-hover:shadow-md">
                  Upload a file
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <p className="text-xs leading-relaxed text-stone-600">
                  Upload your file in Drive, copy its share link, then save the link here.
                </p>
              </a>
            </div>

            {/* Add New Link Bar */}
            <AddLinkForm onLinkAdded={fetchLinks} />

            {/* Category Header Bar */}
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-[0_8px_24px_rgba(70,50,20,0.06)] ring-1 ring-stone-900/[0.03] backdrop-blur-xl">
              <h1 className="text-base font-bold tracking-[-0.035em] text-stone-500 sm:text-lg">
                Viewing <span className="text-stone-900">{activeCategory}</span>
              </h1>
              <span className="shrink-0 rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900">
                {links.length} Links Saved
              </span>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-12 text-stone-400 text-sm animate-pulse">
                Loading your links...
              </div>
            ) : (
              <LinkGrid links={links} activeCategory={activeCategory} onRefresh={fetchLinks} />
            )}

          </div>
        </main>
      </div>
    </div>
  );
}