require('dotenv').config()

module.exports = {
  
    development: {
      dialect: "sqlite",
      storage: "fsjstd-restapi.db",
      logging:false
    },
    test: {
      dialect: "sqlite",
      storage: "fsjstd-restapi.db",
      logging:false
  
    },
    production: {
      dialect: "postgres",
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: "fsjstd-restapi",
      logging:false,
    }
  
}