const express = require("express");
const pool = require(''./db'); // importe la connexion à la base de données PostgreSQL
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: true
}));

// Servir le dossier public
app.use(express.json());

// Page d'accueil / login
app.get("/", (req, res) => {
  if(req.session.username){
    res.send(`<h1>Bienvenue ${req.session.username} !</h1>
              <a href="/logout">Déconnexion</a>`);
  } else {
    res.sendFile(path.join(__dirname, "public/login.html"));
  }
});

// Route POST pour le formulaire
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Login simple : admin / 1234
  if(username === "admin" && password === "1234"){
    req.session.username = username;
    res.redirect("/");
  } else {
    res.send("Nom d'utilisateur ou mot de passe incorrect. <a href='/'>Réessayer</a>");
  }
});

// Déconnexion
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
// Exemple : ajouter un utilisateur
app.post('/users', async (req, res) => {
  const { username, email, password_hash } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password_hash]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

app.listen(10000, () => console.log('Serveur lancé sur http://localhost:10000'));