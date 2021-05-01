<template>
  <div class="luca-container">
    <navbar />
    <workspace />
  </div>
</template>

<script>
import './luca-container.scss';
import Navbar from '../../components/navbar/Navbar';
import Workspace from '../workspace/Workspace';

export default {
  components: { Navbar, Workspace },
};
</script>
