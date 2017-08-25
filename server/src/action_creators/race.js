import * as actionTypes from '../action_types/race'
import {Map} from 'immutable';

export function setRaces(races, totalRaces) {
    return {
        type: actionTypes.SET_RACES,
        payload: Map({
            races: races,
            total: totalRaces
        })
    };
}