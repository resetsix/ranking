import UserLayout from "page/Layout/ProjectLayout";
import LoginPage from "page/container/Auth";
import UserList from "page/container/User/List";
import UserRank from "page/container/User/Rank";
import { Navigate } from "react-router-dom";

/**
 * @description: 未授权
 */
export const UnAuthRouter = [
	{ path: "/", element: <Navigate to="/login" /> },
	{ path: "/login", element: <LoginPage /> },
];

/**
 * @description: 已授权
 */
export const AuthRouter = [
	{
		path: "/",
		element: <UserLayout />,
		children: [
			{ path: "/", element: <Navigate to="/rank" /> },
			{ path: "/rank", element: <UserRank /> },
			{ path: "/user", element: <UserList /> },
		],
	},
];
