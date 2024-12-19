import { Request, Response } from "express";
import { Fixture } from "../models/fixtures.model";
import { v4 as uuidv4 } from 'uuid'; 
import redisClient from "../utils/redisConnection.utils";

export const createFixture = async (req: Request, res: Response) => {
    try {
        const { homeTeam, awayTeam, fixtureDate, score } = req.body;

        if(!homeTeam|| !awayTeam || !fixtureDate){
            res.status(400).json({
                status: "Bad Request",
                message: "Home Team, Away Team and Date are required fields!" 
            })
        }

        const formattedDate = new Date(fixtureDate);

        if(isNaN(formattedDate.getTime())){
            res.status(400).json({
                status:"Bad Request",
                message:"Invalid date format provided!"
            })
        }

        let status: "pending" | "completed";
        if (formattedDate >= new Date()) {
          status = "pending";
        } else {
          status = "completed";
        }
        
        if (status === 'completed' && !score){
            res.status(400).json({
                status:"Bad Request",
                message:"Scores must be provided for completed fixtures!"
            })
        }

        const newFixture = new Fixture({
            homeTeam,
            awayTeam,
            fixtureDate: formattedDate,
            status,
            score: status === "completed" ? score : null
        })

        await newFixture.save();

        res.status(201).json({
            status:"Success",
            message:"A new fixture has been successfully created!",
            data: {
                newFixture
            }
        })
    } catch(error){
        console.error("Error in createFixture controller:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const generateFixtureLink = async (req: Request, res: Response) => {
    try {
        const { homeTeam, awayTeam, fixtureDate, score } = req.body;

        if(!homeTeam|| !awayTeam || !fixtureDate){
            res.status(400).json({
                status: "Bad Request",
                message: "Home Team, Away Team and Date are required fields!" 
            })
        }

        const formattedDate = new Date(fixtureDate);

        if(isNaN(formattedDate.getTime())){
            res.status(400).json({
                status:"Bad Request",
                message:"Invalid date format provided!"
            })
        }

        let status: "pending" | "completed";
        if (formattedDate >= new Date()) {
          status = "pending";
        } else {
          status = "completed";
        }
        
        if (status === 'completed' && !score){
            res.status(400).json({
                status:"Bad Request",
                message:"Scores must be provided for completed fixtures!"
            })
        }

        const uniqueLink = `${req.protocol}://${req.get('host')}/fixtures/${uuidv4()}`;
        const newFixture = new Fixture({
            homeTeam,
            awayTeam,
            fixtureDate: formattedDate,
            status,
            score: status === "completed" ? score : null,
            uniqueLink
        })

        await newFixture.save();

        res.status(201).json({
            status:"Success",
            message:"A new fixture has been successfully created!",
            data: {
                newFixture
            }
        })
    } catch(error){
        console.error("Error in createFixture controller:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const getAllFixtures = async (req: Request, res: Response) => {
    try {
        const {status} = req.query;
        const query :any = {};

    if (status) {
        if (status !== "completed" && status !== "pending") {
         res.status(400).json({
            status: "Bad Request",
            message: "Invalid status. Valid values are 'completed' or 'pending'.",
          });
        }
        query.status = status; 
      }
      
        const fixtures = await Fixture.find(query);

        if (!fixtures|| fixtures.length === 0){
            res.status(401).json({
                status:"Not Found",
                message:"No Fixtures Found!"
            })
        }

        res.status(200).json({
            status:"OK",
            message:"Fixtures returned successfully!",
            data: {
                fixtures
            }
        })
    } catch(error){
        console.error("Error in getAllFixtures controller:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const searchFixtures = async (req: Request, res: Response) => {
    try {
        const {status, homeTeam, awayTeam, fixtureDate} = req.query;
        const query :any = {};

        if (homeTeam) query.homeTeam = { $regex: homeTeam, $options: "i" }; 
        if (awayTeam) query.awayTeam = { $regex: awayTeam, $options: "i" }; 

        if (fixtureDate) {
            const parsedDate = new Date(fixtureDate as string);
            if (isNaN(parsedDate.getTime())) {
                res.status(400).json({
                    status: "Bad Request",
                    message: "Invalid fixtureDate format!",
                });
            }
            query.fixtureDate = parsedDate; 
    }

    if (status) {
        if (status !== "completed" && status !== "pending") {
         res.status(400).json({
            status: "Bad Request",
            message: "Invalid status. Valid values are 'completed' or 'pending'.",
          });
        }
        query.status = status; 
      }
      
        const fixtures = await Fixture.find(query);

        if (!fixtures|| fixtures.length === 0){
            res.status(401).json({
                status:"Not Found",
                message:"No Fixtures Found!"
            })
        }

        res.status(200).json({
            status:"OK",
            message:"Fixtures returned successfully!",
            data: {
                fixtures
            }
        })
    } catch(error){
        console.error("Error in getAllFixtures controller:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const getSingleFixture = async (req: Request, res: Response) => {
    try {
        const {fixtureId} = req.params;
        const fixture = await Fixture.findOne({
            $or: [
            {_id: fixtureId},
            { uniqueLink: `${req.protocol}://${req.get("host")}/fixtures/${fixtureId}` }
            ]}
        );


        if (!fixture){
            res.status(401).json({
                status:"Not Found",
                message:`No Fixture with id ${fixtureId} Found!`
            })
        }

        res.status(200).json({
            status:"OK",
            message:"Fixture returned successfully!",
            data: {
                fixture
            }
        })    } catch(error){
        console.error("Error in getSingleFixture controller:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const updateFixture = async (req: Request, res: Response) => {
    try {
        const {fixtureId} = req.params;
        const {homeTeam, awayTeam, scores, fixtureDate} = req.body;

        const updatedFields: any= {};
        if (homeTeam) updatedFields.homeTeam = homeTeam;
        if (awayTeam) updatedFields.awayTeam = awayTeam;
        if (fixtureDate) {
            const parsedDate = new Date(fixtureDate);
            if (isNaN(parsedDate.getTime())) {
              res.status(400).json({
                status: "Bad Request",
                message: "Invalid fixtureDate format!",
              });
            }
            updatedFields.fixtureDate = parsedDate;        
            updatedFields.status = parsedDate >= new Date() ? "pending" : "completed";
        }
            
        if (scores) {
            if (updatedFields.status === "completed") {
              updatedFields.scores = scores;
            } else {
              res.status(400).json({
                status: "Bad Request",
                message: "Scores can only be updated for completed fixtures!",
              });
            }
          }
        
        const updatedFixture = await Fixture.findOneAndUpdate(
            {_id: fixtureId },
            {$set: updatedFields},
            {new: true}
        )

        if(!updatedFixture){
            res.status(404).json({
              status:"Not Found",
              message:`No fixture with id ${fixtureId} Found!`
            })
          }
    
          res.status(200).json({
            status:"OK",
            message: "Team updated successfully!",
            data:{
              updatedFixture
            }
    
          })
    } catch(error){
        console.error("Error in updateFixture controller:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const deleteFixture = async (req: Request, res: Response) => {
    try {
        const {fixtureId} = req.params;
        const deletedFixture = await Fixture.findByIdAndDelete(fixtureId);
        if (!fixtureId){
            res.status(401).json({
                status:"Not Found",
                message:`No fixture with id ${fixtureId} Found!`
            })
        }

        res.status(200).json({
            status:"OK",
            message:"Fixture has been deleted successfully!",
        
        })
    } catch(error){
        console.error("Error in deleteFixture controller:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const getCachedFixtures = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;
        const cacheKey = `fixtures_${status || "all"}`;

        const fixtures = await Fixture.find(status ? { status } : {});
        await redisClient.set(cacheKey, JSON.stringify(fixtures), { EX: 3600 }); // Cache for 1 hour

        res.status(200).json({
            status: "OK",
            message: "Fixtures retrieved successfully!",
            data: fixtures,
        });
    } catch (error) {
        console.error("Error retrieving fixtures:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};