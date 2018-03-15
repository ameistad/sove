import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    entries: [],
  },
  mutations: {
    createEntryMutation (state, entry) {
      state.entries.push(entry)
    },
    updateEntryMutation (state, { index, entry }) {
      state.entries.splice(index, 1, entry)
    },
    deleteEntryMutation (state, entryIndex) {
      state.entries.splice(entryIndex, 1)
    }
  },
  actions: {
    createEntry ({ commit, state }, entry) {
      commit('createEntryMutation', entry)
    },
    updateEntry ({ commit }, { index, entry }) {
      commit('updateEntryMutation', { index, entry })
    },
    deleteEntry ({ commit }, entryIndex) {
      commit('deleteEntryMutation', entryIndex)
    }
  },
  getters: {
    // Return sorted entries by date
    entries: state => {
      return state.entries.sort((a, b) => new Date(a.date) - new Date(b.date))
    }
  },
  plugins: [vuexLocal.plugin]
})
