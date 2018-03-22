<template>
  <div class="view-edit-entry">
    <div class="view-edit-entry-control">

      <!-- Edit mode -->
      <template v-if="showEdit">
        <button
          @click="showEdit = false"
          class="btn width-100 margin-bottom-2">
            Avbryt
        </button>

        <entry-delete
          :entryIndex="entryIndex"
          class="btn btn-full margin-bottom-2 width-100">
        </entry-delete>

        <button
          @click="updateEntry"
          class="btn width-100 view-edit-entry-control-btn">
            Lagre oppdatering
        </button>
      </template>

      <template v-else>
        <button
          @click="showEdit = true"
          class="btn width-100 view-edit-entry-control-btn">
          Rediger
        </button>
      </template>

    </div>
    <div class="view-edit-entry-questions">
      <EntryDetail
        :entry="entry"
        class="margin-bottom-2"/>
      <entry-data
        v-if="showEdit"
        :entryData="entryData"
        @update="handleUpdatedData">
      </entry-data>
    </div>
  </div>
</template>

<script>
import EntryData from './EntryData'
import EntryDetail from './EntryDetail'
import EntryDelete from './EntryDelete'

export default {
  name: 'EntryViewEditComponent',
  props: {
    entryIndex: {
      type: Number,
      required: true
    },
    entry: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      entryData: {
        ...this.entry.data
      },
      showEdit: false
    }
  },
  methods: {
    handleUpdatedData (data) {
      this.entryData = Object.assign({}, this.entryData, data)
    },
    updateEntry () {
      const entry = { date: this.entry.date, data: this.entryData }
      this.$store.dispatch('updateEntry', { index: this.entryIndex, entry })
      this.showEdit = false
    }
  },
  components: {
    EntryData,
    EntryDetail,
    EntryDelete
  }
}
</script>

<style>
  .view-edit-entry {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-areas: "questions control";
    grid-gap: 20px;
  }
  .view-edit-entry-control {
    grid-area: control;
  }
  .view-edit-entry-control-btn {
    position: sticky;
    top: 20px;
  }
  .view-edit-entry-questions {
    grid-area: questions;
  }
  .view-edit-entry-question {
    margin-bottom: 20px;
  }

  @media (max-width: 650px) {
    .view-edit-entry {
      display: block;
    }

    .view-edit-entry-control {
      z-index: 1000;
      position: fixed;
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
