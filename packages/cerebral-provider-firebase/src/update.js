import {
  createRef
} from './helpers'

export default function update (path, payload) {
  const ref = createRef(path)
  return ref.update(Object.keys(payload).reduce((convertedPayload, key) => {
    convertedPayload[key.replace(/\./g, '/')] = payload[key]

    return convertedPayload
  }, {}))
    .then(() => ({}))
    .catch((error) => ({error: error.message}))
}
