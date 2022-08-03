import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("87654321", 8);

  await connection.query(
    `
    INSERT INTO "user" (id, name, email, password, driver_license, is_admin, created_at)
    VALUES ('${id}', 'Administrator', 'admin@mail.com', '${password}', '000000000', true, 'now()');
    `
  );

  await connection.close();
}

create().then(() => console.log("Admin user successfully created."));
