/** @format */

import { useAuth, useUser } from "@clerk/react";
import { useMutation } from "@tanstack/react-query";
import { syncUser } from "../lib/api";
import { useEffect } from "react";

const useSyncUser = () => {
	const { isSignedIn } = useAuth();
	const { user } = useUser();
	const { mutate, isPending, isSuccess } = useMutation({
		mutationFn: syncUser,
	});
	useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress;
		if (isSignedIn && email && user && !isPending && !isSuccess) {
			mutate({
				email,
				name: user.username ?? user.fullName ?? user.firstName ?? "User" ,
				imageURL: user.imageUrl,
			});
		}
	}, [isSignedIn, isPending, user, isSuccess, mutate]);  // react rule : If a value is read inside useEffect, it must be listed as a dependency.
                                                          // and also to keep up with the field changes
	return { isSynced: isSuccess };
};

export default useSyncUser;
