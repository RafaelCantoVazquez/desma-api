import request from "supertest";

import app from "../../src/app";

describe("Testing the user routes module", () => {

  test("Calling register route with correct data should return a token", async () => {
    const userData = {
      name: "User",
      email: "user@test.com",
      password: "password"
    }
    const res = await request(app).post("/api/v1/users").send(userData);
    expect(res.body.token).toBeDefined();
  });

  test("Calling register route with incorrect email syntax should return an error", async () => {
    const userData = {
      name: "User",
      email: "user",
      password: "password"
    }
    const res = await request(app).post("/api/v1/users").send(userData);
    expect(res.body.message).toBe("User validation failed: email: Invalid email syntax");
    expect(res.status).toBe(400);
  });

  test("Calling register route with email registered previously should return an error", async () => {
    const userData = {
      name: "User",
      email: "user@test.com",
      password: "password"
    }
    await request(app).post("/api/v1/users").send(userData);
    const res = await request(app).post("/api/v1/users").send(userData);
    expect(res.body.message).toBe("The email is already associated with a Desma account");
    expect(res.status).toBe(400);
  });

  test("Calling login route with correct data should return a token", async () => {
    const userData = {
      email: "user@test.com",
      password: "password"
    }
    const res = await request(app).post("/api/v1/users/login").send(userData);
    expect(res.body.token).toBeDefined();
  });

  test("Calling login route with incorrect data should return an error", async () => {
    const userData = {
      email: "user@test.com",
      password: "password"
    }
    await request(app).post("/api/v1/users").send(userData);
    const res = await request(app).post("/api/v1/users/login").send(userData);
    expect(res.body.message).toBe("Invalid email or password");
  });
  
});