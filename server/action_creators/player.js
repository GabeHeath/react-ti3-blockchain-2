import * as actionTypes from '../action_types/player'
import {Map} from 'immutable';

export function clearPlayers() {
    return {
        type: actionTypes.CLEAR_PLAYERS
    }
}

export function setPlayers(players, totalPlayers) {
    return {
        type: actionTypes.SET_PLAYERS,
        payload: Map({
            players: players,
            totalPlayers: totalPlayers
        })
    };
}