export default {
  methods: {
    timeFormat (time) {
      const hours = Math.floor(time / 60)
      const minutes = Math.floor(time % 60)
      if (hours && minutes) {
        return `${hours} timer og ${minutes} minutter`
      }
      if (!minutes) {
        return `${hours} timer`
      }
      return `${minutes} minutter`
    }
  }
}
