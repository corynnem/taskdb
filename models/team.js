const { DataTypes } = require('sequelize');
const db = require('../db')

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       required:
 *          - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a new Team
 *         name:
 *           type: string
 *           description: The task name
 *       example:
 *         id: 1
 *         name: n32032
 */




 const Team = db.define('team', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
});

module.exports = Team;

// get() {
//     return this.getDataValue('members').split(';')
// },
// set(val) {
//    this.setDataValue('members',val.join(';'));
// },