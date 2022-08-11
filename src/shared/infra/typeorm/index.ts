import { createConnection, getConnectionOptions } from "typeorm";

// export default async (host = "database") => {
export default async () => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      // host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database:
        process.env.NODE_ENV === "test"
          ? "rentxdb_tests"
          : defaultOptions.database,
    })
  );
};
