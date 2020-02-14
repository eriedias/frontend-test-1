import { axiosRequest, BUSINESS_SEARCH } from '../../utils/Requests'

export default {
    namespaced: true,
    state: {
        list: [],
        businessInModal: {},
        loadedWithoutResults: false
    },
    mutations: {
        CHANGE_LIST(state, payload) {
            state.list = payload.businesses
        },
        LOADED_WITHOUT_RESULTS(state, payload) {
            state.loadedWithoutResults = payload
        },
        CHANGE_BUSINESS_MODAL(state, payload) {
            state.businessInModal = payload
        },
    },
    actions: {
        to_list({ dispatch, commit, state, /*rootState*/ }, filter) {
            return new Promise ((resolve, reject) => {
                dispatch('updateIsLoading', true, { root: true })
                axiosRequest.get(BUSINESS_SEARCH,
                {
                    params: {
                        location: 'Las Vegas',
                        radius: 40000,
                        price: filter.price.value,
                        categories: filter.category.value,
                        open_now: filter.onlyOpenNow
                    }
                }
                ).then(response => {
                    if (response.data) {
                        commit('CHANGE_LIST', response.data)
                        state.list.length == 0 ? commit('LOADED_WITHOUT_RESULTS', true) : commit('LOADED_WITHOUT_RESULTS', false)
                        resolve(
                            dispatch('updateIsLoading', false, { root: true })
                        )
                    } else {
                        reject(
                            dispatch('updateIsLoading', false, { root: true })
                        )
                    }
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(JSON.stringify(error))
                })
            })
        },

        to_detail({ dispatch, commit }, id) {
            return new Promise ((resolve, reject) => {
                dispatch('updateIsLoading', true, { root: true })
                axiosRequest.get('businesses/'+id,
                {
                    params: {
                    }
                }
                ).then(response => {
                    if (response.data) {
                        commit('CHANGE_BUSINESS_MODAL', response.data)
                        resolve(
                            dispatch('updateIsLoading', false, { root: true })
                        )
                    } else {
                        reject(
                            dispatch('updateIsLoading', false, { root: true })
                        )
                    }
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(JSON.stringify(error))
                })
            })
        }

    }
}