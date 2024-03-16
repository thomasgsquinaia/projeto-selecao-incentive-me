const Joi = require("joi");
const input_schema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().optional(),
}).required();


module.exports = {
    async verifyInput(input) {
        try {
          await input_schema.validateAsync(input);
        } catch (err) {
          throw { message: err.message, status: 400 };
        }
    },
    async update(input, paymentsrepository) {
        try {
            const { id, name } = input;
            const findById = await paymentsrepository.getById(id)
            if(!findById.rowCount) {
              throw({
                message:`Payment ${id} not found!`,
                status:404
              })
            }
            const [updatePayments] = await paymentsrepository.update("payments",{name},id)
            
            return updatePayments
        } catch (err) {
          console.log(err);
          throw(err);
        }
    }
}