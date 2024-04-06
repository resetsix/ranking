import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// 这将配置一个Service Worker来拦截请求
export const worker = setupWorker(...handlers);
