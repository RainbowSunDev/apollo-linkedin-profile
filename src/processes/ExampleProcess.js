import { makeId } from '#src/utils/ids.js'
import { success, failure } from '#src/utils/response.js'
import Process from './Process.js'
import { getProfileData } from '#src/services/ApolloService.js'

class ExampleProcess extends Process {
  constructor() {
    super('ExampleProcess')
  }

  async run(message) {
    const response = await getProfileData(message)
    if (response.success) {
      return success({ example_id: makeId('ex'), example_output: 'Output object from ExampleProcess', profile: response.data })
    }
    return failure('ExampleProcess failed')
  }
}

export default ExampleProcess
