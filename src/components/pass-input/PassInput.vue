<template>
  <div class="pass__container" :key="key">
    <input
      required
      :placeholder="placeholder"
      v-bind:type="inputType"
      class="luca-input"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)">
    <font-awesome-icon icon="eye" class="pass__eye" @click.prevent="changePassVisibility"/>
  </div>
</template>

<script>
import './pass-input.scss';

export default {
  data() {
    return {
      inputType: 'password',
      key: 0,
    };
  },
  methods: {
    changePassVisibility() {
      this.inputType = this.inputType === 'password' ? 'text' : 'password';
      this.key += 1;
    },
  },
  props: ['placeholder', 'value'],
};
</script>