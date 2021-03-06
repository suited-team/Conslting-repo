import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { Repository } from 'typeorm';
import { EmployeeService } from '../employee/employee.service';
import { Task } from './task.entity';

export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private employee: EmployeeService,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findAllEmployeeTask(data) {
    let { email } = data;
    console.log(data);
    let Employee = await this.employee.findOneByUsername(email);
    console.log(Employee);
    let EmployeeName = Employee.name;
    return this.taskRepository.find();
  }

  async create(task: Task): Promise<Task> {
    const admin = await this.taskRepository.create(task);
    return this.taskRepository.save(admin);
  }

  async update(data: any) {
    let id = data.id;
    await this.taskRepository.update({ id }, data);
    console.log(data);
    return this.taskRepository.findOne(id);
  }
}
