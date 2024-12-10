import jwt from 'jsonwebtoken'

const secretKey = process.env.SESSION_SECRET || "supersecretkey"

export const generateToken = (payload: object, expiresIn: string | number = "1h") =>{
    return jwt.sign(payload, secretKey, {expiresIn})
}

export const verifyToken = (token: string) =>{
    try{
        return jwt.verify(token, secretKey)
    } catch(error){
        throw new Error("Invalid or expired token")
    }
}