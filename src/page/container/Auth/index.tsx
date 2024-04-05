import { useBoolean, useTitle } from "ahooks";
import { Card, Divider } from "antd";
import LoginLayout from "page/Layout/LoginLayout";
import { FullButton } from "page/components/Buttons/FullButton";
import LoginPage from "page/container/Auth/LoginPage";
import RegisterPage from "page/container/Auth/RegisterPage";

const AuthPage: React.FC = () => {
	const [isLogin, { toggle }] = useBoolean(true);
	useTitle("登录 | JIRA");

	return (
		<LoginLayout>
			<Card title={isLogin ? "登录" : "注册"} styles={{ body: { width: 350, height: 400 } }}>
				{isLogin ? <LoginPage /> : <RegisterPage />}
				<Divider />
				<FullButton onClick={toggle} type="link">
					切换至{isLogin ? "注册" : "登录"}
				</FullButton>
			</Card>
		</LoginLayout>
	);
};

export default AuthPage;
