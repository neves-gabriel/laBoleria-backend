import Joi from "joi";

const cakeSchema = Joi.object({
  name: Joi.string().min(2).required(),
  price: Joi.number().positive().greater(0).required(),
  description: Joi.string(),
  image: Joi.string(),
  flavorId: Joi.number().required(),
});

export default cakeSchema;
