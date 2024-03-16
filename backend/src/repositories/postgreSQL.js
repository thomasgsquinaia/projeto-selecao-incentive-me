const { Pool } = require('pg');
const dbconfig = require('../config/database');
const pool = new Pool(dbconfig)
class PostgreSQLRepository{
    constructor(database){
        this.db=database
    }
    async insert(tablename,dataToInsert){
        try {
            const keys = Object.keys(dataToInsert);
            const values = Object.values(dataToInsert);

            const parameters = keys.map((key, index) => `$${index + 1}`).join(', ');
            const query = `INSERT INTO ${tablename} (${keys.join(', ')}) VALUES (${parameters}) RETURNING *`;

            const result = await pool.query(query, values);
            return result.rows;
          } catch (error) {
            console.error('Error inserting data:', error);
            throw error;
          }
    }
    async update(tablename,dataToUpdate,where){
        try {
            const keys = Object.keys(dataToUpdate);
            const values = Object.values(dataToUpdate);
            keys.push("updated")
            values.push(new Date())
            const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
            const query = `UPDATE ${tablename} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
        
            const result = await pool.query(query, [...values, where]);
            return result.rows;
          } catch (err) {
            console.error('Error updating data:', err);
            throw err;
          }
    }
}
module.exports={PostgreSQLRepository}