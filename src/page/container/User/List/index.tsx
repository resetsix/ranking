import { Avatar, Table, TableProps } from "antd";
import LinkButton from "components/Buttons/LinkButton";
import { useUserService } from "hooks/useUserService";
import { UserListResp } from "types/userList";

const columns: TableProps<UserListResp>["columns"] = [
	{
		title: "头像",
		render(value, record, index) {
			return <Avatar src={record.avatar_url} />;
		},
	},
	{
		title: "id",
		dataIndex: "id",
	},
	{
		title: "昵称",
		dataIndex: "login",
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
		render(value, record, index) {
			return <LinkButton label="Github主页" href={record.html_url} />;
		},
	},
];

const UserList: React.FC = () => {
	const { useUserList } = useUserService();
	const { data, isFetching } = useUserList();
	return (
		<Table
			rowKey={(record) => record.id}
			loading={isFetching}
			dataSource={data}
			columns={columns}
			pagination={{
				showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} 条`,
			}}
		/>
	);
};

export default UserList;
