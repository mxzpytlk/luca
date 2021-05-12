<template>
  <div class="slider">
    <div
      class="slider__container"
      @touchstart="swipeStart"
      @touchend="swipeEnd"
      v-bind:style="{ transform: 'translate(' + (-100) * position + '%)' }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import './slider.scss';
import { ISlider } from './slider.interface';

export default {
  data() {
    return {
      startPoint: undefined,
      position: 1,
    };
  },
  methods: {
    swipeStart(event: TouchEvent) {
      const slider = this as unknown as ISlider;
      slider.startPoint = event.changedTouches[0].clientX;
    },

    swipeEnd(event: TouchEvent) {
      const slider = this as unknown as ISlider;
      const endPoint = event.changedTouches[0].clientX;
      const startPoint = slider.startPoint;
      if (Math.abs(startPoint - endPoint) < 40) {
        return;
      }

      if (startPoint > endPoint && slider.position < slider.maxCount - 1) {
        slider.position += 1;
      } else if (startPoint < endPoint && slider.position > 0) {
        slider.position -= 1;
      }
    },
  },
  props: ['maxCount'],
};
</script>
