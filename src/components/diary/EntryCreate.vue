<template>
  <div class="create-entry">
    <div class="create-entry-questions">
      <entry-data
        :entryData="entryData"
        @update="handleUpdatedData">
      </entry-data>
    </div>
    <div class="create-entry-control">
      <button @click="createEntry" class="btn width-100 create-entry-control-btn">
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

<style scoped>
  .create-entry {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-areas: "questions control";
    grid-gap: 20px;
  }
  .create-entry-control {
    grid-area: control;
  }
  .create-entry-control-btn {
    position: sticky;
    top: 20px;
  }
  .create-entry-questions {
    grid-area: questions;
  }
  .create-entry-question {
    margin-bottom: 20px;
  }

  @media (max-width: 650px) {
    .create-entry {
      display: block;
    }

    .create-entry-control {
      position: fixed;
      z-index: 1000;
      left: 0;
      bottom: 0;
      width: 100%;
      text-align: center;
      background-color: white;
      padding: 20px 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    }
  }
</style>
