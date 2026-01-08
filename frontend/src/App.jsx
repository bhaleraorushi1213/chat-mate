import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from 'react-hot-toast';

function App() {
	const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <PageLoader />;

	return (
		<div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
			{/* DECORATORS - GRID BG & GLOW SHAPES */}

			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:24px_24px]" />
			</div>

			<Routes>
				<Route
					path="/"
					element={authUser ? <ChatPage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/login"
					element={!authUser ? <LoginPage /> : <Navigate to="/" />}
				/>
				<Route
					path="/signup"
					element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
				/>
			</Routes>

			<Toaster />
		</div>
	);
}

export default App;
