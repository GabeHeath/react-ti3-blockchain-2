import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import activityReducer from './reducers/activityReducer';
import randomizerReducer from './reducers/randomizerReducer';
import playerReducer from './reducers/playerReducer';
import raceReducer from './reducers/raceReducer';

const reducer = combineReducers({
    activity:   activityReducer,
    randomizer: randomizerReducer,
    player:     playerReducer,
    race:       raceReducer
});

const store = createStore(
    reducer
);

export default function makeStore() {
    return store;
}