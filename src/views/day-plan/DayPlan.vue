<template>
  <div class="plan">
    <div class="plan__container">
      <div v-for="record in todayRecords" :key="record.id" class="plan__record">
        <span class="plan__record_text">
          {{ record.text }}
        </span>
        <k-progress :percent="getPercent(record)" :line-height="7" color="red" bg-color="green" class="plan__record_progress"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import './day-plan.scss';
import KProgress from 'k-progress';

export default {
  computed: mapGetters(['todayRecords']),
  methods: {
    getPercent(record) {
      return Math.round(((record.executionTime || 0) / record.executionPlanTime) * 100);
    },
  },
  components: { KProgress },
};
</script>
