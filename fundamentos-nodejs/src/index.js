/* GET - Busca uma informação dentro do servidor
   POST - Inserir uma informação no servidor 
	 PUT - Alterar uma informação no servidor
	 PATCH - Alterar uma informação especifica no servidor 
	 DELETE - Deletar uma informação no servidor


	 TIPOS DE PARAMETROS
	 Route params => Identificar um recurso editar/deletar/buscar
	 Query params => Paginação / Filtros
	 Body params => Os objetos inserção/alteração (JSON)

*/

const express = require("express");

const app = express();

app.use(express.json());

app.get("/courses", (req, res) => {
	const query = req.query;
	console.log(query);
	return res.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post("/courses", (req, res) => {
	const body = req.body;
	console.log(body);
	return res.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
});

app.put("/courses/:id", (req, res) => {
	const { id } = req.params;
	console.log(id);
	return res.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
});

app.patch("/courses/:id", (req, res) => {
	return res.json(["Curso 6", "Curso 7", "Curso 3", "Curso 4"]);
});

app.delete("/courses/:id", (req, res) => {
	return res.json(["Curso 6", "Curso 7", "Curso 4"]);
});

const port = 3000;
app.listen(port);
