import { ProDescriptions } from "@ant-design/pro-components";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Drawer } from "antd";
import LinkButton from "components/Buttons/LinkButton";
import { useUserService } from "hooks/useUserService";
import React from "react";
import { UserData } from "types/userRank";
import { conditional } from "utils/base/conditional";
import { time } from "utils/base/time";

interface UserDrawerProps {
	data: UserData;
}

const contentStyle: React.CSSProperties = { maxWidth: "80%" };

export const UserDrawer = NiceModal.create<UserDrawerProps>(({ data }) => {
	const modal = useModal();
	const { login } = data;
	const { useGetUser } = useUserService();
	const { data: userInfo, isFetching } = useGetUser(login);

	return (
		<Drawer loading={isFetching} size="large" title={`${login} 用户信息`} open={modal.visible} onClose={modal.hide}>
			<ProDescriptions column={2}>
				<ProDescriptions.Item label="姓名" valueType="text" contentStyle={contentStyle}>
					{userInfo?.name}
				</ProDescriptions.Item>
				<ProDescriptions.Item label="简介" valueType="text" contentStyle={contentStyle}>
					{userInfo?.bio}
				</ProDescriptions.Item>
				<ProDescriptions.Item label="地址" valueType="text" contentStyle={contentStyle}>
					{userInfo?.location}
				</ProDescriptions.Item>
				<ProDescriptions.Item label="公司" valueType="text" contentStyle={contentStyle}>
					{userInfo?.company}
				</ProDescriptions.Item>
				<ProDescriptions.Item label="博客" valueType="text" contentStyle={contentStyle}>
					{conditional({
						condition: !!userInfo?.blog,
						whenTrue: <LinkButton label={userInfo?.blog} href={userInfo?.blog} />,
						whenFalse: "-",
					})}
				</ProDescriptions.Item>
				<ProDescriptions.Item label="推特" valueType="text" contentStyle={contentStyle}>
					{conditional({
						condition: !!userInfo?.twitter_username,
						whenTrue: (
							<LinkButton
								label={userInfo?.twitter_username}
								href={"https://twitter.com/" + userInfo?.twitter_username}
							/>
						),
						whenFalse: "-",
					})}
				</ProDescriptions.Item>
				<ProDescriptions.Item label="公共仓库" valueType="text" contentStyle={contentStyle}>
					{userInfo?.public_repos}
				</ProDescriptions.Item>
				<ProDescriptions.Item label="公共代码片段" valueType="text" contentStyle={contentStyle}>
					{userInfo?.public_gists}
				</ProDescriptions.Item>
				<ProDescriptions.Item label="关注" valueType="text" contentStyle={contentStyle}>
					{userInfo?.following}
				</ProDescriptions.Item>
				<ProDescriptions.Item label="粉丝" valueType="text" contentStyle={contentStyle}>
					{userInfo?.followers}
				</ProDescriptions.Item>
				<ProDescriptions.Item label="创建时间" valueType="text" contentStyle={contentStyle}>
					{time(userInfo?.created_at ?? "")}
				</ProDescriptions.Item>
				<ProDescriptions.Item label="更新时间" valueType="text" contentStyle={contentStyle}>
					{time(userInfo?.updated_at ?? "")}
				</ProDescriptions.Item>
			</ProDescriptions>
		</Drawer>
	);
});
