export function setRaces(state, payload) {
    return state.withMutations( map => {
        map.set('total', payload.get('total') )
           .set('hashCode', payload.get('races').hashCode() )
           .set('races', payload.get('races') )
           .set('remainingRaces', payload.get('races') )
    })
}