import request from "supertest";

import app from "../src/app";

describe("Testing app module", () => {

  test("Calling wrong route should return an error", async () => {
    const res = await request(app).get("/");

    expect(res.body.message).toBe("Route not found - /");
    expect(res.status).toBe(404);
  });
  
});