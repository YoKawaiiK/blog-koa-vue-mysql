import Vue from 'vue'
import Vuex from 'vuex'

import login from './modules/login'
import signin from './modules/signin'
import message from './modules/message'
import verification from './modules/verification'
import cookiesState from './modules/cookiesState'
import exit from './modules/exit'
import posts from './modules/posts'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        message,
        login, 
        signin,
        verification,
        cookiesState,
        exit,
        posts,
    }
})