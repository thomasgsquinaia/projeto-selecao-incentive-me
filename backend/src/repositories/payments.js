const { DBcallbackHandler } = require('../utils/sql');
const { PostgreSQLRepository } = require('./postgreSQL');
class PaymentsDatabaseRepository extends PostgreSQLRepository{
    constructor(database){
        super(database)
    }
    async get(){
        const query=`
            SELECT 
                id,
                name, 
                description, 
                value
            FROM 
                payments p
            WHERE 
                p.active is true
        `;
        return new Promise((resolve, reject) => {
            this.db.query(
                query,
                (error, result) => {DBcallbackHandler(error,result,reject,resolve)}
            );
        });
    }
    async countPayments(){
        const query=`
            SELECT 
                COUNT(*) as total 
            FROM 
                payments p
            WHERE 
                p.active is true;
        `;
        return new Promise((resolve, reject) => {
            this.db.query(
                query,
                [],
                (error, result) => {DBcallbackHandler(error,result,reject,resolve)}
            );
        });
    }
    async getById(id){
        const query=`
            SELECT 
                id,
                name, 
                description, 
                value, 
                balance_id
            FROM 
                payments p
            WHERE 
                p.id = $1 AND
                p.active is true;
        `;
        return new Promise((resolve, reject) => {
            this.db.query(
                query,
                [id],
                (error, result) => {DBcallbackHandler(error,result,reject,resolve)}
            );
        });
    }
    async delete(id){
        const query=`UPDATE payments SET active = false WHERE id = $1;`;
        return new Promise((resolve, reject) => {
            this.db.query(
                query,
                [id],
                (error, result) => {DBcallbackHandler(error,result,reject,resolve)}
            );
        });
    }
  
}
module.exports={ PaymentsDatabaseRepository }