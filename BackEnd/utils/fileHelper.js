const fs = require('fs');
const path = require('path');

// Lis un fichier JSON
function readJSON(relativePath) {
  const fullPath = path.resolve(__dirname, '..', relativePath);
  if (!fs.existsSync(fullPath)) {
    return []; // retourne un tableau vide si le fichier n'existe pas
  }
  const data = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(data);
}

// Écris dans un fichier JSON
function writeJSON(relativePath, data) {
  const fullPath = path.resolve(__dirname, '..', relativePath);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
  readJSON,
  writeJSON,
};
