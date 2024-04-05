import { Button, ButtonProps } from "antd";

export const FullButton: React.FC<ButtonProps> = ({ ...props }) => {
	return <Button type="primary" style={{ width: "100%" }} {...props} />;
};
