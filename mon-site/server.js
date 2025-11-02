const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Permet à Express de lire les fichiers HTML/CSS/JS du dossier public
app.use(express.static('public'));

// Middleware pour lire le JSON
app.use(express.json());

// Exemple de route API (facultatif)
app.get('/api', (req, res) => {
  res.json({ message: 'Bienvenue sur ton API Node.js 🚀' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en ligne sur http://localhost:${PORT}`);
});