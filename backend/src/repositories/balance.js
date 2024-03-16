const { DBcallbackHandler } = require('../utils/sql');
const { PostgreSQLRepository } = require('./postgreSQL');
class BalanceDatabaseRepository extends PostgreSQLRepository{
    constructor(database){
        super(database)
    }
    async get(){
        const query=`
            SELECT 
                id,
                name, 
                description, 
                value_init,
                COALESCE(
                    (select 
                        sum(value)
                    from payments p 
                        where p.balance_id = b.id), 0) as total_payment,
                value_init - COALESCE(
                    (select 
                        sum(value)
                    from payments p 
                        where p.balance_id = b.id), 0) as value_rest
            FROM 
                balance b
            WHERE
                b.active is true
            GROUP BY 
                b.id, b.name, b.description, b.value_init;
        `;
        return new Promise((resolve, reject) => {
            this.db.query(
                query,
                [],
                (error, result) => {DBcallbackHandler(error,result,reject,resolve)}
            );
        });
    }
    async getBalanceId(balance_id){
        const query=`
            SELECT 
                id,
                name, 
                description, 
                value_init, 
                value_rest
            FROM 
                balance b
            WHERE
                b.active is true 
                AND b.id = $1
        `;
        return new Promise((resolve, reject) => {
            this.db.query(
                query,
                [balance_id],
                (error, result) => {DBcallbackHandler(error,result,reject,resolve)}
            );
        });
    }
    async countBalance(){
        const query=`
            SELECT 
                COUNT(*) as total 
            FROM 
                balance b
            WHERE
                b.active is true;
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
                id
            FROM 
                balance b
            WHERE 
                b.id = $1 AND
                b.active is true;            
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
        const query=`UPDATE balance SET active = false WHERE id = $1;`;
        return new Promise((resolve, reject) => {
            this.db.query(
                query,
                [id],
                (error, result) => {DBcallbackHandler(error,result,reject,resolve)}
            );
        });
    }
  
}
module.exports={ BalanceDatabaseRepository }