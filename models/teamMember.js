const { DataTypes } = require('sequelize');
const db = require('../db')

/**
 * @swagger
 * components:
 *   schemas:
 *     TeamMember:
 *       type: object
 *       required:
 *          - name
 *          - employeeId
 *          - teamId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of a new TeamMember
 *         name:
 *           type: string
 *           description: The team members name
 *         employeeId:
 *           type: integer
 *           description: The autogenerated id of the employee associated with a team member
 *         teamId:
 *           type: integer
 *           description: The autogenerated id of the team associated with a team member
 *       example:
 *         id: 1
 *         name: n32032
 *         employeeId: 1
 *         teamId: 1
 */




 const TeamMember = db.define('teammember', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
});

module.exports = TeamMember;

