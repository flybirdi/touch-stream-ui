const fs = require('fs');
const path = require('path');
const season = require('./season.json');

const results = season.reduce((acc, match) => {
  if (!Array.isArray(acc[match.comp])) {
    acc[match.comp] = [];
  }
  if (match.teamA && !acc[match.comp].includes(match.teamA.toLowerCase())) {
    acc[match.comp].push(match.teamA.toLowerCase());
  }
  if (match.teamB && !acc[match.comp].includes(match.teamB.toLowerCase())) {
    acc[match.comp].push(match.teamB.toLowerCase());
  }
  return acc;
}, {});

fs.writeFileSync(path.join(__dirname, 'comps.json'), JSON.stringify(results, null, ' '));
