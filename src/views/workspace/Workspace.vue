<template>
  <div class="workspace">
    <band />
    <router-view />
    <acount />
  </div>
</template>
<script>
import './workspace.scss';
import Band from '../../components/band/Band';
import Acount from '../../components/acount/Acount';

export default {
  async mounted() {
    await this.$store.dispatch('updateRecords');
  },
  components: { Band, Acount },
};
</script>

