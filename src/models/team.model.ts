 import mongoose, {Schema, Document} from "mongoose";

 export interface ITeam extends Document {
    name: string;
    description: string;
    logo?: string;
    owner: mongoose.Types.ObjectId;
    squad: ISquad;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISquad{
    goalkeepers: string[],
    defenders: string[],
    midfielders: string[],
    forwards: string[]
}

const TeamSchema:Schema = new Schema<ITeam>({
    name: {type: String, unique:true, required: true},
    description: {type: String, required: true},
    logo: {type: String},
    squad: {
        goalkeepers: { type: [String], required: true },
        defenders: { type: [String], required: true },
        midfielders: { type: [String], required: true },
        forwards: { type: [String], required: true },
      },
    owner:{type: mongoose.Schema.Types.ObjectId}
},
{
    timestamps: true, 
}
)

 export const Team = mongoose.model<ITeam>("Team", TeamSchema);


