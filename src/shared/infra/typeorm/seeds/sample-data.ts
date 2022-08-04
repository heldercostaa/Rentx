import { hash } from "bcrypt";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const password = await hash("87654321", 8);

  await connection.query(
    `
    -- Users --
    INSERT INTO "user" (id, name, email, password, driver_license, is_admin, created_at)
    VALUES ('a6b672ef-f00b-40b0-a56f-da98173d7736', 'Administrator', 'admin@mail.com', '${password}', '000000000', true, 'now()');

    INSERT INTO "user" (id, name, email, password, driver_license, is_admin, created_at)
    VALUES ('c3a4366d-8e97-4f7c-9c33-5ac03560aaca', 'User', 'user@mail.com', '${password}', '000000000', false, 'now()');

    -- Categories --
    INSERT INTO "category" (id, name, description, created_at)
    VALUES ('1a531bb7-51ae-439d-8abf-2ef7570385d9', 'Sports Car', 'Sports cars are two-seater convertibles that allow for open-air driving and have a sporty appearance.', 'now()');

    INSERT INTO "category" (id, name, description, created_at)
    VALUES ('51242eec-5ab1-47aa-be3f-af5507375c6f', 'SUV', 'A Sport Utility Vehicle(SUV) is defined by its off-road capabilities and roomines.', 'now()');

    -- Cars --
    INSERT INTO "car" (id, name, description, daily_rate, available, license_plate, fine_amount, brand, category_id, created_at)
    VALUES ('3b5f6767-f924-495a-827a-e9fa40f687a1', 'RS e-tron GT', 'German luxury vehicle.', 300, true, 'HC-0000', '30', 'Audi', '1a531bb7-51ae-439d-8abf-2ef7570385d9', 'now()');

    INSERT INTO "car" (id, name, description, daily_rate, available, license_plate, fine_amount, brand, category_id, created_at)
    VALUES ('7c14cf17-d3f7-42ae-be4e-7ca62f61302c', 'Audi TT', '2-door production sports car.', 150, true, 'HC-1111', '15', 'Audi', '1a531bb7-51ae-439d-8abf-2ef7570385d9', 'now()');

    INSERT INTO "car" (id, name, description, daily_rate, available, license_plate, fine_amount, brand, category_id, created_at)
    VALUES ('ba76fb79-2e36-4aab-b3da-228764235cf2', 'BMW X5', 'Mid-sized luxury SUV.', 250, true, 'HC-2222', '25', 'BMW X5', '51242eec-5ab1-47aa-be3f-af5507375c6f', 'now()');

    -- Specifications --
    INSERT INTO "specification" (id, name, description, created_at)
    VALUES ('6502d905-034f-45a1-810a-d068f9d9bdfd', 'Airbags', 'Airbags are quick-inflating cushions meant to protect passengers in a collision.', 'now()');

    INSERT INTO "specification" (id, name, description, created_at)
    VALUES ('2043a832-6871-4e23-b0e4-f7de93c8661b', 'ABS', 'System that keeps your wheels from locking when you brake hard.', 'now()');
    `
  );

  await connection.close();
}

create().then(() => console.log("Sample data successfully created."));
