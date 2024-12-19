import express from 'express'
import {createTeam, getAllTeams, searchTeams, getSingleTeam, updateTeam, removeTeam} from "../controllers/teams.controller"
import { authenticateToken, isAdmin } from '../middleware/index.middlware';

const router = express.Router();
    
    router.get("/search", searchTeams)

    router.use(authenticateToken);

    router.post("/", isAdmin("admin"), createTeam)
    router.get("/", getAllTeams)
    router.get("/:teamId", getSingleTeam)
    router.patch("/:teamId", isAdmin("admin"), updateTeam)
    router.delete("/:teamId", isAdmin("admin"), removeTeam)

export default router 

// Authentication and postman
// refresh tokens gateman 