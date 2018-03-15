<template>
  <div>
    <h3>Datoer</h3>
    <div class="overview-selector">
      <date-picker v-model="startDate"></date-picker>
      <date-picker v-model="endDate"></date-picker>
      <select v-model="view">
        <option value="initial">Oppsummering</option>
        <option value="lines">Linjert dagbok</option>
      </select>
    </div>
    <p v-if="isAfter(startDate, startOfToday())">Dato i fremtiden?</p>
    <div class="margin-top-2" v-if="entriesInRange.length > 0">
      <component
        :is="currentView"
        :entries="entries"
        :entriesInRange="entriesInRange"
        :days="daysInRange">
      </component>
    </div>
    <p class="margin-top-2" v-else>Ingen registreringer i perioden.</p>
  </div>
</template>

<script>
import { startOfToday, addDays, subDays, isWithinRange, isAfter, differenceInDays } from 'date-fns'
import DatePicker from '@/components/DatePicker'
import InitialOverview from '@/components/overviews/Initial'
import LinesOverview from '@/components/overviews/Lines'

const endDate = startOfToday()
const startDate = subDays(endDate, 14)

export default {
  name: 'Overview',
  data () {
    return {
      startDate,
      endDate,
      view: 'initial'
    }
  },
  methods: { isAfter, startOfToday },
  watch: {
    startDate () {
      if (isAfter(this.startDate, this.endDate)) {
        this.endDate = this.startDate
      }
    }
  },
  computed: {
    entries () {
      return this.$store.getters.entries
    },
    entriesInRange () {
      return this.entries
        .filter(entry => isWithinRange(new Date(entry.date), this.startDate, addDays(this.endDate, 1)))
    },
    daysInRange () {
      return differenceInDays(this.endDate, this.startDate)
    },
    currentView () {
      const views = {
        'initial': InitialOverview,
        'lines': LinesOverview
      }
      return views[this.view]
    }
  },
  components: {
    DatePicker
  }
}
</script>

<style>
  .overview-selector {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
</style>
