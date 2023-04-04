const express = require("express");

const app = express();

app.get("/", (req, res) => {
	return res.json({ message: "Hello world Ignite!" });
});

const port = 4000;
app.listen(port);
