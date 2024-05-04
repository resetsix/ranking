import { useTitle } from "ahooks";
import { Form, FormItemProps, Input } from "antd";
import { FullButton } from "page/components/Buttons/FullButton";

const FormItem = Form.Item;

const RegisterPage: React.FC = () => {
	useTitle("注册 | JIRA");

	const rules: FormItemProps["rules"] = [
		{
			required: true,
			message: "请输入确认密码",
		},
		({ getFieldValue }) => ({
			validator(_, value) {
				if (!value || getFieldValue("password") === value) {
					return Promise.resolve();
				}
				return Promise.reject(new Error("两次密码不一致"));
			},
		}),
	];

	return (
		<Form layout="horizontal">
			<FormItem name="username" required>
				<Input placeholder="登录名" />
			</FormItem>
			<FormItem name="password" required>
				<Input.Password placeholder="密码" />
			</FormItem>
			<FormItem name="cpassword" dependencies={["password"]} rules={rules}>
				{/* {({ password }) => <Input.Password placeholder="确认密码" />} */}
				<Input.Password placeholder="确认密码" />
			</FormItem>
			<FormItem>
				<FullButton>注册</FullButton>
			</FormItem>
		</Form>
	);
};

export default RegisterPage;
