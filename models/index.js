import mongoose from 'mongoose';
const DriveSchema = new mongoose.Schema({ company: String, role: String, ctc: String, eligibility: String, venue: String, date: String, rounds: [String], status: String, type: String }, { timestamps: true });
const PlacedSchema = new mongoose.Schema({ name: String, course: String, company: String, ctc: String, year: Number }, { timestamps: true });
const NoticeSchema = new mongoose.Schema({ title: String, date: String, tag: String }, { timestamps: true });
export const Drive = mongoose.models.Drive || mongoose.model('Drive', DriveSchema);
export const Placed = mongoose.models.Placed || mongoose.model('Placed', PlacedSchema);
export const Notice = mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);
