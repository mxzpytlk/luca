<template>
  <ul class="menu-bar">
    <router-link
      tag="li"
      v-bind:to="fullPath(path)"
      v-for="path in viewPath"
      :key="path.name"
      class="menu-bar__link"
    >
      {{ path.name | locale}}
    </router-link>
  </ul>
</template>

<script lang="ts">
import './menu-bar.scss';
import { IRouterViewPath, viewPath } from '../../core/interfaces/router-view-path';

export default {
  data() {
    return {
      viewPath,
    };
  },
  methods: {
    fullPath(path: IRouterViewPath) {
      return path?.fullPath?.join('/') || path.path;
    },
  },
};
</script>
