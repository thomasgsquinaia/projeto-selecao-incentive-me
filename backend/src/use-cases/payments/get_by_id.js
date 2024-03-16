const Joi = require("joi");
const input_schema = Joi.object({
  id: Joi.number().optional()
}).required();

module.exports = {
    async verifyInput(input) {
        try {
          await input_schema.validateAsync(input);
        } catch (err) {
          throw { message: err.message, status: 400 };
        }
    },
    async getById(input, paymentsrepository) {
        try {
            const { id } = input
            const getByIdPayments = await paymentsrepository.getById(id)
            const countRows  = await paymentsrepository.countPayments()

            return { 
              payments: getByIdPayments.rows,
              rows: parseInt(countRows.rows[0].total)
            }
        } catch (err) {
          console.log(err);
          throw(err);
        }
    }
}