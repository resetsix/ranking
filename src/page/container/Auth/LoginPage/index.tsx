import { useTitle } from "ahooks";
import { App, Form, FormProps, Input } from "antd";
import { useAuthService } from "hooks/useAuth";
import { FullButton } from "page/components/Buttons/FullButton";

const FormItem = Form.Item;

const LoginPage: React.FC = () => {
	useTitle("登录 | JIRA");
	const [form] = Form.useForm();
	const { message } = App.useApp();
	const { useUserLogin } = useAuthService();
	const { mutate, isPending } = useUserLogin();

	const handleFinish: FormProps["onFinish"] = (value) => {
		mutate(value, {
			onSuccess(data: any) {
				if (data.code === "200") {
					message.success({ key: "login", content: data.message });
				} else if (data.code === "400") {
					message.warning({ key: "login", content: data.message });
				}
			},
		});
	};

	return (
		<Form form={form} onFinish={handleFinish}>
			<FormItem name="username" required>
				<Input placeholder="登录名 默认：jack" />
			</FormItem>
			<FormItem name="password" required>
				<Input.Password placeholder="密码 默认：123456" />
			</FormItem>
			<FormItem>
				<FullButton htmlType="submit" loading={isPending}>
					登录
				</FullButton>
			</FormItem>
		</Form>
	);
};

export default LoginPage;
