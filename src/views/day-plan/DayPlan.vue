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
      <div class="plan__error luca-error">
        {{ errText | locale }}
      </div>
      <component v-bind:is="isMobile ? 'div' : 'draggable'">
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
            <span>{{ 'left' | locale }}: {{ leftTime(record) | time}}</span>
          </div>
        </div>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import './day-plan.scss';
import KProgress from 'k-progress';
import draggable from 'vuedraggable';
import device from 'current-device';
import { IDayPlan } from './day-plan.interface';
import { IRecord } from '@/core/interfaces/record.interface';

export default {
  data() {
    return {
      selectedRecords: [],
      recordsShow: undefined,
      errText: '',
    };
  },
  computed: {
    ...mapGetters(['todayRecords', 'isToday']),

    records: {
      get(): IRecord[] {
        const dayPlan = this as unknown as IDayPlan;
        return dayPlan.recordsShow || dayPlan.todayRecords;
      },
      set(records: IRecord[]): void {
        const dayPlan = this as unknown as IDayPlan;
        dayPlan.recordsShow = records;
      },
    },

    isRecordSelected(): (record: IRecord) => boolean {
      const dayPlan = this as unknown as IDayPlan;
      const selectedRecords = dayPlan.selectedRecords;
      return (record: IRecord) => new Set(selectedRecords).has(record);
    },

    isAnyRecordSelected() {
      const dayPlan = this as unknown as IDayPlan;
      return dayPlan.selectedRecords.length > 0;
    },

    isMobile(): boolean {
      return device.mobile();
    },

  },
  methods: {
    ...mapActions(['copyPreviousDayPlan']),
    getPercent(record: IRecord): number {
      if (record.executionTime > record.executionPlanTime) {
        return 100;
      }
      return Math.round(((record.executionTime || 0) / record.executionPlanTime) * 100);
    },

    async deleteFromToday(): Promise<void> {
      const dayPlan = this as unknown as IDayPlan;
      await dayPlan.$store.dispatch('updateRecords', dayPlan.selectedRecords);
    },

    selectRecord(record: IRecord): void {
      const dayPlan = this as unknown as IDayPlan;
      const recordIdx = dayPlan.selectedRecords.findIndex((item) => item.id === record.id);
      if (recordIdx === -1) {
        dayPlan.selectedRecords.push(record);
      } else {
        dayPlan.selectedRecords.splice(recordIdx, 1);
      }
      dayPlan.$forceUpdate();
    },

    isStoped(record: IRecord): boolean {
      const ints = record.executionIntervals;
      return !!ints[ints.length - 1]?.end || ints.length === 0;
    },

    async changeCountdown(record: IRecord): Promise<void> {
      const dayPlan = this as unknown as IDayPlan;
      const ints = record.executionIntervals;
      const lastInt = ints[ints.length - 1]?.end;

      if (lastInt || ints.length === 0) {
        if (record.executionDate?.toDateString() !== new Date().toDateString()) {
          dayPlan.errText = 'not_today';
          return;
        }
        ints.push({ start: new Date() });
      } else {
        const idx = ints.length - 1;
        ints[idx].end = new Date();
        ints.splice(idx, 1, ints[idx]);
      }

      await dayPlan.$store.dispatch('updateRecord', record);
    },

    leftTime(record: IRecord): number {
      return record.executionPlanTime - record.executionTime;
    },
  },
  components: { KProgress, draggable },
};
</script>
