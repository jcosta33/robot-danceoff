<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import RobotCard from "@/partials/RobotCard.vue";

const store = useStore();

await store.getRobots();

store.$subscribe((mutation, state) => {
  console.log(mutation);
  console.log(state);
});
</script>

<template>
  <div class="columns is-multiline" style="margin-top: 1rem">
    <div class="column is-4" v-for="robot in store.robots.list">
      <RobotCard :robot="robot" />
    </div>
  </div>
</template>
