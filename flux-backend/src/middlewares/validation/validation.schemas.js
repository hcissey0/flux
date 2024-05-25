import Joi from 'joi';

// User validation schemas
export const userCreateSchema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    username: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
});

export const userUpdateSchema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    username: Joi.string().alphanum().message('hello').optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(2).optional(),
});


// Post validation schemas
export const postCreateSchema = Joi.object({
    text: Joi.string().required(),
});

export const postUpdateSchema = Joi.object({
    text: Joi.string().required(),
})

// Comment validation schemas
export const commentCreateSchema = Joi.object({
    text: Joi.string().required(),
    reply: Joi.boolean().default(false).optional(),
});

export const commentUpdateSchema = Joi.object({
    text: Joi.string().required(),
})

// Chat validation schemas
export const chatCreateSchema = Joi.object({
    name: Joi.string().min(2).required(),
    chatType: Joi.string()
        .custom((value, helpers) => ['single-chat','group-chat'].includes(value) ? value : helpers.error('any.invalid'))
        .required(),
});

export const chatUpdateSchema = Joi.object({
    name: Joi.string().min(2).required(),
});

// Message validation schemas
export const messageCreateSchema = Joi.object({
    text: Joi.string().required(),
});

export const messageUpdateSchema = Joi.object({
    text: Joi.string().required(),
});
