# Quick Setup Guide

This guide will help you get the application running quickly.

## Prerequisites

Before you begin, make sure you have installed:

- **Node.js** (v18 or higher, v20+ recommended) - [Download](https://nodejs.org/)
- **npm** (v9 or higher, comes with Node.js)
- **Docker** - [Get Started](https://www.docker.com/get-started/)

## Tech Stack Versions

This project uses the latest stable versions:
- **Frontend:** Angular 21.0.0
- **Backend:** NestJS 11.1.9
- **Database:** MongoDB 7.0
- **TypeScript:** 5.9+ (frontend), 5.7+ (backend)

## Quick Start

### 1. Start the Database

Open a terminal and run:

```bash
docker-compose up -d
```

This will start MongoDB in a Docker container. Verify it's running:

```bash
docker ps
```

You should see `task-manager-mongodb` in the list.

### 2. Start the Backend

Open a new terminal:

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

The backend will start on `http://localhost:3000`

### 3. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:4200`

Your browser should automatically open to `http://localhost:4200`

## Verify Everything Works

### Test 1: Backend Health Check

Open your browser and go to:
```
http://localhost:3000
```

You should see a response from the NestJS server.

### Test 2: Register a User

1. Go to `http://localhost:4200/register`
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Click Register

You should see a success message and be redirected to login.

### Test 3: View Backend Logs

In your backend terminal, you should see the registration request logged.

## Common Issues

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Find the process using port 3000
lsof -i :3000
# Kill it
kill -9 [PID]
```

### MongoDB Connection Error

**Error:** `MongooseServerSelectionError`

**Solution:**
1. Make sure Docker is running
2. Check if MongoDB container is up:
   ```bash
   docker ps
   ```
3. If not, start it:
   ```bash
   docker-compose up -d
   ```

### npm install Errors

**Error:** Various npm errors

**Solution:**
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Make sure you're using Node.js v18 or higher (v20+ recommended for Angular 21)

### Angular CLI Not Found

**Error:** `ng: command not found`

**Solution:**
We're using `npx` to run Angular CLI, so you don't need to install it globally. The `npm start` command already uses `npx`.

## Next Steps

Once everything is running:

1. Read the main [README.md](./README.md) for full assignment details
2. Review the code structure
3. Check out the Postman collection for API testing
4. Start implementing the missing features!

## Stopping the Application

### Stop Frontend
Press `Ctrl+C` in the frontend terminal

### Stop Backend
Press `Ctrl+C` in the backend terminal

### Stop MongoDB
```bash
docker-compose down
```

### Stop Everything and Remove Data
```bash
docker-compose down -v
```

⚠️ **Warning:** The `-v` flag will delete all data in the database!

## Need Help?

- Check the main [README.md](./README.md)
- Review the code comments and TODOs
- Use the Postman collection to test the API
- Check console logs for errors

Good luck! 🚀

