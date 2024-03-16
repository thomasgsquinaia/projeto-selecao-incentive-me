const { BalanceDatabaseRepository } = require('../repositories/balance');
const { connect }=require('../utils/sql')
const useCaseCreateBalance = require('../use-cases/balance/create');
const useCaseGetBalance = require('../use-cases/balance/get');
const useCaseUpdateBalance = require('../use-cases/balance/update');
const useCaseDeleteBalance = require('../use-cases/balance/delete');

module.exports = { 
    async create(req, res) {
      try {
        const database = await connect()
        const balancerepository = new BalanceDatabaseRepository(database)
        const input = {
            name: req?.body.name,
            description: req?.body.description,
            value_init: req?.body.value_init
        };
        useCaseCreateBalance.verifyInput(input)
        const result = await useCaseCreateBalance.create(input, balancerepository)
        return res.status(200).json(result)
      } 
      catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
      }
    },
    async get(req, res) {
      try {
        const database = await connect()
        const balancerepository = new BalanceDatabaseRepository(database)
        const result = await useCaseGetBalance.get(balancerepository)
        return res.status(200).json(result)
      } 
      catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
      }
    },
    async update(req, res) {
      try {
        const database = await connect()
        const balancerepository = new BalanceDatabaseRepository(database)
        const input = {
            id: req?.body.id,
            name: req?.body.name
        };
        useCaseUpdateBalance.verifyInput(input)
        const result = await useCaseUpdateBalance.update(input, balancerepository)
        return res.status(200).json(result)
      } 
      catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
      }
    },
    async delete(req, res) {
      try {
        const database = await connect()
        const balancerepository = new BalanceDatabaseRepository(database)
        const input = req.params;
        useCaseDeleteBalance.verifyInput(input)
        const result = await useCaseDeleteBalance.delete(input, balancerepository)
        return res.status(200).json(result)
      } 
      catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
      }
    },

}