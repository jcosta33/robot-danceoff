<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import DanceoffsList from "./partials/DanceoffsList.vue";
import RobotCard from "@/partials/RobotCard.vue";

const router = useRouter();
const store = useStore();

if (!store.danceoffs.participated) {
  router.push("/start-danceoff");
  store.addPopup({
    message: "You must get dancing if you want to rejoice </br> at others' defeats",
    type: "warning",
    autohide: true,
  });
}
</script>

<template>
  <section class="section leaderboard">
    <div class="columns" style="margin-bottom: 2rem">
      <div class="column"><h3 class="title is-3">Winners</h3></div>
      <div class="column">
        <h1 class="title is-1">Leaderboard</h1>
        <h2 class="subtitle">Shame or glory</h2>
      </div>
      <div class="column"><h3 class="title is-3">Losers</h3></div>
    </div>

    <Suspense v-if="store.danceoffs.participated">
      <DanceoffsList />

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
<style scoped lang="scss">
.leaderboard {
  text-align: center;
}
</style>
