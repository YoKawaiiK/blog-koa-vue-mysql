import Vue from 'vue'
import $router from '../../router/index';

export default {
    namespaced: true,
    state: {
        
    },
    getters: {

    },
    mutations: {
    },
    actions: {
        async actionlogin({dispatch, rootGetters }, loginData) {
            // console.log(loginData);
            let response = await Vue.axios.post('/api/login', loginData)
            if (response.data.accessAllowed == true) {
                await dispatch('cookiesState/actionLogin', null, {root: true})
                
                await $router.push({name: 'posts', 
                    params: {
                        pagination: 1, 
                        user_id:rootGetters['cookiesState/getUser_id']
                    }
                })
                await dispatch(
                    'message/accessAllowed', {}, {root:true}
                )
            }
            else if (response.data.accessDenied == true) {
                dispatch(
                    'message/accessDenied', {}, {root:true}
                )
            }
            else if (response.data.loginNotFound == true) {
                dispatch(
                    'message/emailNotFound', {}, {root:true}
                )
            }
            else  {
                dispatch(
                    'message/error', {}, {root:true}
                )
            }
            


        }
    }
}