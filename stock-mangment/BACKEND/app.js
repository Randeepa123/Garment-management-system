const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("./controller/Stockcontroller");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/add", (req, res, next) => {
  controller.addStock(req, res, next);
  res.send();
});

app.get("/", (req, res, next) => {
    controller.stocklevel(req, res, next);
    res.send();
  });

  app.get("/categories", (req, res, next) => {
    controller.selectCatogary(req, res, next);
    res.send();
  });

  app.get("/category/:category", (req, res, next) => {
    controller.chart_data(req, res, next);
    res.send();
  });

  app.get("/recent", (req, res, next) => {
    controller.PurchaseHistory(req, res, next);
    res.send();
  });

  app.get("/remove/:id", (req, res, next) => {
    controller.removestock(req, res, next);
    res.send();
  });

  app.get("/", (req, res, next) => {
    controller.getallmaterial(req, res, next);
    res.send();
  });

  app.post("/use", (req, res, next) => {
    controller.materialuse(req, res, next);
    res.send();
  });

  app.get("/usage", (req, res, next) => {
    controller.materialuse(req, res, next);
    res.send();
  });
  app.delete("/usage/:id", (req, res, next) => {
    controller.useRecordDelete(req, res, next);
    res.send();
  });
