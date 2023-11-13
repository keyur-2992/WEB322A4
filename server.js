/** @format */

/********************************************************************************
 * WEB322 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Keyurkumar Patel  Student ID: 170852214 Date: 13-NOV-2023
 *
 * Published URL: https://important-gray-fossa.cyclic.app/
 *********************************************************************************/

const express = require("express");
const path = require("path");

const legoData = require("./modules/legoSets");

const app = express();

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/lego/sets", (req, res) => {
  if (req.query.theme) {
    legoData
      .getSetsByTheme(req.query.theme)
      .then((data) => res.render("sets", { sets: data }))
      .catch((err) =>
        res.status(404).render("404", {
          message: "No Sets found for a matching theme",
        })
      );
  }

  legoData
    .getAllSets()
    .then((data) => res.render("sets", { sets: data }))
    .catch((err) =>
      res.status(404).render("404", {
        message: "I'm sorry, we're unable to find what you're looking for",
      })
    );
});

app.get("/lego/sets/:id", (req, res) => {
  legoData
    .getSetByNum(req.params.id)
    .then((data) => res.render("set", { set: data }))
    .catch((err) =>
      res.status(404).render("404", {
        message: "No Sets found for a specific set num",
      })
    );
});

app.use((req, res) => {
  res.status(404).render("404", {
    message: "No view matched for a specific route",
  });
});

legoData
  .initialize()
  .then(() => app.listen(PORT, () => console.log(`listening on port ${PORT}`)))
  .catch((error) => console.log(`Failed to listen on port ${PORT}`));
