import { SERVER_HOST } from '@/settings/settings';

export default {
    namespaced: true,
    actions: {
        getFilters(context) { // eslint-disable-line
            return new Promise((resolve, reject) => {
                this._vm.$api('emergencyalertGetIdentifierFilters', { noPage: true })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => { reject(error); })
                    .finally(() => { });
            });
        },
        layersRead(context, params) { // eslint-disable-line
            return new Promise((resolve, reject) => {
                this._vm.$api('layersRead', params)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => { reject(error); })
                    .finally(() => { });
            });
        },
        getIdEmergency(context) { // eslint-disable-line
            return new Promise((resolve, reject) => {
                this._vm.$http.get(`${SERVER_HOST}/activities/emergency_activities_options/`)
                    .then((response) => {
                        resolve(response);
                    }).catch((error) => { reject(error); })
                    .finally(() => { });
            });
        },
    }
};