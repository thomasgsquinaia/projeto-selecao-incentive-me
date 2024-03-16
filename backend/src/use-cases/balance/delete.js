const Joi = require("joi");
const input_schema = Joi.object({
  id: Joi.number().required()
}).required();

module.exports = {
    async verifyInput(input) {
        try {
          await input_schema.validateAsync(input);
        } catch (err) {
          throw { message: err.message, status: 400 };
        }
    },
    async delete(input, balancerepository) {
        try {
            const { id } = input
            const findById = await balancerepository.getById(id)
            if(!findById.rowCount) {
              throw({
                message:`Balance ${id} not found!`,
                status:404
              })
            }
            const deleteBalance = await balancerepository.delete(id)
            return deleteBalance.rows
        } catch (err) {
          console.log(err);
          throw(err);
        }
    }
}