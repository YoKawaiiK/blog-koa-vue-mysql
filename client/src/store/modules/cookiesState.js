import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        auth: false,
        user_id: null
    },
    getters: {
        getAuth(state) {
            return state.auth;
        },
        getUser_id(state) {
            return state.user_id;
        }
    },
    actions: {
        async actionLogin({state}) {
            // Чтобы выполнялось 1 раз при прогрузке страницы
            if (state.auth == false) {
                state.auth = true;
                state.user_id = Vue.prototype.$cookie.get('user_id');
            }   
        },
        async clear({state}) {
            state.auth = false;
        }
    }
}