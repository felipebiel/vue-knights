import { SERVER_HOST } from '@/settings/settings';

export default {
    actions: {
        deleteRecord(context, params) {
            return new Promise((resolve, reject) => {
                this._vm.$http.delete(`${SERVER_HOST}${params.url}`)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error)
                    })
            });
        },
    }
}