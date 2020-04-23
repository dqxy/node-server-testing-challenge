const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(pelican) {
  return db("pelicans").insert(pelican, "id");
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function getAll() {
  return db("pelicans");
}

function findById(id) {
  return null;
}
