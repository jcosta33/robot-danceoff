<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <span class="navbar-item">
          <img src="@/assets/logo.png" height="50" />
        </span>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="isActive = !isActive"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': isActive }"
      >
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/robots" class="navbar-item">Robots</router-link>
          <router-link to="/leaderboard" class="navbar-item"
            >Leaderboard</router-link
          >
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <router-link to="/start-danceoff" class="button is-primary">
              <span class="icon"
                ><i class="material-icons-outlined">add</i></span
              >
              <span>New danceoff!</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: { showNavigation: Boolean },
  data() {
    return {
      isActive: false,
    };
  },
  watch: {
    $route() {
      this.isActive = false;
    },
  },
});
</script>
<style lang="scss"></style>
