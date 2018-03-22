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
        :id="`group-${index}`"
        stroke-width="1">

        <!-- Boxes representing each hour -->
        <rect
          v-for="hour in 24"
          :x="0.5 + ((hour - 1) * 14)"
         y="10"
         width="14"
         height="9"
         :fill="fill(entry, hour)">
         </rect>

        <!-- Down arrow for bedtime -->
        <g :transform="arrowPosition(entry.date, entry.data.wentToBed)" fill="#474747">
          <polygon points="149.5 97 137 72 162 72"></polygon>
        </g>
        <g :transform="arrowPosition(entry.date, entry.data.gotOutOfBed)" fill="#474747">
          <polygon points="149.5 97 137 72 162 72"></polygon>
        </g>

        <!-- Text displaying date -->
        <text x="0" y="6" stroke="none" font-size="8">{{ dateFormat(entry.date, 'Do MMMM') }}</text>
      </symbol>

      <use v-for="(entry, index) in entries" :href="`#group-${index}`" x="0" :y="(index + 1) * 30"></use>

      <text x="73" y="10" font-size="10">2400</text>
      <text x="157" y="10" font-size="10">0600</text>
      <text x="241" y="10" font-size="10">1200</text>
      <line x1="84.5" y1="15" x2="84.5" y2="100%" stroke-width="2"></line>
      <line x1="168.5" y1="15" x2="168.5" y2="100%" stroke-width="2"></line>
      <line x1="252.5" y1="15" x2="252.5" y2="100%" stroke-width="2"></line>
  </svg>
</div>
</template>

<script>
import range from 'lodash.range'
import { subDays, setHours, addHours, addMinutes, getMinutes, isWithinRange, differenceInHours } from 'date-fns'
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
    fill (entry, hour) {
      hour = addHours(setHours(subDays(entry.date, 1), 18), hour)
      const extractedEntryData = this.entryDataExtract(entry.data)

      let fellAsleep = addMinutes(extractedEntryData.fellAsleep, 1)
      fellAsleep = getMinutes(fellAsleep) > 35 ? addHours(fellAsleep, 1) : fellAsleep

      const isAsleepAtHour = isWithinRange(
        hour,
        fellAsleep,
        extractedEntryData.finalAwakening)
      return isAsleepAtHour ? 'rgb(134,202,44)' : '#fff'
    },
    arrowPosition (date, time) {
      const start = setHours(subDays(date, 1), 18)
      const difference = differenceInHours(time, start)
      const positions = range(25).map((r, i) => -149 + (i * 14))
      const position = positions[difference]
      return `translate(${position}, -88)`
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
<!-- hour-1" x="0.5" y="0.5" width="14"
hour-2" x="14.5" y="0.5" width="14"
hour-3" x="28.5" y="0.5" width="14"
hour-4" x="42.5" y="0.5" width="14"
hour-5" x="56.5" y="0.5" width="14"
hour-6" x="70.5" y="0.5" width="14"
hour-7" x="84.5" y="0.5" width="14"
hour-8" x="98.5" y="0.5" width="14"
hour-9" x="112.5" y="0.5" width="14"
hour-10" x="126.5" y="0.5" width="14"
hour-11" x="140.5" y="0.5" width="14"
hour-12" x="154.5" y="0.5" width="14"
hour-13" x="168.5" y="0.5" width="14"
hour-14" x="182.5" y="0.5" width="14"
hour-15" x="196.5" y="0.5" width="14"
hour-16" x="210.5" y="0.5" width="14"
hour-17" x="224.5" y="0.5" width="14"
hour-18" x="238.5" y="0.5" width="14"
hour-19" x="252.5" y="0.5" width="14"
hour-20" x="266.5" y="0.5" width="14"
hour-21" x="280.5" y="0.5" width="14"
hour-22" x="294.5" y="0.5" width="14"
hour-23" x="308.5" y="0.5" width="14"
hour-24" x="322.5" y="0.5" width="14" -->
