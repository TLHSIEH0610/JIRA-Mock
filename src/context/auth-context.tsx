import { ReactNode, createContext, useState, useContext } from "react";
import { User } from "screens/project-list/search-panel";
import * as auth from "auth-provider";

interface AuthForm {
  username: string;
  password: string;
}

const AuthContext = createContext<
  | undefined
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be called within the AuthProvider");
  return context;
};
