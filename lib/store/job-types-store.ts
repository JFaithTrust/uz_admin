import { create } from "zustand";
import axios from "@/app/api/axios";
import {Category} from "@/types";


interface JobTypeState {
  jobData: Category[];
  job: Category | null;
  loading: boolean;
  error: string | null;
  fetchJobs: () => Promise<Category[]>;
  fetchJobById: (id: string) => Promise<void>;
  fetchUpdateJob: (job: Category) => Promise<void>;
}

export const useJobTypesStore = create<JobTypeState>((set) => ({
  jobData: [],
  job: null,
  loading: false,
  error: null,
  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/JobCategory/GetAll");
      set({ jobData: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching workers:", error);
      set({ loading: false, error: "Failed to fetch workers" });
    }
  },
  fetchJobById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/JobCategory/GetById/${id}`);
      set({ job: response.data });
    } catch (error) {
      console.error("Error fetching workers:", error);
      set({ loading: false, error: "Failed to fetch workers" });
    }
  },
  fetchUpdateJob: async (job: Category) => {
    try {
      const response = await axios.put(`/api/JobCategory/Update`, job);
      set((state) => ({
        jobData: state.jobData.map((j) =>
          j.id === job.id ? response.data : j
        ),
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching workers:", error);
      set({ loading: false, error: "Failed to fetch workers" });
    }
  },
}));