import Joi from "joi";

const flavorSchema = Joi.object({
  name: Joi.string().min(2).required(),
});

export default flavorSchema;
