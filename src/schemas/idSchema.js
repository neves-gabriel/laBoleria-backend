import Joi from "joi";

const idSchema = Joi.object({
  id: Joi.number().required(),
});

export default idSchema;
