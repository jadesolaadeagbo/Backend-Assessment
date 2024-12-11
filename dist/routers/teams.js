"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teams_controller_1 = require("../controllers/teams.controller");
const index_middlware_1 = require("../middleware/index.middlware");
const router = express_1.default.Router();
router.use(index_middlware_1.authenticateToken);
router.post("/", (0, index_middlware_1.isAdmin)("admin"), teams_controller_1.createTeam);
router.get("/all", teams_controller_1.getAllTeams);
router.get("/getTeam", teams_controller_1.getSingleTeam);
router.patch("/update/:id", (0, index_middlware_1.isAdmin)("admin"), teams_controller_1.updateTeam);
router.delete("/remove/:id", (0, index_middlware_1.isAdmin)("admin"), teams_controller_1.removeTeam);
exports.default = router;
// Authentication and postman
// refresh tokens gateman
