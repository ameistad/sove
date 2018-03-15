<template>
  <vuejs-date-picker
    v-model="computedValue"
    language="nb-no"
    :full-month-name="true"
    :monday-first="true"
    :inline="inline"
    :format="customDate"
    :highlighted="highlighted"
    :calendar-class="calendarClass">
  </vuejs-date-picker>
</template>

<script>
import VuejsDatePicker from 'vuejs-datepicker'
import DateFormat from '@/mixins/DateFormat'
export default {
  name: 'DatePickerComponent',
  mixins: [DateFormat],
  props: {
    value: {
      type: Date,
      required: true
    },
    inline: {
      type: Boolean,
      default: false
    },
    highlighted: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      calendarClass: 'calendar-class'
    }
  },
  computed: {
    computedValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    customDate (date) {
      return this.dateFormat(date, 'Do MMMM YYYY')
    }
  },
  components: {
    VuejsDatePicker
  }
}
</script>

<style lang="scss">
  @import '../styles/color-scheme';

  .calendar-class {
    border-radius: 3px;
    margin-top: 10px;
  }
  .cell.highlighted {
    background: $white !important;
    border-bottom: 1px solid $red !important;
  }
  .cell.selected {
    background: $light-blue !important;
  }
  .cell:hover {
    border: 1px solid $dark-grey !important;
  }
</style>
