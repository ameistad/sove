<template>
  <div>
    <EntryLines :entries="[entry]"/>
    <table class="width-100">
      <tr>
        <th>Leggetid</th>
        <td>{{ dateFormat(entryWithExtractedData.wentToBed, 'HH.mm') }}</td>
      </tr>
      <tr>
        <th>Sovnet</th>
        <td>{{ dateFormat(entryWithExtractedData.fellAsleep, 'HH.mm') }}</td>
      </tr>
      <tr>
        <th>Våknet</th>
        <td>{{ dateFormat(entryWithExtractedData.finalAwakening, 'HH.mm') }}</td>
      </tr>
      <tr>
        <th>Stod opp av sengen</th>
        <td>{{ dateFormat(entryWithExtractedData.gotOutOfBed, 'HH.mm') }}</td>
      </tr>
      <tr>
        <th>Søvneffektivitet</th>
        <td>{{ entryWithExtractedData.sleepEfficiency }}%</td>
      </tr>
      <tr>
        <th>Tid sovet</th>
        <td>{{ timeFormat(entryWithExtractedData.timeAsleepTotal) }}</td>
      </tr>
      <tr>
        <th>Tid sovet i sengen</th>
        <td>{{ timeFormat(entryWithExtractedData.timeAsleepInBed) }}</td>
      </tr>
      <tr>
        <th>Tid i sengen</th>
        <td>{{ timeFormat(entryWithExtractedData.timeInBed) }}</td>
      </tr>
      <tr v-if="entry.data.comments">
        <th>Kommentarer</th>
        <td>{{ entry.data.comments }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import EntryDataExtract from '@/mixins/EntryDataExtract'
import DateFormat from '@/mixins/DateFormat'
import TimeFormat from '@/mixins/TimeFormat'
import EntryLines from '@/components/EntryLines'

export default {
  name: 'EntryDetailComponent',
  mixins: [EntryDataExtract, DateFormat, TimeFormat],
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  computed: {
    entryWithExtractedData () {
      return this.entryDataExtract(this.entry.data)
    }
  },
  components: {
    EntryLines
  }
}
</script>
