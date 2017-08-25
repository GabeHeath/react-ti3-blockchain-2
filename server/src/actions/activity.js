import {Map, OrderedSet} from 'immutable';

export function clearBlocks(state) {
    return state.set('blocks', OrderedSet());
}

export function saveBlock(state, block) {
    return state.update('blocks', list => list.add(
        Map({
            hash: block,
            title: null,
            description: null,
            timestamp: Date.now()
        })
    ));
}