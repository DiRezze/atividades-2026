import { Router } from 'express';
import {
  getAllTasksController,
  createTaskController,
  completeTaskController,
  getTasksByStatusController,
} from '@/controllers/tasks.controller.js';

const tasksRouter = Router();

tasksRouter.get('/tarefas', getAllTasksController);
tasksRouter.post('/tarefas', createTaskController);
tasksRouter.patch('/tarefas/:id', completeTaskController);
tasksRouter.get('/tarefas/status/:status', getTasksByStatusController);

export default tasksRouter;
