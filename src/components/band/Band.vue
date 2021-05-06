<template>
  <div class="band">
    <div class="band__autocomplete">
      <vue-simple-suggest
        @select="selectRecord($event)"
        v-model="recordLookingFor"
        :list="simpleSuggestionList"
        :filter-by-query="true"
      />
    </div>
    <div class="band__container">
      <draggable v-model="sectors">
        <sector
          v-for="sector in sectors" :key="sector.id"
          v-bind:sector="sector"
          v-bind:activeRecord="activeRecord"
          @openMenu="makeRecordActive($event)"
          ref="sectors"
        />
      </draggable>
    </div>
  </div>
</template>

<script>
import './band.scss';
import 'vue-simple-suggest/dist/styles.css';
import Sector from '../sector/Sector';
import draggable from 'vuedraggable';
import VueSimpleSuggest from 'vue-simple-suggest';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      activeRecord: null,
      recordLookingFor: '',
    };
  },
  computed: {
    ...mapGetters(['allRecords']),
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

    simpleSuggestionList() {
      return this.allRecords.map((record) => record?.text);
    },

    selectRecord(recordText) {
      const sectorComponents = this.$refs.sectors;
      const records = [];

      for (const component of sectorComponents) {
        const sector = component.sector;
        const componentRecords = sector.records.filter((record) => record.text === recordText);
        if (componentRecords.length > 0) {
          component.isRecords = true;
        }
        records.push(...componentRecords);
      }
      this.$store.commit('makeRecordsImportant', records);
    },
  },
  components: { Sector, draggable, VueSimpleSuggest },
};
</script>
