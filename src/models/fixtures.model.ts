import mongoose, { Schema, Document } from 'mongoose';

export interface IFixture extends Document {
  homeTeam: string;
  awayTeam: string;
  fixtureDate: Date;
  status: 'pending' | 'completed';
  score?: { home: number; away: number }; // Optional, for completed fixtures
  uniqueLink: string,
  createdAt: Date;

}

const FixtureSchema: Schema = new Schema<IFixture>({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  fixtureDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'completed']},
  score: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 },
  },
  uniqueLink: {type: String, unique: true}
},
{
   timestamps: true
});

export const Fixture = mongoose.model<IFixture>('Fixture', FixtureSchema);
