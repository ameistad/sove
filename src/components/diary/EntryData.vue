<template>
  <div>
    <div class="entry-question">
      Når gikk du for å legge deg?
      <time-picker v-model="wentToBed"></time-picker>
    </div>

    <div class="entry-question">
      Når la du deg til for å sove?
      <time-picker v-model="triedToSleep"></time-picker>
    </div>

    <div class="entry-question">
      Hvor lang tid tok det før du sovnet?
      <time-duration v-model="durationBeforeSleep"></time-duration>
    </div>

    <div class="entry-question">
      Hvor mange oppvåkninger hadde du i løpet av natten, ikke medregnet sist gang du våknet?
      <number-picker v-model="nightAwakeTimes"></number-picker>
    </div>

    <div class="entry-question">
      Tilsammen, hvor lenge varte disse oppvåkningene?
      <time-duration v-model="nightAwakeDuration"></time-duration>
    </div>

    <div class="entry-question">
      Når våknet du siste gang?
      <time-picker v-model="finalAwakening"></time-picker>
    </div>

    <div class="entry-question">
      Når stod du opp om morgenen?
      <time-picker v-model="gotOutOfBed"></time-picker>
    </div>

    <div class="entry-question">
      Hvordan vil du vurere søvnkvaliteten din?
      <select v-model="sleepRating">
        <option value="1">Veldig dårlig</option>
        <option value="2">Dårlig</option>
        <option value="3">Middels</option>
        <option value="4">God</option>
        <option value="5">Veldig god</option>
      </select>
    </div>

    <div class="entry-question">
      Kommentarer
      <textarea v-model="comments"></textarea>
    </div>

    <div class="entry-question">
      Antall ganger du sov på dagtid i går?
      <number-picker v-model="daySleepTimes"></number-picker>

      <template v-if="daySleepTimes > 0">
        Hvor lenge sov du på dagtid?
        <time-duration v-model="daySleepDuration"></time-duration>
      </template>
    </div>

    <div class="entry-question">
      Tok du medisiner for å få sove?
      <input v-model="medication" type="checkbox"/>
      <template v-if="medication">
        <p>Skriv ned medikament, dose og tidspunkt.</p>
        <textarea
          v-model="medicationComment">
        </textarea>
      </template>
    </div>

    <div class="entry-question">
      Hvor mange alkoholholdige drikker drakk du i går?
      <number-picker v-model="alcoholDrinks"></number-picker>
      <template v-if="alcoholDrinks > 0">
        <p>Når drakk du den siste alholholdige drikken?</p>
        <time-picker v-model="lastDrinkTime"></time-picker>
      </template>
    </div>
  </div>
</template>

<script>
import { isAfter } from 'date-fns'
import TimePicker from '@/components/TimePicker'
import TimeDuration from '@/components/TimeDuration'
import NumberPicker from '@/components/NumberPicker'

export default {
  name: 'EntryDataComponent',
  props: {
    entryData: {
      type: Object,
      required: true
    }
  },
  computed: {
    wentToBed: {
      get () { return this.entryData.wentToBed },
      set (wentToBed) { this.$emit('update', { wentToBed }) }
    },
    triedToSleep: {
      get () { return this.entryData.triedToSleep },
      set (triedToSleep) { this.$emit('update', { triedToSleep }) }
    },
    durationBeforeSleep: {
      get () { return this.entryData.durationBeforeSleep },
      set (durationBeforeSleep) { this.$emit('update', { durationBeforeSleep }) }
    },
    nightAwakeTimes: {
      get () { return this.entryData.nightAwakeTimes },
      set (nightAwakeTimes) { this.$emit('update', { nightAwakeTimes }) }
    },
    nightAwakeDuration: {
      get () { return this.entryData.nightAwakeDuration },
      set (nightAwakeDuration) { this.$emit('update', { nightAwakeDuration }) }
    },
    finalAwakening: {
      get () { return this.entryData.finalAwakening },
      set (finalAwakening) { this.$emit('update', { finalAwakening }) }
    },
    gotOutOfBed: {
      get () { return this.entryData.gotOutOfBed },
      set (gotOutOfBed) { this.$emit('update', { gotOutOfBed }) }
    },
    sleepRating: {
      get () { return this.entryData.sleepRating },
      set (sleepRating) { this.$emit('update', { sleepRating }) }
    },
    comments: {
      get () { return this.entryData.comments },
      set (comments) { this.$emit('update', { comments }) }
    },
    daySleepTimes: {
      get () { return this.entryData.daySleepTimes },
      set (daySleepTimes) { this.$emit('update', { daySleepTimes }) }
    },
    daySleepDuration: {
      get () { return this.entryData.daySleepDuration },
      set (daySleepDuration) { this.$emit('update', { daySleepDuration }) }
    },
    medication: {
      get () { return this.entryData.medication },
      set (medication) { this.$emit('update', { medication }) }
    },
    medicationComment: {
      get () { return this.entryData.medicationComment },
      set (medicationComment) { this.$emit('update', { medicationComment }) }
    },
    alcoholDrinks: {
      get () { return this.entryData.alcoholDrinks },
      set (alcoholDrinks) { this.$emit('update', { alcoholDrinks }) }
    },
    lastDrinkTime: {
      get () { return this.entryData.lastDrinkTime },
      set (lastDrinkTime) { this.$emit('update', { lastDrinkTime }) }
    }
  },
  components: {
    TimePicker,
    TimeDuration,
    NumberPicker
  },
  watch: {
    entryQuestions () {
      this.$emit('updatedQuestions', this.$data)
    },
    wentToBed () {
      if (isAfter(this.wentToBed, this.triedToSleep)) {
        this.triedToSleep = this.wentToBed
      }
    },
    finalAwakening () {
      if (isAfter(this.finalAwakening, this.gotOutOfBed)) {
        this.gotOutOfBed = this.finalAwakening
      }
    }
  }
}
</script>

<style scoped>
  .entry-question {
    margin-bottom: 20px;
  }
</style>
