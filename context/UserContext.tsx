// UserContext.tsx
import { supabase } from "@/app/lib/superbase";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const restoreUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    restoreUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
