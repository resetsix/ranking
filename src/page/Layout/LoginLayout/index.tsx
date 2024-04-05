import { Flex } from "antd";
import React from "react";

interface LoginLayoutProps {
	children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
	return (
		<Flex justify="center" align="center" style={{ minWidth: "100vw", minHeight: "100vh" }}>
			{children}
		</Flex>
	);
};

export default LoginLayout;
