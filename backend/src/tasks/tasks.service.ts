import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const createdTask = new this.taskModel({
      ...createTaskDto,
      userId,
    });
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    // NOTE: This currently returns ALL tasks from ALL users
    // TODO for candidates: Add authorization to filter by userId
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task | null> {
    // NOTE: This currently returns any task regardless of user
    // TODO for candidates: Add authorization check
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
    // NOTE: This currently updates any task regardless of user
    // TODO for candidates: Add authorization check
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Task | null> {
    // NOTE: This currently deletes any task regardless of user
    // TODO for candidates: Add authorization check
    return this.taskModel.findByIdAndDelete(id).exec();
  }

  // TODO for candidates: Implement priority management methods
  // - Filter tasks by priority
  // - Bulk update priorities
}
