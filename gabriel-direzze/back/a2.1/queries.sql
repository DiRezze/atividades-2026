-- inserção dos dados
INSERT INTO usuarios(username, email) VALUES
	('Fulano', 'fulano@usp.br'),
	('Sicrano', 'sicrano@usp.br'),
	('Beltrano', 'beltraninreidelas@hotmail.com');
INSERT INTO categorias(nome) VALUES
	('Estudo'),
	('Trabalho'),
	('Pessoal');
INSERT INTO tarefa(titulo, usario_id, categoria_id) VALUES
    ('Estudar SQL', 1, 2),
    ('Relatório Mensal', 1, 1),
    ('Academia', 2, 3),
    ('Comprar Livros', 3, 2),
    ('Reunião de Alinhamento', 2, 1);


-- exibe titulo, nome de usuario e categoriaa
SELECT t.titulo,
	u.username AS nome_usuario,
	c.nome AS nome_categoria
FROM tarefa t
INNER JOIN usuarios u ON t.usario_id = u.id
INNER JOIN categorias c ON t.categoria_id = c.id
WHERE to_tsvector('portuguese', titulo) @@ to_tsquery('portuguese', 'sql');

-- marca uma tarefa como concluída
UPDATE tarefa
SET concluida = TRUE
WHERE to_tsvector('portuguese', titulo) @@ to_tsquery('portuguese', 'sql');

-- apaga tarefas concluídas
DELETE
FROM tarefa
WHERE concluida = TRUE;

-- exibe tarefas pendentes
SELECT 
	t.titulo,
	u.username,
	c.nome
FROM tarefa t
INNER JOIN usuarios u ON t.usario_id = u.id
INNER JOIN categorias c ON t.categoria_id = c.id
WHERE concluida = FALSE;

