import { User, Role, IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/token.utils';

export const signup = async( req: any, res: any ) =>{
    try{
        const {username, email, password, role = Role.User} = req.body;

        // If any required fields are not provided
        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required!"})
        }
        // Ensure the role is valid
        if (!Object.values(Role).includes(role)) {
            return res.status(400).json({ message: "Invalid role!" });
        }

        const existingUser = await User.findOne({email})
        // If user already exists
        if(existingUser){
            return res.status(400).json({message: "User already exists!"})
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

        return res.status(201).json({ message: "User created successfully!" })

    } catch (error){
        console.error("Error in signup controller")
        return res.status(500).json({error: "Internal server error" })
    }
}

export const login = async( req:any, res:any ) => {
    try{
        const { emailOrUsername,  password } = req.body;

        // If any required fields are not provided
        if(!emailOrUsername || !password){
            return res.status(400).json({ message: "All fields are required!" })
        }

        const user = await User.findOne({
            $or:[{email: emailOrUsername}, {username: emailOrUsername}]
        }) as IUser;
        // If user already exists
        
        if(!user){
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        // Is the password valid
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        const userId = user._id.toString();

        const token = generateToken({id: user._id.toString(), role: user.role});

        if (!req.session) {
            return res.status(500).json({ message: "Session is not initialized." });
        }

        req.session.userId = user._id;
        req.session.role = user.role;

        return res.status(200).json({
            message:"Login Successful!",
            token,
            user:{
                id: user._id.toString(),
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error){
        console.error("Error in login controller: ", error);
        return res.status(500).json({error:"Internal server error"})
    }
}