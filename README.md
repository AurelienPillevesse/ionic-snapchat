# IONIC Snapchat – Projet Licence

Un projet réalisé par Aurelien Pillevesse et Pic Pierre 
==== 

#### Description
Notre projet consistait à créer une application Ionic, semblable à la célèbre application SnapChat.
Permettre l’envoie de photos via l’application, pouvoir en recevoir les afficher, etc.
Et également se connecter avec son compte personnel au sein de l’application

#### Solution
Afin de développer cette application, nous avons réalisé différents choix techniques.
##### FireBase & FireBase Auth
Pour stocker l’ensemble des données de l’application nous avons opter pour utiliser le module AngularFireModule qui permet à une application Ionic de pouvoir faire transiter des données avec un compte FireBase.
Nous avons également implémenté une connexion Email / mot de passe via Firebase 
https://github.com/angular/angularfire2
##### LocalStorage
Afin d’optimiser légèrement les performances de l’application, on évite une requête afin de connaître l'id de l'utilisateur connecté, nous avons stocker cette information grâce au module LocalStorage permettant de stocker des informations directement sur le téléphone.
##### CameraPreview
Afin de prendre des photos et de les envoyer directement sur le Web, nous avons choisi d’utiliser le plugin CameraPreview permettant un accès direct a la camera du téléphone

#### Scénario
Un utilisateur existant se connecte :
	Enregistrement en Local de son identifiant d'utilisateur
	Fenêtre de prise de photo
  Demande d'autorisation de la caméra (si pas déjà accepté)
	Il prend une photo
	L’envoie directement sur Firebase
  Photo visible par lui-même et les autres utilisateurs

Un utilisateur créer un compte :
	Enregistrement sur Firebase de son compte
	Enregistrement de son identifiant d'utilisateur
	Fenêtre de prise de photo
	…

#### Travail Effectué 
- Connexion / Déconnexion / Création de compte FireBase Auth.
- Informations stocké Utilisateur / Photo sur FireBase.
- Utilisation de CameraPreview
- Utilisation de LocalStorage
- LazyLoading
- Mise en place de différents services

#### Conclusion
Compte firebase:
snapchat-ionic@gmail.com
pipicaurelien
