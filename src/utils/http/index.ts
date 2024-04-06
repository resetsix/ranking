import { DEFAULT_API_URL } from "constant";
import { errorHandler } from "utils/base/request";

interface HttpProps extends RequestInit {
	data?: any;
}

export const http = async (url: string, { data, ...rest }: HttpProps = {}) => {
	const config = {
		...rest,
		headers: {
			...rest.headers,
			"Content-Type": data ? "application/json" : "",
		},
	};
	const resp = errorHandler(await fetch(`${DEFAULT_API_URL}/${url}`, config));
	return resp.ok ? resp.json() : resp;
};
