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
      if (err.response.status === 401) {
        await this.$store.dispatch('logout');
      }
      throw err;
    });
  },
  components: { Auth },
};
</script>
