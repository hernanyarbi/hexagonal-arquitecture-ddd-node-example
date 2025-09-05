import { Task } from "../domain/Task";

export class CreateTaskUseCase {
  execute(title: string) {
    const id = Math.random().toString(36).substring(2, 15);
    return new Task(id, title);
  }
}
