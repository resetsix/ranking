import { isEmpty } from "lodash";
import { HttpResponse, delay, http } from "msw";

// mock
const _username = "jack";
const _passwords = "123456";

export const handlers = [
	// 拦截登录请求
	http.post("/login", async ({ request, params, cookies }) => {
		const data: any = await request.json();
		console.log("data", data);
		const { username, password } = data;
		if (isEmpty(username) && isEmpty(password)) {
			await delay(600);
			return HttpResponse.json({ code: "400", message: "用户名和密码都不能为空" });
		}
		if (isEmpty(username)) {
			await delay(600);
			return HttpResponse.json({ code: "400", message: "用户名不能为空" });
		}
		if (isEmpty(password)) {
			await delay(600);
			return HttpResponse.json({ code: "400", message: "密码不能为空" });
		}
		if (username === _username && password === _passwords) {
			await delay(600);
			return HttpResponse.json({ code: "200", message: "登录成功！" });
		} else {
			await delay(600);
			return HttpResponse.json({ code: "400", message: "用户名或密码错误" });
		}
	}),
];
