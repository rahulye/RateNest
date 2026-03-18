/** @format */

import { Router } from "express";
import { syncUser } from "../controllers/userControllers";
import { requireAuth } from "@clerk/express";
const router = Router();

// POST api/users/sync => sync clerk user to DB (protected)
router.post("/sync", requireAuth(), syncUser);

export default router;
