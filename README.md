# Medical App API

API REST pour la gestion des patients, médecins, rendez-vous et prescriptions médicales.

## 📌 Installation

### Prérequis
- Node.js >= 18
- MongoDB >= 5

### Installation du projet
```bash
git clone <url-du-repo>
cd 96375123-PAKA_Essosolim_Joel_Gestion_de_cabinet_medical
npm install
PORT=5000
DB_URI=mongodb+srv://azougoulrich:6MGSnixm8eFU5yor@cluster0.fpv9rdu.mongodb.net/evaluation_finale?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=96375123_jwt_secret
JWT_REFRESH_SECRET=96375123_jwt_refresh
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
### Structure du projet
96375123-PAKA_Essosolim_Joel_Gestion_de_cabinet_medical/
├── server.js
├── .env
├── package.json
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   ├── Patient.js
│   ├── Doctor.js
│   ├── Appointment.js
│   └── Prescription.js
├── routes/
├── controllers/
├── middleware/
├── utils/
├── medical_api_swagger.yaml
├── Medical App API.postman_collection.json
└── README.md
### dependances neccessaire 

---

## Dépendances

```json
"dependencies": {
  "bcryptjs": "^3.0.2",
  "cors": "^2.8.5",
  "dotenv": "^17.2.0",
  "express": "^5.1.0",
  "express-rate-limit": "^8.0.1",
  "express-validator": "^7.2.1",
  "helmet": "^8.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongo-sanitize": "^1.1.0",
  "mongoose": "^8.16.4",
  "node-cron": "^4.2.1",
  "nodemailer": "^7.0.5",
  "swagger-ui-express": "^5.0.1",
  "xss-clean": "^0.1.4",
  "yamljs": "^0.3.0"
}
# Documentation des Routes et Rôles - Gestion de Cabinet Médical

Cette documentation explique les **routes disponibles** pour chaque ressource et **les rôles autorisés** pour chaque action. L'authentification est gérée via JWT (`authenticateToken`) et les rôles via `roleAuth`.

---

## 1. Prescriptions

| Méthode | Route | Rôle requis | Description |
|---------|-------|------------|------------|
| GET     | `/`   | Authentifié | Récupérer toutes les prescriptions |
| POST    | `/`   | Doctor     | Créer une nouvelle prescription |
| GET     | `/:id`| Authentifié | Récupérer une prescription par son ID |
| PUT     | `/:id`| Doctor     | Mettre à jour complètement une prescription |
| PATCH   | `/:id`| Doctor     | Mettre à jour partiellement une prescription |
| DELETE  | `/:id`| Doctor     | Supprimer une prescription |

---

## 2. Patients

| Méthode | Route | Rôle requis | Description |
|---------|-------|------------|------------|
| GET     | `/`   | Authentifié | Récupérer tous les patients |
| POST    | `/`   | Secretary, Admin | Créer un patient |
| GET     | `/:id`| Authentifié | Récupérer un patient par ID |
| PUT     | `/:id`| Secretary, Admin | Mettre à jour un patient |
| DELETE  | `/:id`| Admin       | Supprimer un patient |

---

## 3. Doctors

| Méthode | Route | Rôle requis | Description |
|---------|-------|------------|------------|
| GET     | `/`   | Authentifié | Récupérer tous les médecins |
| POST    | `/`   | Admin      | Créer un médecin |
| GET     | `/:id`| Authentifié | Récupérer un médecin par ID |
| PUT     | `/:id`| Admin      | Mettre à jour un médecin |
| PATCH   | `/:id`| Admin      | Mettre à jour partiellement un médecin |
| DELETE  | `/:id`| Admin      | Supprimer un médecin |

---

## 4. Appointments (Rendez-vous)

| Méthode | Route | Rôle requis | Description |
|---------|-------|------------|------------|
| GET     | `/`   | Authentifié | Récupérer tous les rendez-vous |
| POST    | `/`   | Secretary, Admin | Créer un rendez-vous |
| GET     | `/:id`| Authentifié | Récupérer un rendez-vous par ID |
| PUT     | `/:id`| Secretary, Admin | Mettre à jour complètement un rendez-vous |
| PATCH   | `/:id`| Secretary, Admin | Mettre à jour partiellement un rendez-vous |
| DELETE  | `/:id`| Secretary, Admin | Supprimer un rendez-vous |

---

## Notes sur les rôles

- **Admin** : Pleins droits sur toutes les ressources.  
- **Doctor** : Gestion des prescriptions uniquement.  
- **Secretary** : Gestion des patients et rendez-vous (création et mise à jour, pas suppression de patients).  
- **Utilisateur authentifié** : Peut accéder aux informations générales (GET) sur patients, médecins, rendez-vous et prescriptions.  

---

> Toutes les routes nécessitent un **token JWT valide** (`authenticateToken`).


## 5. Authentification

| Méthode | Route | Rôle requis | Description |
|---------|-------|------------|------------|
| POST    | `/register` | Aucun (public) | Créer un nouvel utilisateur. Les données sont validées via `validateRegister`. |
| POST    | `/login`    | Aucun (public) | Se connecter et obtenir un **token JWT** pour accéder aux routes protégées. |

---

### Notes

- La route `/register` permet à **n’importe qui** de créer un compte utilisateur. Les champs sont validés avant insertion.  
- La route `/login` retourne un **JWT** qui doit être inclus dans les requêtes suivantes dans le header `Authorization: Bearer <token>` pour accéder aux routes protégées.  
- Après authentification, les rôles (`admin`, `doctor`, `secretary`, etc.) déterminent l’accès aux différentes ressources.  
