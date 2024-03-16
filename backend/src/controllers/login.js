const { UsersDatabaseRepository } = require('../repositories/users');
const { connect }=require('../utils/sql')
const useCaseAddFirstUser = require('../use-cases/login/create_user');
const useCaseLoginGoogle = require('../use-cases/login/login_google');
const useCaseLoginUser = require('../use-cases/login/login_user');

module.exports = { 
    async addFirstUser(req, res) {
      try {
        const database = await connect()
        const usersrepository = new UsersDatabaseRepository(database)
        const input = {
          name: req?.body.name,
          email: req?.body.email,
          password: req?.body.password,
        }
        useCaseAddFirstUser.verifyInput(input)
        const result = await useCaseAddFirstUser.createUser(input,usersrepository)
        return res.status(200).json(result)
      } 
      catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
      }
    },
    async loginGoogle(req, res) {
      try {
        const database = await connect()
        const usersrepository = new UsersDatabaseRepository(database)
        const input = req.body
        const google_url='https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='
        useCaseLoginGoogle.verifyInput(input)
        const result = await useCaseLoginGoogle.loginGoogle(input,usersrepository,google_url)
        return res.status(200).json(result)
      } 
      catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
      }
    },
    async loginUser(req, res) {
      try {
        const database = await connect()
        const usersrepository = new UsersDatabaseRepository(database)
        const input = { email: req?.body.email, password: req?.body.password}
        useCaseLoginUser.verifyInput(input)
        const result = await useCaseLoginUser.loginUser(input,usersrepository)
        return res.status(200).json(result)
      } 
      catch (err) {
        let statusCode = err.status || 500
        console.log(err);
        return res.status(statusCode).json(err)
      }
    }   
}