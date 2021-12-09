const winston = require("winston")
let date = new Date().toISOString();

const logFormat = winston.format.printf((info) => {
    return `[${date}-${info.level}]: ${info.message}`
})

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), logFormat),
            timestamps: true
        }),
        new winston.transports.File({filename: 'combined.log'})
    ]
})

module.exports = {logger}