<template>
  <transition name="modal">
    <div v-if="show" @click="close" class="modal-mask">
      <div @click.stop class="modal-container">
        <div @click="close" class="modal-close">
          x
          <span class="modal-close-text">esc</span>
        </div>
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  mounted () {
    // Event listener to close modal when pressing the esc-key
    document.addEventListener('keydown', (event) => {
      if (this.show && event.keyCode === 27) {
        this.close()
      }
    })
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/color-scheme';

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
  }

  .modal-container {
    width: 600px;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: $white;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    // Scrollable
    max-height: calc(100vh - 10px);
    overflow-y: auto;

    @media (max-width: 650px) {
      width: 100%;
    }
  }

  .modal-close {
    cursor: pointer;
    float: right;
    display: flex;
    flex-direction: column;
  }
  .modal-close-text {
    font-size: 1rem;
    text-align: center;
  }

  .modal-header h3 {
    margin-top: 0;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    transform: scale(1.1);
  }
</style>
