import { TaskRepository } from "../domain/repositories/TaskRepository";
import { Task } from "../domain/Task";

export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository
  ) {}
  async execute(title: string): Promise<Task> {
    const id = Math.random().toString(36).substring(2, 15);
    const task = new Task(id, title);
    await this.taskRepository.save(task);
    return task;
  }
}
