<template>
  <div class="container">
    <form class="form" @submit.prevent="addRecord">
      <input type="text" name="title" class="luca-input" :placeholder="'enter_sector_title' | locale" v-model="title" required>
      <div class="form__time">
        <label for="plan">
          {{ 'planed_time' | locale }}
        </label>
        <div>
          <input type="range" name="plan" min="0.25" max="24" step="0.25" v-model="planedTime" class="form__time_input">
          <span>
            {{ planedTime | time}}
          </span>
        </div>
      </div>
      <textarea name="text" class="luca-input form__text" :placeholder="'enter_record' | locale" v-model="text" required/>
      <div class="luca-error">
        {{ errText | locale }}
      </div>
      <input type="submit" :value="'add_note' | locale" class="form__btn luca-btn">
      <font-awesome-icon
        icon="window-close"
        size="2x"
        class="form__close"
        @click.prevent="closeForm"
      />
    </form>
  </div>
</template>


<script lang="ts">
import './new-note.scss';
import VueyeDatepicker from 'vueye-datepicker';
import { INewNote } from './new-note.interface';

export default {
  data() {
    return {
      title: '',
      text: '',
      planedTime: 0,
      errText: '',
    };
  },
  methods: {

    async addRecord(): Promise<void> {
      const newNotePage = this as unknown as INewNote;
      try {
        const record = {
          text: newNotePage.text,
          executionPlanTime: newNotePage.planedTime,
          executionIntervals: [],
        };

        await newNotePage.$store.dispatch('addRecord', { record, title: newNotePage.title });
        newNotePage.title = '';
        newNotePage.text = '';
      } catch (e) {
        newNotePage.errText = e.message;
      }
    },

    async closeForm(): Promise<void> {
      const newNotePage = this as unknown as INewNote;
      newNotePage.$router.push('/main');
    },

  },
  components: { VueyeDatepicker },
};
</script>