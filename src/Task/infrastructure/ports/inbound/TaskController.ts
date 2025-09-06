import { Request, Response, Router } from "express";
import { CreateTaskUseCase } from "../../../application/CreateTaskUseCase";
import { InMemoryTaskRepository } from "../outbound/InMemoryTaskRepository";

class TaskController {
  public router: Router;

  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {
    this.router = Router();
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.post("/",this.saveTask.bind(this));
  }

  private async saveTask(req: Request, res: Response): Promise<void> {
    const { title } = req.body;
    const task = await this.createTaskUseCase.execute(title);
    res.status(201).send(task);
  }
}

const inMemoryTaskRepository = new InMemoryTaskRepository();
const inMemoryCreateTaskUseCase = new CreateTaskUseCase(inMemoryTaskRepository);

export default new TaskController(inMemoryCreateTaskUseCase).router
