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
import { xAxisAngle } from '@/core/utills/geometry.utills';

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
      const eventPoint = event.changedTouches[0];
      slider.startPoint = { x: eventPoint.clientX, y: eventPoint.clientY };
    },

    swipeEnd(event: TouchEvent) {
      const slider = this as unknown as ISlider;
      const eventPoint = event.changedTouches[0];
      const startPoint = slider.startPoint;
      const endPoint = { x: eventPoint.clientX, y: eventPoint.clientY };
      const angle = xAxisAngle(slider.startPoint, endPoint);

      if (Math.abs(angle) > Math.PI / 7) {
        return;
      }

      if (startPoint.x > endPoint.x && slider.position < slider.maxCount - 1) {
        slider.position += 1;
      } else if (startPoint.x < endPoint.x && slider.position > 0) {
        slider.position -= 1;
      }
    },
  },
  props: ['maxCount'],
};
</script>
