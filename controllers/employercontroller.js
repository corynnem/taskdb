const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { Employer } = require('../models');
const { validateEmployer } = require('../middlewares')
const { UniqueConstraintError } = require('sequelize/lib/errors')

const employercontroller = Router();




/**
 * @swagger
 * /8738/register:
 *   post:
 *     summary: returns a message of "employer registered" 
 *     tags: [Employer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employer'
 *     responses:
 *       200:
 *         description: "employer registered"
 *       409:
 *         description: 'email already in use'
 *       500:
 *         description: 'failed to register employer'
 */

employercontroller.post('/register', async (req, res) => {
    let { email, firstName, lastName, password, position, key } = req.body;
    try {
        await Employer.create({
            email,
            firstName, 
            lastName,
            password: bcrypt.hashSync(password, 12),
            position,
            key
        });
        res.status(201).json({
            message: "user registered"
        });
    } catch (e) {
        if(e instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'email already in use'
            });
        } else {
            res.status(500).json({
                message: 'failed to register users'
            })
        }
    }
});




/**
 * @swagger
 * /8738/login:
 *   post:
 *     summary: Someone with employer credentials can login using this endpoint
 *     tags: [Employer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employer'
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
 *         description: 'failed to register employer'
 */
employercontroller.post('/login', async (req, res) => {
    let { email, password } = req.body;
    try {
        let loggingIn = await Employer.findOne({
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
 * /8738/all:
 *   get:
 *     summary: returns a list of all employers/companies
 *     tags: [Employer]
 *     responses:
 *       200:
 *         description: Will return an array of user objects if successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employer'
 *       500:
 *          description: "no users found or failed to get employers"
 */ 


 employercontroller.get('/all', async (req, res) => {
    try {
        let foundUsers = await Employer.findAll()
        if(foundUsers){
        res.json({
            employers: foundUsers
        })
    } else {
        res.status(500).json({
            message: "no users found"
        })
    }
    } catch(e) {
        res.status(500).json({
            message: 'failed to get user'
        })
    }
})







/**
 * @swagger
 * /8738/:id:
 *   delete:
 *     summary: deletes employer by employerId 
 *     tags: [Employer]
 *     responses:
 *       200:
 *         description: "removed employer successfully"
 *       500:
 *          description: "employer not found, or does not belong to user or failed to remove employer"
 */ 
 employercontroller.delete('/remove', validateEmployer, async (req, res) => {
    try {
      const employerToRemove = await Employer.findOne({
        where: {
          id: req.user.id,
        },
      });
      employerToRemove
        ? employerToRemove.destroy()
        : res.status(404).json({
            message: "employer not found, or does not belong to user",
          });
      res.status(200).json({
        message: "removed employer successfully",
      });
    } catch (e) {
      res.status(500).json({
        message: "failed to remove employer",
      });
    }
  });
  


module.exports = employercontroller;


