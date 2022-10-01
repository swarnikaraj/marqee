const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database/sequelize");
const zauba_data = require("./utils/zauba");
const db = require("./models");
const Company = db.company;
const Op = db.Sequelize.Op;

const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));


app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.post("/search/:name", async (req, res) => {
  try {
    var companies = await zauba_data.getCompanyNames(req.params.name);

    var companyList = [];
    if (companies) {
      var m1 = await companies.split("</div>");
      console.log(m1);
      for (let i = 0; i < m1.length; i++) {
        if (m1[i] === undefined) {
          continue;
        } else {
          if (m1[i].split(" ")[3] == undefined) {
            continue;
          } else {
            m2 = m1[i].split(" ")[3].split("/");
            var m3 = m2[1];
            var m4 = m2[2].split(`"`)[0];

            companyList.push({ name: m3, cin: m4 });
          }
        }
      }
    }

    console.log(companyList);

    return res.status(200).json(companyList);
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

app.post("/add-many-company", async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Company name can not be empty!"
      });
      return;
    }
  
    // Create a Company
    
  
    // Save Company in the database
    Company.bulkCreate(req.body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Something went wrong"
        });
      });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

app.post("/add-company", async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Company name can not be empty!"
      });
      return;
    }
    const company = {
      name: req.body.name,
      cin: req.body.cin,
    };
    Company.create(company)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Something went wrong"
        });
      });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

app.get("/added", async (req, res) => {
  try {
    const company = await Company.findAll()
  
    return res.status(200).json({ company });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

app.listen(8000, async () => {
  await db.sequelize.sync({ force: true });
  console.log("connection establish on port", 8000);
});
