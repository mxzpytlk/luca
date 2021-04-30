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
  components: { Auth },
};
</script>
