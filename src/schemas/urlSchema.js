import Joi from "joi";

const urlSchema = Joi.object({
  image: Joi.string().uri().required(),
});

export default urlSchema;
