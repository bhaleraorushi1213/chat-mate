import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
	allContacts: [],
	chats: [],
	messages: [],
	activeTab: "chats",
	selectedUser: null,
	isUsersLoading: false,
	isMessagesLoading: false,
	isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

	toggleSound: () => {
		localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
		set({ isSoundEnabled: !get().isSoundEnabled });
	},

	setActiveTab: (tab) => set({ activeTab: tab }),
	setSelectedUser: (selectedUser) => set({ selectedUser }),

	getAllContacts: async () => {
		set({ isUsersLoading: true });

		try {
			const res = await axiosInstance.get("/messages/contacts");
			set({ allContacts: res.data });
		} catch (error) {
			toast.error(error?.response?.data?.message);
		} finally {
			set({ isUsersLoading: false });
		}
	},

	getMyChatPartners: async () => {
		set({ isUsersLoading: true });

		try {
			const res = await axiosInstance.get("/messages/chats");
			set({ chats: res.data });
		} catch (error) {
			toast.error(error?.response?.data?.message);
		} finally {
			set({ isUsersLoading: false });
		}
	},

	getMessagesByUserId: async (userId) => {
		set({ isMessagesLoading: true });

		try {
			const res = await axiosInstance.get(`/messages/${userId}`);
			set({ messages: res.data });
		} catch (error) {
			toast.error(error?.response?.data?.message || "Something went wrong");
		} finally {
			set({ isMessagesLoading: false });
		}
	},

	sendMessage: async (messageData) => {
		const { selectedUser, messages } = get();
		const { authUser } = useAuthStore.getState();

		const tempId = `temp-${Date.now()}`;

		const optimisticMessage = {
			_id: tempId,
			senderId: authUser._id,
			receiverId: selectedUser._id,
			text: messageData.text,
			image: messageData.image,
			createdAt: new Date().toLocaleString(),
			isOptimistic: true, // flag to identify optimistic message (optional)
		};

		set((state) => ({ messages: [...state.messages, optimisticMessage] }));

		try {
			const res = await axiosInstance.post(
				`messages/send/${selectedUser._id}`,
				messageData
			);
			set((state) => {
				const idx = state.messages.findIndex((m) => m._id === tempId);
				if (idx === -1) return { messages: [...state.messages, res.data] };
				const next = state.messages.slice();
				next[idx] = res.data;
				return { messages: next };
			});
		} catch (error) {
			set((state) => ({
				messages: state.messages.filter((m) => m._id !== tempId),
			}));
			toast.error(error.response?.data?.message || "Something went wrong");
		}
	},

	subscribeToMessages: () => {
		const { selectedUser, isSoundEnabled } = get();
		if (!selectedUser) return;

		const socket = useAuthStore.getState().socket;

		socket.on("newMessage", (newMessage) => {
			const currentMessages = get().messages;

			if ( newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id ) {
				set({ messages: [...currentMessages, newMessage] });

				if (isSoundEnabled) {
					const notificationSound = new Audio("/sounds/notification.mp3");
					notificationSound.currentTime = 0;
					notificationSound.play().catch((err) => console.log("Error playing sound:", err));
				}
			}
		});
	},

	unsubscribeToMessages: () => {
		const socket = useAuthStore.getState().socket;
		socket.off("newMessage");
	},
}));
