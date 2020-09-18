import Vue from 'vue'
import $router from '../../router/index'
export default {
    namespaced: true,
    actions: {
        actionExit({dispatch}) {
            Vue.axios.get('/api/exit').then(response => {
                if (response.data.exit != true) {
                    dispatch('message/error', {}, {root: true})
                }
                else {
                    dispatch('cookiesState/clear', {}, {root: true})
                    dispatch('message/exit', {}, {root: true})
                    $router.push({name: 'login'})
                }
            })
        }
    }
}