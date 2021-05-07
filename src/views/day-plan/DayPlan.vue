<template>
  <div class="plan">
    <div class="plan__container">
      <div class="plan__header">
        <button class="luca-btn plan__copy" @click.prevent="copyPreviousDayPlan" v-if="isToday">
          {{ 'copy_previous_day' | locale }}
        </button>
        <button class="luca-btn-delete plan__delete" @click.prevent="deleteFromToday" v-if="isAnyRecordSelected">
          {{ 'delete_from_today' | locale }}
        </button>
      </div>
      <draggable>
        <div
          v-for="record in records"
          :key="record.id" class="plan__record"
          v-bind:class="{ plan__record_select : isRecordSelected(record) }"
          @click.prevent="selectRecord(record)"
        >
          <span class="plan__record_text">
            {{ record.text }}
          </span>
          <k-progress :percent="getPercent(record)" :line-height="7" color="red" bg-color="green" class="plan__record_progress"/>
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
      return (record) => new Set(this.selectedRecords).has(record);
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
  },
  components: { KProgress, draggable },
};
</script>
