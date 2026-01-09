import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
	const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore();
	const { authUser } = useAuthStore();
	const messageEndRef = useRef(null)

	useEffect(() => {
		getMessagesByUserId(selectedUser?._id);
	}, [selectedUser, getMessagesByUserId]);

	useEffect(() => {
		if (messageEndRef.current) {
			messageEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	const formattedDateAndTime = (timestamp) => {
		const date = new Date(timestamp);
		const now = new Date();

		const isToday =
			date.getDate() === now.getDate() &&
			date.getMonth() === now.getMonth() &&
			date.getFullYear() === now.getFullYear();

		const isSameMonth =
			date.getMonth() === now.getMonth() &&
			date.getFullYear() === now.getFullYear();

		const isSameYear = date.getFullYear() === now.getFullYear();

		if (isToday) {
			// Today → show time only
			return date.toLocaleTimeString("en-IN", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			});
		}

		if (isSameMonth) {
			// Same month → 07 Jan, 05:40 PM
			return date.toLocaleString("en-IN", {
				day: "2-digit",
				month: "short",
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			});
		}

		if (isSameYear) {
			// Same year → 07 Jan
			return date.toLocaleDateString("en-IN", {
				day: "2-digit",
				month: "short",
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			});
		}

		// Different year → 07 Jan 2024
		return date.toLocaleDateString("en-IN", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
	};

	return (
		<>
			<ChatHeader />
			<div className="flex-1 px-6 overflow-y-auto py-8">
				{messages.length > 0 && !isMessagesLoading ? (
					<div className="max-w-3xl mx-auto space-y-1">
						{messages.map((msg) => (
							<div
								key={msg._id}
								className={`chat ${
									msg.senderId === authUser._id ? "chat-end" : "chat-start"
								}`}
							>
								<div
									className={`chat-bubble relative ${
										msg.senderId === authUser._id
											? "bg-cyan-600 text-white"
											: "bg-slate-800 text-slate-200"
									}`}
								>
									{msg.image && (
										<img
											src={msg.image}
											alt="shared"
											className="rounded-lg h-48 object-cover"
										/>
									)}
									{msg.text && <p className="mt-0">{msg.text}</p>}
								</div>
								<div className="chat-footer opacity-50">
									{formattedDateAndTime(msg.createdAt)}
								</div>
							</div>
						))}
						<div ref={messageEndRef} />
					</div>
				) : isMessagesLoading ? <MessagesLoadingSkeleton /> : (
					<NoChatHistoryPlaceholder name={selectedUser.fullName} />
				)}
			</div>

      <MessageInput />
		</>
	);
}

export default ChatContainer;
