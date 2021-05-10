<template>
  <div class="luca-container">
    <navbar />
    <workspace />
  </div>
</template>

<script lang="ts">
import './luca-container.scss';
import Navbar from '../../components/navbar/Navbar.vue';
import Workspace from '../workspace/Workspace.vue';

export default {
  components: { Navbar, Workspace },
};
</script>
