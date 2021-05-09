<template>
  <nav class="nav">
    <span class="nav_bar">
      <font-awesome-icon
        icon="bars"
        size="2x"
        class="nav__icon"
        v-bind:class="{ nav__icon_rotate: hasMenu }"
      />
      <input type="checkbox" name="" id="" v-model="hasMenu" class="luca-checkbox_hidden" />
    </span>
    <div class="nav__date">
      <span>{{ date | date }}</span>
      <vueye-datepicker class="nav__date_input" v-model="date" color="#4466ee" format="yyyy-mm-dd" />
    </div>
    <menu-bar v-if="hasMenu" />
    <h2 class="app__title">LUCA</h2>
    <div>
      <span class="nav__locale" @click.prevent="setLocale('en')">en</span>
      <span>/</span>
      <span class="nav__locale" @click.prevent="setLocale('ru')">ru</span>
    </div>
  </nav>
</template>

<script lang="ts">
import './navbar.scss';
import MenuBar from '../menu-bar/MenuBar.vue';
import VueyeDatepicker from 'vueye-datepicker';
import { INavbar } from './navbar.interface';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      date: new Date(),
      hasMenu: false,
    };
  },
  watch: {
    date(from, to): void {
      const band = this as unknown as INavbar;
      band.$store.dispatch('chandgeDate', (to?.value || to));
    },
  },

  methods: {
    ...mapActions(['setLocale']),
  },

  components: { MenuBar, VueyeDatepicker },
};
</script>
