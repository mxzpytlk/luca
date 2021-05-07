<template>
  <div class="plan">
    <div class="plan__container">
      <div class="plan__header">
        <button class="luca-btn plan__copy" @click.prevent="copyPreviousDayPlan" v-if="isToday">
          {{ 'copy_previous_day' | locale }}
        </button>
        <button
          class="luca-btn-delete plan__delete"
          @click.prevent="deleteFromToday"
          v-bind:disabled="!isAnyRecordSelected"
        >
          {{ 'delete_from_today' | locale }}
        </button>
      </div>
      <draggable>
        <div
          v-for="record in records"
          :key="record.id" class="plan__record"
          v-bind:class="{ plan__record_select : isRecordSelected(record) }"
          @click.right.prevent="selectRecord(record)"
          @click.left.prevent="changeCountdown(record)"
        >
          <span class="plan__record_text">
            {{ record.text }}
          </span>
          <div class="plan__record_right">
            <k-progress :percent="getPercent(record)" :line-height="7" color="red" bg-color="green" class="plan__record_progress"/>
            <font-awesome-icon v-if="isStoped(record)" icon="pause-circle" class="plan__record_icon"/>
            <font-awesome-icon icon="clock" class="plan__record_icon" v-else/>
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import './day-plan.scss';
import KProgress from 'k-progress';
import draggable from 'vuedraggable';
import { IRecord } from '@/core/interfaces/record.interface';

export default {
  data() {
    return {
      selectedRecords: [],
      recordsShow: undefined,
    };
  },
  computed: {
    ...mapGetters(['todayRecords', 'isToday']),

    records: {
      get() {
        return this.recordsShow || this.todayRecords;
      },
      set(records) {
        this.recordsShow = records;
      },
    },

    isRecordSelected() {
      const selectedRecords = this.selectedRecords;
      return (record) => new Set(selectedRecords).has(record);
    },

    isAnyRecordSelected() {
      return this.selectedRecords.length > 0;
    },
  },
  methods: {
    ...mapActions(['copyPreviousDayPlan']),
    getPercent(record) {
      return Math.round(((record.executionTime || 0) / record.executionPlanTime) * 100);
    },

    async deleteFromToday() {
      this.selectedRecords.forEach((record) => {
        record.executionDate = null;
      });
      await this.$store.dispatch('updateRecords', this.selectedRecords);
    },

    selectRecord(record) {
      const recordIdx = this.selectedRecords.findIndex((item) => item.id === record.id);
      if (recordIdx === -1) {
        this.selectedRecords.push(record);
      } else {
        this.selectedRecords.splice(recordIdx, 1);
      }
      this.$forceUpdate();
    },

    isStoped(record) {
      const ints = record.executionIntervals;
      return ints[ints.length - 1]?.end || ints.length === 0;
    },

    async changeCountdown(record) {
      const ints = record.executionIntervals;
      const lastInt = ints[ints.length - 1]?.end;

      if (lastInt || ints.length === 0) {
        ints.push({ start: new Date() });
      } else {
        const idx = ints.length - 1;
        ints[idx].end = new Date();
        ints.splice(idx, 1, ints[idx]);
      }

      await this.$store.dispatch('updateRecord', record);
    },
  },
  components: { KProgress, draggable },
};
</script>
