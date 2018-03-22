<template>
  <div class="entry">
    <div class="entry-date margin-bottom-2">
      <h3>Dato</h3>
      <change-date :initialDate="date" :savedDates="savedDates"></change-date>
    </div>
    <div v-if="dateEntry">
      <entry-view-edit
        :entryIndex="dateEntryIndex"
        :entry="dateEntry">
      </entry-view-edit>
    </div>
    <div v-else>
      <button v-if="!showCreateEntry" @click="showCreateEntry = true" class="btn">
        Ny registrering
      </button>
      <template v-if="showCreateEntry">
        <entry-create :entryDate="date"></entry-create>
      </template>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import DateFormat from '@/mixins/DateFormat'
import ChangeDate from '@/components/ChangeDate'
import EntryCreate from '@/components/diary/EntryCreate'
import EntryViewEdit from '@/components/diary/EntryViewEdit'

export default {
  name: 'Entry',
  mixins: [DateFormat],
  data () {
    // Check if date contains a string like '2018-04-11'
    const dateRegEx = /\d{4}-\d{2}-\d{2}/
    const routeDate = this.$route.params.date
    return {
      date: dateRegEx.test(routeDate) ? new Date(routeDate) : new Date(),
      showCreateEntry: false
    }
  },
  computed: {
    entries () {
      return this.$store.getters.entries
    },
    dateEntryIndex () {
      function getStringDate (date) { return format(date, 'YYYY-MM-DD') }
      return this.entries
        .findIndex(entry => getStringDate(entry.date) === getStringDate(this.date))
    },
    dateEntry () {
      function parseEntry (entry) {
        if (entry) {
          const {
            wentToBed,
            triedToSleep,
            finalAwakening,
            gotOutOfBed,
            lastDrinkTime,
            ...entryData
          } = entry.data
          return {
            date: entry.date,
            data: {
              wentToBed: new Date(wentToBed),
              triedToSleep: new Date(triedToSleep),
              finalAwakening: new Date(finalAwakening),
              gotOutOfBed: new Date(gotOutOfBed),
              lastDrinkTime: new Date(lastDrinkTime),
              ...entryData
            }
          }
        }
        return undefined
      }
      return parseEntry(this.entries[this.dateEntryIndex])
    },
    savedDates () {
      return this.entries.map(entry => new Date(entry.date))
    }
  },
  components: {
    ChangeDate,
    EntryCreate,
    EntryViewEdit
  }
}
</script>
