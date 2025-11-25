import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const createdTask = new this.taskModel({
      ...createTaskDto,
      userId: new Types.ObjectId(userId),
    });
    return createdTask.save();
  }

  async findAll(userId: string, priority?: string): Promise<Task[]> {
    const filter: { userId: string; priority?: string } = { userId };

    if (priority) {
      filter.priority = priority;
    }

    return this.taskModel.find(filter).exec();
  }

  async findOne(id: string, userId: string): Promise<Task | null> {
    const task = await this.taskModel.findOne({ _id: id, userId }).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task | null> {
    const task = await this.taskModel
      .findOneAndUpdate(
        { _id: id, userId }, // authorization check
        updateTaskDto,
        { new: true },
      )
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return task;
  }

  async remove(id: string, userId: string): Promise<Task | null> {
    const task = await this.taskModel
      .findOneAndDelete({ _id: id, userId }) // authorization check
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found or not owned by user');
    }

    return task;
  }

  async bulkUpdatePriority(
    taskIds: string[],
    priority: string,
    userId: string,
  ): Promise<{ updatedCount: number }> {
    const result = await this.taskModel.updateMany(
      { _id: { $in: taskIds }, userId },
      { priority },
    );

    return { updatedCount: result.modifiedCount };
  }
}
