import { Team } from "../models/team.model";
import { Request, Response } from "express";

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, description, squad } = req.body;

    if (!name || !description || !squad) {
      res.status(400).json({ message: "Name and description fields are both required!" });
    }
    if (!squad.goalkeepers || !squad.defenders || !squad.midfielders || !squad.forwards) {
       res.status(400).json({ message: "Squad must include all player categories." });
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
      // @ts-ignore
      owner: req.session.userId,
      squad: squad || {}
    });

    await newTeam.save();

    res.status(201).json({ 
      status: "OK",
      message: "Team created successfully!",
      data: {
        team: {
          id: newTeam._id,
          name: newTeam.name,
          overview: newTeam.description,
          logo: newTeam.logo,
          ownerId: newTeam.owner,
          squad: newTeam.squad,
          createdAt: newTeam.createdAt
        },
      },
    });
    
  } catch (error) {
    console.error("Error in createTeam controller:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getAllTeams = async(req: Request, res: Response) =>{
    try{
        const teams = await Team.find();

        if (!teams || teams.length === 0){
          res.status(404).json({
            status:"Not Found",
            message: "No Teams Found"
          })
        }
        res.status(200).json({
          status:"OK",
          message: "Teams returned successfully!",
          data:{
            teams: teams
          }

        })
    } catch(error) {
        console.error(" Error in getTeams controller:", error)
        res.status(500).json({message: "Internal Server Error", error})
    }
}

export const getSingleTeam = async(req: Request, res: Response) =>{
    try{
      const { teamId } = req.params;

      const team = await Team.findById(teamId);

      if(!team){
        res.status(404).json({
          status:"Not Found",
          message: `No Team with id ${teamId} Found`
        })
      }

      res.status(200).json({
        status:"OK",
        message: "Team returned successfully!",
        data:{
          team
        }

      })
    } catch(error) {
        console.error(" Error in getTeams controller")
        res.status(500).json({message: "Internal Server Error", error})
    }
}

export const updateTeam = async(req: Request, res: Response) =>{
    try{
      const { teamId } = req.params;
      const { name, description, squad } = req.body;

      const updatedFields: any= {};
      if (name) updatedFields.name = name;
      if (description) updatedFields.description = description;
      if (squad) updatedFields.squad = squad;

      const updatedTeam = await Team.findOneAndUpdate(
        { _id: teamId },
        { $set: updatedFields }, 
        { new: true } 
      );

      if(!updatedTeam){
        res.status(404).json({
          status:"Not Found",
          message: `No Team with id ${teamId} Found`
        })
      }

      res.status(200).json({
        status:"OK",
        message: "Team updated successfully!",
        data:{
          updatedTeam
        }

      })
    } catch(error) {
        console.error(" Error in editTeam controller")
        res.status(500).json({message: "Internal Server Error", error})
    }
}

export const removeTeam = async(req: Request, res: Response) =>{
    try{
      const {teamId} = req.params
      const deletedTeam = await Team.findByIdAndDelete(teamId);

      if(!deletedTeam){
        res.status(404).json({
          status:"Not Found",
          message: `No Team with id ${teamId} Found`
        })
      }
      res.status(200).json({
        status:"OK",
        message: "Team has been deleted successfully!"
      })
      
    } catch(error) {
        console.error(" Error in deleteTeam controller")
        res.status(500).json({message: "Internal Server Error", error})
    }
}