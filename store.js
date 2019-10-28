let state = {
    isFetchingContacts: false,
    isFetchingUser: false,
    contacts: [],
    user: {},
    error: false,
};

const listeners = [];

export default {
    getState() {
        return state;
    },
    setState(newState) {
        state = { ...state, ...newState };
        listeners.forEach(listener => listener());
    },
    onChange(newListener){
        listeners.push(newListener);
        return () => listeners.filter(listener => listener !== newListener);
    }
}