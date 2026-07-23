import { pool } from '@/database/connection.js';

export const getAllTasksRepository = async () => {
  const query = 'SELECT * FROM tarefa ORDER BY id ASC';
  const { rows } = await pool.query(query);
  return rows;
};

export const createTaskRepository = async (titulo: string, usuarioId: string, categoriaId: string) => {
  const query = `
    INSERT INTO tarefa (titulo, usuario_id, categoria_id, concluida) 
    VALUES ($1, $2, $3, false) 
    RETURNING *
  `;
  const { rows } = await pool.query(query, [titulo, usuarioId, categoriaId]);
  return rows[0];
};

export const completeTaskRepository = async (id: number) => {
  const query = `
    UPDATE tarefa 
    SET concluida = TRUE 
    WHERE id = $1 
    RETURNING *
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const getTasksByStatusRepository = async (concluida: boolean) => {
  const query = 'SELECT * FROM tarefa WHERE concluida = $1 ORDER BY id ASC';
  const { rows } = await pool.query(query, [concluida]);
  return rows;
};