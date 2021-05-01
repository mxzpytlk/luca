<template>
  <div class="container">
    <form class="delete__form" :key="key" @submit.prevent="deleteSectors">
      <span
        v-for="sector in sectors"
        :key="sector.id"
        class="delete__item"
        v-bind:class="{ 'delete__item_select' : isSectorRemoving(sector) }"
        @click.prevent="select(sector)"
      >
          {{sector.title}}
      </span>
      <input type="submit" value="Delete" class="delete__btn">
    </form>
  </div>
</template>


<script lang="js">
import './delete-sector.scss';
import { mapGetters } from 'vuex';
import { ISector } from '@/core/interfaces/sector.interface';

export default {
  data() {
    return {
      removingSectors: new Set(),
      key: 0,
    };
  },
  methods: {
    select(sector) {
      if (this.removingSectors.has(sector)) {
        this.removingSectors.delete(sector);
      } else {
        this.removingSectors.add(sector);
      }
      this.key++;
    },
    isSectorRemoving(sector) {
      return this.removingSectors.has(sector);
    },
    async deleteSectors() {
      await this.$store.dispatch('deleteSectors', Array.from(this.removingSectors));
    },
  },
  computed: mapGetters(['sectors']),
};
</script>