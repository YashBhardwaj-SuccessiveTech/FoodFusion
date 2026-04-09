import Joi from "joi";

export const userSchema = Joi.object({

  FirstName: Joi.string().alphanum().min(3).max(30).required(),
  LastName: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email().required(),

  password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required(),

});
 
