<template>
  <div class="workspace">
    <band />
    <router-view />
  </div>
</template>
<script>
import './workspace.scss';
import Band from '../../components/band/Band';

export default {
  async mounted() {
    await this.$store.dispatch('updateRecords');
  },
  components: { Band },
};
</script>

