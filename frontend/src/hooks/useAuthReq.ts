/** @format */
// this called only when an api request

import { useEffect } from "react";
import { useAuth } from "@clerk/react";
import api from "../lib/axios";

let isInterceptorRegistered = false;
// Attach a Clerk auth token to every Axios request (when signed in)
const useAuthReq = () => {
	const { isLoaded, getToken, isSignedIn } = useAuth();
	useEffect(() => {
		if (isInterceptorRegistered) return;
		isInterceptorRegistered = true;
		const interceptor = api.interceptors.request.use(async (config) => {
			// axios automatically pass this config object
			const token = await getToken();
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config; // sends this to axios pipeline internally
		});
		// react run this clean up regardless of if condition
		return () => {
			api.interceptors.request.eject(interceptor);
			isInterceptorRegistered = false;
		};
	}, [getToken]);

	return { isClerkLoaded: isLoaded, isSignedIn };
};

export default useAuthReq;
