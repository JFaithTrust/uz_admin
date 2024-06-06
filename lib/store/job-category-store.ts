import {Category} from "@/types";
import {create} from "zustand";
import axios from "@/app/api/axios";

interface JobCategoryStore {
    jobCategories: Category[];
    jobCategory: Category | null;
    loading: boolean;
    error: string | null;
    getJobCategories: () => Promise<void>;
    getJobCategoryById: (id: string) => Promise<void>;
    createJobCategory: (jobCategory: {
        title: string;
        description: string;
    }) => Promise<void>;
    updateJobCategory: (jobCategory: Category
    ) => Promise<void>;
    deleteJobCategory: (id: string) => Promise<void>;
}

const useJobCategoryStore = create<JobCategoryStore>((set) => ({
    jobCategories: [],
    jobCategory: null,
    loading: false,
    error: null,
    getJobCategories: async () => {
        set({loading: true, error: null});
        try {
            const response = await axios.get<Category[]>("/api/JobCategory/GetAll");
            set({jobCategories: response.data, loading: false});
        } catch (error) {
            console.error("Error fetching job types:", error);
            set({loading: false, error: "Failed to fetch job types"});
        }
    },
    getJobCategoryById: async (id) => {
        set({loading: true, error: null});
        try {
            const response = await axios.get<Category>(`/api/JobCategory/GetById/${id}`);
            set({jobCategory: response.data, loading: false});
        } catch (error) {
            console.error("Error fetching job type:", error);
            set({loading: false, error: "Failed to fetch job type"});
        }
    },
    createJobCategory: async (jobType) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            const response = await axios.post<Category>("/api/JobCategory/Create", jobType, {
                headers: {
                    Authorization: `Bearer ${initialUser.token}`,
                },
            });
            set((state) => ({
                jobTypes: [...state.jobCategories, response.data],
                loading: false,
            }));
        } catch (error) {
            console.error("Error creating job type:", error);
            set({loading: false, error: "Failed to create job type"});
        }
    },
    updateJobCategory: async (jobType) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            const response = await axios.put<Category>("/api/JobCategory/Update", jobType, {
                headers: {
                    Authorization: `Bearer ${initialUser.token}`,
                },
            });
            set((state) => ({
                jobTypes: state.jobCategories.map((j) => j.id === response.data.id ? response.data : j),
                loading: false,
            }));
        } catch (error) {
            console.error("Error updating job type:", error);
            set({loading: false, error: "Failed to update job type"});
        }
    },
    deleteJobCategory: async (id) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            await axios.delete(`/api/JobCategory/Delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${initialUser.token}`,
                },
            });
            set((state) => ({
                jobTypes: state.jobCategories.filter((j) => j.id !== id),
                loading: false,
            }));
        } catch (error) {
            console.error("Error deleting job type:", error);
            set({loading: false, error: "Failed to delete job type"});
        }
    },
}))


export default useJobCategoryStore;