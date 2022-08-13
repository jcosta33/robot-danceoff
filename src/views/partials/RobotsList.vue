<script setup lang="ts">
import { useStore } from "@/store";
import RobotCard from "@/partials/RobotCard.vue";

const store = useStore();

await store.getRobots();
</script>

<template>
  <div class="columns is-multiline" style="margin-top: 1rem">
    <div v-for="robot in store.robots.list" class="column is-4">
      <RobotCard :robot="robot" />
    </div>
  </div>
</template>
