import { SERVER_HOST } from '@/settings/settings';

export default {
    actions: {
        editRecord(context, params) { // eslint-disable-line
            return new Promise((resolve, reject) => {
                this._vm.$http.put(`${SERVER_HOST}${params.url}`, params.data)
                    .then((response) => {
                        resolve(response);
                    }).catch((error) => { reject(error); })
                    .finally(() => { });
            });
        },
    }
};