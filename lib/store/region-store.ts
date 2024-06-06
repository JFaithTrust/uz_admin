import { Region } from "@/types";
import axios from "@/app/api/axios";
import {create} from "zustand";

interface RegionStore{
    // Region
    regions: Region[];
    region: Region | null;
    loading: boolean;
    error: string | null;
    getRegions: () => Promise<void>;
    getRegionById: (id: string) => Promise<void>;
    createRegion: (region: {
        name: string;
    }) => Promise<void>;
    updateRegion: (region: Region) => Promise<void>;
    deleteRegion: (id: string) => Promise<void>;
}

// Create a store for the region
const useRegionStore = create<RegionStore>((set) => ({
    regions: [],
    region: null,
    loading: false,
    error: null,
    getRegions: async () => {
        set({loading: true, error: null});
        try {
            const response = await axios.get<Region[]>("/api/Region/GetAll");
            set({regions: response.data, loading: false});
        } catch (error) {
            console.error("Error fetching regions:", error);
            set({loading: false, error: "Failed to fetch regions"});
        }
    },
    getRegionById: async (id: string) => {
        set({loading: true, error: null});
        try {
            const response = await axios.get<Region>(`/api/Region/GetById/${id}`);
            set({region: response.data, loading: false});
        } catch (error) {
            console.error("Error fetching region:", error);
            set({loading: false, error: "Failed to fetch region"});
        }
    },
    createRegion: async (region) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            const response = await axios.post<Region>("/api/Region/Create", region, {
                headers: {
                    Authorization: `Bearer ${initialUser.token}`,
                },
            });
            set((state) => ({
                regions: [...state.regions, response.data],
                loading: false,
            }));
        } catch (error) {
            console.error("Error creating region:", error);
            set({loading: false, error: "Failed to create region"});
        }
    },
    updateRegion: async (region) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            const response = await axios.put<Region>("/api/Region/Update", region, {
                headers: {
                    Authorization: `Bearer ${initialUser.token}`,
                },
            });
            set((state) => ({
                regions: state.regions.map((r) => (r.id === region.id ? response.data : r)),
                loading: false,
            }));
        } catch (error) {
            console.error("Error updating region:", error);
            set({loading: false, error: "Failed to update region"});
        }
    },
    deleteRegion: async (id) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            await axios.delete(`/api/Region/Delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${initialUser.token}`,
                },
            });
            set((state) => ({
                regions: state.regions.filter((r) => r.id !== id),
                loading: false,
            }));
        } catch (error) {
            console.error("Error deleting region:", error);
            set({loading: false, error: "Failed to delete region"});
        }
    }
}));

export default useRegionStore;