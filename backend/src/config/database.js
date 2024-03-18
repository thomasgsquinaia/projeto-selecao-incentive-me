const dbconfig={
    user: process.env.USER_DB,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 5432,
    dialect: "postgres"
}

if (process.env.PROD == 3001) {
    dbconfig.ssl = false;
} else {
    dbconfig.ssl = true;
}

module.exports = dbconfig