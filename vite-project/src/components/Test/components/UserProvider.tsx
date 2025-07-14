import { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  age?: number | null;
}

interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, "id">) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: Omit<User, "id">) => {
    const newUser: User = {
      id: Date.now(),
      ...user,
    };
    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
}


export { UserContext };