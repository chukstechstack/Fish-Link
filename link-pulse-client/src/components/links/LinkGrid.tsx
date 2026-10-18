import type { LinkItem } from '../../types';
import { BookmarkPlus, Link2 } from 'lucide-react';
import LinkCard from './LinkCard';

interface LinkGridProps {
  links: LinkItem[];
  activeCategory: string;
  onRefresh: () => void; // Added onRefresh callback
}

export default function LinkGrid({ links, activeCategory, onRefresh }: LinkGridProps) {
  const filteredLinks = links.filter((link) => {
    if (activeCategory === 'All') return true;
    return link.category.toLowerCase() === activeCategory.toLowerCase();
  });

  if (filteredLinks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-200/90 bg-white px-6 py-14 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-stone-200/80 bg-stone-50 text-stone-500">
          {activeCategory === 'All' ? (
            <BookmarkPlus className="h-5 w-5" />
          ) : (
            <Link2 className="h-5 w-5" />
          )}
        </div>
        <p className="text-sm font-medium tracking-tight text-stone-800">
          {activeCategory === 'All' ? 'Your saved links will appear here' : `No links in ${activeCategory}`}
        </p>
        <p className="mt-1.5 text-xs text-stone-500">
          {activeCategory === 'All'
            ? 'Add your first link above to start building your collection.'
            : 'Save a link to this folder, or choose another view.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredLinks.map((link) => (
        <LinkCard key={link.id} link={link} onRefresh={onRefresh} />
      ))}
    </div>
  );
}