require("dotenv").config();
const Express = require("express");
const db = require("./db");
const app = Express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const { employer, employee, team, task, project, teammember } = require("./controllers");
const { validate, validateEmployer, cors } = require("./middlewares");

app.use(Express.json());
app.use(cors);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project and Task API",
      description:
        "This is an API designed for employers to assign teams, projects, tasks and give feedback to their employees",
      contact: {
        name: "Corynne Moody",
      },
    },
    servers: [
      {
        url: "http://localhost:8070",
      },
      {
        url: "https://task-database-app.herokuapp.com/",
      },
    ]
  },
  apis: ["*.js", "./controllers/*.js", "./models/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { 
    // explorer: true 
  })
);

/**
 * @swagger
 * /test:
 *   get:
 *     summary: returns a successful request if hit
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: returns "test endpoint successful!"
 */

app.get("/test", (req, res) => {
  res.json({
    message: "test endpoint successful!",
  });
});

app.use("/8738", employer);
app.use("/8739", employee);

app.use(validateEmployer);
app.use("/5626", teammember);
app.use("/5625", team);
app.use("/5624", project);

app.use(validate);
app.use("/7372", task);

app.use("/static", Express.static("node_modules"));





db.authenticate()
  .then(() => db.sync())
  // .then(() => db.sync({force: true}))
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[taskdb-server]: app listening on ${process.env.PORT}`);
    })
  );

module.exports = app;
