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
        v-bind:class="{sector__record_active : isRecordToday(record)}"
        @click.prevent="makeRecordActive(record)"
      >
        <span class="sector__record_text" >
          {{ record.text }}
        </span>
        <span class="sector__record_date">
          {{ record.executionDate | date }}
        </span>
        <ul class="sector__record_menu" v-if="isRecordActive(record)">
          <li class="sector__record_btn">Edit record</li>
          <li class="sector__record_btn sector__record_delete" @click.prevent="deleteRecord(record)">
            Delete record
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { IRecord } from '@/core/interfaces/record';
import './sector.scss';

export default {
  data() {
    return {
      isRecords: false,
    };
  },
  methods: {
    isRecordToday(record) {
      return new Date().toDateString() === record?.executionDate?.toDateString();
    },
    makeRecordActive(record) {
      if (this.activeRecord?.id === record.id) {
        this.$emit('openMenu', null);
        return;
      }
      this.$emit('openMenu', record);
    },
    isRecordActive(record) {
      return record.id === this.activeRecord?.id;
    },
    async deleteRecord(record) {
      this.$store.dispatch('removeRecord', record);
    },
  },
  props: ['sector', 'activeRecord'],
};
</script>