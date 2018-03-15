<template>
  <div class="time-duration">
    <input
      :value="parsedValue"
      @click="showTimeDuration = !showTimeDuration"
      type="text"
      readonly>
    <div v-if="showTimeDuration" @click="showTimeDuration = false" class="time-duration-overlay"></div>
    <div v-show="showTimeDuration" class="time-duration-select">
      <ul>
        <li class="">Timer</li>
        <li
          v-for="(n, index) in range(0, 24)"
          :key="index"
          @click="setDuration('hours', n)"
          :class="{ 'time-duration-select-active': n === value.hours }">
          {{ n }}
        </li>
      </ul>
      <ul>
        <li>Minutter</li>
        <li
          v-for="(n, index) in range(0, 59, 5)"
          :key="index"
          @click="setDuration('minutes', n)"
          :class="{ 'time-duration-select-active': n === value.minutes }">
          {{ n }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import range from 'lodash.range'

export default {
  name: 'TimeDurationComponent',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showTimeDuration: false
    }
  },
  computed: {
    parsedValue () {
      if (this.value) {
        const { hours, minutes } = this.value
        if (hours === 0) {
          return `${minutes} minutter`
        }
        return `${hours} timer og ${minutes} minutter`
      }
      return '00:00'
    }
  },
  methods: {
    setDuration (unit, n) {
      let { hours, minutes } = this.value
      if (unit === 'hours') {
        hours = n
      } else {
        minutes = n
      }
      this.$emit('input', { hours, minutes })
    },
    range
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/color-scheme';

  .time-duration {
    position: relative;
  }
  .time-duration-select {
    position: absolute;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
    align-items: stretch;
    background-color: $white;
    top: calc(2em + 2px);
    left: 0;
    width: 10em;
    height: 10em;
    overflow: hidden;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
  .time-duration-select ul {
    padding: 0;
    margin: 0;
    list-style: none;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .time-duration-select ul li {
    text-align: center;
    cursor: pointer;
  }
  .time-duration-select-active {
    background-color: $dark-grey;
    margin: 0 8px;
    border-radius: 3px;
    color: $white;
  }
  .time-duration-overlay {
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
