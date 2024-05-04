import { Button, ButtonProps } from "antd";
import React from "react";

interface LinkButtonProps extends ButtonProps {
	label?: string | null;
}

const LinkButton: React.FC<LinkButtonProps> = (props) => {
	const { label = "", target = "_blank", ...rest } = props;
	return (
		<Button {...rest} type="link" target={target} style={{ margin: 0, padding: 0, height: 0 }}>
			{label}
		</Button>
	);
};

export default LinkButton;
