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

<script lang="ts">
import './edit-page.scss';
import 'vue-range-component/dist/vue-range-slider.css';
import VueRangeSlider from 'vue-range-component';
import VueyeDatepicker from 'vueye-datepicker';
import { IEditPage } from './edit-page.interface';
import { IRecord } from '@/core/interfaces/record.interface';

export default {
  data() {
    return {
      editableText: undefined,
      editableTime: undefined,
      editableDate: undefined,
    };
  },
  computed: {
    record(): IRecord {
      const editPage = this as unknown as IEditPage;
      return editPage.$store.getters.record(editPage.$route.params?.id);
    },

    sectorTitle(): string {
      const editPage = this as unknown as IEditPage;
      return editPage.$store.getters.sectorTitle(editPage.record?.id);
    },

    executionPlanTime(): number {
      const editPage = this as unknown as IEditPage;
      return +editPage.record?.executionPlanTime;
    },
    text: {
      get(): string {
        const editPage = this as unknown as IEditPage;
        if (editPage.editableText === '') {
          return '';
        }

        return editPage.editableText || editPage.record?.text;
      },
      set(text: string): void {
        const editPage = this as unknown as IEditPage;
        editPage.editableText = text;
      },
    },

    executionTime: {
      get(): number {
        const editPage = this as unknown as IEditPage;
        if (editPage.editableTime === 0) {
          return 0;
        }
        return editPage.editableTime || editPage.record?.executionTime || 0;
      },

      set(newTime: number): void {
        const editPage = this as unknown as IEditPage;
        editPage.editableTime = newTime;
      },
    },
    executionEnd: {
      get(): Date | { value: Date } {
        const editPage = this as unknown as IEditPage;
        return editPage.editableDate || editPage.record?.executionDate || new Date();
      },
      set(newDate: Date): void {
        const editPage = this as unknown as IEditPage;
        editPage.editableDate = newDate;
      },
    },
  },
  methods: {
    async edit(): Promise<void> {
      const editPage = this as unknown as IEditPage;
      const record = editPage.record;
      record.executionDate = editPage.executionEnd.value;
      record.text = editPage.text;
      const diff = editPage.executionTime - record.executionTime;
      if (diff > 0) {
        const end = new Date();
        const start = new Date(end.getTime() - diff * 60 * 60 * 1e3);
        record.executionTime = editPage.executionTime;
        record.executionIntervals.push({ start, end });
      }
      await editPage.$store.dispatch('updateRecord', record);
      await editPage.$router.push('/main');
    },

    async closeForm(): Promise<void> {
      const editPage = this as unknown as IEditPage;
      await editPage.$router.push('/main');
    },
  },
  created() {
    VueRangeSlider.methods.handleKeyup = () => undefined;
    VueRangeSlider.methods.handleKeydown = () => undefined;
  },
  components: { VueRangeSlider, VueyeDatepicker },
};
</script>
