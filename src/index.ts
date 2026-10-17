import express from "express";
import { db } from "./config/db.ts";
import { UserRoutes } from "./modules/user/index.ts";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 
app.use("/api/users", UserRoutes);

// Report whether any users exist
app.get("/", async (req, res) => {
  const { total } = await db.orm.public.User.aggregate((a) => ({
    total: a.count(),
  }));
  res.json(
    total === 0
      ? "No users have been added yet."
      : "Some users have been added to the database.",
  );
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
