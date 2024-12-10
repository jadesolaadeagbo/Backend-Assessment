 import mongoose, {Schema, Document} from "mongoose";

 export interface ITeam extends Document {
    name: string;
    description: string;
    logo?: string;
    owner: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TeamSchema:Schema = new Schema<ITeam>({
    name: {type: String, unique:true, required: true},
    description: {type: String, required: true},
    logo: {type: String},
},
{
    timestamps: true, 
}
)

 export const Team = mongoose.model<ITeam>("Team", TeamSchema);