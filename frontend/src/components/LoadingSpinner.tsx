/** @format */

import { Loader } from "lucide-react";

const LoadingSpinner = () => {
	return (
		<div className="flex flex-col py-20 gap-2 justify-center items-center">
			<Loader className="animate-spin size-6 text-primary" />
			<p className="text-base-content/50 text-sm">Loading..</p>
		</div>
	);
};

export default LoadingSpinner;
