import NiceModal from "@ebay/nice-modal-react";
import { useMount, useTitle } from "ahooks";
import { Avatar, Divider, Flex, Select, Space, Table, TableProps, Typography } from "antd";
import TablePagination from "components/Pagination";
import { useUserService } from "hooks/useUserService";
import { UserDrawer } from "page/components/Drawers/UserDrawer";
import { useState } from "react";
import { UserData } from "types/userRank";
import { useSearchParams } from "react-router-dom";

const { Link } = Typography;

export const COUNTRY_OPTIONS = [
	{
		label: "东亚及东南亚",
		options: [
			{ label: "China（中国区）", value: "China" },
			{ label: "Singapore（新加坡）", value: "Singapore" },
			{ label: "Japan（日本）", value: "Japan" },
			{ label: "Malaysia（马来西亚）", value: "Malaysia" },
			{ label: "South Korea（韩国）", value: "South Korea" },
			{ label: "Indonesia（印度尼西亚）", value: "Indonesia" },
			{ label: "Thailand（泰国）", value: "Thailand" },
			{ label: "Vietnam（越南）", value: "Vietnam" },
			{ label: "Philippines（菲律宾）", value: "Philippines" },
		],
	},
	{
		label: "南亚及中东",
		options: [
			{ label: "India（印度）", value: "India" },
			{ label: "United Arab Emirates（阿联酋）", value: "UAE" },
			{ label: "Saudi Arabia（沙特阿拉伯）", value: "Saudi Arabia" },
			{ label: "Israel（以色列）", value: "Israel" },
			{ label: "Turkey（土耳其）", value: "Turkey" },
		],
	},
	{
		label: "北美洲",
		options: [
			{ label: "United States（美国）", value: "United States" },
			{ label: "Canada（加拿大）", value: "Canada" },
			{ label: "Mexico（墨西哥）", value: "Mexico" },
		],
	},
	{
		label: "南美洲",
		options: [
			{ label: "Brazil（巴西）", value: "Brazil" },
			{ label: "Argentina（阿根廷）", value: "Argentina" },
			{ label: "Chile（智利）", value: "Chile" },
			{ label: "Colombia（哥伦比亚）", value: "Colombia" },
		],
	},
	{
		label: "欧洲",
		options: [
			{ label: "United Kingdom（英国）", value: "United Kingdom" },
			{ label: "Germany（德国）", value: "Germany" },
			{ label: "France（法国）", value: "France" },
			{ label: "Italy（意大利）", value: "Italy" },
			{ label: "Spain（西班牙）", value: "Spain" },
			{ label: "Netherlands（荷兰）", value: "Netherlands" },
			{ label: "Switzerland（瑞士）", value: "Switzerland" },
			{ label: "Sweden（瑞典）", value: "Sweden" },
			{ label: "Norway（挪威）", value: "Norway" },
			{ label: "Finland（芬兰）", value: "Finland" },
			{ label: "Denmark（丹麦）", value: "Denmark" },
			{ label: "Poland（波兰）", value: "Poland" },
			{ label: "Austria（奥地利）", value: "Austria" },
			{ label: "Belgium（比利时）", value: "Belgium" },
			{ label: "Ireland（爱尔兰）", value: "Ireland" },
			{ label: "Greece（希腊）", value: "Greece" },
			{ label: "Russia（俄罗斯）", value: "Russia" },
		],
	},
	{
		label: "大洋洲",
		options: [
			{ label: "Australia（澳大利亚）", value: "Australia" },
			{ label: "New Zealand（新西兰）", value: "New Zealand" },
		],
	},
	{
		label: "其他地区",
		options: [
			{ label: "South Africa（南非）", value: "South Africa" },
			{ label: "Egypt（埃及）", value: "Egypt" },
		],
	},
];

const UserRank: React.FC = () => {
	useTitle("排行榜");
	const [searchParams, setSearchParams] = useSearchParams();
	const city = searchParams.get("city") || "China";
	const [pagination, setPagination] = useState({ current: 1, pageSize: 30 });
	const { useUserRank } = useUserService();
	const { data, isFetching } = useUserRank({
		q: `location:${city}`,
		sort: "followers",
		order: "desc",
		page: pagination.current,
		per_page: pagination.pageSize,
	});

	useMount(() => {
		NiceModal.register("UserDrawer", UserDrawer);
	});

	const handleCityChange = (value: string) => {
		setSearchParams({ city: value });
		setPagination((prev) => ({ ...prev, current: 1 }));
	};

	const columns: TableProps<UserData>["columns"] = [
		{
			title: "排名",
			width: 80,
			render(value, record, index) {
				return (pagination.current - 1) * pagination.pageSize + index + 1;
			},
		},
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

	return (
		<Flex vertical style={{ padding: 16 }}>
			<Flex justify="space-between" style={{ marginBottom: 16 }}>
				<Space>
					开发者城市
					<Select
						options={COUNTRY_OPTIONS}
						style={{ minWidth: 200 }}
						value={city}
						onChange={handleCityChange}
						placeholder="选择地区"
						optionFilterProp="label"
					/>
				</Space>
				<TablePagination
					current={pagination.current}
					pageSize={pagination.pageSize}
					total={data?.total_count ?? 0}
					onChange={(page, pageSize) => setPagination({ current: page, pageSize })}
					showTotal={(total) => `共计： ${total ?? 0}`}
				/>
			</Flex>
			<Table
				size="small"
				rowKey={(record) => record.id}
				loading={isFetching}
				dataSource={data?.items}
				columns={columns}
				pagination={false}
			/>
		</Flex>
	);
};

export default UserRank;
