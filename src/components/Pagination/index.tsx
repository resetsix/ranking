import { Pagination, type PaginationProps } from "antd";

const TablePagination = ({ ...props }: PaginationProps) => {
	return (
		<Pagination
			size="small"
			showSizeChanger
			defaultPageSize={20}
			showTotal={(total) => `共计：${total ?? 0}`}
			pageSizeOptions={["10", "20", "30", "50", "100"]}
			{...props}
		/>
	);
};

export default TablePagination;
