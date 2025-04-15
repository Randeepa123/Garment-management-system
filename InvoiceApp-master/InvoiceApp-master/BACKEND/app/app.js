const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("../controllers/targetController");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/getAllOperators", (req, res, next) => {
  controller.getAllOperators(req, res, next);
  res.send();
});

app.get("/getSheet", (req, res, next) => {
  controller.getTargetSheet(req, res, next);
  res.send();
});

app.get("/getAll", (req, res, next) => {
  controller.getAll(req, res, next);
  res.send();
});

app.get("/getTargetsByEmployee", (req, res, next) => {
  controller.getTargetsByEmployee(req, res, next);
  res.send();
});

app.post("/add", (req, res, next) => {
  controller.addTargetSheet(req, res, next);
  res.send();
});

app.put("/addTarget", (req, res, next) => {
  controller.addTarget(req, res, next);
  res.send();
});

app.put("/updateTarget", (req, res, next) => {
  controller.updateTarget(req, res, next);
  res.send();
});

app.delete("/deleteTarget", (req, res, next) => {
  controller.deleteTarget(req, res, next);
  res.send();
});

//orders
app.get("/orders", (req, res, next) => {
  controller.getOrders(req, res, next);
  res.send();
});

app.get("/getOrder", (req, res, next) => {
  controller.getOrder(req, res, next);
  res.send();
});
