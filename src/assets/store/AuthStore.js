import { create } from "zustand";



const useAuthStore = create((set) => ({

    token: localStorage.getItem('token') || null,
    user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    setToken: (token) =>
    {
        localStorage.setItem('token', token);
        set({ token: token })
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ token: null });
    },
    setUser: (user) => { 
        localStorage.setItem('user', JSON.stringify(user));
        set({user:user});
    }




}));
export default useAuthStore;
