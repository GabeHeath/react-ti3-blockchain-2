import { Map, OrderedSet } from 'immutable';
import * as actionTypes from '../action_types/race';
import {setRaces} from "../actions/race";

export const initialState = Map({
    total: 0,
    hashCode: null,
    races: OrderedSet(),
    remainingRaces: OrderedSet()
});

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_RACES:
            return setRaces(state, action.payload);
        default:
            return state;
    }
}