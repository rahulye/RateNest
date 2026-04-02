"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncUser = void 0;
/** @format */
const queries = __importStar(require("../db/queries"));
const express_1 = require("@clerk/express");
const syncUser = async (req, res) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId)
            return res.status(401).json({ status: "Error", message: "Unauthorized" });
        const { email, name, imageURL } = req.body;
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
    }
    catch (err) {
        console.error("Error syncing user:", err);
        return res
            .status(500)
            .json({ status: "Server Error", message: "Failed to sync user" });
    }
};
exports.syncUser = syncUser;
