<template>
  <button @click="deleteEntry">Slett</button>
</template>

<script>
export default {
  name: 'EntryDeleteComponent',
  props: {
    entryIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    deleteEntry () {
      this.$store.dispatch('deleteEntry', this.entryIndex)
    }
  }
}
</script>
