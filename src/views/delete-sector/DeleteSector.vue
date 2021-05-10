<template>
  <div class="delete__container">
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
      <input type="submit" :value="'delete' | locale" class="delete__btn">
    </form>
  </div>
</template>


<script lang="ts">
import './delete-sector.scss';
import { mapGetters } from 'vuex';
import { ISector } from '@/core/interfaces/sector.interface';
import { IDeleteSector } from './delete-sector.interface';

export default {
  data() {
    return {
      removingSectors: new Set(),
      key: 0,
    };
  },
  methods: {
    select(sector: ISector): void {
      const deletePage = this as unknown as IDeleteSector;
      if (deletePage.removingSectors.has(sector)) {
        deletePage.removingSectors.delete(sector);
      } else {
        deletePage.removingSectors.add(sector);
      }
      deletePage.key++;
    },

    isSectorRemoving(sector: ISector): boolean {
      const deletePage = this as unknown as IDeleteSector;
      return deletePage.removingSectors.has(sector);
    },

    async deleteSectors(): Promise<void> {
      const deletePage = this as unknown as IDeleteSector;
      await deletePage.$store.dispatch('deleteSectors', Array.from(deletePage.removingSectors));
    },
  },
  computed: mapGetters(['sectors']),
};
</script>