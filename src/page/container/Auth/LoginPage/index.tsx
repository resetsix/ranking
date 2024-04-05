import { useTitle } from "ahooks";
import { Form, Input } from "antd";
import { FullButton } from "page/components/Buttons/FullButton";

const FormItem = Form.Item;

const LoginPage: React.FC = () => {
	useTitle("登录 | JIRA");

	return (
		<Form>
			<FormItem name="username" required>
				<Input placeholder="登录名" />
			</FormItem>
			<FormItem name="password" required>
				<Input.Password placeholder="密码" />
			</FormItem>
			<FormItem>
				<FullButton>登录</FullButton>
			</FormItem>
		</Form>
	);
};

export default LoginPage;
