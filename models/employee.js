const { DataTypes } = require('sequelize');
const db = require('../db')


/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *          - email
 *          - firstName
 *          - lastName
 *          - password
 *          - position
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of a new employer
 *         email:
 *           type: string
 *           description: Your email address.
 *           unique: true
 *         firstName:
 *           type: string
 *           description: Your first name.
 *         lastName:
 *           type: string
 *           description: Your last name.
 *         password:
 *           type: string
 *           description: Your secure password.
 *         position:
 *           type: string
 *           description: Your positon as specified by your employer.
 *       example:
 *         id: 1
 *         email: example@example.com
 *         firstName: John
 *         lastName: Dough
 *         password: "123456"
 *         position: sales associate
 *
 */
const Employee = db.define('employee', {
    email: {
        type: DataTypes.STRING(100),
        allowNull: false, 
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Employee;