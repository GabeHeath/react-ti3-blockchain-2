import { Map, OrderedSet } from 'immutable';
import * as actionTypes from '../action_types/player';
import {clearPlayers, setPlayers} from '../actions/player';

export const initialState = Map({
    total: 0,
    hashCode: null,
    players: OrderedSet(),
    remainingPlayers: OrderedSet()
});

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CLEAR_PLAYERS:
            return clearPlayers(state);
        case actionTypes.SET_PLAYERS:
            return setPlayers(state, action.payload);
        default:
            return state;
    }
}