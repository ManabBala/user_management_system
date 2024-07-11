import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './backend/users_db.sqlite',
});

export default sequelize