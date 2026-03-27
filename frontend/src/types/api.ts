/** @format */

interface ApiResponse<T> {
	status: "Success" | "Error";
	message: string;
	data: T;
}

export type { ApiResponse };
