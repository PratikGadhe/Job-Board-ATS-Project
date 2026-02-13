# Job Board + Applicant Tracking System (ATS)

A full-stack web application that allows employers to post jobs and manage applicants, while candidates can browse jobs, apply, and track application status.

This project simulates a real-world hiring workflow with role-based access, job management, and resume handling.

---

## 🚀 Features

### Authentication

* JWT-based login
* Role-based users (Employer / Candidate)

### Candidate

* Browse job listings
* Apply for jobs
* Create professional profile
* Upload resume
* Track application status

### Employer

* Create company profile
* Post jobs
* View applicants
* Review resumes
* Update hiring status

### System

* REST API (Django REST Framework)
* React frontend
* Resume file upload support
* Role-based dashboards

---

## 🛠 Tech Stack

**Backend**

* Django
* Django REST Framework
* JWT Authentication (SimpleJWT)
* SQLite (development)

**Frontend**

* React
* Axios
* React Router

**Other**

* File uploads (resume handling)
* CORS enabled for frontend communication

---

## 📦 System Requirements

Install the following before running the project:

* Python 3.10+
* Node.js 18+
* npm
* Git (recommended)

---

## ⚙️ Backend Setup (Django)

Navigate to the backend project folder (where `manage.py` exists).

### 1. Create Virtual Environment

Mac / Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Windows:

```bash
python -m venv .venv
.venv\Scripts\activate
```

---

### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

If requirements.txt does not exist:

```bash
pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers
pip install pillow
```

Then create requirements file:

```bash
pip freeze > requirements.txt
```

---

### 3. Apply Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

### 4. Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

---

### 5. Run Backend Server

```bash
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

## ⚙️ Frontend Setup (React)

Open a new terminal and go to frontend directory.

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React app:

```bash
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 📁 Media Files (Resume Uploads)

Ensure media directory exists in backend root:

```
media/
```

Uploaded resumes will be stored in:

```
media/resumes/
```

---

## ▶️ Running the Full Project

You must run BOTH backend and frontend.

Terminal 1:

```bash
python manage.py runserver
```

Terminal 2:

```bash
cd frontend
npm start
```

Open in browser:

```
http://localhost:3000
```

---

## 📂 Project Structure

```
project/
│
├── backend Django files
│   ├── manage.py
│   ├── config/
│   ├── users/
│   ├── jobs/
│   └── media/
│
├── frontend/
│   ├── package.json
│   └── src/
│
├── requirements.txt
└── README.md
```

---

## 🔐 Default Roles

Users can log in as:

* Candidate
* Employer

Each role has separate dashboard and permissions.

---

## 📌 Notes

* SQLite is used for development.
* For production, configure PostgreSQL and proper media storage.
* Media files are served locally only when DEBUG = True.

---

## 👨‍💻 Author

Full Stack ATS Project
Built using Django + React

---

## 📄 License

This project is for educational and demonstration purposes.
