const db = require("../models");
const   Company = db.company;
const Op = db.Sequelize.Op;

// Create and Save a company
exports.create = (req, res) => {
  
  if (!req.body) {
    res.status(400).send({
      message: "Company can not be empty!"
    });
    return;
  }

  // Create a Company
  // const company = {
  //   name: req.body.name,
  //   cin: req.body.cin,
  // };

  // Save Company in the database
  Company.createMany(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Something went wrong"
      });
    });
};

// Retrieve all Comapny from the database.
exports.findAll = (req, res) => {

  Company.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "somthing went wrong"
      });
    });
};





