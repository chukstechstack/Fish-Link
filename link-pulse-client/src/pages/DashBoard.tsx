import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import AddLinkForm from '../components/links/AddLinkForm';
import LinkGrid from '../components/links/LinkGrid';
import { getAllLinks } from '../services/linkService';
import type { LinkItem } from '../types';

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
    <div className="min-h-screen bg-stone-100 flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar 
          activeCategory={activeCategory} 
          onSelectCategory={(cat) => setActiveCategory(cat)} 
        />

        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Add New Link Bar */}
            <AddLinkForm onLinkAdded={fetchLinks} />

            {/* Category Header Bar */}
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
              <h1 className="text-lg font-bold text-stone-900">
                Viewing: <span className="text-stone-600 font-normal">{activeCategory}</span>
              </h1>
              <span className="text-xs bg-stone-100 px-2.5 py-1 rounded-full text-stone-600 font-medium">
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