import { create } from 'zustand';

const useThemeStore = create((set) => ({
  themeMode: localStorage.getItem('themeMode') || 'light',

  toggleTheme: () => {
    set((state) => {
      const newMode = state.themeMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('themeMode', newMode);
       
      return { themeMode: newMode };
    });
  },
}));

export default useThemeStore;
