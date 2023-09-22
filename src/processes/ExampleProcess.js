import { makeId } from '#src/utils/ids.js'
import { success, failure } from '#src/utils/response.js'
import Process from './Process.js'
import { getProfileData } from '#src/services/ApolloService.js'

class ExampleProcess extends Process {
  constructor() {
    super('ExampleProcess')
  }

  async run(message) {
    // this.log.info(message)
    const response = await getProfileData(message)
    console.log("response", response)
    if (response.success) {
      // return success({ example_id: makeId('ex'), example_output: 'Output object from ExampleProcess' })
    }
    return failure('ExampleProcess failed')
  }
}

export default ExampleProcess
