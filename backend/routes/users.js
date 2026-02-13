import express from "express";

import { verifyRole, verifyToken } from "../middlewares/authMiddleware.js";

import { getUsers, getProfile, getLogs } from "../controllers/userAuth.js";

const router = express.Router();

router.get("/", verifyToken, verifyRole("admin"), getUsers);
router.get("/me", verifyToken, getProfile);
router.get("/audit", verifyToken, verifyRole("admin"), getLogs);

export default router;
