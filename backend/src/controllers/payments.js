const { connect }=require('../utils/sql')
const { PaymentsDatabaseRepository } = require('../repositories/payments');
const { BalanceDatabaseRepository } = require('../repositories/balance');
const useCaseCreatePayments = require('../use-cases/payments/create');
const useCaseGetPayments = require('../use-cases/payments/get');
const useCaseUpdatePayments = require('../use-cases/payments/update');
const useCaseDeletePayments = require('../use-cases/payments/delete');
const useCaseGetByIdPayments = require('../use-cases/payments/get_by_id');

module.exports = { 
    async create(req, res) {
      try {
        const database = await connect()
        const paymentsrepository = new PaymentsDatabaseRepository(database)
        const balancerepository = new BalanceDatabaseRepository(database)
        const input = {
            name: req?.body.name,
            description: req?.body.description,
            value: req?.body.value,
            balance_id: req?.body.balance_id
        };
        useCaseCreatePayments.verifyInput(input)
        const result = await useCaseCreatePayments.create(input, paymentsrepository, balancerepository)
        return res.status(200).json(result)
      } 
      catch (err) {
        console.log('erro aqui => ',err);
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
      }
    },
    async get(req, res) {
      try {
        const database = await connect()
        const paymentsrepository = new PaymentsDatabaseRepository(database)
        const result = await useCaseGetPayments.get(paymentsrepository)
        return res.status(200).json(result)
      } 
      catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
      }
    },
    async getById(req, res) {
      try {
        const database = await connect()
        const paymentsrepository = new PaymentsDatabaseRepository(database)
        const input = req.params;
        useCaseGetByIdPayments.verifyInput(input)
        const result = await useCaseGetByIdPayments.getById(input,paymentsrepository)
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
        const paymentsrepository = new PaymentsDatabaseRepository(database)
        const input = {
          id: req?.body.id,
          name: req?.body.name
        };
        useCaseUpdatePayments.verifyInput(input)
        const result = await useCaseUpdatePayments.update(input, paymentsrepository)
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
        const paymentsrepository = new PaymentsDatabaseRepository(database)
        const input = req.params;
        useCaseDeletePayments.verifyInput(input)
        const result = await useCaseDeletePayments.delete(input, paymentsrepository)
        return res.status(200).json(result)
      } 
      catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
      }
    },

}