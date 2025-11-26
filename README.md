# Task Manager - Frontend Developer Take-Home Assignment

## Overview

Welcome to the Task Manager take-home assignment! This project is a partially implemented task management application designed to assess your skills in full-stack JavaScript development with a focus on frontend technologies.

**Estimated Time:** 4-6 hours

**Tech Stack:**

- **Frontend:** Angular 21 (standalone components)
- **Backend:** NestJS 11
- **Database:** MongoDB 7.0
- **Authentication:** JWT (to be implemented)

## What You'll Find

This repository contains a working but **incomplete** application. The basic structure is in place, but several critical features are missing or not fully implemented. Your task is to complete these features following best practices.

### Currently Working

✅ User registration endpoint (backend)  
✅ Basic CRUD endpoints for tasks (backend, but **without authorization**)  
✅ MongoDB schemas for Users and Tasks  
✅ Basic Angular routing setup  
✅ Login and Register component UI  
✅ Task list component displaying tasks  
✅ Basic service structures

### Intentionally Missing (Your Tasks)

✅ JWT authentication login endpoint  
✅ Auth guards on backend routes  
✅ Authorization checks
✅ Frontend route guards  
✅ HTTP interceptor to attach JWT tokens  
✅ Complete AuthService implementation  
✅ Task detail/edit component  
✅ Priority management features  
✅ Input validation using DTOs  
✅ Error handling and user feedback

## Getting Started

### Prerequisites

- Node.js (v18 or higher, v20+ recommended)
- npm (v9 or higher)
- Docker and Docker Compose (for MongoDB)

### Installation

1. **Clone the repository** (or extract the provided archive)

2. **Start MongoDB**

   ```bash
   docker-compose up -d
   ```

3. **Setup Backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env if needed (MongoDB URI is already configured for Docker)
   npm run start:dev
   ```

   Backend will run on `http://localhost:3000`

4. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend will run on `http://localhost:4200`

### Verify Setup

- MongoDB should be accessible at `mongodb://localhost:27017`
- Backend API at `http://localhost:3000`
- Frontend at `http://localhost:4200`
- Try registering a user via the UI or Postman

## Your Tasks

### 1. Backend Authentication & Authorization (60-90 minutes)

#### 1.1 Implement JWT Login

**File:** `backend/src/auth/auth.service.ts`

- Complete the `login()` method
- Validate user credentials (email and password)
- Use bcrypt to compare passwords
- Generate and return a JWT token
- Handle errors appropriately

**File:** `backend/src/auth/auth.module.ts`

- Configure JWT module properly (use environment variables for secret)

#### 1.2 Create JWT Authentication Guard

**What to create:**

- JWT Strategy using `passport-jwt`
- Auth guard to protect routes

**Apply to:** All task endpoints in `backend/src/tasks/tasks.controller.ts`

#### 1.3 Add Authorization Checks

**File:** `backend/src/tasks/tasks.service.ts`

- Modify all methods to filter tasks by `userId`
- Ensure users can only access their own tasks
- Return appropriate errors when unauthorized

**Hints:**

- Extract userId from JWT token in controller
- Pass userId to service methods
- Use MongoDB queries to filter by userId

### 2. Frontend Authentication Flow (45-60 minutes)

#### 2.1 Complete AuthService

**File:** `frontend/src/app/services/auth.service.ts`

Implement the following methods:

- `login()` - Call backend API and store JWT token
- `logout()` - Clear stored token
- `getToken()` - Retrieve token from localStorage
- `isAuthenticated()` - Check if user has valid token

#### 2.2 Implement HTTP Interceptor

**File:** `frontend/src/app/interceptors/auth.interceptor.ts`

- Inject AuthService
- Attach JWT token to Authorization header for all requests
- Handle 401 errors (redirect to login)

**File:** `frontend/src/app/app.config.ts`

- Uncomment and configure the interceptor

#### 2.3 Create Auth Guard

**What to create:** `frontend/src/app/guards/auth.guard.ts`

- Check if user is authenticated
- Redirect to login if not authenticated
- Apply to `/tasks` route in `app.routes.ts`

### 3. Priority Management Feature (60-90 minutes)

#### 3.1 Backend Endpoints

**File:** `backend/src/tasks/tasks.controller.ts` and `tasks.service.ts`

Add the following functionality:

- Filter tasks by priority (query parameter or separate endpoint)
- Bulk update priorities for multiple tasks

**Example API designs you could implement:**

```
GET /tasks?priority=HIGH
PATCH /tasks/bulk-priority
  Body: { taskIds: ['id1', 'id2'], priority: 'URGENT' }
```

#### 3.2 Frontend Priority Filter

**What to create:** `frontend/src/app/components/priority-filter/priority-filter.component.ts`

- Create a component with dropdown to filter by priority
- Emit selected priority to parent (task-list)
- Update TaskService to support filtering

**File:** `frontend/src/app/components/task-list/task-list.component.ts`

- Integrate priority filter component
- Call TaskService with filter parameters

### 4. Task Detail/Edit Component (45-60 minutes)

**What to create:** `frontend/src/app/components/task-detail/task-detail.component.ts`

Create a component to:

- View individual task details
- Edit task (title, description, status, priority)
- Use Reactive Forms with validation
- Navigate back to task list after save

**Requirements:**

- Title is required
- Use proper Angular form validation
- Handle errors from backend
- Update the route in `app.routes.ts`
- Make the "Edit" button in task-list work

### 5. Validation & Error Handling (30-45 minutes)

#### 5.1 Backend Validation

Add class-validator decorators to DTOs:

- `backend/src/auth/dto/register.dto.ts`
- `backend/src/auth/dto/login.dto.ts`
- `backend/src/tasks/dto/create-task.dto.ts`
- `backend/src/tasks/dto/update-task.dto.ts`

**Examples:**

```typescript
@IsEmail()
@IsNotEmpty()
email: string;

@IsString()
@MinLength(6)
password: string;
```

Enable validation in `main.ts`:

```typescript
app.useGlobalPipes(new ValidationPipe());
```

#### 5.2 Frontend Validation

- Add form validation to login and register components
- Display validation errors to users
- Add error messages for API failures
- Implement user feedback (you can use simple alerts or create a toast service)

## Architecture Decisions for You to Make

The following aspects are intentionally left open for you to decide:

1. **Token Storage:** localStorage vs sessionStorage vs cookies?
2. **State Management:** Services only, Signals, or NgRx?
3. **Form Handling:** Template-driven or Reactive forms?
4. **Priority Filtering:** Query params, separate endpoint, or request body?
5. **Error Notification:** Custom service, third-party library, or simple alerts?
6. **Bulk Updates:** How to select multiple tasks? Checkboxes? Select all?

**Document your decisions** in your final submission. We want to understand your reasoning.

## Evaluation Criteria

We will assess your submission based on:

### Technical Implementation (40%)

- ✅ JWT authentication fully working
- ✅ Authorization properly implemented (users can't access others' tasks)
- ✅ Auth guards on both frontend and backend
- ✅ HTTP interceptor correctly configured
- ✅ All features working as expected

### Code Quality (30%)

- ✅ Clean, readable, and well-organized code
- ✅ Proper TypeScript usage
- ✅ Following Angular and NestJS best practices
- ✅ Appropriate use of RxJS operators
- ✅ No console errors or warnings

### Security (15%)

- ✅ Passwords properly hashed
- ✅ JWT tokens properly validated
- ✅ Authorization checks on all protected routes
- ✅ Input validation on both frontend and backend
- ✅ Sensitive data not exposed in responses

### User Experience (10%)

- ✅ Proper error handling and user feedback
- ✅ Form validation with helpful messages
- ✅ Responsive and intuitive UI
- ✅ Loading states where appropriate

### Git Usage (5%)

- ✅ Incremental commits with meaningful messages
- ✅ Logical commit structure
- ✅ Clean git history

## Submission Guidelines

1. **Code:**

   - Ensure all features are implemented and working
   - Remove any console.log statements used for debugging
   - Make sure the app runs without errors

2. **Documentation:**

   - Create a `SOLUTION.md` file documenting:
     - Architecture decisions you made
     - Any challenges you faced
     - How to test the features you implemented
     - Assumptions you made
   - Update this README if you changed any setup steps

3. **Testing:**

   - Manually test all features before submission
   - Ensure the app works from a fresh install

4. **Deliverable:**
   - Push to a Git repository (GitHub, GitLab, etc.) OR
   - **Create a ZIP archive excluding `node_modules` and `.git`**

## Tips & Hints

- **Start with backend auth first** - easier to test with Postman
- **Use Postman** (collection provided) to test backend APIs
- **Read the TODO comments** in the code - they guide you
- **Check existing code** - patterns are already established
- **Don't over-engineer** - focus on core functionality first
- **Test incrementally** - don't wait until the end to test
- **Git commit often** - we want to see your development process

## Resources

- [Angular 21 Documentation](https://angular.dev/)
- [NestJS 11 Documentation](https://docs.nestjs.com/)
- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [Angular Guards](https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access)
- [Angular HTTP Interceptors](https://angular.dev/guide/http/interceptors)
- [JWT.io](https://jwt.io/) - Debug JWT tokens

## Questions?

If you have questions about requirements or encounter setup issues, please reach out. We're here to help!

Good luck! We're excited to see your solution. 🚀
