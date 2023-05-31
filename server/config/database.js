module.exports = {
  development: {
    storage: process.env.DB_FILE || 'db/dev.db',
    dialect: "sqlite",
    seederStorage: "sequelize",
    benchmark: true,
    logQueryParameters: true,
    typeValidation: true,
    // logging: false
  },
  test: {
    storage: process.env.DB_TEST_FILE || 'test/test.db',
    dialect: "sqlite",
    seederStorage: "sequelize",
    logging: false
  }
};
