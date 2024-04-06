import qs from "qs";
import { Http } from "utils/http";

export const useHttp = () => {
	const GET = (...[url, req]: Parameters<typeof Http>) => {
		const cfg = {
			...req,
			headers: { method: "GET" },
		};
		if (req) {
			url += `${qs.stringify(req.data, {
				filter(prefix, value) {
					return value === "" ? undefined : value;
				},
			})}`;
		}
		return Http(url, cfg);
	};

	const POST = (...[url, req]: Parameters<typeof Http>) => {
		const cfg = {
			...req,
			body: req ? qs.stringify(req.data) : null,
			headers: { method: "POST" },
		};

		return Http(url, cfg);
	};

	const PATCH = (...[url, req]: Parameters<typeof Http>) => {
		const cfg = {
			...req,
			body: req ? qs.stringify(req.data) : null,
			headers: { method: "PATCh" },
		};

		return Http(url, cfg);
	};

	const DELETE = (...[url, req]: Parameters<typeof Http>) => {
		const cfg = {
			...req,
			headers: { method: "DELETE" },
		};
		if (req) {
			url += `${qs.stringify(req.data, {
				filter(prefix, value) {
					return value === "" ? undefined : value;
				},
			})}`;
		}

		return Http(url, cfg);
	};

	return { GET, POST, PATCH, DELETE };
};
