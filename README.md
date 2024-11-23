# Test-Technique
Test technique Les Bons Artisans

## Introduction

**Technique-Test** est un projet complet qui inclut une API backend avec Node.js et Express, et un frontend développé avec React. Le projet utilise MongoDB comme base de données et intègre des fonctionnalités en temps réel via Socket.IO. Il comprend également un système d'authentification JWT sécurisé.

---

## 📂 Structure du projet

- **`product-api/`** : Le backend de l'application.
- **`product-frontend/`** : Le frontend de l'application.

---

## 🛠️ Fonctionnalités principales

1. **Gestion des produits :**
   - Création, modification, suppression et affichage des produits.
   - Données en temps réel via Socket.IO.

2. **Authentification :**
   - Système de connexion et de déconnexion avec JWT.
   - Routes protégées pour la gestion des produits.

3. **Architecture moderne :**
   - Utilisation de MongoDB pour la base de données.
   - React avec Material UI pour une interface utilisateur soignée.

4. **Support des WebSockets :**
   - Mises à jour en temps réel des données sur plusieurs clients.


## ⚙️ Installation et exécution

### 1. Clonez le projet

```bash
git clone https://github.com/YounessManyani/Technique-Test.git
cd Technique-Test

```
### Backend Configuration (`product-api`)

1. Accédez au dossier backend :
   ```bash
   cd product-api
   npm install
  ```
1-2.Créez un fichier .env avec les variables suivantes :
  ```bash
  MONGO_URI=<votre_mongodb_uri>
  JWT_SECRET=<votre_clé_secrète>
  ```
1-3.Démarrez le serveur backend :
 ```bash
  cd src
  nodemon server.js
 ```
2.Accédez au dossier frontend :
```bash
cd ../product-frontend
npm install
npm start
```
3.L'application sera accessible sur http://localhost:3000.

#### 📚 Documentation des API

#### Produits

| Méthode | Endpoint           | Description                 |
|---------|--------------------|-----------------------------|
| GET     | `/api/products`    | Récupère tous les produits  |
| POST    | `/api/products`    | Crée un nouveau produit     |
| PUT     | `/api/products/:id`| Met à jour un produit       |
| DELETE  | `/api/products/:id`| Supprime un produit         |

#### Authentification

| Méthode | Endpoint           | Description                   |
|---------|--------------------|-------------------------------|
| POST    | `/api/auth/login`    | Connexion utilisateur       |

## 🧪 Création de l'utilisateur pour les tests avec Postman

### Étapes pour créer un utilisateur via Postman :
1. Ouvrez **Postman** et configurez une requête **POST** vers l'endpoint suivant :
POST http://localhost:5001/api/auth/register
2. Ajoutez le **Body** au format JSON avec les informations suivantes :
```json
{
  "username": "testuser",
  "password": "password123"
}
```
### 🔑 Connexion de l'utilisateur avec Postman
Étapes pour tester la connexion :
Configurez une requête POST vers l'endpoint suivant :
```bash
POST http://localhost:5001/api/auth/login
```
### Ajoutez le Body au format JSON avec les informations suivantes :
```json
{
  "username": "testuser",
  "password": "password123"
}
```
### Envoyez la requête et vérifiez que vous recevez un token JWT dans la réponse :
```json
{
  "token": "votre_token_jwt"
}
```
### 📸 démonstration
[Screen Recording 2024-11-23 at 17.04.58.zip](https://github.com/user-attachments/files/17880424/Screen.Recording.2024-11-23.at.17.04.58.zip)




