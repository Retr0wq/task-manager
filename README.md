# Task Manager

Task manager with JWT authentication.
Each user has their own tasks, isolated by account.

## Technologies

* **Back-end:** Node.js, Express, SQLite, JWT, bcrypt
* **Front-end:** React, TypeScript, Vite, Tailwind CSS, Axios

## Features

* User registration and login with encrypted password
* JWT-based authentication
* Full CRUD for tasks
* Protected routes on the front-end

## How to run locally

### Back-end

```bash
cd server
npm install
npm run dev
```

Create a `.env` file in `server/` with:

```
PORT= 6767
JWT_SECRET= chave1324
```

### Front-end

```bash
cd client
npm install
npm run dev
```

Access `http://localhost:5173`
