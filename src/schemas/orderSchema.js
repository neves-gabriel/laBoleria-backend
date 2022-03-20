import Joi from "joi";

const orderSchema = Joi.object({
  clientId: Joi.string().required(),
  cakeId: Joi.string().required(),
  quantity: Joi.number().greater(0).lesser(5).required(),
});

export default orderSchema;
