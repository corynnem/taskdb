const { Router } = require('express');
const { Team, Project, Task } = require('../models');

let teamcontroller = Router();



/**
 * @swagger
 * /5625/new:
 *   post:
 *     summary: Someone with an "employer" token can create a new team
 *     tags: [Team]
 *     security: 
 *       - EmployerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       200:
 *         description: "user registered"
 *       500:
 *         description: 'failed to create item'
 */


teamcontroller.post('/new', async(req, res) => {
    const { name, employeeId } = req.body;
      try {
          let newTeam = await Team.create({
              name,
              employerId: req.user.id,
              employeeId
          })
          res.json({
              message: "Team created",
              members: newTeam
          })
      } catch{
        res.status(500).json({
            message: "failed to create team",
          });
      }

})



/**
 * @swagger
 * /5625/all:
 *   get:
 *     summary: Someone with an "employer" token can get a list of all Teams
 *     tags: [Team]
 *     security: 
 *       - EmployerAuth: []
 *     responses:
 *       200:
 *         description: Will return an array of team objects, including projects and tasks associated with them
 *       500:
 *          description: "no teams found or failed to get teams"
 * 
 */ 


teamcontroller.get("/all", async (req, res) => {
    try {
      let allProjects = await Team.findAll({
          include: [{
              model: Project,
              as: 'projects',
              include: [{
                model: Task
              }]
          }],
          where: {
            employerId: req.user.id
          }
      });
      res.json({
        teams: allProjects,
      });
    } catch (e) {
      res.status(500).json({
        message: "failed get teams",
      });
    }
  });



  

/**
 * @swagger
 * /5625/1:
 *   put:
 *     summary: Someone with an "employer" token can update a teams information 
 *     tags: [Team]
 *     security: 
 *       - EmployerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       200:
 *         description: "updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       409:
 *         description: 'required fields missing, team not found, or team is unauthorized to edit'
 *       500:
 *         description: 'failed to update team'
 */

teamcontroller.put('/:id', async (req, res) => {
  let { name, employeeId } = req.body;
  console.log(name, req.user.id)
  try {
    const toUpdate = await Team.findOne({
      where: {
        id: req.params.id,
        employerId: req.user.id,
      },
    });

    if (toUpdate && name) {
      toUpdate.name = name; 
      await toUpdate.save();
      
      res.status(200).json({
        message: "updated team info successfully",
      });
    } else {
      res.status(404).json({
        message:
          "required fields missing, team not found, or team is unauthorized to edit",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "failed to edit team info",
    });
  }
})






/**
 * @swagger
 * /5625/1:
 *   delete:
 *     summary: Someone with an "employer" token can delete teams by id
 *     tags: [Team]
 *     security: 
 *       - EmployerAuth: []
 *     responses:
 *       200:
 *         description: "removed team successfully"
 *       500:
 *          description: "team not found, or does not belong to user or failed to remove team"
 * 
 */ 
  teamcontroller.delete('/:id', async (req, res) => {
    try {
      const teamToRemove = await Team.findOne({
        where: {
          id: req.params.id,
          employerId: req.user.id,
        },
      });
      teamToRemove
        ? teamToRemove.destroy()
        : res.status(404).json({
            message: "team not found, or does not belong to user",
          });
      res.status(200).json({
        message: "removed team successfully",
      });
    } catch (e) {
      res.status(500).json({
        message: "failed to remove team",
      });
    }
  });




module.exports = teamcontroller