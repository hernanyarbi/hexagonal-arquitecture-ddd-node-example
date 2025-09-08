import { TaskRepository } from "../domain/repositories/TaskRepository";
import { Task } from "../domain/Task";

export class GetAllTaskUseCase {

    constructor(
        private readonly taskRepository: TaskRepository
    ) {}

    async execute(): Promise<Task[]> {
        const tasks = await  this.taskRepository.getAll();
        return tasks.filter(task => !task.completed);
    }
}