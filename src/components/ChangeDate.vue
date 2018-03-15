<template>
  <div>
    <date-picker
      v-model="date"
      :highlighted="{ dates: savedDates }">
    </date-picker>
  </div>
</template>

<script>
import { format } from 'date-fns'
import DatePicker from '@/components/DatePicker'

export default {
  name: 'ChangeDateComponent',
  props: {
    initialDate: {
      type: Date,
      required: true
    },
    savedDates: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      date: this.initialDate
    }
  },
  watch: {
    date () {
      this.$router.push({ name: 'entry', params: { date: format(this.date, 'YYYY-MM-DD') } })
    }
  },
  components: {
    DatePicker
  }
}
</script>
