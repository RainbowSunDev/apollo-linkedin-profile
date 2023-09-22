import { config } from "dotenv";
config({ path: "../.env" })
    

import { readFile } from 'node:fs/promises'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

import ExampleProcess from './processes/ExampleProcess.js'

import conf from './utils/config.cjs'
import log from './utils/log.js'
import { makeId } from './utils/ids.js'

const apolloKey = process.env.APOLLO_KEY;
const APP_ID = `${conf.app} ${conf.version} ${conf.env}`

async function run({ input, type }) {
  log.info(`${APP_ID} running...`)
  const body = JSON.parse(await readFile(input))

  const message = {
    headers: {
      type,
      requestId: makeId('req', 24),
    },
    body,
    apolloKey
  }

  // NOTE: You will want to ensure the message type used will correctly
  // match the process you are trying to run.
  const proc = new ExampleProcess()
  if (!proc.match(message)) {
    log.error(`${proc.name} process failed to match message`)
    return
  }

  try {
    const out = await proc.run(message)
    log.info(out)
  } catch (error) {
    log.error(error)
  }
}

// Command line args
const argv = yargs(hideBin(process.argv))
  .options({
    input: {
      alias: 'i',
      describe: 'Input json file',
      demandOption: true,
    },
    type: {
      alias: 't',
      describe: 'Message type',
      demandOption: true,
    },
  })
  .help().argv
await run(argv)
