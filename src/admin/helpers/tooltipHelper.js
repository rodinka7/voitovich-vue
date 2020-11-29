export default (store, text, isSuccess) => {
    store.dispatch('tooltips/show', {
        text,
        type: isSuccess ? 'success' : 'error',
    }, { root: true });
}