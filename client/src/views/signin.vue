<template>
  <div>
    <div class="outer-form">
      <div class="card form">
        <div class="card-content">
          <div class="login__item">
            <h1 class="title is-3">Регистрация</h1>
          </div>
          <div class="field">
            <label class="label" for="signin">Логин или e-mail</label>
            <div class="control">
              <input v-model="email"
              id="signin" class="input is-primary" type="text" />
            </div>
          </div>
          <div class="field">
            <label class="label" for="password">Пароль</label>
            <div class="control">
              <input v-model="password"
              id="password" class="input is-primary" type="password" />
            </div>
          </div>
          <div class="field">
            <label class="label" for="doublePassword">Пароль</label>
            <div class="control">
              <input v-model="doublePassword"
              id="doublePassword" class="input is-primary" type="password" />
            </div>
          </div>
          <div class="field">
            <button class="button is-primary" 
            @click="actionSignin({email, password, doublePassword})">Зарегистрироваться</button>
          </div>
          <div class="field">
            <button class="button" @click="$router.push({name: 'login'})">Вход</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "signin",
  data() {
    return {
      email: '',
      password: '',
      doublePassword: ''
    }
  },
  methods: {
    ...mapActions('signin', ['actionSignin'])
  },
};
</script>

<style scoped>
</style>
