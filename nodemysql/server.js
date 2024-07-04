const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());
const cors = require("cors");
server.use(cors());
server.options('*', cors());

//Establish the database connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bdstudent",
});

db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB");
  } else {
    console.log("successfully Connected to DB");
  }
});

//Establish the Port

server.listen(3000, function check(error) {
  if (error) {
    console.log("Error....!!!!");
  } else {
    console.log("Started....!!!!");
  }
});

//Create the Records

server.post("/api/students/add", (req, res) => {
  let details = {
    stname: req.body.stname,
    course: req.body.course,
    fee: req.body.fee,
  };
  let sql = "INSERT INTO students SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Student created Failed" });
    } else {
      res.send({ status: true, message: "Student created successfully" });
    }
  });
});

//view the Records

server.get("/api/students", (req, res) => {
  var sql = "SELECT * FROM students";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Search the Records

server.get("/api/students/:id", (req, res) => {
  var studentid = req.params.id;
  var sql = "SELECT * FROM students WHERE id=" + studentid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Update the Records

server.put("/api/students/update/:id", (req, res) => {
  let sql =
    "UPDATE students SET stname='" +
    req.body.stname +
    "', course='" +
    req.body.course +
    "',fee='" +
    req.body.fee +
    "'  WHERE id=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Student Updated Failed" });
    } else {
      res.send({ status: true, message: "Student Updated successfully" });
    }
  });
});

//Delete the Records

server.delete("/api/students/delete/:id", (req, res) => {
  let sql = "DELETE FROM students WHERE id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Student Deleted Failed" });
    } else {
      res.send({ status: true, message: "Student Deleted successfully" });
    }
  });
});
