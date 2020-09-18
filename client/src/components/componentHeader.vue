<template>
  <div class="hero is-desktop is-medium is-light">
   <nav class="navbar">
      <div class="container">       
        <div class="navbar-brand">
          <a class="navbar-item">
              <h1 class="title">Блог</h1>
          </a>
          <span class="navbar-burger burger" data-target="navbarMenuHeroA">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroA" class="navbar-menu">
          <div class="navbar-end">

            <router-link
            class="navbar-item" :to="{name: 'home'}">Главная</router-link> 
            <router-link v-show="getAuth != false"
            class="navbar-item" 
              :to="{name: 'posts', params: {
                user_id: getUser_id, 
                pagination: 1
              }
            }">Записи</router-link>

            <router-link v-if="getAuth == false"
            class="navbar-item" :to="{name: 'login'}">Войти</router-link>
            <a v-else
            @click="actionExit()"
            class="navbar-item"> Выйти</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'componentHeader',
  computed: {
    ...mapGetters("cookiesState", ["getAuth", 'getUser_id'])
  },
  methods: {
    ...mapActions("exit", ["actionExit"])
  },
}

</script>

<style scoped>

</style>