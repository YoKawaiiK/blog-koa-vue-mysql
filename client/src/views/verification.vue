<template>
  <div>
    <div
      class="notification full-height-width is-flex is-justify-content is-align-items"
      v-bind:class="classColor"
    >
      <div class="is-inline-block has-text-centered">
        <h2 class="title is-1">Потверждение учетной записи</h2>
        <h3 class="subtitle is-4">{{textMessage}}</h3>
        <button
          @click="$router.push({name: 'login'})"
          v-if="emailConfirm"
          class="button"
        >Перейти на страницу входа в аккаунт</button>
        <button class="button" v-else>Перейти на страницу регистрации</button>
      </div>
    </div>
  </div>
</template>
<script>
// import {mapActions} from 'vuex'

export default {
  name: "verification",
  data() {
    return {
      emailConfirm: false,
      classColor: Object,
      textMessage: String,
    };
  },
  methods: {
    // ...mapActions('verification', ['actionCheckToken'])
  },
  mounted() {
    this.$store
      .dispatch("verification/actionCheckToken", this.$route.params.token, {
        root: true,
      })
      .then((response) => {
        if (response.data.emailConfirm) {
          this.classColor = "is-success is-light";
          this.textMessage = "Email потвержден.";
          this.emailConfirm = true;
        } else if (response.data.emailTokenExpired) {
          this.classColor = "is-warning is-light";
          this.textMessage = "Токен истек, повторите регистрацию.";
        } else if (response.data.emailConfirmDouble) {
          this.classColor = "is-info is-light";
          this.textMessage = "Учетная запись уже потверждена.";
          this.emailConfirm = true;
        } else {
          this.classColor = "is-danger is-light";
          this.textMessage = "Неизвестная ошибка.";
        }
      });
  },
};
</script>
<style>
</style>