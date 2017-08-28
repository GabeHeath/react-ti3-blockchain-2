import {fromJS} from 'immutable';

export function removeRace(state, race) {
    return state.update('remainingRaces',
                list => list.delete( state.get('remainingRaces').indexOf(race) )
    );
}

export function setRaces(state, payload) {
    payload = fromJS(payload); //Because socket.io send converts immutableJS to JS
    return state.withMutations( map => {
        map.set('total', payload.get('total') )
           .set('hashCode', payload.get('races').hashCode() )
           .set('races', payload.get('races') )
           .set('remainingRaces', payload.get('races') )
    })
}