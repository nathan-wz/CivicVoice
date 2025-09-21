# CivicVoice

CivicVoice is a web application designed to empower citizens to voice their concerns, track local issues, and engage in meaningful civic discussions. The platform bridges the gap between communities and decision-makers by providing a transparent and user-friendly system for reporting and resolving issues.  

## 🚀 Features
- **User Authentication & Roles** – Secure login with role-based access (citizens, moderators, administrators).  
- **Issue Reporting** – Users can submit issues tied to specific locations (country > county > city).  
- **Comment System** – Nested comments with reply functionality for interactive discussions.  
- **Location Hierarchy** – Automatic creation and management of countries, counties, and cities.  
- **Interactive Frontend** – Built with React and Tailwind CSS for a clean, responsive UI.  
- **PostgreSQL Database** – Robust data storage optimized for relational queries.  
- **Django Backend** – RESTful APIs with Django providing reliable backend services.  

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS, React Router DOM  
- **Backend**: Django (Django REST Framework)  
- **Database**: PostgreSQL  
- **Authentication**: Django’s custom `AbstractUser` model with JWT-based authentication  
- **Deployment**: Compatible with Docker / cloud platforms  

## 📂 Project Structure
```bash
civicvoice/
│── backend/          # Django project (APIs, models, authentication, issue tracking)
│   ├── manage.py
│   ├── core/         # Core settings and configuration
│   ├── users/        # Custom user model and authentication
│   ├── issues/       # Issue reporting and comment system
│   └── locations/    # Country, county, city models
│
│── frontend/         # React project (UI components, routes, state management)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/  # AuthContext for global authentication state
│   │   └── App.js
│   └── package.json
│
│── README.md
│── requirements.txt  # Python dependencies
│── package.json      # JS dependencies
│── docker-compose.yml (optional if using Docker)
```

## ⚙️ Installation

### Prerequisites
- Python 3.10+  
- Node.js & npm/yarn  
- PostgreSQL  

### Backend Setup (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
