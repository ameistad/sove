<template>
  <div>
    <EntryLines :entries="entriesInRange"/>
  </div>
</template>

<script>
import EntryLines from '@/components/EntryLines'
export default {
  name: 'OverviewLinesComponent',
  props: {
    entriesInRange: {
      type: Array,
      required: true
    }
  },
  components: {
    EntryLines
  }
}
</script>
