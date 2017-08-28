import {Map, OrderedSet} from 'immutable';

export function clearBlocks(state) {
    return state.set('blocks', OrderedSet());
}

export function saveBlock(state, payload) {
    return state.update('blocks', list => list.add(
        Map({
            title: payload.title,
            description: payload.description,
            rand: payload.rand,
            choices: payload.choices,
            hash: payload.block,
            timestamp: Date.now()
        })
    ));
}