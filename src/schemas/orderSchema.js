import Joi from "joi";

const orderSchema = Joi.object({
  clientId: Joi.number().required(),
  cakeId: Joi.number().required(),
  quantity: Joi.number().greater(0).less(5).required(),
});

export default orderSchema;
