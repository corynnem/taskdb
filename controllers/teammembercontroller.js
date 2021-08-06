const { Router } = require('express');
const { TeamMember, Employee } = require('../models');

let teammembercontroller = Router();



/**
 * @swagger
 * /5626/new:
 *   post:
 *     summary: Someone with an "employer" token can create a new team member
 *     tags: [TeamMember]
 *     security: 
 *       - EmployerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamMember'
 *     responses:
 *       200:
 *         description: "user registered"
 *       500:
 *         description: 'failed to add team member'
 */


teammembercontroller.post('/new', async(req, res) => {
    const { name, employeeId } = req.body;
      try {
          let newTeamMember = await TeamMember.create({
              name,
              employerId: req.user.id,
              employeeId
          })
          res.json({
              message: "Team member created",
              members: newTeamMember
          })
      } catch{
        res.status(500).json({
            message: "failed to create team member",
          });
      }
})



/**
 * @swagger
 * /5626/all:
 *   get:
 *     summary: Someone with an "employer" token can get a list of all team members
 *     tags: [TeamMember]
 *     security: 
 *       - EmployerAuth: []
 *     responses:
 *       200:
 *         description: Will return an array of team member objects
 *       500:
 *          description: "no members found or failed to get team members"
 * 
 */ 


teammembercontroller.get("/all", async (req, res) => {
    try {
      let allTeamMembers = await TeamMember.findAll({
          include: [{
              model: Employee,
              as: 'employees',
          }],
          where: {
            employerId: req.user.id
          }
      });
      res.json({
        teams: allTeamMembers,
      });
    } catch (e) {
      res.status(500).json({
        message: "failed get teams",
      });
    }
  });



  

/**
 * @swagger
 * /5626/1:
 *   put:
 *     summary: Someone with an "employer" token can update a team member information by id  
 *     tags: [TeamMember]
 *     security: 
 *       - EmployerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamMember'
 *     responses:
 *       200:
 *         description: "updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamMember'
 *       409:
 *         description: 'required fields missing, team not found, or team is unauthorized to edit'
 *       500:
 *         description: 'failed to update team'
 */

teammembercontroller.put('/:id=', async (req, res) => {
  let { name } = req.body;
  console.log(name, req.user.id)
  try {
    const toUpdate = await TeamMember.findOne({
      where: {
        id: req.params.id,
        employerId: req.user.id,
      },
    });

    if (toUpdate && name) {
      toUpdate.name = name; 
      await toUpdate.save();
      
      res.status(200).json({
        message: "updated team member info successfully",
      });
    } else {
      res.status(404).json({
        message:
          "required fields missing, team not found, or employer is unauthorized to edit",
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
 * /5626/1:
 *   delete:
 *     summary: Someone with an "employer" token can delete team members by id
 *     tags: [TeamMember]
 *     security: 
 *       - EmployerAuth: []
 *     responses:
 *       200:
 *         description: "removed team successfully"
 *       500:
 *          description: "team not found, or does not belong to user or failed to remove team"
 * 
 */ 
  teammembercontroller.delete('/:id', async (req, res) => {
    try {
      const teamToRemove = await TeamMember.findOne({
        where: {
          id: req.params.id,
          employerId: req.user.id,
        },
      });
      teamToRemove
        ? teamToRemove.destroy()
        : res.status(404).json({
            message: "team not found, or does not belong to employer",
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




module.exports = teammembercontroller