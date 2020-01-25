<template>
  <transition name="modal-fade">
    <div v-if="isOpen" @click.self="$emit('close')" @keyup.esc="$emit('close')" class="overlay">
      <section class="modal">
        <div class="title">
          <h5>{{title}}</h5>
          <Icon @click.native="$emit('close')" icon="close" class="close" />
        </div>
        <div class="body">
          <slot />
        </div>
        <div class="actions">
          <button v-if="action2" @click="$emit('close')">{{action2}}</button>
          <button @click="$emit('action1')" class="main">{{action1}}</button>
        </div>
      </section>
    </div>
  </transition>
</template>

<script>
import Icon from "@/components/UI/Icon";

export default {
  name: "Modal",
  components: {
    Icon
  },
  props: ["title", "action1", "action2", "isOpen"]
};
</script>

<style lang='scss' scoped>
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 12;
  @apply bg-gray-50;

  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    width: 450px;
    // height: 400px;
    max-width: 95vw;
    @apply relative flex flex-col items-center justify-between bg-gray-300 rounded shadow-2xl;

    .title {
      width: 100%;
      padding: 15px 20px;
      background-color: var(--grey3);
      border-radius: 8px 8px 0 0;
      flex: 0 1;
      display: flex;
      justify-content: space-between;
      h5 {
        line-height: unset;
      }
      .icon-ui.close {
        float: right;
        font-size: 2em;
        cursor: pointer;
      }
    }
    .body {
      flex: 2 1;
      width: 100%;
      max-height: 500px;
      overflow-y: auto;
      text-align: center;
      @apply p-6 bg-gray-200;
      p {
        font-family: var(--font-serif);
        font-size: 1.1em;
      }
    }
    .actions {
      width: 100%;
      background-color: var(--grey3);
      border-radius: 0 0 8px 8px;
      display: flex;
      button {
        flex: 1 0 50%;
        margin: 0;
        background-color: transparent;
        border: none;
        display: inline-block;
        padding: 15px;
        text-align: center;
        font-size: 1.3em;
        color: var(--text);
        &.main {
          background-color: var(--text);
          color: var(--brand);
          border-radius: 0 0 8px 0;
          font-weight: bold;
        }
        &:hover {
          transform: none;
          opacity: 0.9;
        }
      }
    }
  }
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  opacity: 1;
  transition: all 0.25s ease;
  .modal {
    transform: none;
    transition: all 0.25s ease;
  }
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
  .modal {
    transform: scale(0.8);
  }
}
</style>
