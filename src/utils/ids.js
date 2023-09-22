import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10)

function makeId(prefix = '', size) {
  if (prefix) {
    return `${prefix}_${nanoid(size)}`
  }
  return nanoid(size)
}

export { makeId }
