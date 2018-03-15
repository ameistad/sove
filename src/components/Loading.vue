<template>
  <div class="loading">
    <div class="icon">
      <div class="icon-svg-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon-svg"
          :style="{ fill: fillColor }"
          viewBox="0 0 50 50">
          <circle cx="25" cy="10" r="2"/>
          <circle opacity=".3" cx="25" cy="40" r="2"/>
          <circle opacity=".3" cx="32.5" cy="12" r="2"/>
          <circle opacity=".3" cx="17.5" cy="38" r="2"/>
          <circle opacity=".93" cx="17.5" cy="12" r="2"/>
          <circle opacity=".3" cx="32.5" cy="38" r="2"/>
          <circle opacity=".65" cx="10" cy="25" r="2"/>
          <circle opacity=".3" cx="40" cy="25" r="2"/>
          <circle opacity=".86" cx="12" cy="17.5" r="2"/>
          <circle opacity=".3" cx="38" cy="32.5" r="2"/>
          <circle opacity=".44" cx="12" cy="32.5" r="2"/>
          <circle opacity=".3" cx="38" cy="17.5" r="2"/>
        </svg>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    fillColor: {
      type: String,
      default: '#474747'
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20vh;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  .icon {
    position: relative;
    display: inline-block;
    width: 75px;
    height: 75px;
    overflow: hidden;
  }

  .icon-svg {
    width: 100%;
    height: 100%;
    background: inherit;
    pointer-events: none;
    transform: translateX(0);
  }
  .icon-svg-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: spin 1s steps(12) infinite;
  }
</style>
