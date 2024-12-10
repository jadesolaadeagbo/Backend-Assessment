import { Team } from "../models/team.model";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/index.middlware";

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and description fields are both required!" });
    }
    //@ts-ignore
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized. User not authenticated." });
    }

    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return res
        .status(400)
        .json({ message: "A team with this name already exists." });
    }

    const sanitizedTeamName = encodeURIComponent(name.trim());
    const teamLogo = `https://avatar.iran.liara.run/username?username=${sanitizedTeamName}`;

    const newTeam = new Team({
      name: name.trim(),
      description: description.trim(),
      logo: teamLogo,
      // owner: req.user._id,
    });

    await newTeam.save();

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
  } catch (error) {
    console.error("Error in createTeam controller:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getAllTeams = async(req: any, res: any) =>{
    try{
        console.log("All teamsss")
    } catch(error) {
        console.error(" Error in getTeams controller")
        return res.status(500).json({message: "Internal Server Error", error})
    }
}

export const getSingleTeam = async(req: any, res: any) =>{
    try{

    } catch(error) {
        console.error(" Error in getTeams controller")
        return res.status(500).json({message: "Internal Server Error", error})
    }
}

export const updateTeam = async(req: any, res: any) =>{
    try{

    } catch(error) {
        console.error(" Error in editTeam controller")
        return res.status(500).json({message: "Internal Server Error", error})
    }
}

export const removeTeam = async(req: any, res: any) =>{
    try{

    } catch(error) {
        console.error(" Error in deleteTeam controller")
        return res.status(500).json({message: "Internal Server Error", error})
    }
}