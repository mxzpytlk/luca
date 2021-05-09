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

<script>
import './statistics.scss';
import VueSimpleSuggest from 'vue-simple-suggest';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      textLookingFor: '',
    };
  },
  computed: {
    ...mapGetters(['sectors']),
    suggestionTexts() {
      const names = [];
      for (const sector of this.sectors) {
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
