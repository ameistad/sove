<template>
  <div class="number-picker">
    <input
      :value="value"
      @input.stop="handleInput"
      @click="showNumberPicker = !showNumberPicker"
      type="text">
    <div
      v-if="showNumberPicker"
      @click="showNumberPicker = false"
      class="number-picker-overlay">
    </div>
    <div v-show="showNumberPicker" class="number-picker-select">
      <span @click="editNumber('add')" class="number-picker-select-button">+</span>
      <span @click="editNumber('sub')" class="number-picker-select-button">-</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumberPickerComponent',
  props: {
    value: {
      type: Number,
      required: true
    },
    maxValue: {
      type: Number,
      default: 1000
    },
    minValue: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      showNumberPicker: false
    }
  },
  methods: {
    handleInput (e) {
      const value = e.target.value
      const isNumber = Number.isInteger(Number(value))
      if (isNumber && value <= this.maxValue && value > this.minValue) {
        this.$emit('input', Number(e.target.value))
      }
    },
    editNumber (operation) {
      let newValue = this.value
      if (operation === 'add' && newValue < this.maxValue) {
        newValue++
      } else if (operation === 'sub' && newValue > this.minValue) {
        newValue--
      } else {
        this.showNumberPicker = false
        return
      }
      this.$emit('input', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/color-scheme';
  .number-picker {
    position: relative;
  }
  .number-picker-select {
    position: absolute;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
    align-items: stretch;
    background-color: #fff;
    top: calc(2.2em + 2px);
    left: 0;
    width: 10em;
    overflow: hidden;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
    padding: 3px;
  }
  .number-picker-select-button {
    cursor: pointer;
    width: 30px;
    text-align: center;
    background-color: $dark-grey;
    border-radius: 3px;
    color: $white;
  }
  .number-picker-overlay {
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
