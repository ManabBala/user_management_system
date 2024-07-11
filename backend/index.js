import express from "express";
import sequelize from "./database.js";
import migration from "./migration.js";
import Users from "./models/Users.js";

sequelize.sync(
	// uncomment to drop and recreate tables every time server restarts
	// { force: true }
).then(() => {
	console.log("Connection has been established successfully.");
	// console.log("Starting Migration");
	// migration();
})

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
	// res.send("Welcome to User Management System!");

	res.send(await Users.findAll({
		attributes: ['id', 'first_name', 'last_name']
	}));
})

const port = 3000
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
})
