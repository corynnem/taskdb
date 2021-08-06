const { Router } = require('express');
const { toUnicode } = require('punycode');
const { project, employee } = require('.');
const { Task } = require('../models');

let taskcontroller
 = Router();



/**
 * @swagger
 * /7372/new:
 *   post:
 *     summary: Employer can create a new task
 *     tags: [Task]
 *     security: 
 *       - EmployerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: "Task created"
 *       500:
 *         description: 'failed to create task'
 */


taskcontroller
.post('/new', async(req, res) => {
    const { name, description, deadline, endGoal, assignedBy, completed, projectId, employeeId } = req.body;
      try {
          let newTask = await Task.create({
              name,
              description,
              deadline, 
              endGoal,
              assignedBy,
              completed,
              employerId: req.user.id,
              projectId,
              employeeId
          })

          res.json({
              message: "Task created",
              members: newTask
          })
      } catch{
        res.status(500).json({
            message: "failed to create Task",
          });
      }

})



/**
 * @swagger
 * /7372/1:
 *   put:
 *     summary: Someone with an "employer" or "employee" token can update a task
 *     tags: [Task]
 *     security: 
 *       - EmployerAuth: []
 *       - EmployeeAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: "updated successfully" 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       409:
 *         description: 'required fields missing, Task not found, or Task is unauthorized to edit'
 *       500:
 *         description: 'failed to update Task'
 */


 taskcontroller.put('/:id', async (req, res) => {
  const { name, description, deadline, endGoal, assignedBy, completed, projectId, employeeId } = req.body;

  try {

    const toUpdate = await Task.findOne({
      where: {
        id: req.params.id,
        employerId: req.user.id,
      },
    });

    if (toUpdate && name) {
      toUpdate.name = name; 
      toUpdate.description = description;
      toUpdate.deadline = deadline;
      toUpdate.endGoal = endGoal;
      toUpdate.assignedBy = assignedBy;
      toUpdate.completed = completed;
      toUpdate.projectId = projectId
      toUpdate.employeeId = employeeId
      
      await toUpdate.save();
      
      res.status(200).json({
        message: "updated task info successfully",
      });
    } else {
      res.status(404).json({
        message:
          "required fields missing, task not found, or employer is unauthorized to edit",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "failed to edit task info",
    });
  }
})



/**
 * @swagger
 * /7372/1:
 *   delete:
 *     summary: Someone with an "employer" token can delete tasks by id
 *     tags: [Task]
 *     security: 
 *       - EmployerAuth: []
 *     responses:
 *       200:
 *         description: "removed task successfully"
 *       500:
 *          description: "task not found, or does not belong to user or failed to remove task"
 * 
 */ 
taskcontroller.delete('/:id', async (req, res) => {
    try {
      const taskToRemove = await Task.findOne({
        where: {
          id: req.params.id,
          employerId: req.user.id
        },
      });
      taskToRemove
        ? taskToRemove.destroy()
        : res.status(404).json({
            message: "task not found, or does not belong to user",
          });
      res.status(200).json({
        message: "removed task successfully",
      });
    } catch (e) {
      res.status(500).json({
        message: "failed to remove task",
      });
    }
  });


module.exports = taskcontroller
