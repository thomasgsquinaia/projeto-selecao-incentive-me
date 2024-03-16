const Joi = require("joi");
const input_schema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  value_init: Joi.number().optional()
}).required();


module.exports = {
    async verifyInput(input) {
        try {
          await input_schema.validateAsync(input);
        } catch (err) {
          throw { message: err.message, status: 400 };
        }
    },
    async create(input, balancerepository) {
        try {
            const { name, description, value_init } = input;
            const [createBalance] = await balancerepository.insert("balance",{name,description,value_init})
            return createBalance;
        } catch (err) {
          console.log(err);
          throw(err);
        }
    }
}