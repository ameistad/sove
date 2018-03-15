import { differenceInMinutes, addMinutes } from 'date-fns'

function getDurationMinutes (duration) {
  return (duration.hours * 60) + duration.minutes
}

export default {
  methods: {
    entryDataExtract (entryData) {
      // Parse the initial entry data
      const wentToBed = new Date(entryData.wentToBed)
      const triedToSleep = new Date(entryData.triedToSleep)
      const finalAwakening = new Date(entryData.finalAwakening)
      const gotOutOfBed = new Date(entryData.gotOutOfBed)

      // Helpers
      const fellAsleep = addMinutes(triedToSleep, getDurationMinutes(entryData.durationBeforeSleep))

      /*
        Calculated entry data.
        - timeInBed - return total time spent in bed in minutes.
        - timeAsleepInBed - return total time slept in bed in minutes.
        - timeAsleepTotal - return total time slept total in minutes.
        - sleepEfficiency - return percentage of sleep compared to time in bed.
      */
      const timeInBed = differenceInMinutes(gotOutOfBed, wentToBed)
      const timeAsleepInBed = differenceInMinutes(finalAwakening, fellAsleep) - getDurationMinutes(entryData.nightAwakeDuration)
      const timeAsleepTotal = timeAsleepInBed + getDurationMinutes(entryData.daySleepDuration)
      const sleepEfficiency = Math.round(timeAsleepInBed / timeInBed * 100, 2)
      return {
        timeInBed,
        timeAsleepInBed,
        timeAsleepTotal,
        sleepEfficiency,
        wentToBed,
        triedToSleep,
        finalAwakening,
        gotOutOfBed,
        fellAsleep
      }
    }
  }
}
