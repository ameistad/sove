<template>
  <div class="container" id="app">
    <Navbar/>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath"/>
    </transition>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
  @import './styles/color-scheme';
  @import './styles/base';
  @import './styles/helpers';
  @import './styles/buttons';
  @import './styles/forms';
  @import './styles/tables';

  .container {
    display: grid;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }

  // Transitions when changing routes
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
