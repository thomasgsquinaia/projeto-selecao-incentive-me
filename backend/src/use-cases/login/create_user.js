const { generatePassword, generateToken } = require("../../services/oauth");
const Joi = require("joi");
const input_schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
}).required();
module.exports = {
    async verifyInput(input) {
        try {
          await input_schema.validateAsync(input);
        } catch (err) {
          throw { message: err.message, status: 400 };
        }
    },
    async createUser(input, usersrepository) {
        try {
            const { name, email, password } = input;
            const userExists = await usersrepository.findUserBy(email);
            if(userExists.rows.length > 0){
                const active = userExists.rows[0].active;
                if (active) {
                    throw({
                        message:"User Exists",
                        status:404
                    })
                }
            }
            const hashpassword=await generatePassword(password);
            if(!userExists.rows.length > 0){
                const wasUserCreated = await usersrepository.insert("users",{
                    name,
                    email,
                    password:hashpassword,
                    created : new Date(),
                    updated : new Date()
                });
                if(!wasUserCreated){
                    throw({
                        message:"Couldn't create user!",
                        status:404
                    })
                }
                const { insertId:id } = wasUserCreated
                input.id=id
            } else {
                const { id }=userExists
                await usersrepository.update("users", {
                    active:true,
                    updated:getDateToday(),
                    id:id
                  },{id}
                );
                input.id=id;
            }          
            const token = generateToken(
                {
                    "id": input.id,
                    "name": name,
                    "email": email               
                }
            );
            const result = {
                "id": input.id,
                "email": email,
                "name":name,
                "token":token
            }
           
            return result;
        } catch (err) {
          console.log(err);
          throw(err);
        }
    }
}