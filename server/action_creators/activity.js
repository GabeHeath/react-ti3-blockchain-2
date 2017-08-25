import * as actionTypes from '../action_types/activity'

export function clearBlocks() {
    return {
        type: actionTypes.CLEAR_BLOCKS
    }
}

export function saveBlock(block) {
    return {
        type: actionTypes.SAVE_BLOCK,
        block
    }
}