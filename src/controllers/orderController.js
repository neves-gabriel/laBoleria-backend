import dayjs from "dayjs";
import idSchema from "../schemas/idSchema.js";
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
    SELECT 
      clients.id AS "clientId", 
      clients.name AS "clientName", 
      address, 
      phone, 
      cakes.id AS "cakeId", 
      cakes.name AS "cakeName",
      flavors.name AS "cakeFlavor",
      price, 
      description, 
      image, 
      "createdAt", 
      quantity, 
      "totalPrice",
      "isDelivered"
    FROM orders 
      JOIN clients ON orders."clientId" = clients.id 
      JOIN cakes ON orders."cakeId" = cakes.id
      JOIN flavors ON cakes."flavorId" = flavors.id
  `;

  if (date) {
    query += 'WHERE "createdAt"::date = $1';
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
          cakeFlavor,
          price,
          description,
          image,
          createdAt,
          quantity,
          totalPrice,
          isDelivered,
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
            cakeFlavor: cakeFlavor,
          },
          createdAt: createdAt,
          quantity: quantity,
          totalPrice: totalPrice,
          isDelivered: isDelivered,
        })
      )
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getOrderById(req, res) {
  const { id } = req.params;

  const validateOrderId = await connection.query(
    "SELECT * FROM orders WHERE id = $1",
    [id]
  );
  if (validateOrderId.rowCount <= 0) {
    return res.sendStatus(404);
  }

  const validation = idSchema.validate({ id });
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }

  let query = `
    SELECT 
      orders.id AS "orderId",
      clients.id AS "clientId", 
      clients.name AS "clientName", 
      address, 
      phone, 
      cakes.id AS "cakeId", 
      cakes.name AS "cakeName",
      flavors.name AS "cakeFlavor", 
      price, 
      description, 
      image, 
      "createdAt", 
      quantity, 
      "totalPrice",
      "isDelivered"
    FROM orders 
      JOIN clients ON orders."clientId" = clients.id 
      JOIN cakes ON orders."cakeId" = cakes.id
      JOIN flavors ON cakes."flavorId" = flavors.id
  `;

  if (id) {
    query += "WHERE orders.id = $1";
  }

  try {
    const orders = await connection.query(`${query};`, [id]);

    res.status(200).send(
      orders.rows.map(
        ({
          clientId,
          clientName,
          address,
          phone,
          cakeId,
          cakeName,
          cakeFlavor,
          price,
          description,
          image,
          createdAt,
          quantity,
          totalPrice,
          isDelivered,
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
            cakeFlavor: cakeFlavor,
          },
          createdAt: createdAt,
          quantity: quantity,
          totalPrice: totalPrice,
          isDelivered: isDelivered,
        })
      )
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function patchOrder(req, res) {
  const { id } = req.params;

  const validateOrderId = await connection.query(
    "SELECT * FROM orders WHERE id = $1",
    [id]
  );
  if (validateOrderId.rowCount <= 0) {
    return res.sendStatus(404);
  }

  const validation = idSchema.validate({ id });
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }

  let query = `
    UPDATE 
      orders
    SET
      "isDelivered" = true
  `;

  if (id) {
    query += "WHERE orders.id = $1";
  }

  try {
    await connection.query(`${query};`, [id]);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
