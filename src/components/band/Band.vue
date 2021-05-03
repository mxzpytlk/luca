<template>
  <div class="band">
    <draggable v-model="sectors">
      <sector
        v-for="sector in sectors" :key="sector.id"
        v-bind:sector="sector"
        v-bind:activeRecord="activeRecord"
        @openMenu="makeRecordActive($event)"
      />
    </draggable>
    
  </div>
</template>

<script>
import './band.scss';
import Sector from '../sector/Sector';
import draggable from 'vuedraggable';

export default {
  data() {
    return {
      activeRecord: null,
    };
  },
  computed: {
    sectors: {
      get() {
        return this.$store.getters.sectors;
      },
      set(sectors) {
        this.$store.dispatch('updateSectors', sectors);
      },
    },
  },
  methods: {
    makeRecordActive(record) {
      this.activeRecord = record;
    },
  },
  components: { Sector, draggable },
};
</script>
