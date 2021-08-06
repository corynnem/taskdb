const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { Employee } = require('../models');
const { validateEmployer, validate } = require('../middlewares')
const { UniqueConstraintError } = require('sequelize/lib/errors')

const employeecontroller = Router();




/**
 * @swagger
 * /8739/register:
 *   post:
 *     summary: Someone with an "employer" token can register a user and returns a message of "employee registered" 
 *     tags: [Employee]
 *     security: 
 *       - EmployerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: "employee registered"
 *       409:
 *         description: 'email already in use'
 *       500:
 *         description: 'failed to register employee'
 */

employeecontroller.post('/register', validateEmployer, async (req, res) => {
    let { email, firstName, lastName, password, position } = req.body;
    console.log(req.user.id)
    try {
        await Employee.create({
            email,
            firstName, 
            lastName,
            password: bcrypt.hashSync(password, 12),
            position,
            employerId: req.user.id
        });
        res.status(201).json({
            message: "employee registered"
        });
    } catch (e) {
        if(e instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'email already in use'
            });
        } else {
            res.status(500).json({
                message: 'failed to register employees'
            })
        }
    }
});




/**
 * @swagger
 * /8739/login:
 *   post:
 *     summary:  Someone with an the credentials of an existing employee can login to said employee's account
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployerLogin'
 *     responses:
 *       200:
 *         description: "login success"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginSuccess'
 *       409:
 *         description: 'email already in use'
 *       500:
 *         description: 'failed to register employee'
 */
employeecontroller.post('/login', async (req, res) => {
    let { email, password } = req.body;
    try {
        let loggingIn = await Employee.findOne({
            where: {
                email
            }
        })

        if( loggingIn && await bcrypt.compare(password, loggingIn.password)) {
            const token = jwt.sign({ id: loggingIn.id }, process.env.JWT_SECRET);
                    res.status(200).json({
                        message: 'login success',
                        token
                    })
        } else {
            res.status(401).json({
                message: 'login failed'
            })
        }
    } catch (e) {
        res.status(500).json({
            message: 'error logging in'
        })
    }
})


/**
 * @swagger
 * /8739/all:
 *   get:
 *     summary: Someone with an "employer" token can get a list of all employees
 *     tags: [Employee]
 *     security: 
 *       - EmployerAuth: []
 *     responses:
 *       200:
 *         description: Will return an array of user objects if successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       500:
 *          description: "no employees found or failed to get employees"
 */ 


 employeecontroller.get('/all', validateEmployer, async (req, res) => {
     
    try {
        let foundEmployees = await Employee.findAll({
            where: {
                employerId: req.user.id
            }
        })
        if(foundEmployees){

            
        res.json({
            employees: foundEmployees
        })
    } else {
        res.status(500).json({
            message: "no users found"
        })
    }
    } catch(e) {
        res.status(500).json({
            message: 'failed to get employees'
        })
    }
})





/**
 * @swagger
 * /8739/1:
 *   delete:
 *     summary: Someone with an "employer" token can delete employee by employeeId 
 *     tags: [Employee]
 *     security: 
 *       - EmployerAuth: []
 *     responses:
 *       200:
 *         description: "removed employee successfully"
 *       500:
 *          description: "employee not found, or does not belong to user or failed to remove employee"
 */ 
 employeecontroller.delete('/:id', validateEmployer, async (req, res) => {
    try {
      const employeeToRemove = await Employee.findOne({
        where: {
          id: req.params.id,
        },
      });
      employeeToRemove
        ? employeeToRemove.destroy()
        : res.status(404).json({
            message: "employee not found, or does not belong to user",
          });
      res.status(200).json({
        message: "removed employee successfully",
      });
    } catch (e) {
      res.status(500).json({
        message: "failed to remove employee",
      });
    }
  });
  


module.exports = employeecontroller;
