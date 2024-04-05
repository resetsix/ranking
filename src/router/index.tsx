import LoginPage from "page/container/Auth";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
	{ path: "/", element: <Navigate to="/login" /> },
	{ path: "/login", element: <LoginPage /> },
];
