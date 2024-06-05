import {Feedback} from "@/types";
import {create} from "zustand";
import axios from "@/app/api/axios";

interface FeedbackStore {
    feedbacks: Feedback[];
    feedback: Feedback | null;
    loading: boolean;
    error: string | null;
    getFeedbacks: () => Promise<void>;
    createFeedback: (feedback: {
        message: string;
        fullName: string;
        dueDate: Date;
    }) => Promise<void>;
    updateFeedback: (feedback:
       Feedback
    ) => Promise<void>;
    deleteFeedback: (id: string) => Promise<void>;
}

const useFeedbackStore = create<FeedbackStore>((set) => ({
    feedbacks: [],
    feedback: null,
    loading: false,
    error: null,
    getFeedbacks: async () => {
        set({loading: true, error: null});
        try {
            const response = await axios.get<Feedback[]>("/api/FeedBack/GetAll");
            set({feedbacks: response.data, loading: false});
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
            set({loading: false, error: "Failed to fetch feedbacks"});
        }
    },
    createFeedback: async (feedback) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            const response = await axios.post<Feedback>("/api/FeedBack/Create", feedback, {
                headers: {
                    Authorization: `Bearer ${initialUser.token}`,
                },
            });
            set((state) => ({
                feedbacks: [...state.feedbacks, response.data],
                loading: false,
            }));
        } catch (error) {
            console.error("Error creating feedback:", error);
            set({loading: false, error: "Failed to create feedback"});
        }
    },
    updateFeedback: async (feedback) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            const response = await axios.put<Feedback>(
                `/api/FeedBack/Update`,
                feedback,{
                    headers: {
                        Authorization: `Bearer ${initialUser.token}`,
                    }}
            );
            set((state) => ({
                feedbacks: state.feedbacks.map((f) =>
                    f.id === feedback.id ? response.data : f
                ),
                loading: false,
            }));
        } catch (error) {
            console.error("Error updating feedback:", error);
            set({loading: false, error: "Failed to update feedback"});
        }
    },
    deleteFeedback: async (id) => {
        const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null;

        set({loading: true, error: null});
        try {
            await axios.delete(`/api/FeedBack/Delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${initialUser.token}`,
                },
            });
            set((state) => ({
                feedbacks: state.feedbacks.filter((f) => f.id !== id),
                loading: false,
            }));
        } catch (error) {
            console.error("Error deleting feedback:", error);
            set({loading: false, error: "Failed to delete feedback"});
        }
    },
}));

export default useFeedbackStore;