# Solution Documentation

**Candidate Name:** [Your Name]  
**Date:** [Submission Date]  
**Estimated Time Spent:** [X hours]

**Tech Stack Used:**
- Frontend: Angular 21.0.0
- Backend: NestJS 11.1.9
- Database: MongoDB 7.0
- TypeScript: 5.9+ (frontend), 5.7+ (backend)

## Architecture Decisions

### 1. Token Storage
**Decision:** [localStorage / sessionStorage / cookies]

**Reasoning:**
[Explain why you chose this approach]

### 2. State Management
**Decision:** [Services only / Signals / NgRx / Other]

**Reasoning:**
[Explain your choice]

### 3. Form Handling
**Decision:** [Template-driven / Reactive forms]

**Reasoning:**
[Explain your choice]

### 4. Priority Filtering Implementation
**Approach:** [Query parameters / Separate endpoint / Request body]

**API Design:**
```
[Show your API endpoint(s)]
```

**Reasoning:**
[Explain your choice]

### 5. Error Notification Strategy
**Approach:** [Custom service / Third-party library / Simple alerts]

**Reasoning:**
[Explain your choice]

### 6. Other Architectural Decisions
[Add any other significant decisions you made]

## Implementation Details

### Backend Changes

#### Authentication
- [List the files you modified/created]
- [Describe key implementation details]

#### Authorization
- [Describe how you implemented authorization checks]
- [Any middleware or guards created]

#### Priority Management
- [Describe your implementation]

#### Validation
- [List DTOs you added validation to]

### Frontend Changes

#### Authentication Flow
- [Describe how login/logout works]
- [Where tokens are stored and retrieved]

#### Guards
- [Describe your guard implementation]

#### HTTP Interceptor
- [Describe how you implemented the interceptor]
- [How errors are handled]

#### Task Detail Component
- [Describe the component structure]
- [How validation is implemented]

#### Priority Filter
- [Describe the implementation]

## Challenges Faced

### Challenge 1: [Title]
**Problem:**
[Describe the challenge]

**Solution:**
[How you solved it]

### Challenge 2: [Title]
**Problem:**
[Describe the challenge]

**Solution:**
[How you solved it]

## Testing Instructions

### Manual Testing Steps

1. **Registration & Login:**
   ```
   - Go to http://localhost:4200/register
   - Register a new user
   - Login with the credentials
   - Verify token is stored and user is redirected
   ```

2. **Task CRUD Operations:**
   ```
   - Create a new task
   - Edit the task
   - Delete the task
   - Verify only your tasks are visible
   ```

3. **Priority Management:**
   ```
   - Create tasks with different priorities
   - Use the priority filter
   - Test bulk priority update (if implemented)
   ```

4. **Authorization:**
   ```
   - Login as User A, create tasks
   - Logout, register and login as User B
   - Verify User B cannot see User A's tasks
   ```

5. **Error Handling:**
   ```
   - Try to login with wrong credentials
   - Try to access /tasks without logging in
   - Test form validation errors
   ```

### API Testing with Postman
[Provide specific steps to test with the Postman collection]

## Assumptions Made

1. [List any assumptions you made about requirements]
2. [Any features you interpreted differently]
3. [Any edge cases you decided to handle in a specific way]

## Known Issues / Future Improvements

### Known Issues
- [List any known bugs or limitations]

### Future Improvements
- [What would you improve with more time?]
- [What features would you add?]

## Time Breakdown

| Task | Estimated Time | Actual Time |
|------|----------------|-------------|
| Backend Auth | 60-90 min | [X min] |
| Frontend Auth | 45-60 min | [X min] |
| Priority Management | 60-90 min | [X min] |
| Task Detail Component | 45-60 min | [X min] |
| Validation & Error Handling | 30-45 min | [X min] |
| Testing & Debugging | - | [X min] |
| Documentation | - | [X min] |
| **Total** | **4-6 hours** | **[X hours]** |

## Additional Notes

[Any other information you'd like to share about your implementation]

