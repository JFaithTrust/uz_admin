import {create} from 'zustand';
import axios from '@/app/api/axios';
import { Worker } from '@/types';


interface WorkerState {
  workers: Worker[];
  worker: Worker | null;
  loading: boolean;
  error: string | null;
  fetchWorkers: () => Promise<void>;
  fetchWorkerById: (id: string) => Promise<void>;
  createWorker: (worker: Worker) => Promise<void>;
  updateWorker: (worker: Worker) => Promise<void>;
  deleteWorker: (id: string) => Promise<void>;
}

const useWorkerStore = create<WorkerState>((set) => ({
  workers: [],
  worker: null,
  loading: false,
  error: null,
  fetchWorkers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Worker[]>('api/Worker/GetAll');
      set({ workers: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching workers:', error);
      set({ loading: false, error: 'Failed to fetch workers' });
    }
  },
  fetchWorkerById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Worker>(`api/Worker/GetById/${id}`);
      set({ worker: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching worker:', error);
      set({ loading: false, error: 'Failed to fetch worker' });
    }
  },
  createWorker: async (worker) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post<Worker>('api/Worker/Create', worker);
      set((state) => ({
        workers: [...state.workers, response.data],
        loading: false,
      }));
    } catch (error) {
      console.error('Error creating worker:', error);
      set({ loading: false, error: 'Failed to create worker' });
    }
  },
  updateWorker: async (worker) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put<Worker>(`api/Worker/ChangeStatus/${worker.id}`, worker);
      set((state) => ({
        workers: state.workers.map((w) => (w.id === worker.id ? response.data : w)),
        loading: false,
      }));
    } catch (error) {
      console.error('Error updating worker:', error);
      set({ loading: false, error: 'Failed to update worker' });
    }
  },
  deleteWorker: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/Worker/Delete/${id}`);
      set((state) => ({ workers: state.workers.filter((w) => w.id !== id), loading: false }));
    } catch (error) {
      console.error('Error deleting worker:', error);
      set({ loading: false, error: 'Failed to delete worker' });
    }
  },
}));

export default useWorkerStore;
