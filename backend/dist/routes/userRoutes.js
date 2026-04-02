"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const express_2 = require("@clerk/express");
const router = (0, express_1.Router)();
// POST api/users/sync => sync clerk user to DB (protected)
router.post("/sync", (0, express_2.requireAuth)(), userControllers_1.syncUser);
exports.default = router;
