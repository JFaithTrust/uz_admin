import { create } from "zustand";
import axios from "@/app/api/axios";

export type JobsTypes = {
  id: string;
  title: string;
  description: string;
};

interface JobTypeState {
  jobData: JobsTypes[];
  job: JobsTypes | null;
  loading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  fetchJobById: (id: string) => Promise<void>;
  fetchUpdateJob: (job: JobsTypes) => Promise<void>;
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
  fetchUpdateJob: async (job: JobsTypes) => {
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

// export const useJobTypesStore = create<JobTypeState>((set) => ({
//   jobData: [],
//   job: null,
//   fetchJobs: async () => {
//     set({ loading: true, error: null });
//     try {
//       const response = await axios.get("/api/JobCategory/GetAll");
//       set({ jobData: response.data });
//     } catch (error) {
//       console.error("Error fetching workers:", error);
//       set({ loading: false, error: "Failed to fetch workers" });
//     }
//   },
//   fetchJobById: async (id: string) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await axios.get(`/api/JobCategory/GetById/${id}`);
//       set({ job: response.data });
//     } catch (error) {
//       console.error("Error fetching workers:", error);
//       set({ loading: false, error: "Failed to fetch workers" });
//     }
//   },
//   // fetchUpdateJob: async (job: JobsTypes) => {
//   //   try {
//   //     const response = await axios.put(`/api/JobCategory/Update`, job);
//   //     set({ job: response.data });
//   //   } catch (error) {
//   //     console.error("Error fetching data:", error);
//   //   }
//   // },
//   fetchUpdateJob: async (job: JobsTypes) => {
//     set({ loading: true, error: null });
//     try {
//       const res = await axios.put(`/api/JobCategory/Update`, job);
//       set((state) => ({
//         jobData: state.job.map((j) => (j.id === job.id ? res.data : j)),
//         loading: false,
//       }));
//     } catch (error) {
//       console.error("Error updating worker:", error);
//       set({ loading: false, error: "Failed to update worker" });
//     }
//   }
// }));
