<template>
  <div
    class="notification popup-notification is-active"
    :class="{
      'is-info': config.type === 'info',
      'is-success': config.type === 'success',
      'is-primary': config.type === 'primary',
      'is-warning': config.type === 'warning',
      'is-danger': config.type === 'danger',
    }"
  >
    <button class="delete" @click="close()"></button>
    <slot></slot>
    <p v-if="config.message" v-html="config.message"></p>
  </div>
</template>

<script lang="ts">
import { Popup } from "@/models";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<Popup>,
      required: true,
    },
  },
  setup(props) {
    const close = () => {
      if (props.config.onClose) {
        props.config.onClose();
      }
    };
    return { close };
  },
});
</script>
<style scoped lang="scss">
.popup-notification {
  position: relative;
  opacity: 0.9;
  margin-bottom: 1rem;
}
</style>
