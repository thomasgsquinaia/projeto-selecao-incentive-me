const { decryptPassword, generateToken } = require('../../services/oauth');

const Joi = require("joi");
const input_schema = Joi.object({
  email: Joi.string().optional(),
  password: Joi.string().optional()
}).required();

module.exports = {
    async verifyInput(input) {
        try {
          await input_schema.validateAsync(input);
        } catch (err) {
          throw { message: err.message, status: 400 };
        }
    },
    async loginUser(input, userRepository) {
        try {
            const { email, password } = input;
            const user = await userRepository.findUserBy(email);
            if (!user || !user.rows[0]) {
                throw { message: "User doesn't exist", status: 400 };
            }
            const { password: hashedPassword, id } = user.rows[0];
            const checkPassword = await decryptPassword(password, hashedPassword);
            if (!checkPassword) {
                throw { message: "Invalid password", status: 401 };
            }
            const token = generateToken({
                email: user.rows[0].email,
                id: user.rows[0].id
            });
            const result = {
                id: id,
                email: email,
                token: token
            };
            return result;
        } catch (err) {
            console.log(err);
            throw(err);
        }
    }
};
