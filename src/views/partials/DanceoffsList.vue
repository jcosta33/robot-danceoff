<script setup lang="ts">
import { useStore } from "@/store";
import RobotCard from "@/partials/RobotCard.vue";

const store = useStore();

await store.getDanceoffs();
</script>

<template>
  <div
    v-for="danceoff in store.danceoffs.list"
    :key="danceoff.id"
    class="columns"
  >
    <div class="column">
      <RobotCard :robot="danceoff.winner" />
    </div>
    <div class="column">
      <h2
        class="subtitle is-size-6"
        style="margin-top: 1rem"
      >
        {{ danceoff.winner.name }}
      </h2>
      <h1 class="title is-1">
        VERSUS
      </h1>
      <h2 class="subtitle is-size-6">
        {{ danceoff.loser.name }}
      </h2>
    </div>
    <div class="column">
      <RobotCard :robot="danceoff.loser" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.title,
.subtitle {
  text-align: center;
}
.subtitle {
  .icon {
    height: auto;
    font-size: 5rem;
    color: $orange;
  }
}
</style>
