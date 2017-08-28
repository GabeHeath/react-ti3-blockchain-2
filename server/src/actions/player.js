import {fromJS, List, Map, OrderedSet} from 'immutable';

export function addPlayer(state, player, hash) {
    return state.withMutations( map => {
        map.update('remainingPlayers', list => list.delete( map.get('remainingPlayers').indexOf(player) ))
           .update('players', list => list.push(
               Map({
                   name: player,
                   hash: hash,
                   races: List()
               })
           ))
    });
}

export function addRace(state, race, playerIndex, hash) {
    return state.updateIn(['players', playerIndex, 'races'], list => list.push(
            Map({
                race: race,
                hash: hash
            })
        )
    );
}

export function clearPlayers(state) {
    return state.withMutations( map => {
        map.set('total', 0 )
           .set('hashCode', null)
           .set('players', OrderedSet())
           .set('remainingPlayers', OrderedSet())
    });
}

export function setPlayers(state, payload) {
    payload = fromJS(payload); //Because socket.io send converts immutableJS to JS
    return state.withMutations( map => {
        map.set('total', payload.get('totalPlayers') )
           .set('hashCode', payload.get('players').hashCode() )
           .set('remainingPlayers', payload.get('players'))
    });
}