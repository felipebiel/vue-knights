export default {
    state: {
        list: [],
    },
    mutations: {
        SET_LIST(state, list) {
            state.list = list;
        },
    },
    actions: {
        getList(context, params) {
            return new Promise((resolve, reject) => {                
            });
        },
    }
}