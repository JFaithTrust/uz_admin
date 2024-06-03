import { create } from "zustand";

import axios from "@/app/api/axios";
import { Region, District } from "@/types";

export interface AddressState {
  Regions: Region[];
  Districts: District[];
  loading: boolean;
  selected: boolean;
  error: string | null;
  fetchRegions: () => void;
  fetchGetByRegionId: (regionId: string) => void;
}

export const useAddressStore = create<AddressState>((set) => ({
  Regions: [],
  Districts: [],
  loading: false,
  error: null,
  selected: false,
  fetchRegions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Region[]>("/api/Region/GetAll");
      set({ Regions: response.data, loading: false, selected: true });
    } catch (error) {
      console.error("Error fetching regions:", error);
      set({ loading: false, error: "Failed to fetch regions" });
    }
  },
  fetchGetByRegionId: async (regionId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<District[]>(
        `/api/District/GetByRegionId/${regionId}`
      );
      set({ Districts: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching districts:", error);
      set({ loading: false, error: "Failed to fetch districts" });
    }
  },
}));