<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
  }
</style>

<script>
import './styles/_index.scss';
import Auth from './views/auth/Auth';

export default {
  created() {
    this.$http.interceptors.response.use(undefined, async (err) => {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        this.$store.dispatch('logout');
      }
      throw err;
    });
  },
  components: { Auth },
};
</script>
