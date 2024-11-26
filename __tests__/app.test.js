const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */
const request = require("supertest");
const app = require("../app");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
//database connection pool for ending connection after tests run
const db = require("../db/connection");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });

  describe("GET /api/topics", () => {
    test("200: Responds with an array of topic objects", () => {
      return request(app)
        .get("/api/topics") // requesting to endpoint
        .expect(200) // expecting status 200
        .then(({ body: { topics } }) => {
          expect(topics).toBeInstanceOf(Array); // checking if topics is an array
          expect(topics.length).toBeGreaterThan(0); // checking is there is at least 1 topic
          topics.forEach((topic) => {
            expect(topic).toHaveProperty("slug"); // each topic must have slug and description property
            expect(topic).toHaveProperty("description");
          });
        });
    });
  });
});
