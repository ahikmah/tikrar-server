import type { Auth } from "@/api/auth/authModel";
import type { ServiceResponse } from "@/common/models/serviceResponse";

import { StatusCodes } from "http-status-codes";
import request from "supertest";

import { app } from "@/server";

describe("Auth API Endpoints", () => {
  describe("POST /auth/register", () => {
    it("should register a new user and return registered user data + token", async () => {
      // Act
      const response = await request(app).post("/auth/register").send({
        name: "test",
        email: "test@mail.com",
        password: "test",
        avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      });

      const responseBody: ServiceResponse<Auth> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.CREATED);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("User created");
      expect(responseBody.responseObject.name).toEqual("test");
      expect(responseBody.responseObject.email).toEqual("test@mail.com");
      expect(responseBody.responseObject.password).toBeTypeOf("string");
      expect(responseBody.responseObject.avatar).toEqual(
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      );
      expect(responseBody.responseObject.token).toBeTypeOf("string");

      // Clean up
      await request(app).delete(`/users/${responseBody.responseObject.id}`);
    });

    it("should return a bad request for missing required fields", async () => {
      // Act
      const response = await request(app).post("/auth/register").send({
        email: "test@mail.com",
        password: "test",
        avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      });
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("Invalid input");
      expect(responseBody.responseObject).toBeNull();
    });

    it("should return a bad request for invalid email", async () => {
      // Act
      const response = await request(app).post("/auth/register").send({
        name: "test",
        email: "test",
        password: "test",
        avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        planId: "1",
      });
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("Invalid email");
      expect(responseBody.responseObject).toBeNull();
    });

    it("should return a bad request for duplicate email", async () => {
      // Act
      const response = await request(app).post("/auth/register").send({
        name: "test",
        email: "imadlz15@gmail.com",
        password: "password",
      });
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.CONFLICT);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("Email already exists");
      expect(responseBody.responseObject).toBeNull();
    });

    it("should return a bad request for invalid planId", async () => {
      // Act
      const response = await request(app).post("/auth/register").send({
        name: "test",
        email: "test@mail.com",
        password: "test",
        avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        planId: "5",
      });
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("Invalid input");
      expect(responseBody.responseObject).toBeNull();
    });
  });
});
