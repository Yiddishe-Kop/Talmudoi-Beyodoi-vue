<template>
  <div class="loader-wrapper">
    <div class="loader" style="height: 26px; width: 26px;">
      <svg height="100%" viewBox="0 0 32 32" width="100%">
        <circle cx="16" cy="16" fill="none" r="14" stroke-width="4" style="opacity: 0.2;" />
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          stroke-width="4"
          style=" stroke-dasharray: 80px; stroke-dashoffset: 60px;"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style lang="scss">
.loader-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .loader {
    animation: rotate 0.75s linear infinite;
    svg {
      circle {
        stroke: var(--brand);
      }
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
