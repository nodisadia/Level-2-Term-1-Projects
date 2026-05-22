Here is a **short description** and **README** for your GitHub repository so your teammates can easily understand and work on the project.

---

## Short Description (For GitHub Repo)

```markdown
# LUMEN - Log Understanding & Mitigation Engine for Networks

A human-centric cyber risk intelligence platform that analyzes system logs, detects security threats, and provides copy-paste remediation commands. Built with HTML, CSS, and JavaScript - no backend required.
```

---

## Complete README.md

```markdown
# 🛡️ LUMEN - Cyber Risk Intelligence Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📖 About The Project

**LUMEN** (Log Understanding & Mitigation Engine for Networks) is a web-based cybersecurity analysis platform that helps users upload system logs and automatically detect potential security risks. The system processes uploaded logs using predefined security rules and displays results through an interactive dashboard showing vulnerabilities and security recommendations.

### 🎯 Key Features

- **8 Mood Themes** - Choose from Happy, Calm, Dark, Energetic, White, Professional, Sad, or Default Lavender
- **User Authentication** - Login, Register, Forgot Password, OTP Verification, Reset Password
- **Admin Registration** - Separate registration with Employee ID, Department, and Admin Level
- **Log Upload & Parse** - Drag & drop or browse files (.log, .txt, .json, .csv)
- **Risk Score Dashboard** - Visual charts and risk metrics
- **Copy-Paste Commands** - Ready-to-execute security remediation commands
- **Premium Support** - Users can submit problems, admins provide solutions
- **Security Rules Management** - Admins can add/edit/delete detection rules
- **Local Storage** - All data stored in browser (no backend needed)

---

## 🚀 Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Safari)
- VS Code (recommended) or any code editor

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/lumen-frontend.git
cd lumen-frontend
```

2. **Open the project**
```bash
# Using VS Code
code .

# Or simply double-click index.html
```

3. **Run with Live Server (Recommended)**
   - Install VS Code extension "Live Server"
   - Right-click `index.html` → "Open with Live Server"

### Folder Structure

```
lumen-frontend/
│
├── index.html              # Home page with mood selector
├── css/
│   ├── mood-base.css       # Base styles and variables
│   ├── mood-default.css    # Lavender theme
│   ├── mood-happy.css      # Yellow/Orange theme
│   ├── mood-calm.css       # Blue/Teal theme
│   ├── mood-dark.css       # Dark Navy theme
│   ├── mood-energetic.css  # Red/Orange theme
│   ├── mood-white.css      # White/Silver theme
│   ├── mood-professional.css # Navy/Gray theme
│   └── mood-sad.css        # Indigo/Purple theme
│
├── js/
│   ├── mood-storage.js     # Save/load mood preference
│   ├── mood-selector.js    # Mood selection logic
│   └── homepage.js         # Home page interactions
│
└── pages/
    ├── login.html + .css + .js
    ├── register.html + .css + .js
    ├── admin-register.html + .js
    ├── forgot-password.html + .css + .js
    ├── otp-verification.html + .css + .js
    ├── reset-password.html + .css + .js
    ├── upload-log.html + .css + .js
    ├── dashboard.html + .css + .js
    └── admin.html + .css + .js
```

---

## 🔐 Demo Credentials

| Role | Username/Email | Password |
|------|----------------|----------|
| **User** | `user@lumen.com` or `user` | `password123` |
| **Admin** | `admin@lumen.com` or `admin` | `admin123` |

### Admin Registration Code

Use this code to register new admin accounts: `LUMEN_ADMIN_2024`

---

## 📱 Pages & Features

| Page | Description |
|------|-------------|
| `index.html` | Home page with mood selector (8 themes) |
| `login.html` | Login with role selection (User/Admin) |
| `register.html` | User registration with password strength |
| `admin-register.html` | Admin registration with Employee ID & Department |
| `forgot-password.html` | Reset password flow |
| `otp-verification.html` | 6-digit OTP (demo: 123456) |
| `reset-password.html` | Set new password |
| `upload-log.html` | Drag & drop log upload with guidelines |
| `dashboard.html` | Risk score, charts, copy-paste commands |
| `admin.html` | Manage requests, rules, and users |

---

## 🛠️ Built With

- **HTML5** - Structure
- **CSS3** - Styling & Animations
- **JavaScript (ES6)** - Interactivity & Logic
- **Chart.js** - Data visualization
- **Font Awesome** - Icons
- **Google Fonts** - Typography

---

## 👥 Team Members

| Name | ID | Role |
|------|-----|------|
| Sadia Tabassum | 2304008 | Frontend Developer |
| Sadia Akter | 2304022 | Frontend Developer |
| Md Ratul Ryhan Rafi | 2304036 | Frontend Developer |

### Instructors

- **Rakib Hossen** - Assistant Professor, Dept. of Cyber Security Engineering, UFTB
- **Md Masud Rana** - Lecturer, Dept. of Cyber Security Engineering, UFTB
- **Md Abdullah** - Lecturer, Dept. of Cyber Security Engineering, UFTB

---

## 📚 Course Information

- **Course Name:** CSE 202 - Database Management System (Sessional)
- **Course Name:** PROG 212 - Android & Web Application Development (Sessional)
- **Course Name:** SEC 204 - Threat Modeling & Security Monitoring (Sessional)
- **Semester:** Level 2, Term 2
- **Department:** Cyber Security Engineering
- **University:** University of Frontier Technology, Bangladesh

---

## 🤝 How to Contribute

1. **Pull the latest changes**
```bash
git pull origin main
```

2. **Create a new branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes** and test locally

4. **Commit and push**
```bash
git add .
git commit -m "Add your message here"
git push origin feature/your-feature-name
```

5. **Create a Pull Request** on GitHub

---

## 📝 Development Guidelines

### Adding a New Mood Theme

1. Create `css/mood-themename.css`
2. Define CSS variables (colors, backgrounds, text)
3. Add button in `index.html` mood grid
4. Update `mood-selector.js` to recognize new mood

### Adding a New Page

1. Create `pages/pagename.html`
2. Create `pages/pagename.css`
3. Create `pages/pagename.js`
4. Link CSS and JS in the HTML file
5. Add navigation link in existing pages

### Storing Data

All data is stored in `localStorage`:

| Key | Description |
|-----|-------------|
| `registeredUsers` | All user and admin accounts |
| `user` | Currently logged in user |
| `lumen_mood_preference` | Saved mood theme |
| `premiumRequests` | Premium support requests |
| `securityRules` | Security detection rules |
| `lastAnalysis` | Most recent log analysis |

---

## 🐛 Known Issues

- OTP is demo-only (123456) - no actual email sending
- Data persists only in browser localStorage
- File uploads are not sent to a server (client-side analysis only)

---

## 📄 License

This project is for academic purposes only as part of the Level 2, Term 2 coursework at the University of Frontier Technology, Bangladesh.

---

## 🙏 Acknowledgments

- University of Frontier Technology, Bangladesh
- Department of Cyber Security Engineering
- Course Instructors for their guidance

---

## 📧 Contact

For any questions or suggestions, please contact the team members.

---

**Made with ❤️ by Team LUMEN**
```

---

## Summary

| File | Purpose |
|------|---------|
| **Short Description** | 2-3 lines for GitHub repo subtitle |
| **README.md** | Complete documentation for teammates |

Your teammates can now:
- Understand the project structure
- Set up locally
- Know where to add new features
- Understand the localStorage data structure
- Follow contribution guidelines

---

**Good luck with your GitHub upload!** 🚀
