<template>
  <div>
    <!-- Scale the SVG with input -->
    <input v-if="entries.length > 1" class="width-100" v-model="width" type="range" min="337" max="1537">

    <!-- SVG -->
    <svg
      :viewBox="viewBox"
      stroke="#474747"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">

      <symbol
        v-for="(entry, index) in entries"
        :key="`entry-${index}`"
        :id="`group-${index}`"
        stroke-width="1">

        <!-- Bar indicating time slept -->
        <rect x="1" y="10" height="9" width="335" fill="#fff"></rect>
        <rect
          :x="sleepBar(entry).x"
          y="10.5"
          :width="sleepBar(entry).width"
          height="8"
          stroke="none"
          fill="rgb(134,202,44)">
        </rect>

        <!-- Lines representing hours -->
        <line
          v-for="(hour, index) in 23"
          :key="index"
          :x1="1 + (hour * 13.9583)"
          :x2="1 + (hour * 13.9583)"
          y1="10"
          y2="19">
        </line>

        <!-- Line representing went to bed time -->
        <line
          :x1="wentToBedLine(entry)"
          :x2="wentToBedLine(entry)"
          y1="5"
          y2="23"
          stroke="red"
          stroke-width="2"
          stroke-linecap="round">
        </line>

        <!-- Line representing got out of bed -->
        <line
          :x1="gotOutOfBedLine(entry)"
          :x2="gotOutOfBedLine(entry)"
          y1="5"
          y2="23"
          stroke="blue"
          stroke-width="2"
          stroke-linecap="round">
          </line>

        <!-- Text displaying date -->
        <text x="0" y="6" stroke="none" font-size="8">{{ dateFormat(entry.date, 'Do MMMM') }}</text>
      </symbol>

      <use
        v-for="(entry, index) in entries"
        :href="`#group-${index}`"
        :key="index"
        x="0"
        :y="(index + 1) * 30">
        </use>

      <!-- Long lines representing the hours 24, 06 and 12 -->
      <text x="73" y="10" font-size="10">2400</text>
      <text x="157" y="10" font-size="10">0600</text>
      <text x="241" y="10" font-size="10">1200</text>
      <line x1="84.5" y1="15" x2="84.5" y2="99%" stroke-width="2" stroke-linecap="round"></line>
      <line x1="168.5" y1="15" x2="168.5" y2="99%" stroke-width="2" stroke-linecap="round"></line>
      <line x1="252.5" y1="15" x2="252.5" y2="99%" stroke-width="2" stroke-linecap="round"></line>
  </svg>
</div>
</template>

<script>
import { subDays, setHours, differenceInMinutes } from 'date-fns'
import EntryDataExtract from '@/mixins/EntryDataExtract'
import DateFormat from '@/mixins/DateFormat'

export default {
  name: 'EntryLines',
  mixins: [EntryDataExtract, DateFormat],
  props: {
    entries: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      width: 337
    }
  },
  methods: {
    sleepBar (entry) {
      const end = setHours(entry.date, 18)
      const start = subDays(end, 1)
      const extractedEntryData = this.entryDataExtract(entry.data)
      const fellAsleep = extractedEntryData.fellAsleep
      const timeAsleepInBed = extractedEntryData.timeAsleepInBed
      return {
        x: differenceInMinutes(fellAsleep, start) / 4.2985,
        width: timeAsleepInBed / 4.2985
      }
    },
    wentToBedLine (entry) {
      const start = subDays(setHours(entry.date, 18), 1)
      return differenceInMinutes(entry.data.wentToBed, start) / 4.2985
    },
    gotOutOfBedLine (entry) {
      const start = subDays(setHours(entry.date, 18), 1)
      return differenceInMinutes(entry.data.gotOutOfBed, start) / 4.2985
    }
  },
  computed: {
    viewBox () {
      const height = 50 + (30 * this.entries.length)
      return `0 0 ${this.width} ${height}`
    }
  }
}
</script>
