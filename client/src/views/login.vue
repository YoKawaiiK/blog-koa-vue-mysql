<template>
  <div>
    <div class="outer-form">
      <div class="card form">
        <div class="card-content">
          <div class="login__item">
            <h1 class="title is-3">Вход в систему</h1>
          </div>
          <div class="field">
            <label class="label" for="login">Логин или e-mail</label>
            <div class="control">
              <input v-model="login"
              id="login" class="input is-primary" type="text" />
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
            <button class="button is-primary"
            @click="actionlogin({login, password})">Войти</button>
          </div>
          <div class="field">
            <button class="button" @click="$router.push({name: 'signin'})">Регистрация</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "login",
  data() {
    return {
      password: '',
      login: ''
    }
  },
  methods: {
    ...mapActions('login', ['actionlogin'])
  },
};
</script>

<style>
.outer-form {
  position: relative;
  min-height: calc(400px + 150px);
  height: calc(100vh - 52px);
  width: 100vw;
}

.form {
  border-radius: 10px;
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login__item {
  margin: 20px 0px;
}
.login__item:first-child {
  margin-top: 0px;
}

.login__item:last-child {
  margin-bottom: 0px;
}
.card-footer .field {
  padding: 1.5rem;
}
</style>
