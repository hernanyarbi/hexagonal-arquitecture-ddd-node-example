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

  async update(task: Task): Promise<void> {
    this.tasks = this.tasks.map((taskItem) =>
      taskItem.id === task.id ? task : taskItem
    );
  }
  
  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find((taskItem) => taskItem.id === id);
    return task ? task : null;
  }
}
