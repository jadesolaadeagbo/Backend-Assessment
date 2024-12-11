import { Team } from "../models/team.model";
import { Request, Response } from "express";

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      res.status(400).json({ message: "Name and description fields are both required!" });
    }
    //@ts-ignore
    if (!req.session.userId) {
      res.status(401).json({ message: "Unauthorized. User not authenticated." });
    }

    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      res
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

    res.status(201).json({ 
      status: "success",
      message: "A new team has been created",
      data: {
        team: {
          id: newTeam._id,
          name: newTeam.name,
          description: newTeam.description,
          logo: newTeam.logo,
          owner: newTeam.owner,
        },
      },
    });
    
  } catch (error) {
    console.error("Error in createTeam controller:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getAllTeams = async(req: any, res: any) =>{
    try{
        console.log("All teamsss")
    } catch(error) {
        console.error(" Error in getTeams controller")
        res.status(500).json({message: "Internal Server Error", error})
    }
}

export const getSingleTeam = async(req: any, res: any) =>{
    try{

    } catch(error) {
        console.error(" Error in getTeams controller")
        res.status(500).json({message: "Internal Server Error", error})
    }
}

export const updateTeam = async(req: any, res: any) =>{
    try{

    } catch(error) {
        console.error(" Error in editTeam controller")
        res.status(500).json({message: "Internal Server Error", error})
    }
}

export const removeTeam = async(req: any, res: any) =>{
    try{

    } catch(error) {
        console.error(" Error in deleteTeam controller")
        res.status(500).json({message: "Internal Server Error", error})
    }
}