// MongoDB me seed data bharne ke liye:  .env.local me MONGODB_URI daalo, phir `npm run seed`
// Bina Mongo ke bhi app chalega — ye script sirf Mongo use karne walo ke liye hai.
import fs from 'fs';
// .env.local ko haath se padho (dotenv dependency nahi hai)
try { for (const line of fs.readFileSync('.env.local','utf8').split('\n')) { const m = line.match(/^(MONGODB_URI)=(.*)$/); if (m) process.env.MONGODB_URI = m[2].trim(); } } catch {}
import mongoose from 'mongoose';
import { seed } from '../lib/seed.js';
import { Drive, Placed, Notice } from '../models/index.js';

const uri = process.env.MONGODB_URI;
if (!uri) { console.error('MONGODB_URI nahi mili (.env.local me daalo)'); process.exit(1); }
await mongoose.connect(uri);
await Drive.deleteMany({}); await Placed.deleteMany({}); await Notice.deleteMany({});
await Drive.insertMany(seed.drives);
await Placed.insertMany(seed.placedStudents);
await Notice.insertMany(seed.notices);
console.log(`Seed done: ${seed.drives.length} drives, ${seed.placedStudents.length} placed students, ${seed.notices.length} notices`);
await mongoose.disconnect();
