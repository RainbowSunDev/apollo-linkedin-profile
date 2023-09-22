import { makeLogger } from '#src/utils/log.js'
import { makeId } from '#src/utils/ids.js'

class Process {
  constructor(name) {
    this._name = name
    this._logger = makeLogger({
      processorName: name,
      processorId: makeId('p', 4),
    })
  }

  get log() {
    return this._logger
  }

  match(message) {
    // can be overridden in child class for more control
    return message.headers?.type === this._name
  }

  async run(message) {
    // should be overridden in child class
    this.log.info(message)
    // anything returned by this function will be published back onto the queue
    return null
  }
}

export default Process
