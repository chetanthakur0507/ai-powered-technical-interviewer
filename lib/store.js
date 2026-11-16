// In-memory store — DB na ho to yahi source of truth hai. DB ho to API pehle DB try karegi.
import { seed } from './seed.js';
if (!global.__store) {
  global.__store = {
    drives: JSON.parse(JSON.stringify(seed.drives)),
    placed: JSON.parse(JSON.stringify(seed.placedStudents)),
    notices: JSON.parse(JSON.stringify(seed.notices)),
    fileRequests: JSON.parse(JSON.stringify(seed.fileRequests || [])),
    templates: [
      { name: 'Lab File — Index Page Format', desc: 'Experiment list, date, signature column ke saath standard index.' },
      { name: 'Practical — Aim / Theory / Procedure / Observation', desc: 'Har experiment ke liye ready format.' },
      { name: 'Project Report — Certificate + Acknowledgement', desc: 'Certificate page, acknowledgement aur declaration format.' },
      { name: 'Mini Project — Synopsis Format', desc: 'Title, objective, scope, methodology ka format.' },
    ],
    attempts: [],
    interviews: [],
    placementStats: JSON.parse(JSON.stringify(seed.placementStats || [])),
    helpers: JSON.parse(JSON.stringify(seed.helpers || [])),
    students: JSON.parse(JSON.stringify(seed.students || [])),
  };
}
export function store() { return global.__store; }
