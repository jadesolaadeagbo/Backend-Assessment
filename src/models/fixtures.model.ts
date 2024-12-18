import mongoose, { Schema, Document } from 'mongoose';

export interface IFixture extends Document {
  homeTeam: string;
  awayTeam: string;
  fixtureDate: Date;
  status: 'pending' | 'completed' | 'in-progress';
  score?: { home: number; away: number }; // Optional, for completed fixtures
  createdAt: Date;

}

const FixtureSchema: Schema = new Schema<IFixture>({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  fixtureDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'completed', 'in-progress'], default: 'pending' },
  score: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 },
  },
},
{
   timestamps: true
});

export const Fixture = mongoose.model<IFixture>('Fixture', FixtureSchema);
