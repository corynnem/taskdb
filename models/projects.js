const { DataTypes } = require('sequelize');
const db = require('../db')

// Each table will have a 'schema' to represent itself in swagger

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *          - name
 *          - description
 *          - deadline
 *          - endGoal
 *          - budget
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a new Project
 *         name:
 *           type: string
 *           description: The project name
 *           unique: true
 *         description:
 *           type: string
 *           description: A description of your project
 *         deadline:
 *           type: string
 *           description: The existing deadline, when the project will be due
 *         endGoal:
 *           type: string
 *           description: The goal you hope to achieve once this project is completed
 *         budget:
 *           type: integer
 *           description: The budget alloted by your company to complete the project
 *         teamId: 
 *           type: integer
 *           description: The of the team associated with this project
 * 
 *       example:
 *         id: 1
 *         name: Q3 Project
 *         description: This is a description for the Q3 project
 *         deadline: 09.16.21
 *         endGoal: Some sort of project created by this team during this time
 *         budget: 100000
 *         teamId: 2
 */


const Project = db.define('project', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deadline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endGoal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    budget: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = Project;