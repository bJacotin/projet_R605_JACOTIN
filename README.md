Projet R6.05 - Developpement avance
Ce projet est une application de gestion d'utilisateurs et de films realisee dans le cadre de l'IUT. Elle permet de gerer un catalogue de films et des comptes utilisateurs avec une gestion de droits specifiques.

Configuration du projet
1. Variables d'environnement
Creez un fichier .env a la racine du dossier iut-project avec les parametres suivants :

Extrait de code
PORT=3000
NODE_ENV=development

DB_HOST=0.0.0.0
DB_USER=root
DB_PASSWORD=hapi
DB_DATABASE=user
DB_PORT=3307
Note technique : Pour assurer le bon chargement de la configuration, la ligne suivante a ete initialisee au debut du fichier manifest.js : Dotenv.config({ path: require('path').join(__dirname, '..', '.env') });

2. Lancement de l'application
Positionnez-vous dans le dossier iut-project et executez la commande suivante :

Bash
npm start
Documentation de l'API
Une fois le serveur lance, la documentation Swagger est accessible a l'adresse suivante : http://localhost:3000/documentation

Authentification
Pour acceder aux routes protegees, vous devez utiliser un jeton (token) administrateur.

Connectez-vous avec le compte de test :

Email : a.a@gmail.com

Mot de passe : azertyuiop

Recuperez le token via la route POST /user/login.

Cliquez sur le bouton Authorize dans Swagger.

Saisissez la valeur sous la forme : Bearer VOTRE_TOKEN.

Liste des services disponibles
Gestion des Utilisateurs
POST /user : Creation d'un utilisateur (scope "user" par defaut).

POST /user/login : Authentification via email et mot de passe.

GET /users : Liste l'ensemble des utilisateurs (Acces Admin requis).

PATCH /user/{id} : Modification d'un utilisateur (Acces Admin requis).

DELETE /user/{id} : Suppression d'un utilisateur (Acces Admin requis).

Gestion des Films
GET /movies : Liste l'ensemble des films (Acces Admin requis).

POST /movie : Creation d'un film (Acces Admin requis).

PATCH /movie/{id} : Modification d'un film (Acces Admin requis).

DELETE /movie/{id} : Suppression d'un film (Acces Admin requis).

Stack Technique
Framework : Hapi.js

ORM : Schwifty / Knex.js

Base de donnees : MySQL via Docker

Documentation : Hapi-swagger

Souhaites-tu que je detaille les etapes de configuration de Docker pour la base de donnees dans une section annexe ?
