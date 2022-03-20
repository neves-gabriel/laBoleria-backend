import { connection } from "../database.js";

export async function postClient(req, res) {
  const { name, address, phone } = req.body;

  try {
    await connection.query(
      "INSERT INTO clients (name, adress, phone) VALUES ($1, $2, $3)",
      [name, address, phone]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getClients(req, res) {
  try {
    const clients = await connection.query("SELECT * FROM clients");

    if (!clients.rowCount) {
      return res.sendStatus(204);
    }

    res.status(200).send(clients.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}
