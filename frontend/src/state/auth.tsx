import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { createContext, useContext, useMemo } from "react";

const TOKEN_KEY = "token";

export interface AuthenticatedUser {
  id: number;
}

type Auth =
  | {
      token: string;
      user: AuthenticatedUser;
      isLoggedIn: true;
      login: (token: string) => void;
      signOut: () => void;
    }
  | {
      token: null;
      user: null;
      isLoggedIn: false;
      login: (token: string) => void;
      signOut: () => void;
    };

const AuthContext = createContext<Auth | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children} </AuthContext.Provider>;
}

function useAuthProvider(): Auth {
  const [token, setToken] = useLocalStorage<string | null>(TOKEN_KEY, null);

  const user = useMemo(() => {
    if (token !== null) {
      return jwtDecode(token) as AuthenticatedUser;
    } else {
      return null;
    }
  }, [token]);

  function login(token: string) {
    setToken(token);
  }

  function signOut() {
    setToken(null);
  }

  if (token !== null) {
    return {
      token,
      user: user!,
      isLoggedIn: true,
      login,
      signOut,
    };
  } else {
    return {
      token,
      user: null,
      isLoggedIn: false,
      login,
      signOut,
    };
  }
}

export function useAuth(): Auth {
  const auth = useContext(AuthContext);

  if (auth === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
}
