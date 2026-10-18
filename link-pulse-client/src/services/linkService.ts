import api from './api';
import type { LinkItem } from '../types';

export async function getAllLinks(): Promise<LinkItem[]> {
    const response = await api.get<LinkItem[]>('/links');
    return response.data;
}

export async function createLink(data: { url: string; title?: string; category?: string }): Promise<LinkItem> {
    const response = await api.post<LinkItem>('/links', data);
    return response.data;
}

export async function updateLink(id: number, data: { url: string; title?: string; category?: string }): Promise<void> {
    await api.put(`/links/${id}`, data);
}

export async function deleteLink(id: number): Promise<void> {
    await api.delete(`/links/${id}`);
}