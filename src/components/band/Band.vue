<template>
  <div class="band">
    <sector
      v-for="sector in sectors" :key="sector.id"
      v-bind:sector="sector"
      v-bind:activeRecord="activeRecord"
      @openMenu="makeRecordActive($event)"
    />
  </div>
</template>

<script>
import './band.scss';
import { mapGetters } from 'vuex';
import Sector from '../sector/Sector';

export default {
  data() {
    return {
      activeRecord: null,
    };
  },
  computed: mapGetters(['sectors']),
  methods: {
    makeRecordActive(record) {
      this.activeRecord = record;
    },
  },
  components: { Sector },
};
</script>
