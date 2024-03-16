const Joi = require("joi");
const input_schema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().optional()
}).required();

module.exports = {
    async verifyInput(input) {
        try {
          await input_schema.validateAsync(input);
        } catch (err) {
          throw { message: err.message, status: 400 };
        }
    },
    async update(input, balancerepository) {
        try {
            const { id, name } = input;
            const findById = await balancerepository.getById(id)
            if(!findById.rowCount) {
              throw({
                message:`Balance ${id} not found!`,
                status:404
              })
            }
            const [updateBalance] = await balancerepository.update("balance",{name},id)
           
            return updateBalance;
        } catch (err) {
          console.log(err);
          throw(err);
        }
    }
}