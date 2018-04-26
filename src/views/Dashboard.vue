<template>
  <div>
    <button @click="showConfirmDeleteAllEntries = true" class="btn">Slett alle registreringer</button>

  </div>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  name: 'Dashboard',
  data () {
    return {
      showConfirmDeleteAllEntries: false
    }
  },
  methods: {
    deleteAllEntries () {
      this.$store.dispatch('deleteAllEntries')
    }
  },
  components: {
    Modal
  }
}
</script>
