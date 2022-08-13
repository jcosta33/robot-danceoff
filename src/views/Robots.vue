<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Robot } from "@/models/robot";
import { useStore } from "@/store";
import RobotsList from "./partials/RobotsList.vue";
import RobotCard from "@/partials/RobotCard.vue";

const router = useRouter();
const store = useStore();

const state = reactive({
  loading: false,
  results: [] as Robot[],
});
state.loading = true;

store.getRobots();

store.$subscribe((mutation, state) => {
  console.log(mutation);
  console.log(state);
});
const nextPage = () => {};
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
          <div class="column is-4" v-for="index in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]">
            <RobotCard :loading="true" />>
          </div>
        </div>
      </template>
    </Suspense>
  </section>
</template>
