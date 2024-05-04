import NiceModal from "@ebay/nice-modal-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App as AntdApp } from "antd";
import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { AuthRouter } from "routes";
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

const App = () => useRoutes(AuthRouter);

const Context: React.FC = () => {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<NiceModal.Provider>
					<AntdApp>
						<App />
					</AntdApp>
				</NiceModal.Provider>
			</QueryClientProvider>
		</BrowserRouter>
	);
};

export default Context;
