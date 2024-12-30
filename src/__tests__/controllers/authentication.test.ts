import request from "supertest"
import { Request, Response } from "express"
import { signup, login } from "../../controllers/authentication.controller"
import { User } from "../../models/user.model"
import {jest} from "@jest/globals"
import app from "../.."


jest.mock("../../models/user.model")

// Understand supertest

const baseUrl = process.env.BASE_URL || "";

const requestBody = {
    body: {
        username: "username",
        email: "email@examplee.com",
        password: "password",
        role:"role"

    }
}

describe("authenticate user", () =>{
    describe("POST /auth/signup" , () =>{
        describe("given user is successfully created", () =>{
            it("should return a 201 status code and create user", async () => {
                try {
                    const res = await request(app).post('/auth/signup')
                    .send({
                        username: "username",
                        email: "email@examplee.com",
                        password: "password",
                        role: "role"
                    });
            
                    expect(res.status).toEqual(201);
                } catch (err) {
                    console.error(err);
                }
            });
            
            // it("should return a 201 status code and create user", async () =>{
            //     const req = {
            //         body: request.body
            //     } as Request;

            //     const res = {
            //         status: jest.fn().mockReturnThis(),
            //         json: jest.fn().mockReturnThis()
            //     } as unknown as Response;

            //     await signup(req,res)

            //     expect(res.status).toHaveBeenCalledWith(201)
            //     expect(res.json).toHaveBeenCalledWith({
            //         status:"OK",
            //         message:"User created successfully!"
            //     })
            // })
        })
        // describe("given the required fields are not provided", () =>{
        //     // If email is not provided
        //     it("should return a status code of 400", async() =>{
        //         const req = {
        //             body: {
        //                 username: "username",
        //                 password: "password",
        //             }
        //         } as Request;

        //         const res = {
        //             status: jest.fn().mockReturnThis(),
        //             json: jest.fn().mockReturnThis()
        //         } as unknown as Response;

        //         await signup(req, res);

        //         expect(res.status).toHaveBeenCalledWith(400);
        //         expect(res.json).toHaveBeenCalledWith({
        //             status:"Bad Request",
        //             message:"All fields are required!"
        //         })
        //     })

        //     // If username is not provided
        //     it("should return a status code of 400", async() =>{
        //         const req = {
        //             body: {
        //                 email: "email@example.com",
        //                 password: "password",
        //             }
        //         } as Request;

        //         const res = {
        //             status: jest.fn().mockReturnThis(),
        //             json: jest.fn().mockReturnThis()
        //         } as unknown as Response;

        //         await signup(req, res);

        //         expect(res.status).toHaveBeenCalledWith(400);
        //         expect(res.json).toHaveBeenCalledWith({
        //             status:"Bad Request",
        //             message:"All fields are required!"
        //         })
        //     })

        //     // If password is not provided
        //     it("should return a status code of 400", async() =>{
        //         const req = {
        //             body: {
        //                 email: "email@example.com",
        //                 username:"username"
        //             }
        //         } as Request;

        //         const res = {
        //             status: jest.fn().mockReturnThis(),
        //             json: jest.fn().mockReturnThis()
        //         } as unknown as Response;

        //         await signup(req, res);

        //         expect(res.status).toHaveBeenCalledWith(400);
        //         expect(res.json).toHaveBeenCalledWith({
        //             status:"Bad Request",
        //             message:"All fields are required!"
        //         })
        //     })

        // })
        // describe("given role is invalid", () => {
        //     it("should return a status code of 400", async() =>{
        //         const req = {
        //             body: {
        //                 username: "username",
        //                 email: "email@examplee.com",
        //                 password: "password",
        //                 role:"invalidRole"
        //             }
        //         } as Request;

        //         const res = {
        //             status: jest.fn().mockReturnThis(),
        //             json: jest.fn().mockReturnThis()
        //         } as unknown as Response;

        //         await signup(req, res);

        //         expect(res.status).toHaveBeenCalledWith(400);
        //         expect(res.json).toHaveBeenCalledWith({
        //             status:"Bad Request",
        //             message:"Invalid role!"
        //         })
        //     })
        // })
        // describe("given the user already exists", () =>{
        //     it("should return a status code of 400", async() =>{
        //         (User.findOne as jest.Mock).mockImplementationOnce(() => ({
        //             email: request.body.email
        //         }));
                
        //         const req = {
        //             body: request.body
        //         } as Request;

        //         const res = {
        //             status: jest.fn().mockReturnThis(),
        //             json: jest.fn().mockReturnThis()
        //         } as unknown as Response;

        //         await signup(req, res);

        //         expect(res.status).toHaveBeenCalledWith(400);
        //         expect(res.json).toHaveBeenCalledWith({
        //             status:"Bad Request",
        //             message:"User already exists!"
        //         })
        //     })
        // })
 
    })

    // describe("login user", () =>{
    //     describe("given email or username is not provided", () =>{
    //         it("should return a status code of 400", async() =>{
    //             const req = { 
    //                 body:{
    //                     password:"password"
    //                 }
    //             } as Request;

    //             const res = {
    //                 status: jest.fn().mockReturnThis(),
    //                 json:jest.fn().mockReturnThis()
    //             } as unknown as Response;

    //             await login(req, res)

    //             expect(res.status).toHaveBeenCalledWith(400)
    //             expect(res.json).toHaveBeenCalledWith({
    //                 status:"Bad Request",
    //                 message: "All fields are required!"})
    //             })
    //     })

    //     describe("given password is not provided", () =>{
    //         it("should return a status code of 400", async() =>{
    //             const req = { 
    //                 body:{
    //                     emailOrUsername: "email or username"
    //                 }
    //             } as Request;

    //             const res = {
    //                 status: jest.fn().mockReturnThis(),
    //                 json:jest.fn().mockReturnThis()
    //             } as unknown as Response;

    //             await login(req, res)

    //             expect(res.status).toHaveBeenCalledWith(400)
    //             expect(res.json).toHaveBeenCalledWith({
    //                 status:"Bad Request",
    //                 message: "All fields are required!"})
    //             })
    //     }) 

    //     describe("given user does not exist", () =>{
    //         it("should return a status code of 401", async() =>{
    //             (User.findOne as jest.Mock).mockResolvedValueOnce(null);
    //             const req = { 
    //                 body:{
    //                     emailOrUsername: "email or username",
    //                     password:"password"
    //                 }
    //             } as Request; 

    //             const res = {
    //                 status: jest.fn().mockReturnThis(),
    //                 json:jest.fn().mockReturnThis()
    //             } as unknown as Response;

    //             await login(req, res)

    //             expect(res.status).toHaveBeenCalledWith(401)
    //             expect(res.json).toHaveBeenCalledWith({
    //                 status:"Not Found",
    //                 message: "Invalid credentials!" 
    //             })
    //             })
    //     }) 

    //     // describe("given password is incorrect", () =>{
    //     //     it("should return a status code of 401", async() =>{
                
    //     //         const bcryptCompare = jest.fn().mockRejectedValue(new Error('Random error'));
    //     //         (bcrypt.compare as jest.Mock) = bcryptCompare;
    //     //         //call method that uses bcrypt.compare with async
                
    //     //         const req = { 
    //     //             body:{
    //     //                 emailOrUsername: "email or username",
    //     //                 password:"wrongPassword"
    //     //             }
    //     //         } as Request; 

    //     //         const res = {
    //     //             status: jest.fn().mockReturnThis(),
    //     //             json:jest.fn().mockReturnThis()
    //     //         } as unknown as Response;

    //     //         await login(req, res)

    //     //         expect(res.status).toHaveBeenCalledWith(401)
    //     //         expect(res.json).toHaveBeenCalledWith({
    //     //             status:"Not Found",
    //     //             message: "Invalid credentials!" 
    //     //         })
    //     //         })
    //     // }) 

    //     describe("given user is logged in successfully", () =>{
    //         it("should return a 200 status code and log in user", async () =>{

    //             (User.findOne as jest.Mock).mockImplementationOnce(() =>{
    //                 $or:[{email: request.body.email}, {username: request.body.username}]
                   
    //            })
    //             const req = { 
    //                 body:{
    //                     emailOrUsername: "email or username",
    //                     password:"password"
    //                 }
    //             } as Request; 

    //             const res = {
    //                 status: jest.fn().mockReturnThis(),
    //                 json: jest.fn().mockReturnThis()
    //             } as unknown as Response;
 
    //             await login(req,res)

    //             expect(res.status).toHaveBeenCalledWith(200)
    //             expect(res.json).toHaveBeenCalledWith({
    //                 status: "OK",
    //                 message: "Login Successful!"
    //             })
    //         })
    //     })


    // })

})



 