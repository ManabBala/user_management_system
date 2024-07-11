import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Users = sequelize.define("Users", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	first_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	gender: {
		type: DataTypes.STRING,
		allowNull: false
	},
	age: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
},
	{
		timestamps: false
	}
)

export default Users