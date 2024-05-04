import NiceModal from "@ebay/nice-modal-react";
import { useMount, useTitle } from "ahooks";
import { Avatar, Flex, Select, Space, Table, TableProps, Typography } from "antd";
import LinkButton from "components/Buttons/LinkButton";
import { useUserService } from "hooks/useUserService";
import { UserDrawer } from "page/components/Drawers/UserDrawer";
import { useState } from "react";
import { UserData } from "types/userRank";

const { Text } = Typography;

const COUNTRY_OPTIONS = [
	{ label: "China（中国）", value: "China" },
	{ label: "Singapore（新加坡）", value: "Singapore" },
	{ label: "Japan（日本）", value: "Japan" },
	{ label: "India（印度）", value: "India" },
	{ label: "United States（美国）", value: "United States" },
	{ label: "Russia（俄罗斯）", value: "Russia" },
	{ label: "Canada（加拿大）", value: "Canada" },
	{ label: "Germany（德国）", value: "Germany" },
	{ label: "France（法国）", value: "France" },
	{ label: "United Kingdom（英国）", value: "United Kingdom" },
	{ label: "Australia（澳大利亚）", value: "Australia" },
	{ label: "Vietnam（越南）", value: "Vietnam" },
	{ label: "Brazil（巴西）", value: "Brazil" },
];

const UserRank: React.FC = () => {
	useTitle("排行榜");
	const { useUserRank } = useUserService();
	const [city, setCity] = useState("China");
	const { data, isFetching } = useUserRank({
		q: `location:${city}`,
		sort: "followers",
		order: "desc",
	});

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
		<Flex vertical>
			<Space>
				开发者城市
				<Select
					options={COUNTRY_OPTIONS}
					style={{ minWidth: 200 }}
					value={city}
					onSelect={setCity}
					placeholder="选择地区"
				/>
			</Space>
			<Table
				rowKey={(record) => record.id}
				loading={isFetching}
				dataSource={data?.items}
				columns={columns}
				pagination={{
					showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} 条`,
				}}
			/>
		</Flex>
	);
};

export default UserRank;
