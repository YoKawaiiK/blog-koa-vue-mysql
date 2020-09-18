import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        
    },
    getters: {

    },
    mutations: {

    },
    actions: {
        async actionSignin ({dispatch}, signinData) {
            console.log(signinData);
            if (
                signinData.password.email < 7 ||
                signinData.password.length < 7 || 
                signinData.doublePassword.length < 7
            ) {
                dispatch(
                    'message/shortPassword', {}, {root:true}
                )
            }
            else if (
                signinData.password.email > 40 ||
                signinData.password.length > 40 || 
                signinData.doublePassword.length > 40
            ) {
                dispatch(
                    'message/dataSigninTooLong', {}, {root:true}
                )
            } 
            else if (signinData.password != signinData.doublePassword) {
                dispatch(
                    'message/passwordNotEquivalent', {}, {root:true}
                )
            } 
            else {   
                Vue.axios.post('/api/signin', signinData).then(response => {
                    if (response.data.errorDB == true) {
                        dispatch(
                            'message/errorDB', {}, {root:true}
                        ) 
                    }
                    else if (response.data.accessSignin == true) {
                        dispatch(
                            'message/accessSignin', {}, {root:true}
                        ) 
                    }
                    else if (response.data.doubleSignin == true) {
                        dispatch(
                            'message/doubleSignin', {}, {root:true}
                        ) 
                    }
                    else {
                        dispatch(
                            'message/error', {}, {root:true}
                        ) 
                    }
                })
            }
        }
    }
}