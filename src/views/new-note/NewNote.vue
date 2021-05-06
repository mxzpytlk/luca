<template>
  <div class="container">
    <form class="form" @submit.prevent="addRecord">
      <input type="text" name="title" class="luca-input" :placeholder="'enter_sector_title' | locale" v-model="title" required>
      <vueye-datepicker v-model="date" color="#4466ee" format="yyyy-mm-dd" />
      <div class="form__time">
        <label for="plan">
          {{ 'planed_time' | locale }}
        </label>
        <div>
          <input type="range" name="plan" min="0" max="10" step="0.25" v-model="planedTime" class="form__time_input">
          <span>
            {{ planedTime | time}}
          </span>
        </div>
      </div>
      <textarea name="text" class="luca-input form__text" :placeholder="'enter_record' | locale" v-model="text" required/>
      <input type="submit" :value="'add_note' | locale" class="form__btn">
      <font-awesome-icon
        icon="window-close"
        size="2x"
        class="form__close"
        @click.prevent="closeForm"
      />
    </form>
  </div>
</template>


<script lang="js">
import './new-note.scss';
import VueyeDatepicker from 'vueye-datepicker';
import { IRecord } from '@/core/interfaces/record';

export default {
  data() {
    return {
      title: '',
      text: '',
      date: new Date(),
      planedTime: 0,
    };
  },
  methods: {

    async addRecord() {
      const record = {
        id: undefined,
        text: this.text,
        executionDate: this.date.value,
        executionPlanTime: this.planedTime,
      };

      await this.$store.dispatch('addRecord', { record, title: this.title });
      this.title = '';
      this.text = '';
    },

    closeForm() {
      this.$router.push('/main');
    },

  },
  components: { VueyeDatepicker },
};
</script>