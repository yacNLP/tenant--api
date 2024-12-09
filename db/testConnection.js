import { client } from "./db.js";

async function testConnection() {
  try {
    const res = await client.query("SELECT NOW()");
    console.log("Successfully connected:", res.rows[0]);
  } catch (error) {
    console.error("Error while connecting:", error.message);
  }
}

testConnection();
