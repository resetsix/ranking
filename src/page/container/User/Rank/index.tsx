import NiceModal from "@ebay/nice-modal-react";
import { useMount, useTitle } from "ahooks";
import { Avatar, Table, TableProps, Typography } from "antd";
import LinkButton from "components/Buttons/LinkButton";
import { useUserService } from "hooks/useUserService";
import { UserDrawer } from "page/components/Drawers/UserDrawer";
import { UserData } from "types/userRank";

const { Text } = Typography;

const UserRank: React.FC = () => {
	useTitle("排行榜");
	const { useUserRank } = useUserService();
	const { data, isFetching } = useUserRank({ q: "location:China", sort: "followers", order: "desc" });

	useMount(() => {
		NiceModal.register("UserDrawer", UserDrawer);
	});

	const columns: TableProps<UserData>["columns"] = [
		{
			title: "排名",
			render(value, record, index) {
				return index + 1;
			},
		},
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
			title: "类型",
			dataIndex: "type",
		},
		{
			title: "主页地址",
			dataIndex: "html_url",
			render(value, record, index) {
				return <Text copyable>{value}</Text>;
			},
		},

		{
			title: "操作",
			dataIndex: "html_url",
			render(value, record, index) {
				return <LinkButton label="Github主页" href={value} />;
			},
		},
	];

	return (
		<Table
			rowKey={(record) => record.id}
			loading={isFetching}
			dataSource={data?.items}
			columns={columns}
			pagination={{
				showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} 条`,
			}}
		/>
	);
};

export default UserRank;
