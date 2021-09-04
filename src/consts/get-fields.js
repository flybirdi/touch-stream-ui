const fs = require('fs');
const path = require('path');
const season = require('./season.json');

const results = season.reduce((acc, match) => {
  if (!acc.includes(match.location)) {
    acc.push(match.location);
  }
  return acc;
}, []);

fs.writeFileSync(path.join(__dirname, 'fields.json'), JSON.stringify(results, null, ' '));
