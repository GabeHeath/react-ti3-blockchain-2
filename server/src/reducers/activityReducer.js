import { Map, OrderedSet } from 'immutable';
import * as actionTypes from '../action_types/activity';
import {clearBlocks, saveBlock} from '../actions/activity';

export const initialState = Map({
    blocks: OrderedSet()
});

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CLEAR_BLOCKS:
            return clearBlocks(state);
        case actionTypes.SAVE_BLOCK:
            return saveBlock(state, action.block);
        default:
            return state;
    }
}