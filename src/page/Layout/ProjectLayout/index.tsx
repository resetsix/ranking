import {
	UserOutlined,
	GithubOutlined,
	GlobalOutlined,
	TeamOutlined,
	SearchOutlined,
	InfoCircleOutlined,
	LinkOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Card, Flex, Layout, Menu, Typography } from "antd";
import { PhRankingDuotone } from "components/Icons";
import { COUNTRY_OPTIONS } from "page/container/User/Rank";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";

const { Content, Footer, Sider } = Layout;
const { Link, Title, Text } = Typography;
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
	{ title: "排行榜", label: "排行榜", icon: <PhRankingDuotone />, key: "rank" },
	{ title: "用户列表", label: "用户列表", icon: <UserOutlined style={{ fontSize: 20 }} />, key: "user" },
];

// 计算实际的国家/地区数量
const TOTAL_COUNTRIES = COUNTRY_OPTIONS.reduce((acc, group) => acc + group.options.length, 0);

const StatCard = ({ icon: Icon, value, label, subLabel, style }: any) => (
	<Card
		size="small"
		style={{
			width: "100%",
			border: "none",
			borderRadius: 12,
			overflow: "hidden",
			boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
			transition: "all 0.3s ease",
			...style,
		}}
		hoverable
	>
		<div
			style={{
				position: "absolute",
				top: -20,
				right: -20,
				width: 100,
				height: 100,
				background: "rgba(255,255,255,0.1)",
				borderRadius: "50%",
			}}
		/>
		<div
			style={{
				position: "absolute",
				bottom: -30,
				left: -30,
				width: 120,
				height: 120,
				background: "rgba(255,255,255,0.1)",
				borderRadius: "50%",
			}}
		/>
		<Flex vertical align="center" gap="small">
			<Icon style={{ fontSize: 32 }} />
			<Title level={3} style={{ margin: 0 }}>
				{value}
			</Title>
			<Text strong>{label}</Text>
			{subLabel && (
				<Text type="secondary" style={{ fontSize: 12 }}>
					{subLabel}
				</Text>
			)}
		</Flex>
	</Card>
);

const FeatureCard = ({ icon: Icon, title, description, style }: any) => (
	<Card
		size="small"
		style={{
			border: "none",
			borderRadius: 12,
			overflow: "hidden",
			transition: "all 0.3s ease",
			...style,
		}}
		hoverable
	>
		<Flex vertical gap="small">
			<Flex gap="small" align="center">
				<Icon style={{ fontSize: 24 }} />
				<Text strong>{title}</Text>
			</Flex>
			<Text type="secondary">{description}</Text>
		</Flex>
	</Card>
);

const UserLayout: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [collapsed, setCollapsed] = useState(false);
	const selectedKey = location.pathname.split("/")[1] || "rank";
	const handleSelect: MenuProps["onSelect"] = (selected) => navigate("/" + selected.key);

	// 使用 useSearchParams 替代直接从 location.search 获取参数
	const [searchParams] = useSearchParams();

	// 获取当前选中地区的显示名称
	const getCurrentCityLabel = (cityValue: string) => {
		for (const group of COUNTRY_OPTIONS) {
			const option = group.options.find((opt) => opt.value === cityValue);
			if (option) {
				return option.label;
			}
		}
		return cityValue;
	};

	const getPanelContent = () => {
		switch (selectedKey) {
			case "rank":
				const currentCity = searchParams.get("city") || "China";
				const cityLabel = getCurrentCityLabel(currentCity);

				return (
					<Flex vertical gap="middle">
						<Flex align="center" gap="middle" style={{ padding: "16px 20px 0" }}>
							<GithubOutlined
								style={{
									fontSize: 40,
									background: "linear-gradient(120deg, #1677ff, #52c41a)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
								}}
							/>
							<div>
								<Title level={4} style={{ margin: 0 }}>
									GitHub 开发者排行榜
								</Title>
								<Text type="secondary">探索全球开发者的影响力</Text>
							</div>
						</Flex>

						<Flex gap="middle" style={{ padding: "0 20px" }}>
							<StatCard
								icon={(props: any) => (
									<TeamOutlined {...props} style={{ ...props.style, color: "#1677ff" }} />
								)}
								value="229,796"
								label="开发者总数"
								subLabel={`当前地区: ${cityLabel}`}
								style={{
									background: "linear-gradient(120deg, #e6f4ff 0%, #f6ffed 100%)",
								}}
							/>

							<StatCard
								icon={(props: any) => (
									<GlobalOutlined {...props} style={{ ...props.style, color: "#52c41a" }} />
								)}
								value={`${TOTAL_COUNTRIES}`}
								label="覆盖国家/地区"
								subLabel="遍布全球的开发者社区"
								style={{
									background: "linear-gradient(120deg, #f6ffed 0%, #e6f4ff 100%)",
								}}
							/>
						</Flex>

						<Flex gap="middle" wrap="wrap" style={{ padding: "0 20px 16px" }}>
							<FeatureCard
								icon={(props: any) => (
									<SearchOutlined {...props} style={{ ...props.style, color: "#1677ff" }} />
								)}
								title="排名规则"
								description="按照粉丝数对开发者进行排名"
								style={{ flex: 1, minWidth: 200 }}
							/>
							<FeatureCard
								icon={(props: any) => (
									<GlobalOutlined {...props} style={{ ...props.style, color: "#52c41a" }} />
								)}
								title="地区筛选"
								description="支持按地区筛选查看不同地区的开发者排名"
								style={{ flex: 1, minWidth: 200 }}
							/>
							<FeatureCard
								icon={(props: any) => (
									<InfoCircleOutlined {...props} style={{ ...props.style, color: "#1677ff" }} />
								)}
								title="详细信息"
								description="可查看开发者详细信息及访问其 GitHub 主页"
								style={{ flex: 1, minWidth: 200 }}
							/>
						</Flex>
					</Flex>
				);
			case "user":
				return (
					<Flex vertical gap="middle">
						<Flex align="center" gap="middle" style={{ padding: "16px 20px 0" }}>
							<UserOutlined
								style={{
									fontSize: 40,
									background: "linear-gradient(120deg, #722ed1, #fa8c16)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
								}}
							/>
							<div>
								<Title level={4} style={{ margin: 0 }}>
									GitHub 用户搜索
								</Title>
								<Text type="secondary">快速查找 GitHub 用户信息</Text>
							</div>
						</Flex>

						<Flex gap="middle" wrap="wrap" style={{ padding: "0 20px 16px" }}>
							<FeatureCard
								icon={(props: any) => (
									<SearchOutlined {...props} style={{ ...props.style, color: "#722ed1" }} />
								)}
								title="快速搜索"
								description="支持通过用户名精确搜索"
								style={{
									flex: 1,
									minWidth: 200,
									background: "linear-gradient(120deg, #f9f0ff 0%, #fff7e6 100%)",
								}}
							/>
							<FeatureCard
								icon={(props: any) => (
									<InfoCircleOutlined {...props} style={{ ...props.style, color: "#fa8c16" }} />
								)}
								title="详细信息"
								description="查看用户资料与统计数据"
								style={{
									flex: 1,
									minWidth: 200,
									background: "linear-gradient(120deg, #fff7e6 0%, #f9f0ff 100%)",
								}}
							/>
							<FeatureCard
								icon={(props: any) => (
									<LinkOutlined {...props} style={{ ...props.style, color: "#722ed1" }} />
								)}
								title="便捷访问"
								description="一键跳转至 GitHub 主页"
								style={{
									flex: 1,
									minWidth: 200,
									background: "linear-gradient(120deg, #f9f0ff 0%, #fff7e6 100%)",
								}}
							/>
						</Flex>
					</Flex>
				);
			default:
				return null;
		}
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
					onSelect={handleSelect}
					defaultSelectedKeys={[selectedKey]}
					mode="inline"
					items={items}
				/>
			</Sider>
			<Layout>
				<Content style={{ margin: "12px" }}>
					<Flex vertical gap="middle">
						<Card
							bodyStyle={{ padding: 0 }}
							style={{
								borderRadius: 12,
								overflow: "hidden",
								background: "#fff",
							}}
						>
							{getPanelContent()}
						</Card>
						<Card
							styles={{ body: { padding: 0 } }}
							style={{
								borderRadius: 12,
								overflow: "hidden",
							}}
						>
							<Outlet />
						</Card>
					</Flex>
				</Content>
				<Footer style={{ textAlign: "center", padding: "12px" }}>
					Copyright © {new Date().getFullYear()} Powered by{" "}
					<Link href="https://github.com/resetsix" target="_blank">
						「一闪一闪亮晶晶」
					</Link>
				</Footer>
			</Layout>
		</Layout>
	);
};

export default UserLayout;
