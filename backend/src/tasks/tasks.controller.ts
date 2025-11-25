import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: Request & { user: { userId: string } },
  ) {
    //console.log('CREATE TASK PETITION RECEIVED');
    //console.log('DTO:', createTaskDto);
    //console.log('USER:', req.user);
    const userId = req.user.userId;
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  findAll(
    @Req() req: Request & { user: { userId: string } },
    @Query('priority') priority?: string,
  ) {
    //console.log('Before calling findAll');
    //console.log('FIND ALL TASKS PETITION RECEIVED');
    //console.log('Priority filter:', priority);
    // console.log('USER:', req.user);
    const userId = req.user.userId;
    return this.tasksService.findAll(userId, priority);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: Request & { user: { userId: string } },
  ) {
    const userId = req.user.userId;
    return this.tasksService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @Req() req: Request & { user: { userId: string } },
  ) {
    const userId = req.user.userId;
    return this.tasksService.update(id, dto, userId);
  }

  @Patch('bulk-priority')
  bulkUpdatePriority(
    @Body() body: { taskIds: string[]; priority: string },
    @Req() req: Request & { user: { userId: string } },
  ) {
    const userId = req.user.userId;
    return this.tasksService.bulkUpdatePriority(
      body.taskIds,
      body.priority,
      userId,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: Request & { user: { userId: string } },
  ) {
    const userId = req.user.userId;
    return this.tasksService.remove(id, userId);
  }
}
