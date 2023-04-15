const express = require("express");

const app = express();

/* GET - Busca uma informação dentro do servidor
   POST - Inserir uma informação no servidor 
	 PUT - Alterar uma informação no servidor
	 PATCH - Alterar uma informação especifica no servidor 
	 DELETE - Deletar uma informação no servidor
*/
	
app.get('/courses', (req, res) => {
	return response.json(['Curso 1', 'Curso 2', 'Curso 3']);
})

app.post('/courses', (req, res) => {
	return response.json(['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4']);
});

app.put('/courses/:id', (req, res) => {
	return response.json(['Curso 6', 'Curso 2', 'Curso 3', 'Curso 4']);
});

app.patch('/courses/:id', (req, res) => {
	return response.json(['Curso 6', 'Curso 7', 'Curso 3', 'Curso 4']);
});

app.delete('/courses/:id', (req, res) => {
	return response.json(['Curso 6', 'Curso 7', 'Curso 4']);
})

const port = 3000;
app.listen(port);