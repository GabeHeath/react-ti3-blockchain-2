import {Map} from 'immutable';
import * as actionTypes from '../action_types/root';

export function clearBlocks() {
    return {
        meta: {remote: true},
        type: actionTypes.CLEAR_BLOCKS
    }
}

export function clearPlayers() {
    return {
        meta: {remote: true},
        type: actionTypes.CLEAR_PLAYERS
    }
}

export function resetRandomizer() {
    return {
        meta: {remote: true},
        type: actionTypes.RESET_RANDOMIZER
    };
}

export function setPlayers(players, totalPlayers) {
    return {
        meta: {remote: true},
        type: actionTypes.SET_PLAYERS,
        payload: Map({
            players: players,
            totalPlayers: totalPlayers
        })
    };
}

export function setRaces(races, totalRaces) {
    return {
        meta: {remote: true},
        type: actionTypes.SET_RACES,
        payload: Map({
            races: races,
            total: totalRaces
        })
    };
}

export function setState(state) {
    return {
        type: actionTypes.SET_STATE,
        state
    };
}

export function startRandomizer() {
    return {
        meta: {remote: true},
        type: actionTypes.START_RANDOMIZER
    };
}