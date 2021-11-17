const express = require("express");
const app = express();

const morgan = require("morgan");
const users = require("./data/users-data");
const states = require("./data/states-data");

app.use(morgan("dev"));

// TODO: return a single user by id from /users/:userId in form of { data: Object }
app.get("/users/:userId", (req, res, next) => {
  const { userId } = req.params;
  const foundUser = users.find((user) => user.id === Number(userId));
  if (foundUser) {
    res.json({data: foundUser });
  } else {
    next(`User ID not found: ${userId}`);
  }
});
// TODO: Return a single state from /states/:stateCode in the form of { data: { stateCode: String, name: String } }
app.get("/states/:stateCode", (req, res, next) => {
    const { stateCode } = req.params;
    const foundState = states[stateCode]
    if (foundState === undefined) {
        next(`State code not found: ${stateCode}`);
    } else {
        res.json({data: {stateCode, "name": foundState} });
    }
  });
// TODO: return an array of users from /users in form of { data: Array }
app.get("/users", (req, res) => {
  res.json({ data: users });
});



// TODO: return all states from /states in the form of { data: Array }
app.get("/states", (req, res) => {
  res.json({ data: states });
});

// TODO: add not found handler
app.use((req, res, next) => {
  next(`Not found: ${req.originalUrl}`);
});

// TODO: Add error handler
app.use((err, req, res, next) => {
  res.send(err);
});
module.exports = app;
