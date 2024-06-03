// jobStore.ts
import { create } from "zustand";
import axios from "@/app/api/axios";
import { Job } from "@/types";

interface JobStore {
  jobs: Job[];
  job: Job;
  fetchJobs: () => Promise<void>;
  fetchJobsId: (id: string) => Promise<void>;
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  job: {
    phoneNumber: "",
    benefit: "",
    requirement: "",
    minAge: 0,
    maxAge: 0,
    id: "",
    title: "",
    gender: 0,
    salary: 0,
    workingTime: "",
    workingSchedule: "",
    deadline: new Date(),
    telegramLink: "",
    instagramLink: "",
    tgUserName: "",
    categoryId: "",
    districtId: "",
    createDate: new Date(),
  },
  fetchJobs: async () => {
    try {
      const response = await axios.get<Job[]>("/api/Job/GetAll");
      set({ jobs: response.data });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  },
  fetchJobsId: async (id: string) => {
    try {
      const response = await axios.get<Job>(`/api/Job/GetById/${id}`);
      set({ job: response.data });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  },
}));
