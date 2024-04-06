import { useMutation } from "@tanstack/react-query";
import { useHttp } from "hooks/useHttp";

interface AuthParam {
	username: string;
	password: string;
}

export const useAuthService = () => {
	const { POST } = useHttp();
	const useUserLogin = () => {
		// TODO 修改登录地址
		return useMutation({ mutationKey: ["useUserLogin"], mutationFn: (data: AuthParam) => POST("login", { data }) });
	};
	return { useUserLogin };
};
