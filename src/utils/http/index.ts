import { errorHandler } from "utils/base/request";

interface HttpProps extends RequestInit {
	data?: Record<string, unknown>;
}

export const Http = async <T>(url: string, { ...rest }: HttpProps): Promise<T> => {
	const config = {
		...rest,
		headers: {
			...rest.headers,
			"Content-Type": rest.data ? "application/json" : "",
		},
	};
	const response = errorHandler(await fetch(url, config));
	return response.json();
};
