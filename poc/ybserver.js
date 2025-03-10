/*
Ybigh simple server 1
*/
const { connection, mysql } = require("../mods/dbconnection.js");//dbconnection-min.js
const express = require("express");
const bodyParser = require("body-parser");
const session = require("client-sessions");
const device = require("express-device");
const app = express();
const words = require("./words-min.js");
//const router     = express.Router();

let nav = [
  {
    name: "Introduction",
    link: "",
  },
  {
    name: "Sign up",
    link: "n-signup",
  },
  {
    name: "Dashboard",
    link: "n-dashboard",
  },
  {
    name: "How to use",
    link: "n-howtouse",
  },
  {
    name: "Stage 1",
    link: "n-stage1",
  },
  {
    name: "Stage 2",
    link: "n-stage2",
  },
  {
    name: "Stage 3",
    link: "n-stage3",
  },
];

connection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("database connected");
  }
});

app.use(
  session({
    cookieName: "session",
    secret: "respqgepor30343DDmkivwkjndd-[]{}P022$",
    duration: 24 * 30 * 60 * 1000,
    /*activeDuration: 5 * 60 * 1000,*/
  })
);

app.use("/", express.static(__dirname + "/../public")); // ← adjust

setInterval(function () {
  connection.query("SELECT 1");
}, 1000*60*5);//every five minutes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(device.capture({ parseUserAgent: true }));

device.enableDeviceHelpers(app);
device.enableViewRouting(app);

//var Book = mongoose.model('Book', bookSchema);

// set the view engine to ejs
app.set("view engine", "ejs");

app.use("/", function (req, res, next) {
  res.header("Node-server", 0);

  if (req.url !== "/n-signup" && req.method === "POST" && !req.session.user) {
    res.status(200).send(false);

    return;
  }

  if (!req.session.user && req.method === "GET") {
    res.render(__dirname + "/../views/pages/index", { data: nav });

    return;
  } else {
    return next();
  }
  //console.log('Time:', Date.now())
});

// index page
app.get("/", function (req, res, next) {
  res.render(__dirname + "/../views/pages/introduction", { data: nav });
});

app.get("/:name", function (req, res, next) {
  //console.log(req.params);

  let id = !!req.session.user ? req.session.user : "not";

  let sql = "SELECT * FROM auth WHERE id_user=" + mysql.escape(id);

  connection.query(sql, function (error, result, fields) {
    if (error) throw error;

    if (req.params.name == "n-signup") {
      res.render(__dirname + "/../views/pages/index", { data: nav });
    }

    if (result.length > 0) {
      //check for nav

      if (req.params.name == "n-howtouse") {
        res.render(__dirname + "/../views/pages/how_to_use", { data: nav });
      } else if (req.params.name == "n-stage1") {
        res.render(__dirname + "/../views/pages/stage_1", { data: nav });
      } else if (req.params.name == "n-stage2") {
        res.render(__dirname + "/../views/pages/stage_2", { data: nav });
      } else if (req.params.name == "n-stage3") {
        //stage 3
      }
    }
  });

  //connection.end();
});
app.get("/s*/data", function (req, res, next) {
  res.send({
    data: words,
  });
});

app.post("/n-signup", function (req, res, next) {
  //req.query
  nav.push({
    name: "",
    link: "",
  });

  if (req.body.email) {
    let sql = "SELECT * FROM auth WHERE email_user = ?";

    connection.query(
      sql,
      mysql.escape(req.body.email),
      function (error, result_user, fields) {
        if (!error) {
          if (result_user.length > 0) {
            if (!!req.session.user) {
              nav[nav.length - 1].msg = "You are already logged in";
              res.render(__dirname + "/../views/pages/index", { data: nav });
            } else {
              req.session.user = mysql.escape(result_user[0].id_user);
              nav[nav.length - 1].msg = "New session created";
              res.render(__dirname + "/../views/pages/index", { data: nav });
            }
          } else {
            let user = { email_user: mysql.escape(req.body.email) };
            let sql_insert = "INSERT INTO auth SET ?";

            connection.query(sql_insert, user, function (err, row) {
              if (err) throw err;

              req.session.user = row.insertId;

              nav[nav.length - 1].msg =
                'Email sent. Please proceed to "How to use"';

              res.render(__dirname + "/../views/pages/index", { data: nav });
            });
          }
        } else {
          nav[nav.length - 1].msg = error;
          res.render(__dirname + "/../views/pages/index", { data: nav });
        }
      }
    );
  } else {
    nav[nav.length - 1].msg = "Please add your email";

    res.render(__dirname + "/../views/pages/index", { data: nav });
  }
});

app.post("/symbol", function (req, res, next) {
  console.log(req.body);
  res.set({ "Content-Type": "text/plain" });
  res.status(200).send(true);
});
const port = process.env.PORT || 4262
app.listen(port, function () {
  console.log(`Node app is running ${port}`);
});
