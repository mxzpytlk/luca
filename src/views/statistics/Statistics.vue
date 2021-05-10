<template>
  <div class="statistics">
    <div class="statistics__container">
      <vue-simple-suggest
        :placeholder="'enter_sector_record' | locale"
        v-model="textLookingFor"
        :list="suggestionTexts"
        :filter-by-query="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import './statistics.scss';
import VueSimpleSuggest from 'vue-simple-suggest';
import { mapGetters } from 'vuex';
import { IStatistics } from './statistics.interface';

export default {
  data() {
    return {
      textLookingFor: '',
    };
  },
  computed: {
    ...mapGetters(['sectors']),
    suggestionTexts(): string[] {
      const statistics = this as unknown as IStatistics;
      const names: string[] = [];
      for (const sector of statistics.sectors) {
        names.push(sector.title);
        for (const record of sector.records) {
          names.push(record.text);
        }
      }
      return names;
    },
  },
  components: { VueSimpleSuggest },
};

</script>
