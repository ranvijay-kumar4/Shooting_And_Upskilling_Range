import { create } from "zustand";

export interface UploadingFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "pending" | "processing" | "success" | "error";
  error?: string;
  previewUrl?: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface AppState {
  // File Upload Queue
  uploadQueue: UploadingFile[];
  addFilesToQueue: (files: { name: string; size: number; previewUrl?: string }[]) => string[];
  updateFileProgress: (id: string, progress: number) => void;
  updateFileStatus: (id: string, status: UploadingFile["status"], error?: string) => void;
  clearQueue: () => void;

  // Selected Record for Review / History detailed view
  selectedRecordId: string | null;
  setSelectedRecordId: (id: string | null) => void;

  // Selected Document for History inspection
  selectedDocId: string | null;
  setSelectedDocId: (id: string | null) => void;

  // Dark Mode preference
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (dark: boolean) => void;

  // Toast Notification System
  toasts: ToastMessage[];
  addToast: (message: string, type: ToastMessage["type"]) => void;
  removeToast: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  uploadQueue: [],
  addFilesToQueue: (files) => {
    const newFiles = files.map((f) => ({
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: f.name,
      size: f.size,
      progress: 0,
      status: "pending" as const,
      previewUrl: f.previewUrl,
    }));
    set((state) => ({ uploadQueue: [...state.uploadQueue, ...newFiles] }));
    return newFiles.map((nf) => nf.id);
  },
  updateFileProgress: (id, progress) =>
    set((state) => ({
      uploadQueue: state.uploadQueue.map((f) =>
        f.id === id ? { ...f, progress } : f
      ),
    })),
  updateFileStatus: (id, status, error) =>
    set((state) => ({
      uploadQueue: state.uploadQueue.map((f) =>
        f.id === id ? { ...f, status, error } : f
      ),
    })),
  clearQueue: () => set({ uploadQueue: [] }),

  selectedRecordId: null,
  setSelectedRecordId: (id) => set({ selectedRecordId: id }),

  selectedDocId: null,
  setSelectedDocId: (id) => set({ selectedDocId: id }),

  isDarkMode: false,
  toggleDarkMode: () =>
    set((state) => {
      const newVal = !state.isDarkMode;
      if (typeof window !== "undefined") {
        if (newVal) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }
      return { isDarkMode: newVal };
    }),
  setDarkMode: (dark) =>
    set(() => {
      if (typeof window !== "undefined") {
        if (dark) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }
      return { isDarkMode: dark };
    }),

  toasts: [],
  addToast: (message, type) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
