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

<script lang="ts">
import './pass-input.scss';
import { IPassInput } from './pass-input.interface';

export default {
  data() {
    return {
      inputType: 'password',
      key: 0,
    };
  },
  methods: {
    changePassVisibility(): void {
      const passInput = this as NonNullable<IPassInput>;
      passInput.inputType = passInput.inputType === 'password' ? 'text' : 'password';
      passInput.key += 1;
    },
  },
  props: ['placeholder', 'value'],
};
</script>