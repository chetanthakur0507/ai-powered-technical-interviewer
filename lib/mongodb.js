// MongoDB connection (Mongoose) — agar DB nahi chal raha to crash nahi karega,
// null return karega aur app seed data (in-memory) se chalegi.
import mongoose from 'mongoose';
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };
export async function connectDB() {
  if (cached.conn) return cached.conn;
  const uri = process.env.MONGODB_URI;
  if (!uri) { console.log('[DB] MONGODB_URI nahi mili — seed/fallback mode'); return null; }
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 }).then(m => m).catch(e => { console.log('[DB] connect fail, fallback mode:', e.message); cached.promise = null; return null; });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
export async function dbAvailable() { try { const c = await connectDB(); return !!c; } catch { return false; } }
