import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();
app.use(express.json());

app.use(categoriesRoutes);

const port = 3333;
app.listen(port, () => console.log(`🚀 Server started on port: ${port}`));
