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
    async delete(input, paymentsrepository) {
        try {
            const { id } = input
            const findById = await paymentsrepository.getById(id)
            if(!findById.rowCount) {
              throw({
                message:`Payment ${id} not found!`,
                status:404
              })
            }
            if(!findById.rows[0].balance_id) {
              throw({
                message:`Payment don't delete!`,
                status:404
              })
            }
            await paymentsrepository.delete(id)
            
            return {active: false}
        } catch (err) {
          console.log(err);
          throw(err);
        }
    }
}