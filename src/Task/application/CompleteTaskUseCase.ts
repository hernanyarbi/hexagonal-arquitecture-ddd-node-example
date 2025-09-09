import { TaskRepository } from "../domain/repositories/TaskRepository";
import { Task } from "../domain/Task";

export class CompleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string): Promise<Task | null> {
    // This is part of a dummy validation as an example to logic responsibility
    const task = await this.taskRepository.findById(id);
    if (!task) {
      return null;
    }

    task.complete();
    await this.taskRepository.update(task);
    return task;
  }
}
