import { create } from "zustand";
import api from "@/services";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  // Adicione outros campos conforme necessário
}

interface UserStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/users/find/data");
      console.log(response?.data, "****---");
      set({ user: response.data, loading: false });
    } catch (err) {
      console.log(err, "))))))))))))))");
      set({ error: "Failed to fetch user data", loading: false });
    }
  },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
