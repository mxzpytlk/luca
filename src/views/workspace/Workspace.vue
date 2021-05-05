<template>
  <div class="workspace">
    <a href="#left"></a>
    <band id="left"/>
    <a href="#right"></a>
    <router-view id="right"/>
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
    await this.$store.dispatch('loadRecords');
  },
  components: { Band, Acount },
};
</script>

