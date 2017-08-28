import { List, Map } from 'immutable';
import * as actionTypes from '../action_types/player';
import {addPlayer, addRace, clearPlayers, setPlayers} from '../actions/player';

export const initialState = Map({
    total: 0,
    hashCode: null,
    players: List(),
    remainingPlayers: List()
});

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_PLAYER:
            return addPlayer(state, action.player, action.hash);
        case actionTypes.ADD_RACE:
            return addRace(state, action.race, action.playerIndex, action.hash);
        case actionTypes.CLEAR_PLAYERS:
            return clearPlayers(state);
        case actionTypes.SET_PLAYERS:
            return setPlayers(state, action.payload);
        default:
            return state;
    }
}