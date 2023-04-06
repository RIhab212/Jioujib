const { createLogger, transports, format } = require('winston')
require('winston-mongodb')

const logger = createLogger({
    transports:[new transports.MongoDB({
        level: 'info',
        db: "mongodb+srv://Sofbt:dofy4mzVHYhdgE43@cluster0.d7u6cqi.mongodb.net/?retryWrites=true&w=majority",
        collection: "UserPhoneInfo"
    })]
})

module.exports = logger;