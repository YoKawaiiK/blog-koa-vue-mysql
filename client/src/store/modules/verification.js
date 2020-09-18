import Vue from 'vue'
// import $router from '../../router/index'

export default {
    namespaced: true,
    actions: {
        async actionCheckToken(context, emailToken) {
            return new Promise((resolve, reject) => {
                Vue.axios.put(`/api/signin/verification/${emailToken}`).then(response => {
                    if (response) {
                        resolve(response);
                    } else {
                        reject({error: true})
                    }
                })
            })
        }
    }
}