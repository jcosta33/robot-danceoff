<script setup lang="ts">
import Navbar from "@/partials/Navbar.vue";
import Popup from "@/components/popup.vue";
import { computed } from "@vue/reactivity";
import { useStore } from "./store";
const store = useStore();
const popups = computed(() => store.popups);
</script>

<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
  <div class="popup-container" v-if="popups.length > 0">
    <div v-for="(popup, index) in popups" :key="index">
      <Popup :config="popup" v-if="popup.message" />
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
