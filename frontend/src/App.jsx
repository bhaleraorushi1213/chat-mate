import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";

function App() {
	const { authuser, login, isLoggedIn } = useAuthStore();

	console.log("authuser", authuser);
	console.log("isLoggedIn", isLoggedIn);

	return (
		<div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
			{/* DECORATORS - GRID BG & GLOW SHAPES */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:24px_24px]" />
      </div>

			<button className="btn btn-primary" onClick={login}>login</button>
      
			<Routes>
				<Route path="/" element={<ChatPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
			</Routes>
		</div>
	);
}

export default App;
