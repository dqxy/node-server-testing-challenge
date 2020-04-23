const request = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig.js");

describe("server", function () {
  describe("GET /", function () {
    it("should return 200 OK", function () {
      // make a GET request to / endpoint on the server
      return request(server) // return the async call to let jest know it should wait
        .get("/")
        .then(res => {
          // assert that the HTTP status code is 200
          expect(res.status).toBe(200);
        });
    });
  });

  describe("POST /pelicans", function () {
    beforeEach(async () => {
      await db("pelicans").truncate(); // empty the table and reset the id back to 1
    });

    it("return 201 on success", function () {
      return request(server)
        .post("/pelicans")
        .send({ name: "gaffer" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it('should return a message saying "Pelican created successfully"', function () {
      return request(server)
        .post("/pelicans")
        .send({ name: "gaffer" })
        .then(res => {
          expect(res.body.message).toBe("Pelican created successfully");
        });
    });

    it("add the pelican to the db", async function () {
      const pelicanName = "gaffer";

      const existing = await db("pelicans").where({ name: pelicanName });
      expect(existing).toHaveLength(0);

      await request(server)
        .post("/pelicans")
        .send({ name: pelicanName })
        .then(res => {
          expect(res.body.message).toBe("Pelican created successfully");
        });
      await request(server)
        .post("/pelicans")
        .send({ name: "sam" })
        .then(res => {
          expect(res.body.message).toBe("Pelican created successfully");
        });

      const inserted = await db("pelicans"); //.where({ name: pelicanName });
      expect(inserted).toHaveLength(2);
    });
  });
});
