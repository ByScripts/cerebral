import {input, set, state, when} from 'cerebral/operators'
import {set as setRemote} from 'cerebral-provider-firebase'
import makeRef from '../../operators/makeRef'
import {setPaths, paths} from '../paths'

export default function (moduleName) {
  const {draftPath, errorPath, filterPath} = paths(moduleName)
  return [
    // Create new
    when(input`key`), {
      true: [],
      false: [
        set(input`key`, makeRef)
      ]
    },
    // Prepare initial item state
    when(input`value`), {
      true: [],
      false: [
        set(input`value`, {}),
        set(input`value.name`, state`${filterPath}`)
      ]
    },
    set(input`value.key`, input`key`),

    // Set paths with new key
    ...setPaths(moduleName),
    // Save
    setRemote(input`remoteItemPath`, input`value`), {
      success: [
        set(state`${draftPath}`, input`value`),
        // To trigger form update
        set(state`${draftPath}.key`, input`key`)
      ],
      error: [
        set(state`${errorPath}`)
      ]
    }
  ]
}
