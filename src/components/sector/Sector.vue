<template>
  <div class="sector">
    <div class="sector__header">
      <span class="sector__icons_container">
        <font-awesome-icon
          icon="caret-down"
          size="lg"
          class="sector__icons_circle"
          v-bind:class="{ sector__icons_rotate: isRecords }" />
        <input type="checkbox" class="luca-checkbox_hidden" v-model="isRecords" />
      </span>
      <span class="sector__title">
        {{ sector.title }}
      </span>
    </div>
    <div v-if="isRecords" class="sector__container">
      <div class="sector__record"
        v-for="record in sector.records"
        :key="record.id" 
        v-bind:class="{sector__record_active : isImportant(record)}"
        @click.left.prevent="makeRecordActive(record)"
        @click.right.prevent="changeRecordDateToday(record)"
      >
        <span class="sector__record_text" >
          {{ record.text }}
        </span>
        <span class="sector__record_date">
          {{ record.executionDate | date }}
        </span>
        <ul class="sector__record_menu" v-if="isRecordActive(record)">
          <router-link :to="'/main/edit/' + record.id" class="sector__record_btn">{{ 'edit' | locale }}</router-link>
          <li class="sector__record_btn sector__record_delete" @click.prevent="deleteRecord(record)">
            {{ 'delete' | locale }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IRecord } from '@/core/interfaces/record.interface';
import { ISectorComp } from './sector-component.interface';
import './sector.scss';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isRecords: false,
      highlightedRecords: [],
    };
  },
  computed: mapGetters(['isImportant']),
  methods: {

    async changeRecordDateToday(record: IRecord) {
      const sectorComp = this as unknown as ISectorComp;
      record.executionDate = sectorComp.$store.getters.filterDate;
      await sectorComp.$store.dispatch('updateRecord', record );
    },


    makeRecordActive(record: IRecord) {
      const sectorComp = this as unknown as ISectorComp;
      if (sectorComp.activeRecord?.id === record.id) {
        sectorComp.$emit('openMenu', null);
        return;
      }
      sectorComp.$emit('openMenu', record);
    },


    isRecordActive(record: IRecord) {
      const sectorComp = this as unknown as ISectorComp;
      return record?.id === sectorComp.activeRecord?.id;
    },


    async deleteRecord(record: IRecord) {
      const sectorComp = this as unknown as ISectorComp;
      sectorComp.$store.dispatch('removeRecord', record);
    },

  },
  props: ['sector', 'activeRecord'],
};
</script>