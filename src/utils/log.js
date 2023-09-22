import config from './config.cjs'
import pino, { stdTimeFunctions } from 'pino'
import { boolean } from 'boolean'

const PRETTY_LOGS = boolean(process.env.LOG_PRETTY)

const loggerOptions = {
  name: config.app,
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level(label) {
      return { level: label }
    },
  },
  base: null,
  timestamp: stdTimeFunctions.isoTime,
  messageKey: 'message',
}

if (PRETTY_LOGS) {
  loggerOptions.transport = {
    target: 'pino-pretty',
    options: {
      messageKey: 'message',
    },
  }
}

const logger = pino(loggerOptions)

function makeLogger(childOptions) {
  return logger.child(childOptions)
}

export { makeLogger }

export default logger
