import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { App as AntdApp } from "antd";
import { BrowserRouter, useRoutes } from "react-router-dom";
import router from "router";
import "./App.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // 关闭重新获取窗口焦点重新请求
			retry: 3, // 最大重试次数
			retryDelay: 5000, // 重试间隔时间 5s
		},
	},
});

const App = () => useRoutes(router);

const Context: React.FC = () => {
	return (
		<BrowserRouter>
			<AntdApp>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</AntdApp>
		</BrowserRouter>
	);
};

export default Context;
