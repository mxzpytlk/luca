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
      v-bind:class="{sector__record_active : isRecordActive(record)}">
        <span class="sector__record_text" >
          {{ record.text }}
        </span>
        <span class="sector__record_date">
          {{ record.executionEnd | date }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IRecord } from '@/core/interfaces/record';
import './sector.scss';

export default {
  data() {
    return {
      isRecords: false,
    };
  },
  methods: {
    isRecordActive(record: IRecord) {
      return new Date().toDateString() === record?.executionEnd?.toDateString();
    }
  },
  props: ['sector'],
};
</script>