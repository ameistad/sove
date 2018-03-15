<template>
  <div class="navbar-tabs">
    <router-link
      :to="{ name: 'entry', params: { date: todayString } }"
      :class="{ 'navbar-tab-active': $route.name === 'entry' }"
      class="navbar-tab">
      Dagbok
    </router-link>
    <router-link
      :to="{ name: 'overview' }"
      :class="{ 'navbar-tab-active': $route.name === 'overview' }"
      class="navbar-tab">
      Oversikt
    </router-link>
  </div>
</template>

<script>
import { format } from 'date-fns'
export default {
  name: 'NavbarTabsComponent',
  data () {
    return {
      todayString: format(new Date(), 'YYYY-MM-DD')
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/color-scheme';
.navbar-tabs {
  display: flex;
  font-weight: 700;
  justify-content: space-between;
}
.navbar-tab {
  text-decoration: none;
  margin: 0 5px;
  padding: 0 10px;
}
.navbar-tab-active {
  border-bottom: 5px solid $light-blue;
}
</style>
