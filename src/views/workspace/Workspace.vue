<template>
  <div class="workspace">
    <a href="#left"></a>
    <band id="left"/>
    <a href="#right"></a>
    <router-view id="right"/>
    <acount />
  </div>
</template>

<script lang="ts">
import './workspace.scss';
import Band from '../../components/band/Band.vue';
import Acount from '../../components/acount/Acount.vue';
import { IComponent } from '@/core/interfaces/component.interface';

export default {
  async mounted() {
    const workspace = this as unknown as IComponent;
    await workspace.$store.dispatch('loadRecords');
  },
  components: { Band, Acount },
};
</script>

