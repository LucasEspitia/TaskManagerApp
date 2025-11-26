# Solution Documentation

**Candidate Name:** Lucas Daniel Espitia Corredor
**Date:** 25/11/2025
**Estimated Time Spent:** Around 6-8 h

**Tech Stack Used:**

- Frontend: Angular 21.0.0
- Backend: NestJS 11.1.9
- Database: MongoDB 7.0
- TypeScript: 5.9+ (frontend), 5.7+ (backend)

## Architecture Decisions

### 1. Token Storage

**Decision:** LocalStorage

**Reasoning:**

It is simple to implement, allows a token to persist while browsing.
It's also compatible with the Angular interceptor.
For a simple application that doesn't handle sensitive information, it's fine. If more sensitive information were involved, other techniques could be used.

### 2. State Management

**Decision:** Services Only
Each service manages its own state (token in AuthService, task data in TaskService). I didn't use NgRx or signals because the project doesn't require a global store, and keeping it simple improves maintainability.

**Reasoning:**

### 3. Form Handling

**Decision:** Reactive Form + Template-Driven Forms

**Reasoning:**
I decided to use a combination of Reactive Forms and Template-Driven Forms depending on the needs of the case:

Template-Driven Forms for quick task creation (task-create) and quick bulk editing (bulk-edit), where complexity is low.

Reactive Forms for login and registration, because they require robust validation and follow best programming practices and standards. It's also used for editing task details, because if more elements are added to a task, the validation would need to be stricter.

### 4. Priority Filtering Implementation

**Approach:** Query params

I implemented task filtering by priority using query parameters (/tasks?priority=HIGH).
This strategy uses the capabilities of HttpClient in Angular and NestJS @Query, without needing to create additional endpoints.

**API Design:**

- Front - End
  getTasks(priority?: string): Observable<Task[]> {
  const params: Record<string, string> = {};

      if (priority) {
        params['priority'] = priority;
      }

      return this.http.get<Task[]>(this.apiUrl, { params });

}

- Back - End
  @Get()
  findAll(
  @Req() req: Request & { user: { userId: string } },
  @Query('priority') priority?: string,
  )  
  {
  const userId = req.user.userId;
  return this.tasksService.findAll(userId, priority);
  }

**example**
/tasks?priority=HIGH
/task?priority=LOW
/task?priority

**Reasoning:**

This is the most recommended approach for REST APIs. It avoids creating unnecessary endpoints that could lead to higher maintenance costs in the future. It also allows for the future implementation of new parameters without requiring a complete API redesign. Furthermore, since this project is built on Angular, the use of HttpClient is advantageous, and I'm taking full advantage of it.

### 5. Error Notification Strategy

**Approach:** Custom Service and HTML + Component State

**Reasoning:**

- HTML + Component State

In areas where information fields need to be recorded, the component's state is used. Based on the input provided, it notifies the user whether fields are required or if necessary conditions are missing, thus avoiding overloading the UI with annoying messages.

- Custom Service (toast)

I've also implemented a toast component that functions as a utility. I primarily use it when information changes are required in tasks using the API. It returns the calls, logging whether there were errors or if the process was successful.
The advantage of this approach is that it's quite modular and can be customized according to needs.

### 6. Other Architectural Decisions

For bulk funcionalies. I create specific DTO, plus and end-point.

## Implementation Details

### Backend Changes

#### Authentication

**Modified**

- src/auth/auth.module.ts
- src/auth/auth.service.ts
- src/auth/auth.controller.ts
- src/auth/dto/login.dto.ts
- src/auth/dto/register.dto.ts

**Created**

- src/auth/jwt-auth.guard.ts
- .env

**Key Implementation details**

1. Login system with credential validation
   In file auth.service, in the method 'logIn()'.
   The user is search by the email and if it is valid we compare the password with a bcrypt.compare.
   Therefore, Therefore, if it is validated, a JWT is generated with the username, email, and name. Finally, we return the token.

2. Configure JwTModule
   In file auth.module.ts, we set the module.

#### Authorization

1. Implementation of the JWT Strategy
   In file jwt.strategy.ts, we validate the token and I expose the re.user automatically.
   That means in any controller with the JWT strategy we have the user and email.

2. Ownership-based authorization
   I implemented per-user authorization, ensuring that user can only see their own tasks

#### Priority Management

As previously mentioned, it has been used via queries. The general endpoint '@Get() findAll()' has been modified to optionally allow the addition of parameters. This function has been reused to filter by priority or return all.

#### Validation

- auth/dto/login.dto.ts
- auth/dto/register.dto.ts
- tasks/dto/create-task.dto.ts
- tasks/dto/update-task.dto.ts
- tasks/dto/bulk-edit.dto.ts

Each validation field has been added using the 'class-validator'. Some cases are optional; it is indicated that it is an Array, or in the case of BulkEditDto, we have declared that it should be an Array (@IsArray).

### Frontend Changes

#### Authentication Flow

The login form is reactive and receives an email address and password as parameters. The form checks for changes in real time and notifies the user if there is an incorrect input (e.g., the email address does not follow the standard format). Upon submitting the request, the Controller performs a final check, and if everything is successful, the AuthService is called.

Therefore, the AuthService in 'auth.service.ts' retrieves the data and makes an API call for authentication. If the call is successful (as previously explained in the validations), a JWT token will be generated. This token will be stored in localStorage for the duration of the session.

In the logout process, the token is simply deleted from localStorage, and thanks to route protection, the user is automatically redirected to '/', which is the login page.

#### Guards

The 'auth.guard.ts' file has been created, which contains token verification logic.
In simple words, if no token exists in the local storage, it redirects all requests to '/' -> LogIn. This way, we save the paths to prevent unauthorized access to Task.

#### HTTP Interceptor

An 'auth.interceptor.ts' file was created, which functions as an interceptor between the backend and the frontend.

1. It intercepts the request before it reaches the backend and obtains the token with:

const token authService.getToken();

This returns the token value or null (if the user is not logged in).

2. If the token exists, it is added to the JSON request header.

This ensures that each request sent by a user is exclusively from that user and not from another.

3. It allows the request to be passed to the backend using return next(req).

4. If the token has expired (according to JWT configurations), it redirects to '/', indicating that the session has expired. This can be very useful if you want to prevent a client from connecting indefinitely or with inactivity.

#### Task Detail Component

The Task Detail component is a standalone component that displays task details and allows you to modify its attributes.

1. Creation
   From the task list, it is called using a button that routes to the /task/id path. The task ID you want to view in more detail is passed as a parameter.

2. Routing and Retrieving Details
   When this component is created, the Reactive Form is created during its assembly, and the task with the ID previously provided by the parent component is also retrieved.

3. Retrieving Details
   Once the task is retrieved, its content is loaded. Using the patchValue function, the task values ​​are added. This way, when the component initializes, it starts with the established values ​​for this task.

4. Editing
   A Reactive Form is used to specify which values ​​are required. Although the UI is designed to prevent this (excluding the title), it is good practice to include these checkboxes.

5. Save
   Upon confirming the changes, the final check of the form is performed. If everything is successful, we call 'taskService.updateTask()' and use the interceptor to obtain the response.

- 5.1 Successful Save
  The user is notified that the save was successful and redirected to the /task page.

- 5.2 Error Save
  We simply notify the user that there was a problem saving the edit.

**Alternative**: In the future, depending on the response, it would be possible to create an asynchronous call to save later if the failure was due to a disconnection from the database.

If the request was unauthorized, we would need to review the code.

6. Cancel
   We close the component and go to '/task'.

#### Priority Filter

-The PriorityFilter component is added directly to the task-list.component.

1. Creation
   This component is generally mounted in the DOM.

2. Click
   When clicked, a flag is displayed, opening the menu options.

3. Menu using lists
   I chose this approach because it allows for more styling. Selects are very rigid and don't allow for a rich user interface. The content of these lists is populated manually.

4. Selection and confirmation
   When an item is selected, its priority is saved in an attribute and passed to its parent component, 'task-list', via emit. This parent component then makes an API call using the applyFilter function, which in turn calls loadTask with the query parameters.

5. Result
   Calling this function will return only the results of the created query, and the content will change.

**Alternatives**

- The list could have been displayed using a hoover event instead of a click event.

- The values ​​within the list could have been obtained using the API and its enum. However, this would be overarching for an application like this. Only if the application grew and there were many categories would using a map be a valid option.

## Challenges Faced

### Challenge 1: [BulkEdit did not modify nothing before]

**Problem:**
The API call returned an empty array and didn't modify anything.

NestJS was applying validation to UpdateTaskDto instead of BulkEditDto
→ "property taskIds should not exist"

**Solution:**

When I started developing this component, it took me quite a while. First, I created the DTOs, services, and controllers on the backend and then integrated them into the frontend.

Just when it seemed like everything was going to work, it didn't. After a while (approximately 30-60 minutes) and several debugging checks, the error was in the order of the endpoints in the backend.

The solution was simply to change the order, moving the `bulkEdit` function to the top and placing calls without a route (e.g., `@Get(':id')`) at the bottom.

The explanation is that the backend handles endpoints linearly and matches the first endpoint it receives. When `/bulk-edit` is passed, the backend interprets it as an ID.

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
   Login as User A, create tasks
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

**Test without header**

1. Create an user

- POST /auth/register
- Body (JSON):

```
   {
      "email": "any@email.com",
      "password": "anyPasswordMinLENGHT(6)",
      "name": "Any user"
   }
```

_You will get the id (token). -> Save it_

2. LogIn

- POST /auth/login
- Body (JSON):

```
   {
      "email": "any@email.com",
      "password": "anyPasswordMinLENGHT(6)",
   }
```

_Copy the access_token for the following tests.t_

**Test with token (user header Authorization)**

**IMPORTANT!!**
From this point, add the next header to do the next requests:

```
   |     key        |      value            |
   | Authorization: | Bearer <ACCESS_TOKEN> |  -> Only this!
```

3. Post a Task

- POST /tasks
- Body (JSON):

```
   {
      "title": "My First Task",
      "description": "This is a description",
      "priority": "HIGH"
   }
```

4. Get All tasks

- GET /tasks
- Body(JSON): None

5. Filter task by priority

- GET http://localhost:3000/tasks?priority=HIGH
- Body(JSON): None

You can change the priority for: LOW, MEDIUM, HIGH, URGENT

6. Get a task by ID

- GET http://localhost:3000/tasks/<TASK_ID>
- Body(JSON): None

7. Edit a Task

- PATCH http://localhost:3000/tasks/<TASK_ID>
- Body(JSON):

```
-{
  "title": "Updated title",
  "description": "Updated description",
  "priority": "LOW",
  "status": "IN_PROGRESS"
}
```

8. Bulk edit

- PATCH http://localhost:3000/tasks/bulk-edit
- Body(Json):

```
{
  "taskIds": [
    "ID_1",
    "ID_2"
  ],
  "priority": "HIGH",
  "status": "DONE"
}
```

You can send only priority or status

9. Delete a task

- DELETE http://localhost:3000/tasks/<TASK_ID>
- Body(Json): None

## Assumptions Made

1. Pagination is not required for tasks
2. Creating add Task should be done
3. Stricter register method would not be required
4. The Bulk condition could also be acquired with status and priority, not just priority.

## Known Issues / Future Improvements

### Known Issues

- Code reuse between edit and create component task. Very similar content. It's possible to reuse the code from both and display what's slightly different in each case.
- Delete message 'Are you sure?' is ugly. (Alert)
- No Authentication of real users.

### Future Improvements

#### Security

- Authentication of real users. For example, with a code sent to the email address.

#### Functionalities

- Confirmation Component for LogOut/Delete and Bulk-delete
- Task selection, which covers the entire component (the entire component can be selected with one click).
- Instead of creating a separate route for editing tasks, use a modal to create a Single-Page Application (SPA)
- Create an Edit mode. When active, for example, you could do the following: For each more specific task attribute. I'm referring to selecting the ToDo (Status) tag of a task. A menu should directly appear for editing any attribute (Status, Priority). For Text and Description, an in-line text field should be created for editing.

#### Style

- Hover to open filter menu.
- Creating a confirmation component when an user wants to delete/bulk-delete and logOut.

## Time Breakdown

| Task                        | Estimated Time | Actual Time   |
| --------------------------- | -------------- | ------------- |
| Backend Auth                | 60-90 min      | 120 min       |
| Frontend Auth               | 45-60 min      | 30 min        |
| Priority Management         | 60-90 min      | 80 min        |
| Task Detail Component       | 45-60 min      | 30 mi         |
| Validation & Error Handling | 30-45 min      | 20 min        |
| Testing & Debugging         | -              | 60 min        |
| Documentation               | -              | 45 min        |
| Bulk Feature                | -              | 60 min        |
| **Total**                   | **4-6 hours**  | **7-8 hours** |

The time is aprox -> I was some time in the university, so i'm not really sure exactly how much time i spent because i need to do it in blocks of time.
