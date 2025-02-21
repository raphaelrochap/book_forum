import { User } from '@/types/entities';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  bearerToken: string;
  user?: User | undefined;
  setBearerToken: (newToken: string) => void;  
  setUser: (newUser: User | undefined) => void;
};

const useBookForumStore = create<State>()(
  persist(
    (set) => ({
      bearerToken: '',
      user: undefined,
      setBearerToken: (newToken: string) => set({ bearerToken: newToken }),      
      setUser: (newUser: User | undefined) => set({ user: newUser }),
    }),
    {
      name: 'book-forum-storage',
    }
  )
);

export default useBookForumStore;
