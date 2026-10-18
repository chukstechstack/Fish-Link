import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('linkpulse_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export type Credentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  token: string;
};

export type CurrentUserResponse = {
  message: string;
};

export async function registerUser(credentials: Credentials): Promise<{ message: string }> {
  const response = await api.post<{ message: string }>('/auth/register', credentials);
  return response.data;
}

export async function loginUser(credentials: Credentials): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const response = await api.get<CurrentUserResponse>('/auth/me');
  return response.data;
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return (
      error.response?.data?.message ??
      (error.response
        ? `The request failed (${error.response.status}). Please try again.`
        : 'Could not reach the LinkPulse API. Check that the backend is running and try again.')
    );
  }

  return error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
}

export default api;