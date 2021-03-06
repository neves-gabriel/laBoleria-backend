import dayjs from "dayjs";
import { connection } from "../database.js";

export async function postClient(req, res) {
  const { name, address, phone } = req.body;

  try {
    await connection.query(
      "INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3)",
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

export async function getOrdersByClientId(req, res) {
  const { id } = req.params;

  const validateClientId = await connection.query(
    "SELECT * FROM clients WHERE id = $1",
    [id]
  );
  if (validateClientId.rowCount <= 0) {
    return res.sendStatus(404);
  }

  let query = `
    SELECT 
      orders.id AS "orderId",
      cakes.name AS "cakeName",
      flavors.name AS "cakeFlavor",
      "createdAt", 
      quantity, 
      "totalPrice",
      "isDelivered"
    FROM orders
      JOIN cakes ON orders."cakeId" = cakes.id
      JOIN flavors ON cakes."flavorId" = flavors.id
  `;

  if (id) {
    query += 'WHERE orders."clientId" = $1';
  }

  try {
    const orders = await connection.query(`${query};`, [id]);

    res.status(200).send(
      orders.rows.map(
        ({
          orderId,
          cakeName,
          createdAt,
          quantity,
          totalPrice,
          cakeFlavor,
          isDelivered,
        }) => ({
          orderId: orderId,
          createdAt: dayjs(createdAt).format("YYYY-MM-DD HH:mm"),
          quantity: quantity,
          totalPrice: totalPrice,
          cakeName: cakeName,
          cakeFlavor: cakeFlavor,
          isDelivered: isDelivered,
        })
      )
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
