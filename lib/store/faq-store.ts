import {FAQ} from "@/types";
import {create} from "zustand";
import axios from "@/app/api/axios";

interface FaqStore {
    faqs: FAQ[];
    faq: FAQ | null;
    loading: boolean;
    error: string | null;
    getFaqs: () => Promise<void>;
    createFaq: (faq: {
        question: string;
        answer: string;
    }) => Promise<void>;
    updateFaq: (faq:
        {
            id: string;
            question: string;
            answer: string;
        }
    ) => Promise<void>;
    deleteFaq: (id: string) => Promise<void>;
}

const useFaqStore = create<FaqStore>((set) => ({
    faqs: [],
    faq: null,
    loading: false,
    error: null,
    getFaqs: async () => {
        set({loading: true, error: null});
        try {
            const response = await axios.get<FAQ[]>("/api/FAQ/GetAll");
            set({faqs: response.data, loading: false});
        } catch (error) {
            console.error("Error fetching faqs:", error);
            set({loading: false, error: "Failed to fetch faqs"});
        }
    },
    createFaq: async (faq) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            const response = await axios.post<FAQ>("/api/FAQ/Create", faq, {
                headers: {
                    Authorization: `Bearer ${initialUser.token}`,
                },
            });
            set((state) => ({
                faqs: [...state.faqs, response.data],
                loading: false,
            }));
        } catch (error) {
            console.error("Error creating faq:", error);
            set({loading: false, error: "Failed to create faq"});
        }
    },
    updateFaq: async (faq) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            const response = await axios.put<FAQ>(
                `api/FAQ/Update`,
                faq,{
                    headers: {
                        Authorization: `Bearer ${initialUser.token}`,
                    }}
            );
            set((state) => ({
                faqs: state.faqs.map((f) =>
                    f.id === faq.id ? response.data : f
                ),
                loading: false,
            }));
        } catch (error) {
            console.error("Error updating faq:", error);
            set({loading: false, error: "Failed to update faq"});
        }
    },
    deleteFaq: async (id) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            await axios.delete(`api/FAQ/Delete/${id}`,{
                headers: {
                    Authorization: `Bearer ${initialUser.token}`,
                },
            });
            set((state) => ({
                faqs: state.faqs.filter((f) => f.id !== id),
                loading: false,
            }));
        } catch (error) {
            console.error("Error deleting faq:", error);
            set({loading: false, error: "Failed to delete faq"});
        }
    },
}));


export default useFaqStore;