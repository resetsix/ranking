import { useQuery } from "@tanstack/react-query";
import { useHttp } from "hooks/useHttp";
import { UserDetailResp } from "types/userDetail";
import { UserListResp } from "types/userList";
import { UserRankReq, UserRankResp } from "types/userRank";

export const useUserService = () => {
	const { GET } = useHttp();

	/**
	 * @description: 获取指定用户信息
	 * @param {string} name 用户登录名
	 */
	const useGetUser = (name: string) => {
		return useQuery<UserDetailResp>({
			queryKey: ["useGetUser", name],
			queryFn: () => GET("users/" + name),
			enabled: !!name,
		});
	};

	/**
	 * @description: 获取用户列表
	 */
	const useUserList = () => {
		return useQuery<UserListResp[]>({ queryKey: ["useUserList"], queryFn: () => GET("users") });
	};

	/**
	 * @description: 获取用户排行
	 */
	const useUserRank = (data?: UserRankReq) => {
		return useQuery<UserRankResp>({
			queryKey: ["useUserRank", data],
			queryFn: () => GET("search/users", { data }),
		});
	};

	return {
		useGetUser,
		useUserList,
		useUserRank,
	};
};
