import qs from "qs";
import { http } from "utils/http";

export const useHttp = () => {
	const GET = (...[url, req]: Parameters<typeof http>) => {
		const cfg = {
			...req,
			method: "GET",
		};
		if (req) {
			url += `?${qs.stringify(req.data, {
				filter(prefix, value) {
					return value === "" ? undefined : value;
				},
			})}`;
		}
		return http(url, cfg);
	};

	const POST = (...[url, req]: Parameters<typeof http>) => {
		const cfg = {
			...req,
			method: "POST",
			body: req ? JSON.stringify(req.data) : null,
		};

		return http(url, cfg);
	};

	const PATCH = (...[url, req]: Parameters<typeof http>) => {
		const cfg = {
			...req,
			method: "PATCH",
			body: req ? JSON.stringify(req.data) : null,
		};

		return http(url, cfg);
	};

	const DELETE = (...[url, req]: Parameters<typeof http>) => {
		const cfg = {
			...req,
			method: "DELETE",
		};
		if (req) {
			url += `?${qs.stringify(req.data, {
				filter(prefix, value) {
					return value === "" ? undefined : value;
				},
			})}`;
		}

		return http(url, cfg);
	};

	return { GET, POST, PATCH, DELETE };
};
