const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseSchemaError } = require("../helpers");

const testSchema = new Schema({
  type: {
    type: String,
    enum: ['tech', 'theory'],
    required: [true, "Type is required"],
  },
  question: {
    type: String,
    required: [true, "Question is required"],
    unique: true,
  },
  answers: {
    type: [String],
    required: [true, "Answers is required"],
  },
  rightAnswer: {
    type: String,
  },
});

testSchema.post("save", handleMongooseSchemaError);

const Test = model("test", testSchema);

const resultsSchema = Joi.object({
  value: Joi.array().items(
    Joi.object({
      _id: Joi.string().required().min(24).max(24),
      answer: Joi.string().empty(''),
    })
  ),
});

const schemas = {
  resultsSchema,
};

module.exports = {
  Test,
  schemas,
};
