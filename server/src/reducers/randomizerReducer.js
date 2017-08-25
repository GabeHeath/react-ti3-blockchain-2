import { Map } from 'immutable';
import * as actionTypes from '../action_types/randomizer';
import {resetRandomizer, startRandomizer} from "../actions/randomizer";

export const initialState = Map({
    started: false
});

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.RESET_RANDOMIZER:
            return resetRandomizer(state);
        case actionTypes.START_RANDOMIZER:
            return startRandomizer(state);
        default:
            return state;
    }
}