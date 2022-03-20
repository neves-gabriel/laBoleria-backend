import Joi from "joi";

const clientSchema = Joi.object({
  name: Joi.string().required(),
  adress: Joi.string().required(),
  phone: Joi.string().min(10).max(11).required(),
});

export default clientSchema;
