import { useState, useEffect } from 'react';
import {
  BriefcaseBusiness,
  Check,
  Copy,
  FlaskConical,
  Folder,
  FolderOpen,
  MoreHorizontal,
  NotebookPen,
  Pencil,
  Trash2,
  X,
} from 'lucide-react';
import type { LinkItem, FolderItem } from '../../types';
import { updateLink, deleteLink } from '../../services/linkService';
import { getFolders } from '../../services/folderService';

interface LinkCardProps {
  link: LinkItem;
  onRefresh: () => void;
}

export default function LinkCard({ link, onRefresh }: LinkCardProps) {
  const title = link.title?.trim() || link.url;
  const theme = {
    badge: 'border-stone-200 bg-stone-100/80 text-stone-700',
    button: 'border-stone-200 bg-stone-50 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800',
  };
  const [activeMenu, setActiveMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [editTitle, setEditTitle] = useState(link.title ?? '');
  const [editCategory, setEditCategory] = useState(link.category);
  const [moveCategory, setMoveCategory] = useState(link.category);
  const [customFolders, setCustomFolders] = useState<FolderItem[]>([]);
  const [folderLoadError, setFolderLoadError] = useState<string | null>(null);
  const [moveError, setMoveError] = useState<string | null>(null);
  const [folderLoading, setFolderLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moving, setMoving] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const templateCategories = ['Job', 'Work / Projects', 'Personal Notes', 'Research'];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link.url);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
  };

  const loadFolders = async () => {
    setFolderLoading(true);
    setFolderLoadError(null);
    try {
      const folders = await getFolders();
      setCustomFolders(folders);
    } catch {
      setFolderLoadError('Could not load your folders. Please try again.');
    } finally {
      setFolderLoading(false);
    }
  };

  // Close 3-dot menu when clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(false);
    if (activeMenu) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [activeMenu]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this link?')) return;
    try {
      await deleteLink(link.id);
      onRefresh();
    } catch {
      alert('Failed to delete link.');
    }
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      await updateLink(link.id, {
        url: link.url,
        title: editTitle,
        category: editCategory,
      });
      setIsEditing(false);
      onRefresh();
    } catch {
      alert('Failed to update link.');
    } finally {
      setLoading(false);
    }
  };

  const handleMoveLink = async () => {
    setMoving(true);
    setMoveError(null);
    try {
      await updateLink(link.id, {
        url: link.url,
        title: link.title,
        category: moveCategory,
      });
      setIsMoving(false);
      onRefresh();
    } catch {
      setMoveError('Could not move this link. Please try again.');
    } finally {
      setMoving(false);
    }
  };

  return (
    <>
      <div className="group relative flex flex-col justify-between overflow-hidden rounded-[1.4rem] border border-stone-200/90 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.06)] ring-1 ring-stone-900/[0.025] transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_18px_42px_rgba(15,23,42,0.11)]">
        <div aria-hidden="true" className="link-card-color-ray z-0" />
        <div aria-hidden="true" className="link-card-color-line absolute inset-x-0 top-0 z-10 h-[3px]" />
        <div className="relative z-[1]">
          <div className="mb-3 flex items-start justify-between gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide ${theme.badge}`}>
              {link.category.toLowerCase() === 'job' ? <BriefcaseBusiness className="h-3.5 w-3.5" /> :
                link.category.toLowerCase() === 'work / projects' ? <Folder className="h-3.5 w-3.5" fill="currentColor" fillOpacity={0.16} /> :
                  link.category.toLowerCase() === 'personal notes' ? <NotebookPen className="h-3.5 w-3.5" /> :
                    link.category.toLowerCase() === 'research' ? <FlaskConical className="h-3.5 w-3.5" /> :
                      <Folder className="h-3.5 w-3.5" fill="currentColor" fillOpacity={0.16} />}
              {link.category}
            </span>

            {/* 3-Dot Menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(!activeMenu);
                }}
                aria-label="Link actions"
                className="rounded-xl p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>

              {activeMenu && (
                <div className="absolute right-0 z-20 mt-1 w-40 rounded-xl border border-stone-200/80 bg-white p-1.5 text-xs shadow-lg shadow-stone-900/10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(false);
                      setMoveCategory(link.category);
                      setMoveError(null);
                      setIsMoving(true);
                      void loadFolders();
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60"
                  >
                    <FolderOpen className="h-3.5 w-3.5" />
                    Move to folder
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(false);
                      setIsEditing(true);
                      void loadFolders();
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(false);
                      handleDelete();
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left font-medium text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 block line-clamp-2 text-[1.05rem] font-bold leading-6 tracking-[-0.035em] text-slate-900 transition-colors hover:text-amber-800 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
          >
            {title}
          </a>
          <div className="flex min-w-0 items-center gap-2">
            <span className="min-w-0 flex-1 truncate text-xs font-medium text-stone-500">{link.url}</span>
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label={copyStatus === 'copied' ? 'Link copied' : 'Copy link'}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${theme.button}`}
            >
              {copyStatus === 'copied' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copyStatus === 'copied' ? 'Copied' : 'Copy'}
            </button>
          </div>
          {copyStatus === 'error' && (
            <p role="status" className="mt-1 text-xs text-red-600">
              Could not copy the link. Please copy it manually.
            </p>
          )}
          {copyStatus === 'copied' && <span className="sr-only" role="status">Link copied to clipboard.</span>}
        </div>
      </div>

      {isMoving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/30 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`move-link-title-${link.id}`}
            className="w-full max-w-md space-y-5 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-2xl shadow-stone-950/15"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h2 id={`move-link-title-${link.id}`} className="text-sm font-semibold tracking-tight text-stone-900">
                  Move link
                </h2>
                <p className="mt-1 text-xs text-stone-500">Choose a destination folder for this link.</p>
              </div>
              <button
                onClick={() => setIsMoving(false)}
                aria-label="Close move link dialog"
                className="rounded-lg p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div>
              <label htmlFor={`move-link-folder-${link.id}`} className="mb-1.5 block text-xs font-medium text-stone-600">
                Destination folder
              </label>
              <select
                id={`move-link-folder-${link.id}`}
                value={moveCategory}
                onChange={(e) => setMoveCategory(e.target.value)}
                disabled={moving || folderLoading || Boolean(folderLoadError)}
                className="w-full rounded-lg border border-stone-200/80 bg-white px-3 py-2.5 text-sm text-stone-800 outline-none transition focus:border-stone-300 focus:ring-2 focus:ring-stone-400/30 disabled:cursor-not-allowed disabled:bg-stone-50"
              >
                <optgroup label="Folders">
                  {templateCategories.map((folder) => (
                    <option key={folder} value={folder}>{folder}</option>
                  ))}
                </optgroup>
                {customFolders.length > 0 && (
                  <optgroup label="My Folders">
                    {customFolders.map((folder) => (
                      <option key={folder.id} value={folder.name}>{folder.name}</option>
                    ))}
                  </optgroup>
                )}
              </select>
              {folderLoading && <p className="mt-2 text-xs text-stone-500">Loading folders...</p>}
              {folderLoadError && (
                <p role="alert" className="mt-2 text-xs text-red-600">{folderLoadError}</p>
              )}
              {moveError && (
                <p role="alert" className="mt-2 text-xs text-red-600">{moveError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-stone-100 pt-4">
              <button
                type="button"
                onClick={() => setIsMoving(false)}
                disabled={moving}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60 disabled:cursor-wait disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={moving || folderLoading || Boolean(folderLoadError) || moveCategory === link.category}
                onClick={handleMoveLink}
                className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-stone-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {moving ? 'Moving...' : 'Move link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg space-y-5 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-2xl shadow-stone-950/15">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-sm font-semibold tracking-tight text-stone-900">Edit link</span>
                <p className="mt-1 text-xs text-stone-500">Update the title or move this link to another folder.</p>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                aria-label="Close edit link dialog"
                className="rounded-lg p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-600">Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full rounded-lg border border-stone-200/80 bg-white px-3 py-2.5 text-sm font-medium text-stone-900 outline-none transition focus:border-stone-300 focus:ring-2 focus:ring-stone-400/30"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-600">Category / folder</label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="w-full rounded-lg border border-stone-200/80 bg-white px-3 py-2.5 text-sm text-stone-800 outline-none transition focus:border-stone-300 focus:ring-2 focus:ring-stone-400/30"
              >
                <optgroup label="Templates">
                  {templateCategories.map((tpl) => (
                    <option key={tpl} value={tpl}>
                      📁 {tpl}
                    </option>
                  ))}
                </optgroup>
                {customFolders.length > 0 && (
                  <optgroup label="My Folders">
                    {customFolders.map((folder) => (
                      <option key={folder.id} value={folder.name}>
                        📂 {folder.name}
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-stone-100 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleSaveEdit}
                className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-stone-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}