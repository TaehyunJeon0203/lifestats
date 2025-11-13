import express from "express";
import { pool } from "./db";

const app = express();

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS currentTime");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB connection error");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));