import { useQuery } from "@tanstack/react-query";
import { useHttp } from "hooks/useHttp";
import { UserDetailResp } from "types/userDetail";
import { UserListResp } from "types/userList";
import { UserRankReq, UserRankResp } from "types/userRank";

interface UserListResponse {
	data: UserListResp[];
	total: number;
}

interface UserListParams {
	q?: string;
	page?: number;
	per_page?: number;
}

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
	const useUserList = (params: UserListParams) => {
		return useQuery<UserListResponse>({
			queryKey: ["useUserList", params],
			queryFn: async () => {
				const response = await GET("users", { data: params });

				// 获取每个用户的详细信息
				const detailedData = await Promise.all(
					response.map(async (user: UserListResp) => {
						const userDetail = await GET(`users/${user.login}`);
						return {
							...user,
							followers: userDetail.followers,
							public_repos: userDetail.public_repos,
							location: userDetail.location,
						};
					}),
				);

				return {
					data: detailedData,
					total: 5000, // GitHub API 返回总数为 5000
				};
			},
		});
	};

	/**
	 * @description: 获取用户排行
	 */
	const useUserRank = (data?: UserRankReq & { page?: number; per_page?: number }) => {
		return useQuery<UserRankResp>({
			queryKey: ["useUserRank", data],
			queryFn: async () => {
				const response = await GET("search/users", { data });

				// 获取每个用户的详细信息
				const detailedItems = await Promise.all(
					response.items.map(async (user: UserListResp) => {
						const userDetail = await GET(`users/${user.login}`);
						return {
							...user,
							followers: userDetail.followers,
							public_repos: userDetail.public_repos,
							location: userDetail.location,
						};
					}),
				);

				return {
					...response,
					items: detailedItems,
				};
			},
		});
	};

	return {
		useGetUser,
		useUserList,
		useUserRank,
	};
};
