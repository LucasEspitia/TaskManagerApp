import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskListComponent } from './components/task-list/task-list.component';

// TODO for candidates: Create and import AuthGuard
// import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // TODO for candidates: Add AuthGuard to protect this route
  // { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
  { path: 'tasks', component: TaskListComponent },
  // TODO for candidates: Create task detail/edit component and add route
  // { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [authGuard] },
];
