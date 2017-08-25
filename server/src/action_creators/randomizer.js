import * as actionTypes from '../action_types/randomizer'

export function resetRandomizer() {
    return {
        type: actionTypes.RESET_RANDOMIZER
    };
}

export function startRandomizer() {
    return {
        type: actionTypes.START_RANDOMIZER
    };
}