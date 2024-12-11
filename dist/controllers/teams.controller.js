"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTeam = exports.updateTeam = exports.getSingleTeam = exports.getAllTeams = exports.createTeam = void 0;
const team_model_1 = require("../models/team.model");
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "Name and description fields are both required!" });
        }
        //@ts-ignore
        if (!req.session.userId) {
            return res.status(401).json({ message: "Unauthorized. User not authenticated." });
        }
        const existingTeam = yield team_model_1.Team.findOne({ name });
        if (existingTeam) {
            return res
                .status(400)
                .json({ message: "A team with this name already exists." });
        }
        const sanitizedTeamName = encodeURIComponent(name.trim());
        const teamLogo = `https://avatar.iran.liara.run/username?username=${sanitizedTeamName}`;
        const newTeam = new team_model_1.Team({
            name: name.trim(),
            description: description.trim(),
            logo: teamLogo,
            // owner: req.user._id,
        });
        yield newTeam.save();
        // return res.status(201).json({
        //   message: "A new team has been created",
        //   team: {
        //     id: newTeam._id,
        //     name: newTeam.name,
        //     description: newTeam.description,
        //     logo: newTeam.logo,
        //     owner: newTeam.owner,
        //   },
        // });
    }
    catch (error) {
        console.error("Error in createTeam controller:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
exports.createTeam = createTeam;
const getAllTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("All teamsss");
    }
    catch (error) {
        console.error(" Error in getTeams controller");
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
exports.getAllTeams = getAllTeams;
const getSingleTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.error(" Error in getTeams controller");
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
exports.getSingleTeam = getSingleTeam;
const updateTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.error(" Error in editTeam controller");
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
exports.updateTeam = updateTeam;
const removeTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.error(" Error in deleteTeam controller");
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
exports.removeTeam = removeTeam;
