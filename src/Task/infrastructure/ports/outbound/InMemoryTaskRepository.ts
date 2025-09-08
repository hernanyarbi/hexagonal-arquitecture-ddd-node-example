import { TaskRepository } from "../../../domain/repositories/TaskRepository";
import { Task } from "../../../domain/Task";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];
  
  async save(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async getAll(): Promise<Task[]> {
    return this.tasks;
  }
}
