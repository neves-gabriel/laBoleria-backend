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

    const totalPrice = Number.parseInt(quantity * validateCakeId.rows[0].price);

    const createdAt = dayjs().format("YYYY-MM-DD HH:mm");

    await connection.query(
      'INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice", "createdAt") VALUES ($1, $2, $3, $4, $5)',
      [clientId, cakeId, quantity, totalPrice, createdAt]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getOrders(req, res) {
  const { date } = req.query;
  const params = [];

  let query = `
    SELECT clients.id AS "clientId", 
    clients.name AS "clientName", 
    address, 
    phone, 
    cakes.id AS "cakeId", 
    cakes.name AS "cakeName", 
    price, 
    description, 
    image, 
    "createdAt", 
    quantity, 
    "totalPrice" 
  FROM orders 
    JOIN clients ON orders."clientId" = clients.id 
    JOIN cakes ON orders."cakeId" = cakes.id
  `;

  if (date) {
    query += 'WHERE "createdAt" ILIKE $1';
    params.push(`%${date}%`);
  }

  try {
    const orders = await connection.query(`${query};`, params);

    if (!orders.rowCount) {
      return res.sendStatus(404);
    }

    res.status(200).send(
      orders.rows.map(
        ({
          clientId,
          clientName,
          address,
          phone,
          cakeId,
          cakeName,
          price,
          description,
          image,
          createdAt,
          quantity,
          totalPrice,
        }) => ({
          client: {
            id: clientId,
            name: clientName,
            address: address,
            phone: phone,
          },
          cake: {
            id: cakeId,
            name: cakeName,
            price: price,
            description: description,
            image: image,
          },
          createdAt: createdAt,
          quantity: quantity,
          totalPrice: totalPrice,
        })
      )
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
