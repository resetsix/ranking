import NiceModal from "@ebay/nice-modal-react";
import { useMount, useTitle } from "ahooks";
import { Avatar, Divider, Flex, Input, Space, Table, TableProps, Typography } from "antd";
import { useUserService } from "hooks/useUserService";
import { UserDrawer } from "page/components/Drawers/UserDrawer";
import { useState } from "react";
import { UserListResp } from "types/userList";
import "./index.css";

const { Link } = Typography;

const columns: TableProps<UserListResp>["columns"] = [
	{
		title: "用户",
		width: 200,
		render(value, record) {
			return (
				<Space>
					<Avatar src={record.avatar_url} />
					<span>{record.login}</span>
				</Space>
			);
		},
	},
	{
		title: "粉丝数",
		dataIndex: "followers",
		width: 100,
		render: (value) => value ?? "-",
		sorter: (a, b) => (a.followers ?? 0) - (b.followers ?? 0),
	},
	{
		title: "仓库数",
		dataIndex: "public_repos",
		width: 100,
		render: (value) => value ?? "-",
	},
	{
		title: "地址",
		dataIndex: "location",
		width: 150,
		ellipsis: true,
		render: (value) => value || "-",
	},
	{
		title: "类型",
		dataIndex: "type",
		width: 100,
	},
	{
		title: "操作",
		width: 120,
		fixed: "right",
		render(value, record) {
			return (
				<Space split={<Divider type="vertical" style={{ margin: 0 }} />}>
					<Link href={record.html_url} target="_blank">
						主页
					</Link>
					<Link onClick={() => NiceModal.show("UserDrawer", { data: record })}>详情</Link>
				</Space>
			);
		},
	},
];

const UserList: React.FC = () => {
	useTitle("用户列表");
	const [userName, setUserName] = useState<string>("");
	const { useUserList } = useUserService();
	const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

	const { data, isFetching } = useUserList({
		q: userName ? `${userName} in:login` : "",
		page: pagination.current,
		per_page: pagination.pageSize,
	});

	useMount(() => {
		NiceModal.register("UserDrawer", UserDrawer);
	});

	const handleSearch = (value: string) => {
		setUserName(value);
		setPagination((prev) => ({ ...prev, current: 1 }));
	};

	return (
		<Flex
			vertical
			style={{
				padding: 24,
				maxWidth: 1400,
				margin: "0 auto",
				width: "100%",
			}}
		>
			<Flex
				justify="space-between"
				className="filter-container"
				style={{
					padding: 16,
					backgroundColor: "#fff",
					borderRadius: 8,
					boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
					gap: 16,
				}}
			>
				<Input
					style={{ width: 280 }}
					size="large"
					placeholder="登录名 回车搜索"
					onPressEnter={(e: any) => handleSearch(e.target.value)}
					allowClear
				/>
			</Flex>
			<Table<UserListResp>
				rowKey={(record) => record.id}
				loading={isFetching}
				dataSource={Array.isArray(data?.data) ? data?.data : []}
				columns={columns}
				pagination={false}
				style={{
					borderRadius: 8,
					overflow: "hidden",
					boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
				}}
				rowClassName={(record, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
			/>
		</Flex>
	);
};

export default UserList;
