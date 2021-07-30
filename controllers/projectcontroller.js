const { Router } = require("express");
const { Project, Task } = require("../models");


let projectcontroller = Router();

/**
 * @swagger
 * /5624/new:
 *   post:
 *     summary: Someone with an "employer" token can create a new project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: "Project created"
 *       500:
 *         description: 'failed to create project'
 */

projectcontroller.post("/new", async (req, res) => {
  const { name, description, deadline, endGoal, budget, teamId } = req.body;
  try {
    let newProject = await Project.create({
      name,
      description,
      deadline,
      endGoal,
      budget,
      teamId,
    });

    res.json({
      message: "Project created",
      project: newProject,
    });
  } catch {
    res.status(500).json({
      message: "failed to create project",
    });
  }
});


/**
 * @swagger
 * /5624/all:
 *   get:
 *     summary: Someone with an "employer" token can get projects for user and associated tasks with each of them
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Will return an array of project objects, including tasks associated with them
 *       500:
 *          description: "no users found or failed to get users"
 * 
 */ 


projectcontroller.get("/all", async (req, res) => {
  try {
    let allProjects = await Project.findAll({
        include: [{
            model: Task,
        }],
    });
    res.json({
      projects: allProjects,
    });
  } catch (e) {
    res.status(500).json({
      message: "failed get projects",
    });
  }
});





/**
 * @swagger
 * /5624/:id:
 *   put:
 *     summary: Someone with an "employer" token can edit project information 
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: "updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       409:
 *         description: 'required fields missing, Project not found, or Project is unauthorized to edit'
 *       500:
 *         description: 'failed to update Project'
 */




 projectcontroller.put('/:id', async (req, res) => {
  const { name, description, deadline, endGoal, budget, teamId } = req.body;
      console.log(name, description, deadline, endGoal, budget, teamId, req.params.id, req.user.id)
  try {

    const toUpdate = await Project.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (toUpdate && name) {
      toUpdate.name = name; 
      toUpdate.description = description;
      toUpdate.deadline = deadline;
      toUpdate.endGoal = endGoal;
      toUpdate.budget = budget;
      toUpdate.teamId = teamId;
      
      await toUpdate.save();
      
      res.status(200).json({
        message: "updated project info successfully",
      });
    } else {
      res.status(404).json({
        message:
          "required fields missing, project not found, or employer is unauthorized to edit",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "failed to edit project info",
    });
  }
})


/**
 * @swagger
 * /5624/:id:
 *   delete:
 *     summary: Someone with an "employer" token can delete project by projectId 
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: "removed project successfully"
 *       500:
 *          description: "project not found, or does not belong to user or failed to remove project"
 * 
 */ 
 projectcontroller.delete('/:id', async (req, res) => {
  try {
    const projectToRemove = await Project.findOne({
      where: {
        id: req.params.id,
      },
    });
    projectToRemove
      ? projectToRemove.destroy()
      : res.status(404).json({
          message: "project not found, or does not belong to user",
        });
    res.status(200).json({
      message: "removed project successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "failed to remove project",
    });
  }
});




module.exports = projectcontroller;
