// var sqlite3 = require('sqlite3').verbose();
var express = require("express")
var http = require("http")
var path = require("path")
var bodyParser = require("body-parser")
var helmet = require("helmet")
var rateLimit = require("express-rate-limit")
const cors = require("cors")

const mysql = require("mysql")

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
})

var app = express()
var server = http.createServer(app)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

// var db = new sqlite3.Database('./database/employees.db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "./public")))
app.use(helmet())
app.use(limiter)
app.use(cors())

// db.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)');

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/registration.html"))
})

// Add
app.post("/save", function (req, res) {
  // var sql = "INSERT INTO STUDENT VALUES(?)", [req.body.ID];
  console.log(req.body)
  mysqlConnection.query(
    "INSERT INTO STUDENT_FULL_DETAILS VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.ID,
      req.body.gender,
      req.body.Date,
      req.body.Blood,
      req.body.email,
      req.body.MNO,
      req.body.ADDNO,
      req.body.FNAME,
      req.body.FP,
      req.body.MNAME,
      req.body.MP,
      req.body.GNO,
      req.body.Course,
      req.body.PYD,
      req.body.BRANCH,
      req.body.RA,
      req.body.RNO,
      req.body.AIR,
      req.body.PER,
      req.body.Course1,
      req.body.Course2,
      req.body.JDD,
      req.body.JDate,
      req.body.JAMT,
      req.body.IDD,
      req.body.IDate,
      req.body.IAMT,
      req.body.TAMT,
      req.body.HOSTEL,
      req.body.doc1,
      req.body.doc2,
      req.body.doc3,
      req.body.doc4,
      req.body.doc5,
      req.body.doc6,
      req.body.doc7,
      req.body.doc8,
      req.body.doc9,
      req.body.doc10,
      req.body.doc11,
      req.body.doc12,
      req.body.doc13,
      req.body.doc14,
      req.body.A_HNO,
      req.body.A_CITY,
      req.body.A_STATE,
      req.body.A_PIN,
      req.body.A_MNO,
      req.body.P_HNO,
      req.body.P_CITY,
      req.body.P_STATE,
      req.body.P_PIN,
      req.body.P_MNO,
      req.body.T_BD,
      req.body.T_SUB,
      req.body.T_YR,
      req.body.T_MRK,
      req.body.T_PER,
      req.body.I_BD,
      req.body.I_SUB,
      req.body.I_YR,
      req.body.I_MRK,
      req.body.I_PER,
      req.body.Disease,
      req.body.T_DATE,
      req.body.sig,
    ],
    function (err, result, fields) {
      if (err) throw err
      console.log("1 row inserted")
      res.send("New employee has been added into the database with ID ")
    }
  )

  //     db.serialize(()=>{
  //     db.run('INSERT INTO emp(id,name) VALUES(?,?)', [req.body.id, req.body.name], function(err) {
  //       if (err) {
  //         return console.log(err.message);
  //       }
  //       console.log("New employee has been added");
  //       res.send("New employee has been added into the database with ID = "+req.body.id+ " and Name = "+req.body.name);
  //     });

  //   });
})

server.listen(3030, function () {
  console.log("server is listening on port: 3030")
})
