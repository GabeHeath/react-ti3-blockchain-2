export function setState(state, newState) {
    return state.merge(newState);
}