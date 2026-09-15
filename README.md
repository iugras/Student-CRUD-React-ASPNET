Student‑CRUD‑React‑ASPNET
A full‑stack CRUD application for managing students, built with ASP.NET Core Web API and React.
The project includes a complete Docker setup with Nginx and SQL Server, allowing the entire system to run as a unified container.

🚀 Features
Create, read, update, delete students

REST API built with ASP.NET Core

Modern React UI

Axios-based API communication

SQL Server database

Docker support (single container + SQL Server service)

Automatic database initialization via SQL script

🏗 Tech Stack
ASP.NET Core 8 Web API

Entity Framework Core

React

Axios

SQL Server 2022

Docker & docker‑compose

Nginx reverse proxy

📂 Project Structure

Student-CRUD-React-ASPNET/
│
├── StudentAPI/              # ASP.NET Core backend
├── studentfront/            # React frontend
│
├── Dockerfile               # unified container (API + React + Nginx)
├── nginx.conf               # reverse proxy configuration
├── docker-compose.yml       # SQL Server + unified app container
└── sql/
    └── init.sql             # auto-create DB and tables
⚙️ Running the Project with Docker
1️⃣ Build and start all services
bash
docker-compose build
docker-compose up
2️⃣ Application URLs
Component	URL
React UI	http://localhost:8080
API	http://localhost:8080/api/controller/GetStudent
SQL Server	localhost:1433


🗄 Database Initialization
The file sql/init.sql automatically:

creates the database StudentDB

creates the table Students

This happens every time SQL Server starts with a fresh volume.

🔌 Connection String
The API receives its connection string from environment variables in docker-compose.yml:


Server=sqlserver,1433;
Database=StudentDB;
User Id=sa;
Password=YourStrong@Password123;
TrustServerCertificate=True;
ASP.NET Core automatically maps:


ConnectionStrings__StudentDbContext
to:

json
"ConnectionStrings": {
  "StudentDbContext": ""
}
in appsettings.json.

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/controller/GetStudent	Get all students
POST	/api/controller/AddStudent	Add a new student
PUT	/api/controller/UpdateStudent/{id}	Update student
DELETE	/api/controller/DeleteStudent/{id}	Delete student


🎨 Frontend Usage
React communicates with the API through Nginx:

js
const response = await axios.get("/api/controller/GetStudent");
Nginx automatically proxies /api to the ASP.NET API running inside the container.

🐳 Docker Overview
Unified Dockerfile
Builds:

ASP.NET API

React production build

Nginx reverse proxy

docker-compose.yml
Runs:

SQL Server

unified application container
