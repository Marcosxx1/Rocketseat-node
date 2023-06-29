const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

const customers = [];

app.use(express.json());

/* 
  cpf - string
  name - srtring
  id - uuid
  statement - []
*/

app.post("/account", (request, response) => {
	const { cpf, name } = request.body;

	const customerAlreadyExists = customers.some(
		customer => customer.cpf === cpf
	);

	if (customerAlreadyExists) {
		return response.status(400).json({ error: "Customer already exists." });
	}

	customers.push({
		cpf,
		name,
		id: uuidv4(),
		statement: [],
	});

	return response.status(201);
});

//get utilizando Route params /:cpf
app.get("/statement/:cpf", (request, response) => {
	const { cpf } = request.params;

	const customer = customers.find(customer => customer.cpf === cpf);

	if (!customer) {
		return response.status(404).json({ error: "Customer not found." });
	}

	return response.status(200).json(customer.statement);
});

app.listen(5500);
