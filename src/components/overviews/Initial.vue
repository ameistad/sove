<template>
  <div>
    <table v-if="entriesWithExtractedData.length > 0">
      <tr>
        <th>Dager valgt</th>
        <td>{{ days }}</td>
      </tr>
      <tr>
        <th>Registreringer</th>
        <td>{{ entriesInRange.length }} av {{ entries.length }}</td>
      </tr>
      <tr>
        <th>Søvneffektivitet</th>
        <td>{{ averageSleepEfficiency }}%</td>
      </tr>
      <tr>
        <th>Total tid sovet</th>
        <td>{{ timeFormat(averageTimeSlept) }}</td>
      </tr>
      <tr>
        <th>Total tid sovet i sengen</th>
        <td>{{ timeFormat(averageTimeSleptInBed) }}</td>
      </tr>
      <tr>
        <th>Tid i sengen</th>
        <td>{{ timeFormat(averageTimeInBed) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import EntryDataExtract from '@/mixins/EntryDataExtract'
import TimeFormat from '@/mixins/TimeFormat'

export default {
  name: 'OverviewInitialComponent',
  mixins: [EntryDataExtract, TimeFormat],
  props: {
    entries: {
      type: Array,
      required: true
    },
    entriesInRange: {
      type: Array,
      required: true
    },
    days: {
      type: Number,
      required: true
    }
  },
  computed: {
    entriesWithExtractedData () {
      return this.entriesInRange.map(entry => {
        const data = {...entry.data, ...this.entryDataExtract(entry.data)}
        return { date: entry.date, data }
      })
    },
    averageSleepEfficiency () {
      return Math.round(this.entriesWithExtractedData
        .map(entry => entry.data.sleepEfficiency)
        .reduce((acc, current) => acc + current, 0) / this.entriesWithExtractedData.length, 2)
    },
    averageTimeSlept () {
      return this.entriesWithExtractedData
        .map(entry => entry.data.timeAsleepTotal)
        .reduce((acc, current) => acc + current, 0) / this.entriesWithExtractedData.length
    },
    averageTimeSleptInBed () {
      return this.entriesWithExtractedData
        .map(entry => entry.data.timeAsleepInBed)
        .reduce((acc, current) => acc + current, 0) / this.entriesWithExtractedData.length
    },
    averageTimeInBed () {
      return this.entriesWithExtractedData
        .map(entry => entry.data.timeInBed)
        .reduce((acc, current) => acc + current, 0) / this.entriesWithExtractedData.length
    }
  }
}
</script>
