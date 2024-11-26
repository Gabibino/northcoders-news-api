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


describe("GET /api/articles/:article_id", () => {
  test("200: Responds with the article object for a valid article_id", () => {
    return request(app)
      .get("/api/articles/1") //assuming the article_id is 1
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("author");
        expect(body).toHaveProperty("title");
        expect(body).toHaveProperty("article_id", 1); // assuming article_id is 1
        expect(body).toHaveProperty("body");
        expect(body).toHaveProperty("topic");
        expect(body).toHaveProperty("created_at");
        expect(body).toHaveProperty("votes");
        expect(body).toHaveProperty("article_img_url");
      });
  });

  test("404: Responds with error message when article_id does not exist", () => {
    return request(app)
      .get("/api/articles/998877") // assuming 998877 is a non-existing article_id
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ error: "Article not found" });
      });
  });

  test("400: Responds with error message when article_id is invalid", () => {
    return request(app)
      .get("/api/articles/invalid_id") // invalid article_id
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ error: "Invalid article ID" });
      });
  });
});
