
```markdown
# 🛡️ LUMEN - Human-Centric Cyber Risk Intelligence Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-green)
![Backend](https://img.shields.io/badge/Backend-Python%20FastAPI-orange)
![Database](https://img.shields.io/badge/Database-MySQL-blue)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

---

## 📖 Project Overview

**LUMEN** (Log Understanding and Mitigation Engine for Networks) is a full-stack web-based cybersecurity analysis platform designed to help users upload system logs and automatically detect potential security risks. The system processes uploaded logs using predefined security rules stored in a relational database and displays results through an interactive dashboard showing vulnerabilities and security recommendations.

This project integrates three academic domains:
- **Web Application Development**
- **Database Management Systems**
- **Threat Modeling and Security Monitoring**

---

## 🎯 Problem Statement

Many cybersecurity tools are complex and difficult for beginners or small organizations to use. Security logs often contain large volumes of data that are difficult to interpret without specialized tools.

**Common problems include:**
- Lack of user-friendly log analysis platforms
- Difficulty analyzing large log datasets
- Security tools themselves may contain design vulnerabilities
- Poor database structure for storing security data

Without effective tools, administrators may fail to detect threats such as brute-force attacks or insecure configurations.

---

## ✨ Key Features

### Frontend Features
| Feature | Description |
|---------|-------------|
| **8 Mood Themes** | Happy, Calm, Dark, Energetic, White, Professional, Sad, Default Lavender |
| **User Authentication** | Login, Register, Forgot Password, OTP Verification, Reset Password |
| **Admin Registration** | Separate registration with Employee ID, Department, Admin Level |
| **Log Upload & Parse** | Drag & drop or browse files (.log, .txt, .json, .csv) |
| **Risk Score Dashboard** | Visual charts and risk metrics (Chart.js) |
| **Copy-Paste Commands** | Ready-to-execute security remediation commands |
| **Premium Support** | Users submit problems, admins provide solutions |
| **Security Rules Management** | Admins can add/edit/delete detection rules |

### Backend Features (In Development)
| Feature | Description |
|---------|-------------|
| **RESTful API** | FastAPI endpoints for all operations |
| **User Authentication** | JWT-based authentication |
| **Log Processing** | Server-side log parsing and analysis |
| **Rule Engine** | Dynamic security rule evaluation |
| **Report Generation** | PDF report export |

### Database Features (In Development)
| Feature | Description |
|---------|-------------|
| **User Management** | Store user credentials and profiles |
| **Scan History** | Track all log analyses |
| **Security Rules** | Store and manage detection rules |
| **Premium Requests** | Track user support requests |
| **Activity Logs** | Audit trail of system actions |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (HTML/CSS/JS)                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ Mood    │ │ Auth    │ │ Upload  │ │Dashboard│           │
│  │ Selector│ │ Pages   │ │ Log     │ │         │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Python FastAPI)                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ Auth    │ │ Log     │ │ Rule    │ │ Report  │           │
│  │ API     │ │ Parser  │ │ Engine  │ │ Gen     │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Database (MySQL)                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ Users   │ │ Scans   │ │ Rules   │ │Requests │           │
│  │ Table   │ │ Table   │ │ Table   │ │ Table   │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛡️ Threat Modeling (STRIDE)

| Threat | Description | Mitigation |
|--------|-------------|------------|
| **Spoofing** | Fake identity or login | JWT authentication, password hashing |
| **Tampering** | Unauthorized data modification | Input validation, HTTPS |
| **Repudiation** | Denying performed actions | Activity logging, audit trails |
| **Information Disclosure** | Data leakage | Encryption, access controls |
| **Denial of Service** | System overload attacks | Rate limiting, request validation |
| **Elevation of Privilege** | Unauthorized admin access | Role-based access control (RBAC) |

---

## 👥 Team Members & Roles

| Name | ID | Role | Responsibilities |
|------|-----|------|------------------|
| **Sadia Tabassum** | 2304008 | Frontend Developer | HTML, CSS, JavaScript, UI/UX, Mood Themes |
| **Sadia Akter** | 2304022 | Database Administrator | MySQL schema, SQL queries, Data modeling, ERD |
| **Md Ratul Ryhan Rafi** | 2304036 | Backend Developer | Python FastAPI, API endpoints, Log parsing logic |

### Instructors

| Name | Position |
|------|----------|
| **Rakib Hossen** | Assistant Professor, Dept. of Cyber Security Engineering, UFTB |
| **Md Masud Rana** | Lecturer, Dept. of Cyber Security Engineering, UFTB |
| **Md Abdullah** | Lecturer, Dept. of Cyber Security Engineering, UFTB |

---

## 🛠️ Technology Stack

| Layer | Technology | Responsibility |
|-------|------------|----------------|
| **Frontend** | HTML5, CSS3, JavaScript | User interface, mood themes, charts |
| **UI Framework** | Tailwind CSS | Styling and responsive design |
| **Backend** | Python FastAPI | RESTful APIs, log processing, auth |
| **Database** | MySQL | Data storage, user management, audit |
| **Data Processing** | Python | Log parsing, threat detection |
| **Visualization** | Chart.js | Dashboard charts and graphs |
| **Version Control** | Git & GitHub | Code collaboration |

---

## 📁 Project Structure

```
lumen/
│
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── mood-base.css
│   │   ├── mood-default.css
│   │   ├── mood-happy.css
│   │   ├── mood-calm.css
│   │   ├── mood-dark.css
│   │   ├── mood-energetic.css
│   │   ├── mood-white.css
│   │   ├── mood-professional.css
│   │   └── mood-sad.css
│   ├── js/
│   │   ├── mood-storage.js
│   │   ├── mood-selector.js
│   │   └── homepage.js
│   └── pages/
│       ├── login.html + .css + .js
│       ├── register.html + .css + .js
│       ├── admin-register.html + .js
│       ├── forgot-password.html + .css + .js
│       ├── otp-verification.html + .css + .js
│       ├── reset-password.html + .css + .js
│       ├── upload-log.html + .css + .js
│       ├── dashboard.html + .css + .js
│       └── admin.html + .css + .js
│
├── backend/ (Md Ratul Ryhan Rafi)
│   ├── app/
│   │   ├── main.py
│   │   ├── auth/
│   │   ├── api/
│   │   ├── models/
│   │   └── utils/
│   ├── requirements.txt
│   └── config.py
│
├── database/ (Sadia Akter)
│   ├── schema.sql
│   ├── queries.sql
│   ├── erd.png
│   └── seed_data.sql
│
├── docs/
│   ├── PROJECT PROPOSAL.pdf
│   ├── THREAT MODELING REPORT.pdf
│   └── SYSTEM ARCHITECTURE.pdf
│
└── README.md
```

---

## 🗄️ Database Schema (Sadia Akter)

### Tables

| Table | Description | Columns |
|-------|-------------|---------|
| **users** | User accounts | id, fullname, username, email, password_hash, role, created_at |
| **admin_users** | Admin details | id, user_id, employee_id, department, admin_level |
| **scan_history** | Log analysis records | id, user_id, file_name, risk_score, analysis_date, results |
| **security_rules** | Detection rules | id, rule_name, pattern, severity, solution, created_at |
| **premium_requests** | Support tickets | id, user_id, problem, solution, status, created_at |
| **activity_logs** | Audit trail | id, user_id, action, timestamp, ip_address |

### ER Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    users    │────│admin_users  │     │scan_history │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id (PK)     │     │ id (PK)     │     │ id (PK)     │
│ fullname    │     │ user_id(FK) │     │ user_id(FK) │
│ username    │     │ employee_id │     │ file_name   │
│ email       │     │ department  │     │ risk_score  │
│ password    │     │ admin_level │     │ results     │
│ role        │     └─────────────┘     │ created_at  │
│ created_at  │                         └─────────────┘
└─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│premium_req  │     │security_rules│     │activity_logs│
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id (PK)     │     │ id (PK)     │     │ id (PK)     │
│ user_id(FK) │     │ rule_name   │     │ user_id(FK) │
│ problem     │     │ pattern     │     │ action      │
│ solution    │     │ severity    │     │ timestamp   │
│ status      │     │ solution    │     │ ip_address  │
│ created_at  │     │ created_at  │     └─────────────┘
└─────────────┘     └─────────────┘
```

---

## 🔧 Backend API Endpoints (Md Ratul Ryhan Rafi)

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password with OTP |

### Log Analysis
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/logs/upload` | Upload and analyze log file |
| GET | `/api/logs/history` | Get user scan history |
| GET | `/api/logs/{id}` | Get specific analysis result |

### Admin Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/requests` | Get all premium requests |
| POST | `/api/admin/requests/{id}/solve` | Provide solution to request |
| CRUD | `/api/admin/rules` | Manage security rules |
| GET | `/api/admin/users` | Get all users |

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Python | 3.9+ |
| MySQL | 8.0+ |
| Git | Latest |
| Browser | Chrome/Firefox/Edge |

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/lumen.git
cd lumen
```

2. **Set up Backend** (Md Ratul Ryhan Rafi)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

3. **Set up Database** (Sadia Akter)
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE lumen_db;
USE lumen_db;

# Import schema
SOURCE database/schema.sql;
SOURCE database/seed_data.sql;
```

4. **Run Frontend**
```bash
# Open index.html in browser or use Live Server
cd frontend
# For VS Code: Right-click index.html → Open with Live Server
```

---

## 📝 Development Workflow

### Frontend (Sadia Tabassum)
```bash
# Work on frontend files
cd frontend/
# Edit HTML/CSS/JS files
# Test in browser
# Commit changes
git add frontend/
git commit -m "feat: add new feature"
git push
```

### Backend (Md Ratul Ryhan Rafi)
```bash
# Work on backend files
cd backend/
# Create new branch
git checkout -b feature/api-endpoint
# Make changes
git add backend/
git commit -m "feat: add new API endpoint"
git push origin feature/api-endpoint
# Create Pull Request
```

### Database (Sadia Akter)
```bash
# Work on database files
cd database/
# Update schema
# Test queries
git add database/
git commit -m "db: update users table schema"
git push
```

---

## 🔐 Demo Credentials

| Role | Username/Email | Password |
|------|----------------|----------|
| **User** | `user@lumen.com` or `user` | `password123` |
| **Admin** | `admin@lumen.com` or `admin` | `admin123` |

### Admin Registration Code
`LUMEN_ADMIN_2024`

---

## 📅 Project Timeline

| Week | Task | Responsible |
|------|------|-------------|
| Week 1 | Requirement Analysis | All |
| Week 2 | Database Design | Sadia Akter |
| Week 3 | Backend Development | Md Ratul Ryhan Rafi |
| Week 4 | Frontend Development | Sadia Tabassum |
| Week 5 | Log Analysis Module | Md Ratul Ryhan Rafi |
| Week 6 | Dashboard Visualization | Sadia Tabassum |
| Week 7 | Threat Modeling | All |
| Week 8 | Testing | All |
| Week 9 | Documentation | All |
| Week 10 | Final Presentation | All |

---

## 📚 Course Information

| Course | Code |
|--------|------|
| Database Management System (Sessional) | CSE 202 |
| Android & Web Application Development (Sessional) | PROG 212 |
| Threat Modeling & Security Monitoring (Sessional) | SEC 204 |

**Semester:** Level 2, Term 2  
**Department:** Cyber Security Engineering  
**University:** University of Frontier Technology, Bangladesh

---

## 📄 Expected Deliverables

- [x] Complete web application source code
- [ ] Database schema and SQL scripts (Sadia Akter)
- [ ] Entity Relationship Diagram (Sadia Akter)
- [ ] Threat modeling report (All)
- [ ] System architecture diagrams (Md Ratul Ryhan Rafi)
- [ ] Project documentation (All)
- [ ] Final presentation slides (All)

---

## 🤝 Contributing

1. **Pull latest changes**
```bash
git pull origin main
```

2. **Create feature branch**
```bash
git checkout -b feature/your-feature
```

3. **Commit with clear message**
```bash
git commit -m "feat: description of changes"
```

4. **Push and create Pull Request**

### Commit Message Format
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `db:` - Database changes
- `style:` - CSS/styling changes
- `refactor:` - Code refactor

---

## 📧 Contact

| Team Member | Role | Email |
|-------------|------|-------|
| Sadia Tabassum | Frontend | 2304008@uftb.edu.bd |
| Sadia Akter | Database | 2304022@uftb.edu.bd |
| Md Ratul Ryhan Rafi | Backend | 2304036@uftb.edu.bd |

---

## 🙏 Acknowledgments

- University of Frontier Technology, Bangladesh
- Department of Cyber Security Engineering
- Course Instructors for their guidance and support

---

**Made with ❤️ by Team LUMEN**  
*Level 2, Term 2 | Department of Cyber Security Engineering | UFTB*
```

---

## Summary

| Section | Content |
|---------|---------|
| **Roles** | Sadia Tabassum (Frontend), Sadia Akter (Database), Md Ratul Ryhan Rafi (Backend) |
| **Architecture** | Full-stack diagram |
| **Database Schema** | 6 tables with ER diagram |
| **API Endpoints** | Complete REST API documentation |
| **Timeline** | Weekly tasks with responsibilities |
| **Tech Stack** | HTML/CSS/JS, Python FastAPI, MySQL |

---
