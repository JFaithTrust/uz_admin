// import {Category} from "@/types";
// import {create} from "zustand";
// import axios from "@/app/api/axios";
//
// interface JobCategoryStore {
//     jobCategories: Category[];
//     jobCategory: Category | null;
//     loading: boolean;
//     error: string | null;
//     getJobCategories: () => Promise<void>;
//     getJobCategoryById: (id: string) => Promise<void>;
//     createJobCategory: (jobType: {
//         name: string;
//     }) => Promise<void>;
//     updateJobCategory: (jobType:
//         {
//             id: string;
//             name: string;
//         }
//     ) => Promise<void>;
//     deleteJobType: (id: string) => Promise<void>;
// }
//
// const useJobCategoryStore = create<JobCategoryStore>((set) => ({
//     jobCategories: [],
//     jobCategory: null,
//     loading: false,
//     error: null,
//     getJobCategories: async () => {
//         set({loading: true, error: null});
//         try {
//             const response = await axios.get<Category[]>("/api/JobCategory/GetAll");
//             set({jobTypes: response.data, loading: false});
//         } catch (error) {
//             console.error("Error fetching job types:", error);
//             set({loading: false, error: "Failed to fetch job types"});
//         }
//     },
// }))