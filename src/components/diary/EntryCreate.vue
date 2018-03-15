<template>
  <div class="create-entry">
    <div class="create-entry-questions">
      <entry-data
        :entryData="entryData"
        @update="handleUpdatedData">
      </entry-data>
    </div>
    <div class="create-entry-control">
      <button @click="createEntry" class="btn create-entry-control-sticky">
        Lagre registrering
      </button>
    </div>
  </div>
</template>

<script>
import { subDays, setHours } from 'date-fns'
import EntryData from './EntryData'
import EntryDataExtract from '@/mixins/EntryDataExtract'

export default {
  name: 'EntryCreateComponent',
  mixins: [EntryDataExtract],
  props: {
    entryDate: {
      type: Date,
      required: true
    }
  },
  data () {
    const today = this.entryDate
    const yesterday = subDays(today, 1)

    return {
      entryData: {
        wentToBed: setHours(yesterday, 21),
        triedToSleep: setHours(yesterday, 21),
        durationBeforeSleep: { hours: 0, minutes: 0 },
        nightAwakeTimes: 0,
        nightAwakeDuration: { hours: 0, minutes: 0 },
        finalAwakening: setHours(today, 7),
        gotOutOfBed: setHours(today, 7),
        sleepRating: 3,
        comments: '',
        daySleep: false,
        daySleepTimes: 0,
        daySleepDuration: { hours: 0, minutes: 0 },
        medication: false,
        medicationComment: '',
        alcoholDrinks: 0,
        lastDrinkTime: setHours(yesterday, 21)
      }
    }
  },
  methods: {
    handleUpdatedData (data) {
      this.entryData = Object.assign({}, this.entryData, data)
    },
    createEntry () {
      this.$store.dispatch('createEntry', { date: this.entryDate, data: this.entryData })
    }
  },
  computed: {
    entryExtractedData () {
      return this.entryDataExtract(this.$data)
    }
  },
  components: {
    EntryData
  }
}
</script>

<style>
  .create-entry {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-areas: "questions control";
    grid-gap: 20px;
  }
  .create-entry-control {
    grid-area: control;
  }
  .create-entry-control-sticky {
    position: sticky;
    top: 20px;
  }
  .create-entry-questions {
    grid-area: questions;
  }
  .create-entry-question {
    margin-bottom: 20px;
  }
</style>
