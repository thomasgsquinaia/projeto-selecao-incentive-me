const Joi = require("joi");
const input_schema = Joi.object({
}).required();

module.exports = {
    async verifyInput(input) {
        try {
          await input_schema.validateAsync(input);
        } catch (err) {
          throw { message: err.message, status: 400 };
        }
    },
    async get(paymentsrepository) {
        try {
            const getPayments = await paymentsrepository.get()
            const countRows  = await paymentsrepository.countPayments()

            return { 
              payments: getPayments.rows,
              rows: parseInt(countRows.rows[0].total)
            }
        } catch (err) {
          console.log(err);
          throw(err);
        }
    }
}