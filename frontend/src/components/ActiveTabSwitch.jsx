import React from "react";
import {useChatStore} from "../store/useChatStore.js";

function ActiveTabSwitch() {
	const { activeTab, setActiveTab } = useChatStore();

	return (
  <div className="tabs tabs-boxed bg-transparent p-2 m-2">
    <button onClick={() => setActiveTab("chats")}
      className={`tab text-slate-200 ${activeTab === "chats" ? "bg-cyan-600 text-cyan-200" : ""}`}>Chats</button>
    <button onClick={() => setActiveTab("contacts")}
      className={`tab text-slate-200 ${activeTab === "contacts" ? "bg-cyan-600 text-cyan-200" : ""}`}>Contacts</button>
  </div>
  );
}

export default ActiveTabSwitch;
