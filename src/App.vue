<script setup lang="ts">
import Navbar from "@/partials/Navbar.vue";
import Popup from "@/components/popup.vue";
import { computed } from "vue";
import { useStore } from "./store";
const store = useStore();
const popups = computed(() => store.popups);
</script>

<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
  <div
    v-if="popups.length > 0"
    class="popup-container"
  >
    <div
      v-for="(popup, index) in popups"
      :key="index"
    >
      <Popup
        v-if="popup.message"
        :config="popup"
      />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  .popup-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 9999;
  }

  .material-icons-outlined {
    font-size: 125%;
  }
}
</style>
