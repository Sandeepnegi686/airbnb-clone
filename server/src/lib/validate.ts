import joi from "joi";

function validateRegister(data: {
  email: string;
  name: string;
  password: string;
}) {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  return schema.validate(data);
}

function loginValidation(data: { email: string; password: string }) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  return schema.validate(data);
}

function validateListingCreation(data: any) {
  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    imageSrc: joi.string().required(),
    publicImageSrcId: joi.string(),
    category: joi.string().required(),
    guestCount: joi.number().required(),
    bathroomCount: joi.number().required(),
    roomCount: joi.number().required(),
    price: joi.number().required(),
    location: joi.string().required(),
  });
  return schema.validate(data);
}

export { validateRegister, loginValidation, validateListingCreation };
