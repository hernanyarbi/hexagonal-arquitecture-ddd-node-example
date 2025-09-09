import { Request, Response, Router } from "express";
import { CreateTaskUseCase } from "../../../application/CreateTaskUseCase";
import { InMemoryTaskRepository } from "../outbound/InMemoryTaskRepository";
import { GetAllTaskUseCase } from "../../../application/GetAllTaskUseCase";
import { CompleteTaskUseCase } from "../../../application/CompleteTaskUseCase";

class TaskController {
  public router: Router;

  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getAllTaskUseCase: GetAllTaskUseCase,
    private readonly completeTaskUseCase: CompleteTaskUseCase
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", this.saveTask.bind(this));
    this.router.get("/", this.getAllTasks.bind(this));
    this.router.patch("/:id/complete", this.completeTask.bind(this));
  }

  private async saveTask(req: Request, res: Response): Promise<void> {
    const { title } = req.body;
    const task = await this.createTaskUseCase.execute(title);
    res.status(201).send(task);
  }

  private async getAllTasks(req: Request, res: Response): Promise<void> {
    const tasks = await this.getAllTaskUseCase.execute();
    res.status(200).send(tasks);
  }

  private async completeTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const task = await this.completeTaskUseCase.execute(id);
    if (task) {
      res.status(200).send(task);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  }
}

const taskRepository = new InMemoryTaskRepository();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const getAllTaskUseCase = new GetAllTaskUseCase(taskRepository);
const completeTaskUseCase = new CompleteTaskUseCase(taskRepository);

export default new TaskController(createTaskUseCase, getAllTaskUseCase, completeTaskUseCase).router;
