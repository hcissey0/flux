import Joi from "joi";
import { ValidationError } from "../../utils/errors";

const userCreateSchema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    username: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
});

export const validateCreateUser = (req, res, next) => {
    const { error } = userCreateSchema.validate(req.body);

    if (error) {
        const message = error.message;
        throw new ValidationError(message);
    }
    next();
}

const userUpdateSchema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    username: Joi.string().alphanum().message('hello').optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(4).optional(),
});
