module.exports = {
  production: {
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    seederStorage: 'sequelize',
    logging: console.log,
  },
  development: {
    username: 'admin',
    dialect: 'postgres',
    password: 'admin_pass',
    database: 'db_medoxa',
    host: 'localhost',
    logging: console.log,
    seederStorage: 'sequelize',
  },
  dev_stage: {
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    seederStorage: 'sequelize',
    logging: console.log,
  },
};
