import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import home from '../views/home.vue'
import login from '../views/login.vue'
import signin from '../views/signin.vue'
import notFound from '../views/notFound.vue'
import posts from '../views/posts.vue'
import verification from '../views/verification.vue'

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: 'Login',
      guest: true
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: signin,
    meta: {
      title: 'Sign In',
      guest: true
    }
  },
  {
    path: '/signin/verification/:token',
    name: 'verification',
    component: verification,
    meta: {
      title: 'Email verification',
      guest: true
    }
  },
  {
    path: '/posts/user/:user_id/pagination/:pagination',
    name: 'posts',
    component: posts,
    meta: {
      title: 'Posts'
    }
  },
  {
    path: '/404',
    name: 'notFound',
    component: notFound,
    meta: {
      title: 'Not found'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: 'is-active'
})

router.beforeEach((to, from, next) => {
  let auth = Vue.prototype.$cookie.get('auth')

  // Если пользователь зашел
  if (auth) {

    store.dispatch('cookiesState/actionLogin', null, {root: true})
  }
  // Если вход осуществлен, то закрыть маршруты входа и регистрации

  if (to.matched.some(route => route.meta.guest)) {
    if (auth == null) {
      next()
    } 
    else {
      next({name: 'home'})
    }
  }
  else if (to.matched.some(route => route.meta.requiresAuth)) {
    // Если в куках нет jwt, то перенаправить на главную
    if (auth == null) {
      next({ name: 'home'})
    } 
    // Если найден, то разрешить перейти на маршрут
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
