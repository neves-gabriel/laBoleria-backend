import joi from "joi";

const urlSchema = joi.object({
  image: joi.string().uri().required(),
});

export default urlSchema;
