import { type Request, type Response } from 'express';
import {
  getAllTasksRepository,
  createTaskRepository,
  completeTaskRepository,
  getTasksByStatusRepository,
} from '@/repositories/tasks.repository.js';

export const getAllTasksController = async (_req: Request, res: Response) => {
    try {
        const tarefas = await getAllTasksRepository();
        return res.json(tarefas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

export const createTaskController = async (req: Request, res: Response) => {
    const { titulo, usuarioId, categoriaId } = req.body;

    if (!titulo || !usuarioId || !categoriaId) {
        return res.status(400).json({ message: 'titulo, usuarioId e categoriaId são obrigatórios.' });
    }

    try {
        const novaTarefa = await createTaskRepository(titulo, usuarioId, categoriaId);
        return res.status(201).json(novaTarefa);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

export const completeTaskController = async (req: Request<{id: string}>, res: Response) => {
    if (!req.params.id) return res.status(400).json({message: 'Sem id'});

    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    try {
        const tarefaAtualizada = await completeTaskRepository(id);

        if (!tarefaAtualizada) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
        }

        return res.json(tarefaAtualizada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

export const getTasksByStatusController = async (req: Request, res: Response) => {
    const { status } = req.params;
    let concluida: boolean;

    if (status === 'concluidas' || status === 'true') {
        concluida = true;
    } else if (status === 'pendentes' || status === 'false') {
        concluida = false;
    } else {
        return res.status(400).json({ message: 'Status inválido. Use "concluidas" ou "pendentes".' });
    }

    try {
        const tarefas = await getTasksByStatusRepository(concluida);
        return res.json(tarefas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro' });
    }
};