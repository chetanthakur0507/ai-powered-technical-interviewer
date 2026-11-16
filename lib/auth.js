import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// Demo users — seed logins, password bcrypt hash runtime par bante hain
const DEMO = [
  { id: 'u-student', name: 'Demo Student', email: 'student@invertis.ac.in', password: 'student123', role: 'student', course: 'BTech CSE', year: 'Final Year' },
  { id: 'u-crc', name: 'CRC Admin', email: 'crc@invertis.ac.in', password: 'crc123', role: 'crc_admin', course: 'CRC Office', year: '' },
  { id: 'u-helper', name: 'Demo Helper', email: 'helper@invertis.ac.in', password: 'helper123', role: 'helper', course: 'BTech CSE', year: 'Final Year' },
];
if (!global.__users) global.__users = DEMO.map(u => ({ ...u, passwordHash: bcrypt.hashSync(u.password, 10) }));
export function getUsers() { return global.__users; }
export function findUser(email) { return global.__users.find(u => u.email.toLowerCase() === String(email).toLowerCase()); }
export function verifyPassword(u, pw) { return bcrypt.compareSync(pw, u.passwordHash); }
export function signToken(user) { return jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role, course: user.course }, process.env.JWT_SECRET || 'invertis-careerhub-dev-secret', { expiresIn: '7d' }); }
export function verifyToken(token) { try { return jwt.verify(token, process.env.JWT_SECRET || 'invertis-careerhub-dev-secret'); } catch { return null; } }
export function publicUser(u) { const { passwordHash, password, ...rest } = u; return rest; }
