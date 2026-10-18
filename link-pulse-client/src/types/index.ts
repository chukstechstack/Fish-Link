export interface LinkItem {
    id: number;
    url: string;
    title: string;
    category: string;
    createdAt?: string;
}

export interface FolderItem {
    id: number;
    name: string;
    createdAt?: string;
}