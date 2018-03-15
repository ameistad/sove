<template>
  <div class="timepicker">
    <input
      :value="parsedValue"
      @click="handleShowTimePicker"
      type="text"
      readonly>

    <div
      v-if="showTimePicker"
      @click="showTimePicker = false"
      class="time-picker-overlay">
    </div>

    <div v-show="showTimePicker" class="timepicker-select">

      <div class="timepicker-select-unit" ref="hours">
        <span class="timepicker-select-unit-header">
          Time
        </span>
        <span class="timepicker-select-unit-spacer">-</span>
        <span
          v-for="(hour, index) in hours"
          :key="index"
          @click="setTime('hour', hour)"
          :ref="`hour-${index}`"
          :class="{
            'timepicker-select-active': dateFormat(hour, 'H') === dateFormat(value, 'H')
          }"
          class="timepicker-select-unit-item">
          {{ dateFormat(hour, 'HH') }}
        </span>
      </div>

      <div class="timepicker-select-unit" ref="minutes">
        <span class="timepicker-select-unit-header">Minutter</span>
        <span class="timepicker-select-unit-spacer">-</span>
        <span
          v-for="(minute, index) in range(0, 59, 5)"
          :key="index"
          @click="setTime('minutes', minute)"
          :ref="`minute-${minute}`"
          :class="{ 'timepicker-select-active': Number(dateFormat(value, 'm')) === minute }"
          class="timepicker-select-unit-item">
          {{ minuteDecideZero(minute) }}
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import range from 'lodash.range'
import rangeRight from 'lodash.rangeright'
import { subHours, addHours, setMinutes } from 'date-fns'
import DateFormat from '@/mixins/DateFormat'

export default {
  name: 'TimePickerComponent',
  mixins: [DateFormat],
  props: {
    // Start date as value
    value: {
      type: Date,
      required: true
    }
  },
  data () {
    return {
      hours: [
        ...rangeRight(1, 12).map(n => subHours(this.value, n)),
        this.value,
        ...range(1, 13).map(n => addHours(this.value, n))
      ],
      showTimePicker: false
    }
  },
  computed: {
    parsedValue () {
      return this.dateFormat(this.value, 'Do MMMM kl. HH:mm')
    }
  },
  methods: {
    setTime (unit, n) {
      let date = this.value
      if (unit === 'hour') {
        const minutes = this.dateFormat(this.value, 'm')
        date = n
        date = setMinutes(date, minutes)
      } else {
        date = setMinutes(date, n)
      }
      this.$emit('input', date)
    },
    handleShowTimePicker () {
      this.showTimePicker = !this.showTimePicker
      // Scroll to hour and minutes when opening picker.
      this.$nextTick(() => {
        const hourIndex = this.hours.findIndex(hour => hour === this.value)
        const hourEl = this.$refs[`hour-${hourIndex}`]
        const hourOffsetTop = hourEl ? hourEl[0].offsetTop : 0
        this.$refs['hours'].scrollTop = hourOffsetTop - 18

        const minute = this.dateFormat(this.value, 'm')
        const minuteEl = this.$refs[`minute-${minute}`]
        const minuteOffsetTop = minuteEl ? minuteEl[0].offsetTop : 0
        this.$refs['minutes'].scrollTop = minuteOffsetTop - 18
      })
    },
    minuteDecideZero (minute) { return minute < 10 ? `0${minute}` : minute },
    range
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/color-scheme';

  .timepicker {
    position: relative;
  }
  .timepicker-date {
    padding-left: 5px;
    font-size: .7rem;
  }
  .timepicker-select {
    position: absolute;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
    align-items: stretch;
    background-color: #fff;
    top: calc(2em + 2px);
    left: 0;
    width: 10em;
    height: 10em;
    overflow: hidden;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
  .timepicker-select-unit {
    flex: 1;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .timepicker-select-unit-header {
    position: absolute;
    background-color: $white;
    width: 100%;
    font-weight: 700;
  }
  .timepicker-select-unit-item {
    display: block;
    text-align: center;
    cursor: pointer;
  }
  .timepicker-select-unit-spacer {
    margin-bottom: 10px;
  }
  .timepicker-select-active {
    background-color: $dark-grey;
    margin: 0 8px;
    border-radius: 3px;
    color: $white;
  }
  .time-picker-overlay {
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
