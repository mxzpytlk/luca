<template>
  <div class="band">
    <sector v-for="sector in sectors" :key="sector.id" v-bind:sector="sector"/>
  </div>
</template>

<script>
import './band.scss';
import { mapGetters } from 'vuex';
import Sector from '../sector/Sector';

export default {
  computed: mapGetters(['sectors']),
  components: { Sector },
};
</script>
