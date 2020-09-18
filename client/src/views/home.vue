<template>
  <div>
    <div>
      <div
        class="notification is-info is-light full-height-width is-flex is-justify-content is-align-items"
      >
        <div class="is-inline-block has-text-centered">
          <h2 class="title is-1"> Домашний проект блога </h2>
          <button
            @click="$router.push({name: 'signin'})"
            class="button"
          >Зарегистрироваться</button>
          <br>
          <br>
          <button 
          @click="$router.push({name: 'login'})"
          class="button">Войти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import vue from 'vue'

export default {
  name: "home",
};
</script>

<style>
.full-height-width {
  height: calc(100vh - 52px);
  width: 100vw;
}

.is-flex.is-justify-content {
  justify-content: center;
}

.is-flex.is-align-items {
  align-items: center;
}
</style>
