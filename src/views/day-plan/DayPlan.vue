<template>
  <div class="plan">
    <div class="plan__container">
      <div class="plan__header">
        <button class="luca-btn plan__copy" @click.prevent="copyPreviousDayPlan" v-if="isToday">
          {{ 'copy_previous_day' | locale }}
        </button>
      </div>
      <div
        v-for="record in todayRecords"
        :key="record.id" class="plan__record"
        v-bind:class="{ plan__record_select : isRecordSelected(record) }"
        @click.prevent="selectRecord(record)"
      >
        <span class="plan__record_text">
          {{ record.text }}
        </span>
        <k-progress :percent="getPercent(record)" :line-height="7" color="red" bg-color="green" class="plan__record_progress"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import './day-plan.scss';
import KProgress from 'k-progress';

export default {
  data() {
    return {
      selectedRecords: new Set(),
    };
  },
  computed: {
    ...mapGetters(['todayRecords', 'isToday']),
    isRecordSelected() {
      return (record) => !this.selectedRecords.has(record);
    },
  },
  methods: {
    ...mapActions(['copyPreviousDayPlan']),
    getPercent(record) {
      return Math.round(((record.executionTime || 0) / record.executionPlanTime) * 100);
    },

    selectRecord(record) {
      if (this.selectedRecords.has(record)) {
        this.selectedRecords.delete(record);
      } else {
        this.selectedRecords.add(record);
      }
      this.$forceUpdate();
    },
  },
  components: { KProgress },
};
</script>
