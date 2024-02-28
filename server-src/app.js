const express = require("express");
const cors = require("cors");
const session = require("express-session");

app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    origin:"http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);
app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );

app.post("/api/register", async (req, res) => {


});