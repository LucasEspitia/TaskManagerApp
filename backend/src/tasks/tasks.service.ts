import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { BulkEditDto } from './dto/bulk-edit.dto';

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
    const filter: { userId: Types.ObjectId; priority?: string } = {
      userId: new Types.ObjectId(userId),
    };

    if (priority) {
      filter.priority = priority;
    }
    //console.log('Filter applied in findAll:', filter);
    return this.taskModel.find(filter).exec();
  }

  async findOne(id: string, userId: string): Promise<Task | null> {
    const task = await this.taskModel
      .findOne({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      })
      .exec();

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
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
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
      .findOneAndDelete({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      })
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found or not owned by user');
    }

    return task;
  }

  async bulkEdit(taskIds: string[], fields: BulkEditDto, userId: string) {
    const update: Partial<BulkEditDto> = {};

    if (fields.priority) update.priority = fields.priority;
    if (fields.status) update.status = fields.status;

    const objectIds = taskIds.map((id) => new Types.ObjectId(id));
    const userObjectId = new Types.ObjectId(userId);

    const result = await this.taskModel.updateMany(
      {
        _id: { $in: objectIds },
        userId: userObjectId,
      },
      update,
    );

    return { updatedCount: result.modifiedCount };
  }
}
