import { Pagination, type PaginationProps } from "antd";

const TablePagination = ({ ...props }: PaginationProps) => {
	return (
		<Pagination
			size="small"
			showSizeChanger
			defaultPageSize={20}
			showTotal={(total) => `共计：${total ?? 0}`}
			pageSizeOptions={["30", "50", "100", "300", "500", "1000"]}
			{...props}
		/>
	);
};

export default TablePagination;
