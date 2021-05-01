<template>
  <ul class="menu-bar">
    <router-link tag="li" v-bind:to="path.path" v-for="path in viewPath" :key="path.name" class="menu-bar__link">
      {{ path.name }}
    </router-link>
  </ul>
</template>

<script>
import './menu-bar.scss';
import { viewPath } from '../../core/interfaces/router-view-path';

export default {
  data() {
    return {
      viewPath,
    };
  },
};
</script>
