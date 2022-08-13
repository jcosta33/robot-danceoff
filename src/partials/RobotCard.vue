<script setup lang="ts">
import { Robot } from "@/models/robot";
import { defineProps, PropType } from "vue";

defineProps({
  robot: Object as PropType<Robot>,
  loading: Boolean,
  hideStatus: Boolean,
});
</script>

<template>
  <div class="box robot" v-if="!loading && robot">
    <div class="media">
      <div class="media-left">
        <figure class="image">
          <img :src="robot.avatar" alt="" />
        </figure>
      </div>
      <div class="media-content">
        <h4 class="title is-5">{{ robot.name }}</h4>
        <h5 class="subtitle is-size-6">
          {{ robot.powermove }}
        </h5>
        <!-- <p>Experience: {{ robot.experience }}</p> -->
      </div>
      <div class="media-right">
        <div class="tags" style="width: 100%; justify-content: flex-end">
          <span class="tag is-black">
            <span class="icon"
              ><i class="material-icons-outlined">star</i></span
            >
            <span>{{ robot.experience }}</span>
          </span>
          <span
            class="tag"
            v-if="!hideStatus"
            :class="{
              'is-success': !robot.outOfOrder,
              'is-danger': robot.outOfOrder,
            }"
          >
            <span class="icon"
              ><i class="material-icons-outlined">smart_toy</i></span
            >
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="box robot is-loading" v-if="loading">
    <div class="media">
      <div class="media-left">
        <figure class="image">
          <img src="https://via.placeholder.com/100x100" alt="" />
        </figure>
      </div>
      <div class="media-content">
        <h4 class="title is-5"></h4>
        <h5 class="subtitle is-size-6"></h5>
        <!-- <p>Experience: {{ robot.experience }}</p> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.robot {
  position: relative;
  .title {
    margin-top: 0.5rem;
  }
  &:not(.is-loading) {
    .image {
      // too much white space on the imgs
      margin-left: -1rem;
      margin-top: -3rem;
      margin-bottom: -2rem;
      img {
        width: 10rem;
      }
    }
    .media-right {
      position: absolute;
      right: 0.5rem;
      bottom: 0.5rem;
    }
  }
  &.is-loading {
    .title {
      height: 3rem;
    }
    .subtitle {
      height: 2rem;
    }
    .title,
    .subtitle {
      position: relative;
      background: $black-ter;
      overflow: hidden;
      &::after {
        display: block;
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.1),
          transparent
        );
        animation: loading 1.5s infinite;
      }
    }
  }
}
@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}
</style>
