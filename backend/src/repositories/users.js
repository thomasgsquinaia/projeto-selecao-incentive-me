const { DBcallbackHandler } = require('../utils/sql');
const { PostgreSQLRepository } = require('./postgreSQL');
class UsersDatabaseRepository extends PostgreSQLRepository{
    constructor(database){
        super(database)
    }
    async getUsers(){
        const query=`
            SELECT 
                id,
                name, 
                email,
                password
            FROM 
                users u
            WHERE 
                u.active is true;
        `;
        return new Promise((resolve, reject) => {
            this.db.query(
                query,
                [],
                (error, result) => {DBcallbackHandler(error,result,reject,resolve)}
            );
        });
    }
    async findUserBy(email){
        const query=`
            SELECT 
                id,
                name, 
                email,
                password,
                active
            FROM 
                users u
            WHERE 
                u.email = $1;
        `;
        return new Promise((resolve, reject) => {
            this.db.query(
                query,
                [email],
                (error, result) => {DBcallbackHandler(error,result,reject,resolve)}
            );
        });
    }
  
}
module.exports={ UsersDatabaseRepository }