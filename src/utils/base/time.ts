import dayjs from "dayjs";

export const time = (timeString: string, format: string = "YYYY-MM-DD HH:mm:ss"): string =>
	dayjs(timeString).format(format);
