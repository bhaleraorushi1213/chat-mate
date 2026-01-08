import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
	authUser: null,
	isCheckingAuth: true,
	isSigningUp: false,
	isLogginIn: false,

	checkAuth: async () => {
		try {
			const res = await fetch("/auth/check-auth");
			set({ authUser: res.data });
		} catch (error) {
			console.log("Error in authCheck:", error);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	signup: async (data) => {
		set({ isSigningUp: true });
		try {
			const res = await axiosInstance.post("/auth/signup", data);
			set({ authUser: res.data });

			toast.success("Account created successfully!");
			// get().connectSocket();
		} catch (error) {
			console.log("Error in signup:", error);
			toast.error(error?.response?.data?.message);
		} finally {
			set({ isSigningUp: false });
		}
	},

	login: async (data) => {
		set({ isLogginIn: true });
		try {
			const res = await axiosInstance.post("/auth/login", data);
			set({ authUser: res.data });

			toast.success("Logged in successfully!");
			// get().connectSocket();
		} catch (error) {
			console.log("Error in login:", error);
			toast.error(error?.response?.data?.message);
		} finally {
			set({ isLogginIn: false });
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({ authUser: null });
			toast.success("Logged out successfully!");
		} catch (error) {
			toast.error("Error in logout");
			console.log("Logout error", error)
		}
	}
}));
