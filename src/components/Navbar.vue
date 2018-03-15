<template>
  <div class="navbar">
    <Logo/>
    <NavbarTabs/>
  </div>
</template>

<script>
import NavbarTabs from './NavbarTabs'
import Logo from './Logo'

export default {
  name: 'NavbarComponent',
  components: {
    NavbarTabs,
    Logo
  }
}
</script>
<style lang="scss" scoped>
  @import '../styles/color-scheme';
  .navbar {
    display: flex;
    justify-content: space-between;
    border-radius: 3px;
    width: 100%;
    padding: 10px 0;
  }
  .nav-item {
    margin: 0 10px;
  }
</style>
