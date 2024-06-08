import {District} from "@/types";
import {create} from "zustand";
import axios from "@/app/api/axios";

interface DistrictStore{
    districts: District[];
    district: District | null;
    loading: boolean;
    error: string | null;
    getDistricts: () => Promise<void>;
    getDistrictById: (id: string) => Promise<void>;
    getDistrictByRegionId: (regionId: string) => Promise<District[] | undefined>;
    createDistrict: (district: {
        name: string;
    }) => Promise<void>;
    updateDistrict: (district: {
        id: string;
        name: string;
    }) => Promise<void>;
    deleteDistrict: (id: string) => Promise<void>;
}

const useDistrictStore = create<DistrictStore>((set) => ({
    districts: [],
    district: null,
    loading: false,
    error: null,
    getDistricts: async () => {
        set({loading: true, error: null});
        try {
            const response = await axios.get<District[]>("/api/District/GetAll");
            set({districts: response.data, loading: false});
        } catch (error) {
            console.error("Error fetching districts:", error);
            set({loading: false, error: "Failed to fetch districts"});
        }
    },
    getDistrictById: async (id: string) => {
        set({loading: true, error: null});
        try {
            const response = await axios.get<District>(`/api/District/GetById/${id}`);
            set({district: response.data, loading: false});
        } catch (error) {
            console.error("Error fetching district:", error);
            set({loading: false, error: "Failed to fetch district"});
        }
    },
    getDistrictByRegionId: async (regionId: string) => {
        set({loading: true, error: null});
        try {
            const response = await axios.get<District[]>(`/api/District/GetByRegionId/${regionId}`);
            return response.data
        } catch (error) {
            console.error("Error fetching districts:", error);
            set({loading: false, error: "Failed to fetch districts"});
        }
    },
    createDistrict: async (district) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            const response = await axios.post<District>("/api/District/Create", district, {
                headers: {
                    Authorization: `Bearer ${initialUser.token}`,
                }
            });
            set((state) => ({
                districts: [...state.districts, response.data],
                loading: false,
            }));
        } catch (error) {
            console.error("Error creating district:", error);
            set({loading: false, error: "Failed to create district"});
        }
    },
    updateDistrict: async (district) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            const response = await axios.put<District>("/api/District/Update", district, {
                headers: {
                    Authorization: `Bearer ${initialUser.token}`,
                }
            });
            set((state) => ({
                districts: state.districts.map((d) => (d.id === district.id ? response.data : d)),
                loading: false,
            }));
        } catch (error) {
            console.error("Error updating district:", error);
            set({loading: false, error: "Failed to update district"});
        }
    },
    deleteDistrict: async (id) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            await axios.delete(`/api/District/Delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${initialUser.token}`,
                }
            });
            set((state) => ({
                districts: state.districts.filter(d => d.id !== id),
                loading: false,
            }));
        } catch (error) {
            console.error("Error deleting district:", error);
            set({loading: false, error: "Failed to delete district"});
        }
    }
}));

export default useDistrictStore;