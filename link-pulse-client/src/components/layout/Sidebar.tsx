import React, { useState, useEffect } from 'react';
import {
  BriefcaseBusiness,
  FlaskConical,
  Folder,
  FolderOpen,
  LayoutGrid,
  MoreHorizontal,
  NotebookPen,
  Pencil,
  Plus,
  Settings2,
  Trash2,
  X,
} from 'lucide-react';
import { getFolders, createFolder, updateFolder, deleteFolder } from '../../services/folderService';
import type { FolderItem } from '../../types';

interface SidebarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function Sidebar({ activeCategory, onSelectCategory }: SidebarProps) {
  const [customFolders, setCustomFolders] = useState<FolderItem[]>([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 3-dot and editing states for folders
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [editingFolder, setEditingFolder] = useState<FolderItem | null>(null);
  const [editFolderName, setEditFolderName] = useState('');
  const [loadingEdit, setLoadingEdit] = useState(false);

  // Real-world template categories for immediate productivity
  const templateCategories = [
    { name: 'All Links', id: 'All' },
    { name: 'Job', id: 'Job' },
    { name: 'Work / Projects', id: 'Work / Projects' },
    { name: 'Personal Notes', id: 'Personal Notes' },
    { name: 'Research', id: 'Research' },
  ];

  const fetchCustomFolders = async () => {
    try {
      const data = await getFolders();
      setCustomFolders(data);
    } catch {
      // Fallback silently if offline or uninitialized
    }
  };

  useEffect(() => {
    fetchCustomFolders();
  }, []);

  // Close 3-dot menu when clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    if (activeMenuId !== null) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [activeMenuId]);

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    setError(null);
    setIsCreating(true);

    try {
      const created = await createFolder(newFolderName.trim());
      setCustomFolders([created, ...customFolders]);
      onSelectCategory(created.name);
      setNewFolderName('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Could not create folder.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteFolder = async (folder: FolderItem) => {
    if (!confirm(`Are you sure you want to delete "${folder.name}"?`)) return;
    try {
      await deleteFolder(folder.id);
      setCustomFolders(customFolders.filter((f) => f.id !== folder.id));
      if (activeCategory === folder.name) {
        onSelectCategory('All');
      }
    } catch {
      alert('Failed to delete folder.');
    }
  };

  const handleSaveEditFolder = async () => {
    if (!editingFolder || !editFolderName.trim()) return;
    setLoadingEdit(true);
    try {
      await updateFolder(editingFolder.id, editFolderName.trim());
      setCustomFolders(
        customFolders.map((f) => (f.id === editingFolder.id ? { ...f, name: editFolderName.trim() } : f))
      );
      if (activeCategory === editingFolder.name) {
        onSelectCategory(editFolderName.trim());
      }
      setEditingFolder(null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update folder.');
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <aside className="flex min-h-[calc(100vh-4rem)] w-64 flex-col justify-between border-r border-stone-200/80 bg-stone-50/80 p-4">
      <div className="space-y-6">
        <div>
          <span className="mb-3 block px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400">
            Templates & Views
          </span>

          {/* Template Categories */}
          <div className="space-y-1">
            {templateCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60 ${
                  activeCategory === cat.id
                    ? 'bg-white font-medium text-stone-900 shadow-sm ring-1 ring-stone-200/80'
                    : 'font-normal text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
                }`}
              >
                {cat.id === 'All' ? (
                  <LayoutGrid className="h-4 w-4 text-stone-400 transition-colors group-hover:text-stone-600" />
                ) : cat.id === 'Job' ? (
                  <BriefcaseBusiness className="h-4 w-4 text-stone-400 transition-colors group-hover:text-stone-600" />
                ) : cat.id === 'Work / Projects' ? (
                  <Folder className="h-4 w-4 text-stone-400 transition-colors group-hover:text-stone-600" />
                ) : cat.id === 'Personal Notes' ? (
                  <NotebookPen className="h-4 w-4 text-stone-400 transition-colors group-hover:text-stone-600" />
                ) : (
                  <FlaskConical className="h-4 w-4 text-stone-400 transition-colors group-hover:text-stone-600" />
                )}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="my-5 h-px bg-stone-200/80" />

          {/* Custom Folders Section */}
          <span className="mb-3 block px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400">
            My Folders
          </span>

          <form onSubmit={handleCreateFolder} className="mb-3 flex gap-1.5">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="New folder..."
              aria-label="New folder name"
              className="min-w-0 flex-1 rounded-lg border border-stone-200/80 bg-white px-2.5 py-2 text-xs text-stone-800 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-stone-300 focus:ring-2 focus:ring-stone-400/30"
            />
            <button
              type="submit"
              disabled={isCreating}
              aria-label="Create folder"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-900 text-white shadow-sm transition-all duration-200 hover:bg-stone-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </form>

          {error && <p className="mb-2 px-1 text-xs text-red-600">{error}</p>}

          <div className="space-y-1">
            {customFolders.length === 0 && (
              <div className="rounded-xl border border-dashed border-stone-200/90 bg-white/50 px-3 py-4 text-center">
                <FolderOpen className="mx-auto mb-2 h-4 w-4 text-stone-400" />
                <p className="text-xs font-medium text-stone-500">No folders yet</p>
                <p className="mt-1 text-[11px] leading-relaxed text-stone-400">
                  Create one to keep links organized.
                </p>
              </div>
            )}
            {customFolders.map((folder) => (
              <div
                key={folder.id}
                className={`group relative flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                  activeCategory === folder.name
                    ? 'bg-white font-medium text-stone-900 shadow-sm ring-1 ring-stone-200/80'
                    : 'text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
                }`}
              >
                <button
                  onClick={() => onSelectCategory(folder.name)}
                  className="flex min-w-0 flex-1 items-center gap-2.5 truncate text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60"
                >
                  <Folder className="h-4 w-4 shrink-0 text-stone-400" />
                  <span className="truncate">{folder.name}</span>
                </button>

                {/* 3-Dot Menu for Folder */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === folder.id ? null : folder.id);
                    }}
                    aria-label={`Folder actions for ${folder.name}`}
                    className="rounded-md p-1 text-stone-400 opacity-0 transition hover:bg-stone-100 hover:text-stone-700 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60 group-hover:opacity-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>

                  {activeMenuId === folder.id && (
                    <div className="absolute right-0 z-50 mt-1 w-32 rounded-xl border border-stone-200/80 bg-white p-1.5 text-xs shadow-lg shadow-stone-900/10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(null);
                          setEditingFolder(folder);
                          setEditFolderName(folder.name);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Rename
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(null);
                          handleDeleteFolder(folder);
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
            ))}
          </div>
        </div>
      </div>

      {/* Edit Folder Modal */}
      {editingFolder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm space-y-5 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-2xl shadow-stone-950/15">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-sm font-semibold tracking-tight text-stone-900">Rename folder</span>
                <p className="mt-1 text-xs text-stone-500">Choose a name that helps you find it later.</p>
              </div>
              <button
                onClick={() => setEditingFolder(null)}
                aria-label="Close rename folder dialog"
                className="rounded-lg p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-600">Folder name</label>
              <input
                type="text"
                value={editFolderName}
                onChange={(e) => setEditFolderName(e.target.value)}
                className="w-full rounded-lg border border-stone-200/80 bg-white px-3 py-2.5 text-sm font-medium text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-300 focus:ring-2 focus:ring-stone-400/30"
              />
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-stone-100 pt-4">
              <button
                type="button"
                onClick={() => setEditingFolder(null)}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loadingEdit}
                onClick={handleSaveEditFolder}
                className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-stone-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-50"
              >
                {loadingEdit ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="space-y-2 border-t border-stone-200/80 pt-4">
        <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-stone-500 transition hover:bg-stone-200/60 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60">
          <Settings2 className="h-4 w-4" />
          Settings
        </button>
      </div>
    </aside>
  );
}