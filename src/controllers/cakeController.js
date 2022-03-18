import urlSchema from "../schemas/urlSchema.js";
import { connection } from "../database.js";

export async function postCake(req, res) {
  const { name, price, description, image } = req.body;

  try {
    const existingCakes = await connection.query(
      "SELECT * FROM cakes WHERE name=$1",
      [name]
    );
    if (existingCakes.rowCount > 0) {
      return res.sendStatus(409);
    }

    const validation = urlSchema.validate(image);
    if (validation.error) {
      return res.sendStatus(422);
    }

    await connection.query(
      "INSERT INTO cakes (name, price, description, image) VALUES ($1, $2, $3)"[
        (name, price, description, image)
      ]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getCakes(req, res) {
  try {
    const cakes = await connection.query("SELECT * FROM cakes");

    if (!cakes.rowCount) {
      return res.sendStatus(204);
    }

    res.status(200).send(cakes.rows[0]);
  } catch (error) {
    res.sendStatus(500);
  }
}
