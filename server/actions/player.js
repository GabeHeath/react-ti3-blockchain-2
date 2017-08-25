import {fromJS, Map, OrderedSet} from 'immutable';

export function clearPlayers(state) {
    return state.set('players', OrderedSet());
}

export function setPlayers(state, payload) {
    payload = fromJS(payload);
    const updatedState = state.withMutations( map => {
        map.set('total', payload.get('totalPlayers') )
           .set('hashCode', payload.get('players').hashCode() )
           .set('remainingPlayers', payload.get('players'))
    });

    return createPlayers(updatedState, payload.get('players'));
}

function createPlayers(state, players) {
    return state.withMutations(state => {
        players.forEach( (player, i) => {
            console.log('1111111', state.get('players'));
            state.update( 'players', list => list.add(
                Map({
                    index: i, //Apparently a List can't have identical maps so I had to add the index
                    name: null,
                    hash: null,
                    races: Map()
                })
            ));
        });
    });
}