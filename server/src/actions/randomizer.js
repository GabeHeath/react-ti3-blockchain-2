export function resetRandomizer(state) {
    return state.set('started', false);
}

export function startRandomizer(state) {
    return state.set('started', true);
}