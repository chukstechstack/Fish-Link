import React, { useState, useEffect } from 'react';
import { ArrowRight, FolderOpen, Link2, Sparkles, X } from 'lucide-react';
import { createLink } from '../../services/linkService';
import { getFolders } from '../../services/folderService';
import type { FolderItem } from '../../types';
interface AddLinkFormProps {
  onLinkAdded: () => void;
}

export default function AddLinkForm({ onLinkAdded }: AddLinkFormProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [inspecting, setInspecting] = useState(false);

  // Modal state for previewing SEO metadata before saving
  const [showModal, setShowModal] = useState(false);
  const [fetchedTitle, setFetchedTitle] = useState('');
  const [category, setCategory] = useState('Job');
  const [customFolders, setCustomFolders] = useState<FolderItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fixed template categories
  const templateCategories = ['Job', 'Work / Projects', 'Personal Notes', 'Research'];

  // Fetch folders on mount so the dropdown is always up to date
  useEffect(() => {
    async function loadFolders() {
      try {
        const folders = await getFolders();
        setCustomFolders(folders);
      } catch {
        // Fallback silently if offline
      }
    }
    loadFolders();
  }, []);

  // Step 1: User submits the URL
  const handleInspectUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setError(null);
    setInspecting(true);

    try {
      let defaultTitle = url;
      try {
        const parsedObj = new URL(url);
        defaultTitle = `${parsedObj.hostname}: ${parsedObj.pathname}`;
      } catch {
        defaultTitle = url;
      }

      setFetchedTitle(defaultTitle);
      setInspecting(false);
      setShowModal(true);
    } catch {
      setError('Failed to fetch link details.');
      setInspecting(false);
    }
  };

  // Step 2: User confirms and saves to backend
  const handleConfirmSave = async () => {
    setLoading(true);
    try {
      await createLink({
        url,
        title: fetchedTitle,
        category,
      });

      setUrl('');
      setShowModal(false);
      setLoading(false);
      onLinkAdded();
    } catch {
      setError('Could not save link to database.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Top Add New Link Input Box */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
            <Link2 className="h-3.5 w-3.5" />
          </span>
          <h2 className="text-base font-semibold tracking-tight text-stone-900">Add a link</h2>
        </div>

        <form onSubmit={handleInspectUrl} className="mx-auto flex max-w-2xl gap-2">
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/microsoft/vscode/issues/12345"
            aria-label="Link URL"
            className="min-w-0 flex-1 rounded-xl border border-stone-200/80 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-300 focus:ring-2 focus:ring-stone-400/30"
          />
          <button
            type="submit"
            disabled={inspecting}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-stone-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-stone-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-50"
          >
            {inspecting ? 'Fetching...' : 'Add link'}
            {!inspecting && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        {inspecting && (
          <div className="mt-4 flex animate-pulse items-center justify-center gap-2 text-center text-xs text-stone-500">
            <Sparkles className="h-3.5 w-3.5" />
            Fetching link details...
          </div>
        )}

        {error && <p className="mt-3 text-xs text-red-600 text-center">{error}</p>}
      </div>

      {/* SEO Metadata Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg space-y-5 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-2xl shadow-stone-950/15">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-sm font-semibold tracking-tight text-stone-900">Review link</span>
                <p className="mt-1 text-xs text-stone-500">Set a title and choose where to save it.</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close review link dialog"
                className="rounded-lg p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-600">Title</label>
              <input
                type="text"
                value={fetchedTitle}
                onChange={(e) => setFetchedTitle(e.target.value)}
                className="w-full rounded-lg border border-stone-200/80 bg-white px-3 py-2.5 text-sm font-medium text-stone-900 outline-none transition focus:border-stone-300 focus:ring-2 focus:ring-stone-400/30"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-600">Category / folder</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-stone-200/80 bg-white px-3 py-2.5 text-sm text-stone-800 outline-none transition focus:border-stone-300 focus:ring-2 focus:ring-stone-400/30"
              >
                <optgroup label="Templates">
                  {templateCategories.map((tpl) => (
                    <option key={tpl} value={tpl}>
                      {tpl}
                    </option>
                  ))}
                </optgroup>
                {customFolders.length > 0 && (
                  <optgroup label="My Folders">
                    {customFolders.map((folder) => (
                      <option key={folder.id} value={folder.name}>
                        {folder.name}
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            </div>

            {customFolders.length === 0 && (
              <div className="flex items-start gap-2 rounded-xl border border-stone-200/70 bg-stone-50 px-3 py-2.5 text-xs leading-relaxed text-stone-500">
                <FolderOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-stone-400" />
                You can organize this link into a custom folder from the sidebar.
              </div>
            )}

            <div className="flex items-center justify-end gap-2 border-t border-stone-100 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleConfirmSave}
                className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-stone-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Add to Dashboard'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}