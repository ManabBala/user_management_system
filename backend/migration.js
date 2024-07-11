import { readFileSync } from 'fs';
import Users from './models/Users.js';

let users = JSON.parse(readFileSync('backend/MOCK_DATA.json'));

const migration = async () => {
	// for bulk create
	// await Users.bulkCreate(users);

	// for single create
	users.map((user) => {
		// console.log(user);
		Users.create(user).then(() => {
			// console.log(`User, ${user.first_name}, migrated successfully to database`);
		}).catch((err) => {
			console.log(err);
		})
	})
}

export default migration;
