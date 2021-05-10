<template>
  <div class="workspace">
    <div class="workspace__container" v-if="!isMobile">
      <band id="left"/>
      <router-view id="right"/>
    </div>
    <slider :maxCount="2" ref="slider" v-if="isMobile">
      <band id="left"/>
      <router-view id="right"/>
    </slider>
    <acount />
  </div>
</template>

<script lang="ts">
import './workspace.scss';
import Band from '../../components/band/Band.vue';
import Acount from '../../components/acount/Acount.vue';
import Slider from '../../components/slider/Slider.vue';
import { IComponent } from '@/core/interfaces/component.interface';
import device from 'current-device';
import { ISlider } from '@/components/slider/slider.interface';
import { RouterPath } from '@/core/enums/router-path';
import { Route } from 'vue-router';

export default {
  computed: {
    isMobile() {
      return device.mobile();
    },
  },
  async mounted() {
    const workspace = this as unknown as IComponent;
    await workspace.$store.dispatch('loadRecords');
  },
  watch: {
    $route(from: Route, to: Route) {
      const workspace = this as unknown as IComponent;
      const slider = workspace.$refs.slider as ISlider;
      if (from.path.endsWith(RouterPath.ACOUNT) || to.path.endsWith(RouterPath.ACOUNT) || !device.mobile()) {
        return;
      }

      if (from.path === RouterPath.MAIN) {
        slider.position = 0;
      } else {
        slider.position = 1;
      }
    },
  },
  components: { Band, Acount, Slider },
};
</script>

