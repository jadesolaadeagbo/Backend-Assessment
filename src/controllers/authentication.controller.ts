import { Request, Response } from 'express';
import { User, Role, IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/token.utils';

export const signup = async( req: Request, res: Response ) =>{
    try{
        const {username, email, password, role = Role.User} = req.body;

        // If any required fields are not provided
        if(!username || !email || !password){
            res.status(400).json({message: "All fields are required!"})
        }
        // Ensure the role is valid
        if (!Object.values(Role).includes(role)) {
            res.status(400).json({ message: "Invalid role!" });
        }

        const existingUser = await User.findOne({email})
        // If user already exists
        if(existingUser){
            res.status(400).json({message: "User already exists!"})
        }

        // Hash user password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        })

        // SAVE USER DETAILS
        await newUser.save();

        res.status(201).json({ status: "OK", message: "User created successfully!" })

    } catch (error){
        console.error("Error in signup controller")
        res.status(500).json({error: "Internal server error" })
    }
} 

export const login = async( req: Request, res: Response ) => {
    try{
        const { emailOrUsername,  password } = req.body;

        // If any required fields are not provided
        if(!emailOrUsername || !password){
            res.status(400).json({ message: "All fields are required!" })
        }

        const user = await User.findOne({
            $or:[{email: emailOrUsername}, {username: emailOrUsername}]
        }) as IUser;
        // If user already exists
        
        if(!user){
            res.status(401).json({ message: "Invalid credentials!" });
        }

        // Is the password valid
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            res.status(401).json({ message: "Invalid credentials!" });
        }

        const userId = user._id.toString();

        const token = generateToken({id: user._id.toString(), role: user.role});

        if (!req.session) {
            res.status(500).json({ message: "Session is not initialized." });
        }
        // @ts-ignore
        req.session.userId = user._id;

        // @ts-ignore
        req.session.role = user.role;

        res.status(200).json({
            status: "OK",
            message: "Login Successful!",
            data: {
                token: token,
                user: {
                    id: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            }
        });

    } catch (error){
        console.error("Error in login controller: ", error);
        res.status(500).json({error:"Internal server error"})
    }
}