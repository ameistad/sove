/*
  Redirects to the entry for the current date.
*/

<template>
  <loading></loading>
</template>

<script>
import { format } from 'date-fns'
import Loading from '@/components/Loading'

export default {
  name: 'Start',
  beforeMount () {
    this.$router.push({ name: 'entry', params: { date: format(new Date(), 'YYYY-MM-DD') } })
  },
  components: {
    Loading
  }
}
</script>
