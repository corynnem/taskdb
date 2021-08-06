const Employer = require("./employer");
const Employee = require("./employee");
const Project = require('./projects')
const Task = require('./tasks')
const Team = require('./team');
const TeamMember = require('./teamMember');


Employer.hasMany(Employee)
Employee.belongsTo(Employer)

Employer.hasMany(Team)
Team.belongsTo(Employer)


Team.hasMany(Project)
Project.belongsTo(Team)

Team.hasMany(TeamMember)
TeamMember.belongsTo(Team)

Employer.hasMany(Task)
Task.belongsTo(Employer)

Project.hasMany(Task)
Task.belongsTo(Project)

Employee.hasMany(Task)
Task.belongsTo(Employee)

Team.hasMany(TeamMember)
TeamMember.belongsTo(Team)

Employer.hasMany(TeamMember)
TeamMember.belongsTo(Employer)

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     EmployerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       in: header
 *     EmployeeAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       in: header
 */


module.exports = {
  Employer,
  Employee,
  Project,
  Task,
  Team,
  TeamMember
};
