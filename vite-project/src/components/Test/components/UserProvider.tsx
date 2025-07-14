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
  const [users, setUsers] = useState<User[]>([
  { id: 1, name: "Tram", email: "trtram2003@gmail.com", age: 22 },
  { id: 2, name: "Tram", email: "tramtn.21ad@vku.udn.vn", age: 22 },
]);

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