const express = require("express");

const pelicans = require("../pelicans/pelicansModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/pelicans", (req, res) => {
  pelicans.getAll()
    .then(pelicans => {
      res.status(200).json(pelicans);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/pelicans", (req, res) => {
  const pelicanInfo = req.body;

  pelicans.insert(pelicanInfo)
    .then(ids => {
      res.status(201).json({ message: "Pelican created successfully" });
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error.message });
    });
});

module.exports = server;
