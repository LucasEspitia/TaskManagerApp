// TODO: Add validation decorators from class-validator
// This is intentionally left incomplete for candidates to implement

import { TaskStatus, TaskPriority } from '../task.schema';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
}
