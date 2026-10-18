# JK Montessori School ERP — PHP 8+ & MySQL Backend
**School:** JK Montessori School (Nursery to Class 12)  
**Location:** Subhash Chowk, Block Ghughli, District Maharajganj, Uttar Pradesh, India  
**Principal:** Mr. Sanjay Kumar Mishra  
**Creator & Architect:** Bhaskar Gautam  
**Phase:** Phase 2 (Real Backend, MySQL Database & Secure Admin Login)

---

## 1. Quick Technical Specifications

- **Language:** PHP 8.2+ (strict types, PSR-4 structure)
- **Database:** MySQL 8.0+ / MariaDB 10.4+ (`utf8mb4_unicode_ci`)
- **Database Name:** `jkmontessori_erp`
- **Driver:** Native PDO with `PDO::ATTR_EMULATE_PREPARES = false` (Zero SQL Injection)
- **Authentication:** Server-side sessions with HttpOnly cookies, session ID regeneration, and bcrypt cost 12
- **Defense-in-depth:** Login rate-limiting (5 attempts / 15-min lockout), CSRF protection, and audit logging

---

## 2. Directory Layout

```text
backend/
├── cli/
│   └── create_super_admin.php   # Safe CLI tool to initialize first Super Admin (No public web exposure)
├── config/
│   ├── database.php             # PDO singleton with UTF8MB4 & error handling
│   ├── cors.php                 # CORS handler with credential support
│   └── session.php              # Secure session cookie settings & CSRF token generator
├── migrations/
│   ├── 001_create_tables.sql    # DDL for users, roles, permissions, audit_logs, classes, etc.
│   └── 002_seed_initial_data.sql# Initial roles, permissions, 2026-27 session, and 14 classes
├── public/
│   ├── index.php                # Front controller & REST route dispatcher
│   └── .htaccess                # Apache rewrite rules & security headers
├── src/
│   ├── Controllers/
│   │   ├── AuthController.php   # Login, logout, me, CSRF token
│   │   ├── AcademicController.php# Classes, sections, academic sessions
│   │   └── SystemController.php # Health probe & audit logs
│   ├── Middleware/
│   │   ├── AuthMiddleware.php   # Session verification
│   │   ├── CsrfMiddleware.php   # CSRF token check for state-changing requests
│   │   └── RoleMiddleware.php   # Role and permission enforcement
│   ├── Services/
│   │   ├── AuthService.php      # Password verification & session management
│   │   ├── AuditService.php     # Immutable audit trail
│   │   └── RateLimiter.php      # Anti-brute force throttling
│   └── Utils/
│       ├── Response.php         # Consistent JSON responses
│       └── Validator.php        # Input validation & client IP detection
├── .env.example                 # Environment variables blueprint
└── README.md                    # Installation & setup guide
```

---

## 3. Windows PC पर XAMPP के साथ इंस्टॉलेशन (सरल हिन्दी में निर्देश)

यदि आप अपने स्थानीय कम्प्यूटर (Windows PC) पर इस बैकएंड को XAMPP के माध्यम से चलाना चाहते हैं, तो नीचे दिए गए 5 आसान चरणों का पालन करें:

### चरण 1: XAMPP डाउनलोड और इंस्टॉल करें
1. [Apache Friends](https://www.apachefriends.org/) वेबसाइट से PHP 8.2 युक्त **XAMPP for Windows** डाउनलोड करें।
2. XAMPP को `C:\xampp` में इंस्टॉल करें।
3. **XAMPP Control Panel** खोलें और **Apache** तथा **MySQL** दोनों के सामने दिए गए **Start** बटन पर क्लिक करें (दोनों हरे रंग में दिखने चाहिए)।

### चरण 2: प्रोजेक्ट फ़ोल्डर को htdocs में रखें
1. अपने पूरे प्रोजेक्ट या `backend` फ़ोल्डर को XAMPP के `htdocs` डायरेक्टरी में कॉपी करें:
   ```text
   C:\xampp\htdocs\jkmontessori_erp\backend
   ```
2. `backend\.env.example` को कॉपी करके उसी फ़ोल्डर में `.env` नाम से सेव करें।
3. XAMPP में डिफ़ॉल्ट रूप से MySQL का यूज़र `root` होता है और पासवर्ड खाली (blank) रहता है:
   ```ini
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=jkmontessori_erp
   DB_USER=root
   DB_PASSWORD=
   ```

### चरण 3: MySQL डेटाबेस और टेबल्स बनाएं
1. अपने ब्राउज़र में `http://localhost/phpmyadmin` खोलें।
2. बायीं ओर **New** पर क्लिक करें और डेटाबेस का नाम `jkmontessori_erp` डालें एवं Collation में `utf8mb4_unicode_ci` चुनें, फिर **Create** पर क्लिक करें।
3. ऊपर दिए गए **Import** टैब पर जाएं और निम्न दो फ़ाइलों को क्रमानुसार इम्पोर्ट करें:
   - पहली फ़ाइल: `backend/migrations/001_create_tables.sql`
   - दूसरी फ़ाइल: `backend/migrations/002_seed_initial_data.sql`
4. या आप Windows Command Prompt (cmd) में जाकर यह कमांड चला सकते हैं:
   ```cmd
   cd C:\xampp\mysql\bin
   mysql -u root jkmontessori_erp < C:\xampp\htdocs\jkmontessori_erp\backend\migrations\001_create_tables.sql
   mysql -u root jkmontessori_erp < C:\xampp\htdocs\jkmontessori_erp\backend\migrations\002_seed_initial_data.sql
   ```

### चरण 4: पहला सुपर एडमिन अकाउंट बनाएं (CLI से सुरक्षित निर्माण)
सुरक्षा नियमों के अनुसार, किसी भी सार्वजनिक वेब पेज पर सुपर एडमिन बनाने का विकल्प नहीं रखा गया है।
Command Prompt खोलें और यह कमांड चलाएं:
```cmd
cd C:\xampp\htdocs\jkmontessori_erp\backend
C:\xampp\php\php.exe cli\create_super_admin.php
```
कमांड आपसे पूछेगा:
- **Username:** `admin` या अपनी पसंद का नाम
- **Email:** `principal@jkmontessori.org`
- **Full Name:** `Mr. Sanjay Kumar Mishra`
- **Password:** कम से कम 8 अक्षर, एक बड़ा अक्षर (A-Z) और एक अंक (0-9) युक्त सुरक्षित पासवर्ड।

सफल होने पर आपका सुपर एडमिन अकाउंट तुरंत डेटाबेस में एन्क्रिप्टेड (bcrypt hash) रूप में सुरक्षित हो जाएगा!

### चरण 5: बैकएंड चालू होने की पुष्टि करें
अपने वेब ब्राउज़र में यह URL खोलें:
```text
http://localhost/jkmontessori_erp/backend/public/api/v1/health
```
आपको ऐसा JSON उत्तर प्राप्त होगा:
```json
{
  "success": true,
  "status": "online",
  "app_name": "JK Montessori School ERP Backend",
  "principal": "Mr. Sanjay Kumar Mishra",
  "developer": "Bhaskar Gautam",
  "php_version": "8.2.x",
  "database": {
    "connected": true,
    "database": "jkmontessori_erp"
  }
}
```

---

## 4. API Endpoints Reference

| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Public | System and database connectivity probe |
| `GET` | `/api/v1/auth/csrf` | Public | Retrieve current session CSRF token |
| `POST` | `/api/v1/auth/login` | Public (Throttled) | Verify credentials, regenerate session, return user role |
| `POST` | `/api/v1/auth/logout` | Authenticated | Destroy session, revoke cookies, log audit |
| `GET` | `/api/v1/auth/me` | Authenticated | Fetch active authenticated profile & permissions |
| `GET` | `/api/v1/academic/classes` | Authenticated | Fetch 14 classes (Nursery to 12th) & sections from MySQL |
| `GET` | `/api/v1/academic/sessions`| Authenticated | Fetch academic session records (2026-2027) |
| `GET` | `/api/v1/audit-logs` | SuperAdmin / Principal | View administrative audit trail |

---

## 5. Security & Verification Notes

- **Password Hashing:** Passwords are never stored in plaintext. They use `PASSWORD_BCRYPT` with cost factor 12.
- **Session Fixation Defense:** `session_regenerate_id(true)` is executed upon every successful login.
- **Brute Force Protection:** After 5 consecutive failed login attempts from the same IP or username, the account is locked for 15 minutes.
- **Audit Trail:** Every login, logout, and failed attempt is logged with IP address and timestamp in `audit_logs`.
- **Author Attribution:** Designed and Developed by **Bhaskar Gautam** for JK Montessori School.
