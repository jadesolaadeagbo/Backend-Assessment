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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_utils_1 = require("../utils/token.utils");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role = user_model_1.Role.User } = req.body;
        // If any required fields are not provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        // Ensure the role is valid
        if (!Object.values(user_model_1.Role).includes(role)) {
            return res.status(400).json({ message: "Invalid role!" });
        }
        const existingUser = yield user_model_1.User.findOne({ email });
        // If user already exists
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }
        // Hash user password
        const saltRounds = 10;
        const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
        const newUser = new user_model_1.User({
            username,
            email,
            password: hashedPassword,
            role
        });
        // SAVE USER DETAILS
        yield newUser.save();
        return res.status(201).json({ message: "User created successfully!" });
    }
    catch (error) {
        console.error("Error in signup controller");
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { emailOrUsername, password } = req.body;
        // If any required fields are not provided
        if (!emailOrUsername || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        const user = yield user_model_1.User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
        });
        // If user already exists
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }
        // Is the password valid
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }
        const userId = user._id.toString();
        const token = (0, token_utils_1.generateToken)({ id: user._id.toString(), role: user.role });
        if (!req.session) {
            return res.status(500).json({ message: "Session is not initialized." });
        }
        req.session.userId = user._id;
        req.session.role = user.role;
        return res.status(200).json({
            message: "Login Successful!",
            token,
            user: {
                id: user._id.toString(),
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error("Error in login controller: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.login = login;
