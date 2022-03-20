import dayjs from "dayjs";
import { connection } from "../database.js";

export async function postOrder(req, res) {
  const { clientId, cakeId, quantity } = req.body;

  try {
    const validateClientId = await connection.query(
      "SELECT * FROM clients WHERE id=$1",
      [clientId]
    );
    if (validateClientId.rowCount <= 0) {
      return res.sendStatus(404);
    }

    const validateCakeId = await connection.query(
      "SELECT * FROM cakes WHERE id=$1",
      [cakeId]
    );
    if (validateCakeId.rowCount <= 0) {
      return res.sendStatus(404);
    }

    const totalPrice = quantity * validateCakeId[0].price;

    const createdAt = dayjs().format("YYYY-MM-DD HH:mm");

    await connection.query(
      "INSERT INTO orders (clientId, cakeId, quantity, totalPrice, createdAt) VALUES ($1, $2, $3, $4, $5)",
      [clientId, cakeId, quantity, totalPrice, createdAt]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getOrders(req, res) {
  try {
    const orders = await connection.query("SELECT * FROM orders");

    if (!orders.rowCount) {
      return res.sendStatus(204);
    }

    res.status(200).send(orders.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}
