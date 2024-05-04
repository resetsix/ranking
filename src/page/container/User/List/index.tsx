import NiceModal from "@ebay/nice-modal-react";
import { useMount, useTitle } from "ahooks";
import { Avatar, Flex, Input, Select, Space, Table, TableProps } from "antd";
import LinkButton from "components/Buttons/LinkButton";
import { useUserService } from "hooks/useUserService";
import { UserDrawer } from "page/components/Drawers/UserDrawer";
import { useState } from "react";
import { UserListResp } from "types/userList";

const columns: TableProps<UserListResp>["columns"] = [
	{
		title: "用户",
		dataIndex: "avatar_url",
		render(value, record, index) {
			return <Avatar src={value} />;
		},
	},
	{
		title: "id",
		dataIndex: "id",
	},
	{
		title: "登录名",
		dataIndex: "login",
		render(value, record, index) {
			return <LinkButton label={value} onClick={() => NiceModal.show("UserDrawer", { data: record })} />;
		},
	},
	{
		title: "主页",
		dataIndex: "html_url",
	},
	{
		title: "类型",
		dataIndex: "type",
	},
	{
		title: "操作",
		dataIndex: "html_url",
		render(value, record, index) {
			return <LinkButton label="Github主页" href={value} />;
		},
	},
];

const UserList: React.FC = () => {
	useTitle("用户列表");
	const [userName, setUserName] = useState<string>("");
	const { useUserList, useGetUser } = useUserService();
	const { data, isFetching } = useUserList();
	const { data: user } = useGetUser(userName);

	useMount(() => {
		NiceModal.register("UserDrawer", UserDrawer);
	});

	return (
		<Flex vertical>
			<Space>
				<Select options={[]} placeholder="选择地区" />
				<Input placeholder="输入登录名回车搜索" onPressEnter={(e: any) => setUserName(e.target.value)} />
			</Space>
			<Table<any>
				rowKey={(record) => record?.id}
				loading={isFetching}
				dataSource={userName ? [user] : data}
				columns={columns}
				pagination={{
					showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} 条`,
				}}
			/>
		</Flex>
	);
};

export default UserList;
