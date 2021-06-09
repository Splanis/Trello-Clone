import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { adaptFirebaseUser } from '../firebase/adapters';
import { getUserBoardsCollection } from '../firebase/collections';
import { auth } from '../firebase/firebase';
import { areUserBoards, isUser, User, UserBoard } from '../models/User';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

type AuthContextValues = {
  user?: User;
  boards?: UserBoard[];
};
const AuthContext = createContext<AuthContextValues>({
  user: undefined,
  boards: undefined
});

const AUTH_LOCAL_STORAGE_KEY = 'auth';
const USER_BOARDS_LOCAL_STORAGE_KEY = 'user_boards';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>(() => {
    const res = getFromLocalStorage(AUTH_LOCAL_STORAGE_KEY);
    if (isUser(res)) return res;
    return undefined;
  });
  const [boards, setBoards] = useState<UserBoard[]>(() => {
    const res = getFromLocalStorage(USER_BOARDS_LOCAL_STORAGE_KEY);
    if (areUserBoards(res)) return res;
    return [];
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const adaptedUser = adaptFirebaseUser(firebaseUser);
        saveToLocalStorage(AUTH_LOCAL_STORAGE_KEY, adaptedUser);
        setUser(adaptedUser);
      } else {
        setUser(undefined);
        saveToLocalStorage(AUTH_LOCAL_STORAGE_KEY, undefined);
        saveToLocalStorage(USER_BOARDS_LOCAL_STORAGE_KEY, undefined);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = getUserBoardsCollection(user.userId).onSnapshot((snapshot) => {
      const doc = snapshot.data();
      if (doc && areUserBoards(doc.boards)) {
        setBoards(doc.boards);
        saveToLocalStorage(USER_BOARDS_LOCAL_STORAGE_KEY, doc.boards);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return <AuthContext.Provider value={{ user, boards }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const { user, boards } = useContext(AuthContext);

  return {
    userId: user?.userId,
    photo: user?.photo,
    username: user?.username,
    boards,
    isAuthenticated: user !== undefined
  };
};
