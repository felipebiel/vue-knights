import { SERVER_HOST } from '@/settings/settings';

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
                this._vm.$http.get(`${SERVER_HOST}${params.url}`)
                    .then((response) => {
                        context.commit('SET_LIST', response.data);
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error)
                    })
            });
        },
    },
}