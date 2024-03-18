const dbconfig={
    user: process.env.USER_DB,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 5432,
    dialect: "postgres",
    ssl: {
        rejectUnauthorized: false
    }
    // ssl: true
}

module.exports = dbconfig