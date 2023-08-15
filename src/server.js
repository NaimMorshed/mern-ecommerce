const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const isLoggedIn = (req, res, next) => {
  const login = true;
  if (login) {
    req.body.id = 101;
    next();
  } else {
    return res.status(401).json({ message: "Please login first" });
  }
};

app.get("/api/users", isLoggedIn, (req, res) => {
  console.log(req.body.id);
  res.status(200).send({
    message: "User profile is returned",
  });
});

// client error handling
app.use((req, res, next) => {
  res.status(404).send({
    message: "Route not found!",
  });
  next();
});

// server error handling
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send({
    message: "Something broke!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
