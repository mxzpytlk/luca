<template>
  <div class="edit">
    <form class="edit__form" @submit.prevent="edit">
      <font-awesome-icon
        icon="window-close"
        size="2x"
        class="edit__close"
        @click.prevent="closeForm"
      />
      <h2>
        {{ sectorTitle }}
      </h2>
      <vueye-datepicker v-model="executionEnd" color="#4466ee" format="yyyy-mm-dd" />
      <span>
        {{ 'time_spent' | locale }}
      </span>
      <vue-range-slider
        ref="slider"
        width="50%"
        :max="executionPlanTime"
        :step="0.25"
        v-model="executionTime"
        :bg-style="{ backgroundColor: 'green', }"
        :process-style="{ backgroundColor: 'red', }"
      >
      </vue-range-slider>
      <textarea class="edit__text" :placeholder="'here_should_record' | locale" v-model="text"/>
      <input type="submit" :value="'edit' | locale" class="edit__btn">
    </form>
  </div>
</template>

<script>
import './edit-page.scss';
import 'vue-range-component/dist/vue-range-slider.css';
import VueRangeSlider from 'vue-range-component';
import VueyeDatepicker from 'vueye-datepicker';

export default {
  data() {
    return {
      editableText: undefined,
      editableTime: undefined,
      editableDate: undefined,
    };
  },
  computed: {
    record() {
      return this.$store.getters.record(this.$route.params?.id);
    },
    sectorTitle() {
      return this.$store.getters.sectorTitle(this.record?.id);
    },
    executionPlanTime() {
      return +this.record?.executionPlanTime;
    },
    text: {
      get() {
        if (this.editableText === '') {
          return '';
        }

        return this.editableText || this.record?.text;
      },
      set(text) {
        this.editableText = text;
      },
    },
    executionTime: {
      get() {
        if (this.editableTime === 0) {
          return 0;
        }
        return this.editableTime || this.record?.executionTime || 0;
      },
      set(newTime) {
        this.editableTime = newTime;
      },
    },
    executionEnd: {
      get() {
        return this.editableDate || this.record?.executionDate || new Date();
      },
      set(newDate) {
        this.editableDate = newDate;
      },
    },
  },
  methods: {
    async edit() {
      const record = this.record;
      record.executionDate = this.executionEnd.value;
      record.text = this.text;
      record.executionTime = this.executionTime;
      await this.$store.dispatch('updateRecord', record);
      this.$router.push('/main');
    },
    closeForm() {
      this.$router.push('/main');
    },
  },
  created() {
    VueRangeSlider.methods.handleKeyup = () => undefined;
    VueRangeSlider.methods.handleKeydown = () => undefined;
  },
  components: { VueRangeSlider, VueyeDatepicker },
};
</script>
