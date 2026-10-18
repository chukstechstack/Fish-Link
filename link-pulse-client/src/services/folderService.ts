import api from './api';
import type { FolderItem } from '../types';

export async function getFolders(): Promise<FolderItem[]> {
    const response = await api.get<FolderItem[]>('/folders');
    return response.data;
}

export async function createFolder(name: string): Promise<FolderItem> {
    const response = await api.post<FolderItem>('/folders', { name });
    return response.data;
}

export async function updateFolder(id: number, name: string): Promise<void> {
    await api.put(`/folders/${id}`, { name });
}

export async function deleteFolder(id: number): Promise<void> {
    await api.delete(`/folders/${id}`);
}