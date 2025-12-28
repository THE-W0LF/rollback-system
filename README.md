# Change Tracking & Rollback System (MERN Backend)

A backend-focused MERN stack project that tracks changes to data, maintains version history, and allows rollback to any previous state.  
The system is designed to demonstrate real-world backend concepts like versioning, audit history, and rollback logic.

---

##  Problem Statement

In real applications, updating data can be risky:
- Mistakes happen
- Incorrect updates can break workflows
- There is often a need to restore previous data states

This project solves that problem by:
- Storing every previous version of an entity
- Maintaining a full change history
- Allowing rollback to any earlier version safely

---

##  Core Concepts Implemented

- RESTful APIs using Express.js
- Separation of concerns (routes, controllers, models)
- MongoDB document versioning
- Rollback mechanism with history preservation
- Frontend–backend communication using fetch API
- Git-based version control

---

##  Project Architecture

- Browser (Frontend)
- Express API (Node.js)
- Controllers (Business Logic)
- Mongoose (ODM)
- MongoDB (Database)

---

##  Key Backend Features

### 1. Create Entity
- Creates a new entity with initial state

### 2. Update Entity with Versioning
- Before updating an entity, the current state is saved as a version
- Each update increases the version count

### 3. Version History
- All previous versions are stored in a separate collection
- Versions are ordered and traceable

### 4. Rollback Mechanism
- Allows restoring an entity to any previous version
- Rollback itself is treated as a new version to preserve history

---

##  API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/entities` | Create entity |
| PUT | `/api/entities/:id` | Update entity |
| GET | `/api/entities/:id` | Get current entity |
| GET | `/api/entities/:id/versions` | Get version history |
| POST | `/api/entities/:id/rollback/:versionId` | Rollback entity |

---

##  Example Rollback Flow

1. Entity is created
2. Entity is updated multiple times
3. Each update stores a snapshot in the `versions` collection
4. A rollback request:
   - Saves the current state as a new version
   - Restores the selected previous snapshot
5. Entity state is updated safely

---

##  Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **ODM:** Mongoose
- **Frontend:** HTML, CSS, JavaScript
- **Version Control:** Git & GitHub

---

##  How to Run Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   
3. Create a `.env` file:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   
5. Start the server:
   ```bash
   node server/server.js

6. Open frontend:
   Open `frontend/index.html` in browser

---

##  Why This Project Matters
This project focuses on backend engineering principles, not just CRUD:
- Version control at data level
- Safe rollback strategies
- Clean separation of responsibilities
It reflects how real systems handle data integrity and recovery.

---

##  Future Improvements
- React-based frontend
- Authentication & role-based access
- Pagination for version history
- Deployment to cloud platform

---

##  Author

**Aman Jobanputra**  
Built as a learning-focused MERN stack project with emphasis on backend clarity and system design.
