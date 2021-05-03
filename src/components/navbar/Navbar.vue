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
  </nav>
</template>

<script>
import './navbar.scss';
import MenuBar from '../menu-bar/MenuBar';
import VueyeDatepicker from 'vueye-datepicker';

export default {
  data() {
    return {
      date: new Date(),
      hasMenu: false,
    };
  },
  watch: {
    date(from, to) {
      this.$store.dispatch('chandgeDate', (to?.value || to));
    },
  },
  components: { MenuBar, VueyeDatepicker },
};
</script>
