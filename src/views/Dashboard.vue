<template>
  <div>
    <button @click="deleteAllEntries" class="btn">Slett alle registreringer</button>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  methods: {
    deleteAllEntries () {
      this.$store.dispatch('deleteAllEntries')
    }
  }
}
</script>
