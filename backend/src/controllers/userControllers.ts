/** @format */
import * as queries from "../db/queries";
import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import type { SyncUserBody } from "../types/user";

const syncUser = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req);
		if (!userId)
			return res.status(401).json({ status: "Error", message: "Unauthorized" });
		const { email, name, imageURL } = req.body as SyncUserBody;
		if (!email || !name || !imageURL)
			return res.status(400).json({
				status: "Error",
				message: "Email, name, imageURL are required",
			});
		const user = await queries.upsertUser({
			id: userId,
			email,
			name,
			imageURL,
		});
		return res.status(201).json({
			status: "Success",
			data: user,
		});
	} catch (err) {
		console.error("Error syncing user:", err);
		return res
			.status(500)
			.json({ status: "Server Error", message: "Failed to sync user" });
	}
};

  

export { syncUser };
