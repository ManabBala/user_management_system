import express from "express";
import sequelize from "./database.js";
import migration from "./migration.js";
import Users from "./models/Users.js";
import cors from "cors";
import { Op } from 'sequelize';


sequelize.sync(
	// uncomment to drop and recreate tables every time server restarts
	// { force: true }
).then(() => {
	console.log("Connection has been established successfully.");
	// console.log("Starting Migration");
	// comment migration() to run migration only once
	migration();
})

const app = express();

app.use(express.json());
app.use(cors())


// Route to get users with search and sorting
app.get('/api/users', async (req, res) => {
	const { search = '', sort = 'id', order = 'ASC', limit = 10, offset = 0 } = req.query;
	// Ensure the search parameter is not undefined
	const searchQuery = search ? search : '';
	try {
		const whereClause = searchQuery ? {
			[Op.or]: [
				{ first_name: { [Op.like]: `%${searchQuery}%` } },
				{ last_name: { [Op.like]: `%${searchQuery}%` } },
				{ email: { [Op.like]: `%${searchQuery}%` } },
				{ gender: { [Op.like]: `%${searchQuery}%` } }
			]
		} : {};

		console.log("WhereClause: ", whereClause);

		const users = await Users.findAndCountAll({
			where: whereClause,
			order: [[sort, order]],
			limit: parseInt(limit, 10),
			offset: parseInt(offset, 10),
		});

		res.json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

// Route to get users with search and sorting
app.post('/api/users', async (req, res) => {
	try {
		const [user, created] = await Users.findOrCreate({
			where: {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				gender: req.body.gender,
				age: req.body.age
			}
		});

		console.log("User: ", user);
		console.log("Created: ", created);

		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

const port = 3000
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
})
