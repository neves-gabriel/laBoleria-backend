import { connection } from "../database.js";

export async function postFlavor(req, res) {
  const { name } = req.body;

  try {
    const existingFlavors = await connection.query(
      "SELECT * FROM flavors WHERE name = $1",
      [name]
    );
    if (existingFlavors.rowCount > 0) {
      return res.sendStatus(409);
    }

    await connection.query("INSERT INTO flavors (name) VALUES ($1)", [name]);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getFlavors(req, res) {
  try {
    const flavors = await connection.query("SELECT * FROM flavors");

    if (!flavors.rowCount) {
      return res.sendStatus(204);
    }

    res.status(200).send(flavors.rows);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
