import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getTokenExpiration(token: string): number | null {
  try {
    const payloadSegment = token.split('.')[1];
    if (!payloadSegment) return null;

    const base64Payload = payloadSegment
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(payloadSegment.length / 4) * 4, '=');
    const payload = JSON.parse(
      new TextDecoder().decode(Uint8Array.from(atob(base64Payload), (character) => character.charCodeAt(0))),
    ) as { exp?: unknown };

    return typeof payload.exp === 'number' && Number.isFinite(payload.exp)
      ? payload.exp * 1000
      : null;
  } catch {
    return null;
  }
}

function getStoredToken(): string | null {
  const storedToken = localStorage.getItem('linkpulse_token');
  if (!storedToken) return null;

  const expiresAt = getTokenExpiration(storedToken);
  if (expiresAt === null || expiresAt <= Date.now()) {
    localStorage.removeItem('linkpulse_token');
    return null;
  }

  return storedToken;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getStoredToken);

  const login = useCallback((newToken: string) => {
    localStorage.setItem('linkpulse_token', newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('linkpulse_token');
    setToken(null);
  }, []);

  useEffect(() => {
    if (!token) return;

    const expiresAt = getTokenExpiration(token);
    const timeoutId = window.setTimeout(
      logout,
      Math.max(0, (expiresAt ?? Date.now()) - Date.now()),
    );
    return () => window.clearTimeout(timeoutId);
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};