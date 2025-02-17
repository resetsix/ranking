import UserLayout from "page/Layout/ProjectLayout";
import UserList from "page/container/User/List";
import UserRank from "page/container/User/Rank";
import { Navigate } from "react-router-dom";

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
