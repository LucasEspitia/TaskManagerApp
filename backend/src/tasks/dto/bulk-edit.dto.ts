import { IsArray, IsMongoId, IsOptional, IsEnum } from 'class-validator';
import { TaskPriority, TaskStatus } from '../task.schema';

export class BulkEditDto {
  @IsArray()
  @IsMongoId({ each: true })
  taskIds: string[];

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
