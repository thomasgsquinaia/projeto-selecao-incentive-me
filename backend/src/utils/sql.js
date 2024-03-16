const { Client, Pool } = require('pg');
const conn = require('../config/database');
const pool = new Pool(conn);

async function connect() {
    try {
        const client = await pool.connect();
        client.release()
        return client;
    } catch (err) {
        console.error('Error connecting to database:', err);
        throw err;
    }
}

async function DBcallbackHandler(error,result,reject,resolve){
  try {
    if (error) {
        reject(error);
    } else {
        resolve(result);
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { connect, DBcallbackHandler };
