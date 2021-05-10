<template>
  <div class="band">
    <div class="band__autocomplete">
      <vue-simple-suggest
        @select="selectRecord($event)"
        :placeholder="'enter_record_text' | locale"
        v-model="recordLookingFor"
        :list="recordsText"
        :filter-by-query="true"
      />
    </div>
    <div class="band__container">
      <draggable v-model="bandSectors">
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

<script lang="ts">
import './band.scss';
import { IBand } from './band.interface';
import 'vue-simple-suggest/dist/styles.css';
import Sector from '../sector/Sector.vue';
import draggable from 'vuedraggable';
import VueSimpleSuggest from 'vue-simple-suggest';
import { mapGetters } from 'vuex';
import { ISector } from '@/core/interfaces/sector.interface';
import { IRecord } from '@/core/interfaces/record.interface';

export default {
  data() {
    return {
      activeRecord: null,
      recordLookingFor: '',
    };
  },
  computed: {
    ...mapGetters(['allRecords', 'sectors']),
    bandSectors: {
      get(): ISector[] {
        const band = this as unknown as IBand;
        return band.sectors;
      },
      set(sectors: ISector[]): void {
        const band = this as unknown as IBand;
        band.$store.dispatch('updateSectors', sectors);
      },
    },
    recordsText(): string[] {
      const band = this as unknown as IBand;
      return band.allRecords.map((record) => record?.text);
    },
  },
  methods: {
    makeRecordActive(record: IRecord): void {
      const band = this as unknown as IBand;
      band.activeRecord = record;
    },

    selectRecord(recordText: string): void {
      const band = this as unknown as IBand;
      const sectorComponents = band.$refs.sectors;
      const records: IRecord[] = [];

      for (const component of sectorComponents) {
        const sector: ISector = component.sector;
        const componentRecords = sector.records.filter((record) => record.text === recordText);
        if (componentRecords.length > 0) {
          component.isRecords = true;
        }
        records.push(...componentRecords);
      }
      band.$store.commit('makeRecordsImportant', records);
    },
  },
  components: { Sector, draggable, VueSimpleSuggest },
};
</script>
