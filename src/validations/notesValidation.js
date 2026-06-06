import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";
import { TAGS } from "../constants/tags.js";

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    search: Joi.string().max(30).allow(""),
    tag: Joi.string().valid(...TAGS),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message("invalid id format") : value;
};
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      "string.base": "Title must be a String",
      "string.min": "Title shoult have at least {#limit} characters",
      "string.max": "Title shoult have at most {#limit} characters",
      "any.required": "Title is required",
    }),
    content: Joi.string().allow("").messages({
      "string.base": "Content must be a String",
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        "string.base": "Tag must be a String",
        "any.only": `Tag must be one of ${TAGS}`,
      }),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow("").messages({
      "string.base": "Content must be a String",
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        "string.base": "Tag must be a String",
        "any.only": `Tag must be one of ${TAGS}`,
      }),
  }).min(1),
};
