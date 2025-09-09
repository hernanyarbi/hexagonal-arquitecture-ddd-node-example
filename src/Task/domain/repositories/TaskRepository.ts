import { Task } from "../Task";

export interface TaskRepository {
    save(task: Task): Promise<Task>;

    getAll(): Promise<Task[]>;
    
    update(task: Task): Promise<void>;

    findById(id: string): Promise<Task | null>;
}