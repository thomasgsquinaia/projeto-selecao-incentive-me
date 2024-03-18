const { default: axios } = require('axios')
const { generateToken }=require('../../services/oauth')

const Joi = require("joi");
const input_schema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  id_token: Joi.string().required()
}).required();

module.exports = {
    async verifyInput(input) {
        try {
          await input_schema.validateAsync(input);
        } catch (err) {
          throw { message: err.message, status: 400 };
        }
    },
    async loginGoogle(input, usersrepository, google_url) {
        try {
            const { id_token }=input
            const { data }=await axios.get(`${google_url}${id_token}`)
            if(!data){
                throw({
                    message:"Couldn't retrieve info from google token!",
                    status:400
                })
            }
            const {email:tokenEmail,name:tokenName,picture,given_name,family_name} = data
            const user = await usersrepository.findUserBy(tokenEmail,false);
            if(!user){
                const NewUser={email:tokenEmail,name:tokenName,picture,given_name,family_name}
                return NewUser
            }
            const {
                email,
                active,
                id,
                created,
                updated,
            } = user
            const isANewUser = created==updated
            if(isANewUser&&!active){
                throw({message:"User is not activate",status:401, token})            
            }
            if(!isANewUser&&!active){
                await repository.update("users",{active:true,id})
            }

            const token = generateToken({
                "email": email,
                "id": id,
            });
            const result = {
                "name": name,
                "id": id,
                "email": email,
                "image":image,
                "token": token,
            }
          
            if(!active){
                result.isNewUser=isANewUser
            }

            return result;
        } catch (err) {
          console.log(err);
          throw(err);
        }
    }
}