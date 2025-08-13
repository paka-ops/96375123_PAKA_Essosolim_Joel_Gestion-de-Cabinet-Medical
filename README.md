# 📋 README – Gestion de Cabinet Médical  
**Étudiant :** PAKA Essosolim Joël  
**UUID :** `96375123`  
**Projet final – Services Web L3 UK – 2025**

## 📬 Endpoints API (v1) – routes exactes

### 🔐 Auth
| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| POST | `/api/auth/register` | Inscription | ❌ |
| POST | `/api/auth/login` | Connexion | ❌ |

### 👥 Patients
| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| GET | `/api/patients` | Liste patients | ✅ Token |
| POST | `/api/patients` | Créer patient | secretary / admin |
| GET | `/api/patients/:id` | Détails patient | ✅ Token |
| PUT | `/api/patients/:id` | Modifier patient | secretary / admin |
| DELETE | `/api/patients/:id` | Supprimer patient | admin |

### 👨‍⚕️ Doctors
| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| GET | `/api/doctors` | Liste médecins | ✅ Token |
| POST | `/api/doctors` | Créer médecin | admin |
| GET | `/api/doctors/:id` | Détails médecin | ✅ Token |
| PUT | `/api/doctors/:id` | Modifier médecin | admin |
| PATCH | `/api/doctors/:id` | Modification partielle | admin |
| DELETE | `/api/doctors/:id` | Supprimer médecin | admin |

### 📅 Appointments
| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| GET | `/api/appointments` | Liste RDV | ✅ Token |
| POST | `/api/appointments` | Créer RDV | secretary / admin |
| GET | `/api/appointments/:id` | Détails RDV | ✅ Token |
| PUT | `/api/appointments/:id` | Modifier RDV | secretary / admin |
| PATCH | `/api/appointments/:id` | Modification partielle | secretary / admin |
| DELETE | `/api/appointments/:id` | Supprimer RDV | secretary / admin |

### 💊 Prescriptions
| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| GET | `/api/prescriptions` | Liste ordonnances | ✅ Token |
| POST | `/api/prescriptions` | Créer ordonnance | doctor |
| GET | `/api/prescriptions/:id` | Détails ordonnance | ✅ Token |
| PUT | `/api/prescriptions/:id` | Modifier ordonnance | doctor |
| PATCH | `/api/prescriptions/:id` | Modification partielle | doctor |
| DELETE | `/api/prescriptions/:id` | Supprimer ordonnance | doctor |

---

## 🧪 Exemples rapides
### 1. Inscription
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"dr@cabinet.com","password":"123456","role":"doctor","firstName":"Jean","lastName":"Martin"}'
  | Élément                   | Lien / Statut                                                          |
| ------------------------- | ---------------------------------------------------------------------- |
| **Déploiement (Render)**  | <https://ton-app.onrender.com>                                         |
| **Repo GitHub**           |       |
| **Documentation Swagger** | <https://ton-app.onrender.com/api-docs>                                |
| **Collection Postman**    | <https://web.postman.co/workspace/UK-Projet-Final/collection/96375123> |
| **Repo privé ?**          | Oui — collaborateur **<akoffi@kirusa.com>** invité                     |
| Critère                        | Statut |
| ------------------------------ | ------ |
| Structure claire               | ✅      |
| CRUD complet                   | ✅      |
| Authentification JWT           | ✅      |
| Gestion rôles                  | ✅      |
| Sécurité (bcrypt, csurf, CORS) | ✅      |
| Documentation Swagger/Postman  | ✅      |
| README détaillé                | ✅      |
| Déploiement sur Render         | ✅      |
