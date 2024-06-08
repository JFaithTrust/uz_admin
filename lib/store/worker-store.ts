import { create } from "zustand";
import axios from "@/app/api/axios";
import { Worker } from "@/types";

interface WorkerState {
  workers: Worker[];
  worker: Worker | null;
  loading: boolean;
  error: string | null;
  getWorkers: () => Promise<void>;
  getWorkerById: (id: string) => Promise<void>;
  createWorker: (worker: {
    instagramLink: string | undefined;
    gender: number;
    telegramLink: string | undefined;
    workingTime: string;
    title: string;
    salary: number;
    tgUserName: string;
    birthDate: Date | null;
    workingSchedule: string;
    phoneNumber: string;
    districtId: string;
    deadline: Date | null;
    categoryId: string
  }) => Promise<void>;
  updateWorker: (worker: {
    instagramLink: string | undefined;
    gender: number;
    telegramLink: string | undefined;
    workingTime: string;
    title: string;
    salary: number;
    tgUserName: string;
    birthDate: Date | null;
    workingSchedule: string;
    phoneNumber: string;
    districtId: string;
    id: string;
    deadline: Date | null;
    categoryId: string
  }) => Promise<void>;
  updateWorkerStatus: (id: string, status: boolean) => Promise<void>;
  deleteWorker: (id: string) => Promise<void>;
}

const useWorkerStore = create<WorkerState>((set) => ({
  workers: [],
  worker: null,
  loading: false,
  error: null,
  getWorkers: async () => {
    const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null;

    set({ loading: true, error: null });
    try {
      const response = await axios.get<Worker[]>("api/Worker/GetAllForAdmin", {
        headers: {
          Authorization: `Bearer ${initialUser.token}`,
        },
      });
      set({ workers: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching workers:", error);
      set({ loading: false, error: "Failed to fetch workers" });
    }
  },
  getWorkerById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Worker>(`api/Worker/GetById/${id}`);
      set({ worker: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching worker:", error);
      set({ loading: false, error: "Failed to fetch worker" });
    }
  },
  createWorker: async (worker) => {
    const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null;

    set({ loading: true, error: null });
    try {
      const response = await axios.post<Worker>("api/Worker/Create", worker, {
        headers: {
          Authorization: `Bearer ${initialUser.token}`,
        },
      });
      set((state) => ({
        workers: [...state.workers, response.data],
        loading: false,
      }));
    } catch (error) {
      console.error("Error creating worker:", error);
      set({ loading: false, error: "Failed to create worker" });
    }
  },
  updateWorker: async (worker) => {
    const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null;

    set({ loading: true, error: null });
    try {
      const response = await axios.put<Worker>(`api/Worker/Update`, worker, {
        headers: {
          Authorization: `Bearer ${initialUser.token}`,
        },
      });
      set((state) => ({
        workers: state.workers.map((w) =>
          w.id === worker.id ? response.data : w
        ),
        loading: false,
      }));
    } catch (error) {
      console.error("Error updating worker:", error);
      set({ loading: false, error: "Failed to update worker" });
    }
  },
  updateWorkerStatus: async (id, status) => {
    const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null;

    set({ loading: true, error: null });
    try {
      const response = await axios.put<Worker>(`api/Worker/ChangeStatus/${id}`, status, {
        headers: {
          Authorization: `Bearer ${initialUser.token}`,
        },
      });
      set((state) => ({
        workers: state.workers.map((w) =>
          w.id === id ? response.data : w
        ),
        loading: false,
      }));
    } catch (error) {
      console.error("Error updating worker:", error);
      set({ loading: false, error: "Failed to update worker" });
    }
  },
  deleteWorker: async (id) => {
    const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null;

    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/Worker/Delete/${id}`, {
        headers: {
          Authorization: `Bearer ${initialUser.token}`,
        },
      });
      set((state) => ({
        workers: state.workers.filter((w) => w.id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error("Error deleting worker:", error);
      set({ loading: false, error: "Failed to delete worker" });
    }
  },
}));

export default useWorkerStore;