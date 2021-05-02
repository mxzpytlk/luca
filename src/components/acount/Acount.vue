<template>
  <div class="acount" v-bind:class="{ 'acount__active' : isAcount }">
    <font-awesome-icon
      icon="arrow-alt-circle-right"
      size="3x"
      class="acount__icon_right"
      @click.prevent="close"
    />
    <font-awesome-icon
      icon="sign-out-alt"
      size="3x"
      class="acount__icon_out"
      @click.prevent="logout"
    />
  </div>
</template>

<script>
import { RouterPath } from '@/core/enums/router-path';
import './acount.scss';

export default {
  computed: {
    isAcount() {
      return this.$route.path === `${RouterPath.MAIN}/${RouterPath.ACOUNT}`;
    },
  },
  methods: {
    close() {
      this.$router.push(RouterPath.MAIN);
    },
    async logout() {
      if (confirm('Are you sure you want to leave your acount')) {
        await this.$store.dispatch('logout');
        this.$router.push(RouterPath.AUTH);
      }
    },
  },
};
</script>
