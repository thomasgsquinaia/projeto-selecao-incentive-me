const Joi = require("joi");
const input_schema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  value: Joi.number().optional(),
  balance_id: Joi.number().optional(),
}).required();


module.exports = {
    async verifyInput(input) {
        try {
          await input_schema.validateAsync(input);
        } catch (err) {
          throw { message: err.message, status: 400 };
        }
    },
    async create(input, paymentsrepository, balancerepository) {
        try {
            const { name, description, value, balance_id} = input;
            
            if(balance_id==true){
              const saleRestBalance = await balancerepository.getBalanceId(balance_id);
              if(value < saleRestBalance.rows[0].value_rest) {
                throw({
                  message:`Amount less than payment!`,
                  status:404
                })
              }
            }
            const [createPayments] = await paymentsrepository.insert("payments",{name,description,value,balance_id})
            return createPayments;
        } catch (err) {
          console.log(err);
          throw(err);
        }
    }
}