import joi from "joi";

const cakeSchema = joi.object({
  name: joi.string().min(2).required(),
  price: joi.number().positive().greater(0).required(),
  description: joi.string(),
});

export default cakeSchema;
