const { DataTypes } = require('sequelize');
const db = require('../db')


/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *          - name
 *          - description
 *          - deadline
 *          - endGoal
 *          - assignedBy
 *          - completed
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a new Task
 *         name:
 *           type: string
 *           description: The task name
 *           unique: true
 *         description:
 *           type: string
 *           description: A description of the task
 *         deadline:
 *           type: string
 *           description: The existing deadline, when the task will be due
 *         endGoal:
 *           type: string
 *           description: The product that is expected to be complete when task is finished
 *         assignedBy:
 *           type: string
 *           description: The name of the person who is assigning the task
 *         completed: 
 *           type: boolean
 *           description: true if task is complete, false if task is incomplete
 *         projectId: 
 *           type: integer
 *           description: id of the project associated to this task
 *         employeeId: 
 *           type: integer
 *           description: id of the employee associated to this task
 *       example:
 *         id: 1
 *         name: a single task
 *         description: This is a description for the single task
 *         deadline: 09.16.21
 *         endGoal: Product to be completed in alloted time, as requested by company
 *         assignedBy: Name of person who assigned said task
 *         completed: false
 *         projectId: 3
 *         employeeId: 1
 */



 const Task = db.define('task', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    deadline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endGoal: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    assignedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Task;