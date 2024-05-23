import { body, param, validationResult } from "express-validator";
import { ValidationError } from "../utils/errors";


export const idValidator = (name) => {
    return param(name)
        .isUUID();
}

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // throw new ValidationError()
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
