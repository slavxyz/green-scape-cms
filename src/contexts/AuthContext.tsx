import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<string, { password: string; role: "admin" | "user" }> = {
  "admin@example.com": { password: "admin123", role: "admin" },
  "user@example.com": { password: "user123", role: "user" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("mock_auth_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const entry = MOCK_USERS[email.toLowerCase()];
    if (!entry) {
      setIsLoading(false);
      throw new Error("User not found. Try admin@example.com or user@example.com");
    }
    if (entry.password !== password) {
      setIsLoading(false);
      throw new Error("Incorrect password");
    }

    const loggedIn: User = { email: email.toLowerCase(), role: entry.role };
    localStorage.setItem("mock_auth_user", JSON.stringify(loggedIn));
    setUser(loggedIn);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("mock_auth_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
