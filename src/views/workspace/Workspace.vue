<template>
  <div class="workspace">
    <band v-if="isBand"/>
    <router-view />
    <acount />
  </div>
</template>
<script>
import './workspace.scss';
import Band from '../../components/band/Band';
import Acount from '../../components/acount/Acount';
import device from 'current-device';

export default {
  computed: {
    isBand() {
      return this.$route.path === '/main' || !device.mobile();
    },
  },
  async mounted() {
    await this.$store.dispatch('updateRecords');
  },
  components: { Band, Acount },
};
</script>

