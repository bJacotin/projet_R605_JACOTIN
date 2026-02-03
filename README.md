Projet R6.05 - Développement avancé.

Bienvenue dans le README de ce projet où vous trouverez toutes les informations nécessaires quant à la bonne utilisation de cette application de gestion d'utilisateurs et de films.

PRÉSENTATION DU PROJET : 
Bienvenue dans le projet relatif à l'IUT concernant la création d'une application de création d'utilisateurs ainsi que de films !
Un utilisateur est créé à partir de : 
  -son nom,
  -prénom,
  -email,
  -mot de passe,
  -

Avant toutes choses, voici les variables d'environnement à inscrire dans le .env afin d'accéder la Base De Données, hébergée personnellement sur DOCKER via mysql2 : 
  PORT=3000
  NODE_ENV=development
  
  DB_HOST=0.0.0.0
  DB_USER=root
  DB_PASSWORD=hapi
  DB_DATABASE=user
  DB_PORT=3307

Ayant eu un problème avec mon "manifest.js", voici la ligne à initialiser en début du fichier : 
  Dotenv.config({ path: require('path').join(__dirname, '..', '.env') });

Il faut commencer, en étant dans le dossier "iut-project" d'entrer la commande : 
  npm start

Ensuite, rendez-vous à l'adresse suivante :
  http://localhost:3000/documentation

Vous arriverez sur une fênêtre où les différentes fonctionnalités sont présentes.

Commençons par la partie la plus importe qui nous permettra d'utiliser tout le reste, la partie UTILISATEURS.

UTILISATEURS : 
Nous avons plusieurs routes : 
  -POST /user : permet de créer un utilisateur avec le scope "user" par défaut,
  -PATCH /user/{id} : permet de modifier un utilisateur à partir de son ID    /!\ IL EST NÉCESSAIRE D'ÊTRE ADMIN POUR MODIFIER /!\
  -DELETE /user/{id} : permet de supprimer un utilisateur à partir de son ID   /!\ IL EST NÉCESSAIRE D'ÊTRE ADMIN POUR MODIFIER /!\
  -POST /user/login : permet de s'authentifier via l'email et le mot de passe d'un utilisateur créé à partir de la première route.

Pour tester l'ensemble des services, nous pouvons nous connecter avec l'utilisateur de TEST administrateur : 
  -email : a.a@gmail.com
  -pwd : azertyuiop

Pour se connecter ensuite en administrateur sur l'ensemble de l'application, il faut récupérer le token de l'utilisateur admin disponible une fois la route /user/login effectuée ! 
Une fois récupéré, il suffit de cliquer sur le bouton Authorize et de marquer : [ Bearer "token" ]

Enfin, pour cloturer la partie utilisateur, nous avons une dernière route : 
  -GET /users : permet de lister l'ENSEMBLE des utilisateurs avec TOUTES leurs informations    /!\ IL EST NÉCESSAIRE D'ÊTRE ADMIN POUR LISTER /!\

FILMS : 
Nous avons plusieurs routes : 
  -POST /movie : permet de créer un film /!\ IL EST NÉCESSAIRE D'ÊTRE ADMIN POUR MODIFIER /!\
  -PATCH /movie/{id} : permet de modifier un film à partir de son ID    /!\ IL EST NÉCESSAIRE D'ÊTRE ADMIN POUR MODIFIER /!\
  -DELETE /movie/{id} : permet de supprimer un film à partir de son ID   /!\ IL EST NÉCESSAIRE D'ÊTRE ADMIN POUR MODIFIER /!\

Enfin, pour cloturer la partie utilisateur, nous avons une dernière route : 
  -GET /movies : permet de lister l'ENSEMBLE des films avec TOUTES leurs informations    /!\ IL EST NÉCESSAIRE D'ÊTRE ADMIN POUR LISTER /!\

