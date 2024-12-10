import express from 'express'
import {createTeam, getAllTeams, getSingleTeam, updateTeam, removeTeam} from "../controllers/teams.controller"
import { authenticateToken, isAdmin } from '../middleware/index.middlware';

const router = express.Router();
    router.use(authenticateToken);

    router.post("/create", isAdmin("admin"), createTeam)
    router.get("/all", getAllTeams)
    router.get("/getTeam", getSingleTeam)
    router.patch("/update/:id", isAdmin("admin"), updateTeam)
    router.delete("/remove/:id", isAdmin("admin"), removeTeam)

export default router 

// Authentication and postman
// refresh tokens gateman