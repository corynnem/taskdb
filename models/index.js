const Employer = require("./employer");
const Employee = require("./employee");
const Project = require('./projects')
const Task = require('./tasks')
const Team = require('./team');


Employer.hasMany(Employee)
Employee.belongsTo(Employer)

Employer.hasMany(Team)
Team.belongsTo(Employer)

Team.hasMany(Project)
Project.belongsTo(Team)

Employer.hasMany(Task)
Task.belongsTo(Employer)

Project.hasMany(Task)
Task.belongsTo(Project)

Employee.hasMany(Task)
Task.belongsTo(Employee)





module.exports = {
  Employer,
  Employee,
  Project,
  Task,
  Team
};
