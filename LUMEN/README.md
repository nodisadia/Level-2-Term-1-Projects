
Here is your **updated README.md** with all the latest features including Profile Page, Scan Detail Page, Plan Selection, Payment System, and all the new updates:

---

## README.md (Updated)

```markdown
# 🛡️ LUMEN - Frontend

> Human-Centric Cyber Risk Intelligence Platform | Frontend Repository

![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white)
![Status](https://img.shields.io/badge/status-complete-brightgreen)

---

## 📖 About This Repository

This repository contains the **complete frontend** of LUMEN - a web-based cybersecurity analysis platform that helps users upload system logs and automatically detect potential security risks.

**Built by:** Sadia Tabassum (ID: 2304008)  
**Course:** Level 2, Term 2 | Dept. of Cyber Security Engineering, UFTB

---

## ✨ Features Implemented

| Feature | Status |
|---------|--------|
| Mood Selector (8 themes) | ✅ |
| Home Page with Pricing | ✅ |
| Login Page (with role selection) | ✅ |
| User Registration with Plan Selection | ✅ |
| Admin Registration Page | ✅ |
| Forgot Password / OTP / Reset Password | ✅ |
| Upload Log Page (drag & drop) | ✅ |
| Risk Dashboard (charts) | ✅ |
| Copy-Paste Security Commands | ✅ |
| **Profile Page** (Update profile, change password, delete account) | ✅ |
| **Scan Detail Page** (Detailed findings with commands) | ✅ |
| **Payment Page** (Card, bKash, Nagad, Bank Transfer) | ✅ |
| **Enterprise Contact Page** | ✅ |
| Admin Panel (User stats, Premium requests, Security rules) | ✅ |
| Premium Support System | ✅ |
| Fully Responsive Design | ✅ |

---

## 🎨 8 Mood Themes

| Mood | Color | Emotion |
|------|-------|---------|
| Default | Lavender | Soft & Balanced |
| Happy | Yellow/Orange | Bright & Energetic |
| Calm | Blue/Teal | Peaceful & Relaxed |
| Dark | Black/Navy | Sleek & Mysterious |
| Energetic | Red/Orange | Vibrant & Dynamic |
| White | White/Silver | Clean & Minimal |
| Professional | Navy/Gray | Corporate & Formal |
| Sad | Indigo/Purple | Mellow & Deep |

---

## 💳 Payment Methods

| Method | Supported |
|--------|-----------|
| Credit/Debit Card (Visa, Mastercard, Amex) | ✅ |
| bKash | ✅ |
| Nagad | ✅ |
| Bank Transfer | ✅ |

---

## 📋 Plan Options

| Plan | Price | Features |
|------|-------|----------|
| **Free** | FREE | 5 analyses/month, Basic risk scoring, Copy-paste solutions, 7-day history |
| **Premium** | ৳250/month | Unlimited analyses, Advanced risk scoring, Technician support, Custom rules |
| **Enterprise** | Custom | Everything in Premium, Dedicated support, On-premise deployment, SLA |

---

## 🚀 How to Run

1. **Clone the repository**
```bash
git clone https://github.com/your-username/lumen-frontend.git
cd lumen-frontend
```

2. **Open the project**
```bash
# Double-click index.html
# OR use VS Code Live Server
```

3. **Start using**
- Select your mood theme
- Choose a plan (Free/Premium/Enterprise)
- Register or Login
- Upload a log file
- View risk dashboard
- Copy security commands
- Upgrade to Premium from Profile page

---

## 🔐 Demo Credentials

| Role | Username/Email | Password |
|------|----------------|----------|
| **User** | `user@lumen.com` or `user` | `password123` |
| **Admin** | `admin@lumen.com` or `admin` | `admin123` |

**Admin Registration Code:** `LUMEN_ADMIN_2024`

---

## 📁 Folder Structure

```
lumen-frontend/
│
├── index.html                      # Home + Mood Selector
├── 404.html                        # Custom error page
│
├── css/
│   ├── mood-base.css               # Base styles
│   └── mood-*.css                  # 8 theme files
│
├── js/
│   ├── mood-storage.js             # Save/load mood
│   ├── mood-selector.js            # Mood logic
│   ├── homepage.js                 # Home interactions
│   └── mobile-menu.js              # Mobile navigation
│
└── pages/
    ├── login.html + .css + .js
    ├── register.html + .css        # Registration choice page
    ├── user-register.html + .js    # User registration with plan selection
    ├── admin-register.html + .js   # Admin registration
    ├── forgot-password.html + .css + .js
    ├── otp-verification.html + .css + .js
    ├── reset-password.html + .css + .js
    ├── upload-log.html + .css + .js
    ├── dashboard.html + .css + .js
    ├── history.html + .css + .js
    ├── profile.html + .css + .js
    ├── scan-detail.html + .css + .js
    ├── payment.html                # Payment page with multiple methods
    ├── contact-creator.html        # Enterprise plan contact page
    └── admin.html + .css + .js     # Admin panel
```

---

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling & Animations
- **JavaScript (ES6)** - Interactivity
- **Chart.js** - Data visualization
- **Font Awesome** - Icons
- **Tailwind CSS** - Utility classes
- **LocalStorage** - Data persistence

---

## 📱 Pages & Navigation Flow

```
index.html (Home + Mood Selector)
    ↓
register.html (Choice: User / Admin)
    ↓
user-register.html (Plan Selection: Free / Premium / Enterprise)
    ↓
├── Free → dashboard.html
├── Premium → payment.html → dashboard.html
└── Enterprise → contact-creator.html → dashboard.html
    ↓
dashboard.html ←→ upload-log.html ←→ history.html ←→ profile.html
    ↓
admin.html (Admin only)
```

---

## 💾 Data Storage (LocalStorage)

| Key | Purpose |
|-----|---------|
| `lumen_mood_preference` | Saved mood theme |
| `registeredUsers` | All user accounts |
| `user` | Current logged-in user |
| `selectedPlan` | Selected plan during registration |
| `premiumRequests` | Premium support requests |
| `customPlanRequests` | Enterprise plan requests |
| `securityRules` | Detection rules |
| `scanHistory` | User's log analysis history |
| `lastAnalysis` | Most recent analysis |

---

## 📚 Course Information

| Course | Code |
|--------|------|
| Database Management System (Sessional) | CSE 202 |
| Android & Web App Development (Sessional) | PROG 212 |
| Threat Modeling & Security Monitoring (Sessional) | SEC 204 |

**University:** University of Frontier Technology, Bangladesh  
**Department:** Cyber Security Engineering  
**Semester:** Level 2, Term 2

---

## 👩‍💻 Author

**Sadia Tabassum**  
ID: 2304008  
Department of Cyber Security Engineering  
University of Frontier Technology, Bangladesh

### Instructors
- Rakib Hossen - Assistant Professor
- Md Masud Rana - Lecturer
- Md Abdullah - Lecturer

### Team Members
- Sadia Tabassum (2304008) - Frontend Developer
- Sadia Akter (2304022) - Database Administrator
- Md Ratul Ryhan Rafi (2304036) - Backend Developer

---

## 📄 License

This project is for academic purposes only as part of Level 2, Term 2 coursework.

---

**Made with ❤️ by Sadia Tabassum**  
*Frontend Developer | LUMEN Project*
```

---

## Summary of Updates:

| Added | Description |
|-------|-------------|
| Profile Page | ✅ |
| Scan Detail Page | ✅ |
| Payment Page (Card, bKash, Nagad, Bank) | ✅ |
| Enterprise Contact Page | ✅ |
| Plan Selection (Free/Premium/Enterprise) | ✅ |
| Updated Folder Structure | ✅ |
| Updated Navigation Flow | ✅ |
| Updated localStorage keys | ✅ |
| Team Members section | ✅ |

---

**This README is now fully updated with all your latest features!** ✅
