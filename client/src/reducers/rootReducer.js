import { Map, OrderedSet } from 'immutable';
import {setState} from "../actions/root";
import * as actionTypes from '../action_types/root';

export const initialState = Map({
    activity: Map({
        blocks: OrderedSet()
    }),
    player: Map({
        total: 0,
        hashCode: null,
        players: OrderedSet()
    }),
    race: Map({
        total: 0,
        hashCode: null,
        races: OrderedSet()
    }),
    randomizer: Map({
        started: false
    })
});

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_STATE:
            return setState(state, action.state);
        default:
            return state;
    }
}