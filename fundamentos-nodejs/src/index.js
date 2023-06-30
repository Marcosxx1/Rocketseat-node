const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

const customers = [];

app.use(express.json());

function verifyExistenceOfAccountCPF(request, response, next) {
	const { cpf } = request.headers;

	const customer = customers.find(customer => customer.cpf === cpf);

	if (!customer) {
		return response.status(400).json({ error: "Customer not found" });
	}

	request.customer = customer;
	return next();
}

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

/*app.use(verifyExistenceOfAccountCPF) caso seja utilizado dessa forma,
  todas as rotas abaixo do app.use(); usarão o middleware  */

app.get("/statement/", verifyExistenceOfAccountCPF, (request, response) => {
	const { customer } = request;
	return response.status(200).json(customer.statement);
});

//post = request.body
app.post("/deposit", verifyExistenceOfAccountCPF, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    createdAt: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

function getBalance(statement) {
	const balance = statement.reduce((acc, operation) => {
		if (operation.type === "credit") {
			return acc + operation.amount;
		} else {
			return acc - operation.amount;
		}
	}, 0);

	return balance;
}

app.post("/withdraw", verifyExistenceOfAccountCPF, (request, response) => {
	const { amount } = request.body;
	const { customer } = request;

	const balance = getBalance(customer.statement);

	if (balance < amount) {
		return response.status(400).json({ error: "Insufficient funds!" });
	}

	const statementOperation = {
		amount,
		createdAt: new Date(),
		type: "debit",
	};

	customer.statement.push(statementOperation);

	return response.status(201).send();
});

app.get("/statement/date", verifyExistenceOfAccountCPF, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(
    (statement) =>
      statement.createdAt.toDateString() ===
      new Date(dateFormat).toDateString())
  
  return response.json(statement);
});

app.patch("/account", verifyExistenceOfAccountCPF, (request, response) => {
	const { name } = request.body;
	const { customer } = request;

	customer.name = name;

	return response.status(201).send();
});

app.delete("/account", verifyExistenceOfAccountCPF, (request, response) => {
	const { customer } = request;

	customers.splice(customer, 1);

	return response.status(200).json(customers);
});

app.put("/account", verifyExistenceOfAccountCPF, (request, response) => {
	const { name } = request.body;
	const { customer } = request;

	customer.name = name;

	return response.status(201).send();
});

app.get("/account", verifyExistenceOfAccountCPF, (request, response) => {
	const { customer } = request;

	return response.json(customer);
});

app.listen(5500);
