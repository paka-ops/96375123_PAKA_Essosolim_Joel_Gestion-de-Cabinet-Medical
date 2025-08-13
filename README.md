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

