import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.dropDatabase();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("87654321", 8);

    await connection.query(
      `
    INSERT INTO "user" (id, name, email, password, driver_license, is_admin, created_at)
    VALUES ('${id}', 'Administrator', 'admin@mail.com', '${password}', '000000000', true, 'now()');
    `
    );
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should be able to list all categories", async () => {
    const tokenResponse = await request(app).post("/session").send({
      email: "admin@mail.com",
      password: "87654321",
    });

    const { token } = tokenResponse.body;

    await request(app)
      .post("/category")
      .send({
        name: "Sports Car",
        description:
          "Sports cars are two-seater convertibles that allow for open-air driving and have a sporty appearance.",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/category").send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Sports Car");
  });
});
