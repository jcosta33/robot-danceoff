<script setup lang="ts">
import RobotsList from "./partials/RobotsList.vue";
import RobotCard from "@/partials/RobotCard.vue";
</script>

<template>
  <section class="section robots">
    <h1 class="title is-3">Robots</h1>
    <h3 class="subtitle">Getting ready for a danceoff?</h3>
    <Suspense>
      <RobotsList />

      <!-- loading state via #fallback slot -->
      <template #fallback>
        <div class="columns is-multiline">
          <div
            class="column is-4"
            v-for="index in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
          >
            <RobotCard :loading="true" />>
          </div>
        </div>
      </template>
    </Suspense>
  </section>
</template>
