const { DataTypes } = require('sequelize');
const db = require('../db')

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginSuccess:
 *       type: object
 *       properties: 
 *         message: 
 *            type: string
 *            description: 'login success'
 *         token: 
 *            type: string
 *            description: token provided by api
 *       example:
 *         message: "login success"
 *         token: K301NFDSJKL0392-143FDSNKL392N3M
 *     EmployerLogin:
 *       type: object
 *       required: 
 *          - email
 *          - password
 *       properties:
 *         password:
 *           type: string
 *           description: Your secure password.
 *         email:
 *           type: string
 *           description: Your email address.
 *       example:
 *         email: example@example.com
 *         password: "123456"
 *     Employer:
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
 *           description: The Auto-generated id of a new Employer
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
 *           description: Your positon as specified by your company.
 *         key:
 *           type: string
 *           description: Your designated key to create an account.
 *       example:
 *         id: 1
 *         email: example@example.com
 *         firstName: Jane
 *         lastName: Dough
 *         password: '123456'
 *         position: manager
 *         key: specialkey123
 *
 */


const Employer = db.define('employer', {
    email: {
        type: DataTypes.STRING,
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
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Employer;