import { SERVER_HOST } from '@/settings/settings';

export default {
    state: {
        instance: {},
    },
    mutations: {
        SET_RECORD(state, instance) {
            state.instance = instance;
        },
    },
    actions: {
        getRead(context, params) {
            return new Promise((resolve, reject) => {
                this._vm.$http.get(`${SERVER_HOST}${params.url}`)
                    .then((response) => {
                        context.commit('SET_RECORD', response.data);
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error)
                    })
            });
        },
    }
}