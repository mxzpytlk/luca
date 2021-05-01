<template>
  <nav class="nav">
    <span class="nav_bar">
      <font-awesome-icon icon="bars" size="2x" @click.prevent=""/>
      <input type="checkbox" name="" id="" v-model="hasMenu" class="nav__icon_bar">
    </span>
    <span class="nav_date">{{ date | date }}</span>
    <menu-bar v-if="hasMenu"/>
    <h2 class="app__title">LUCA</h2>
  </nav>
</template>

<script>
import './navbar.scss';
import MenuBar from '../menu-bar/MenuBar';

export default {
  data() {
    return {
      date: new Date(),
      hasMenu: false,
    }
  },
  components: { MenuBar },
}
</script>
