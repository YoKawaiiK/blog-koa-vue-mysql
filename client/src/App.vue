<template>
  <div id="app">
    <component-header></component-header>
    <router-view/>
  </div>
</template>


<script>
import componentHeader from './components/componentHeader.vue';

export default {
  watch: {
    // Изменяет заголовок страницы и иконку на мета-описания в роутере
    $route(to) {
      document.title = to.meta.title || 'Main';
      // const link = document.querySelector("[rel='icon']")
      // link.setAttribute('href',to.meta.icon)
    }
  }, 
  created() {
    // Изменяет заголовок страницы при первом запуске
    document.title = this.$route.meta.title || 'Main';
  },
  components: {
    'component-header': componentHeader
}
}

</script>
<style>

</style>
