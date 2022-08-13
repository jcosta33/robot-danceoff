import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Robots from "@/views/Robots.vue";
import NewDanceoff from "@/views/NewDanceoff.vue";
import Danceoffs from "@/views/Danceoffs.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/robots", name: "Robots", component: Robots },
  { path: "/leaderboard", name: "Danceoffs", component: Danceoffs },
  { path: "/start-danceoff", name: "NewDanceoff", component: NewDanceoff },
  // { path: '*', component: NotFoundComponent }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "is-active",
  linkExactActiveClass: "is-active",
});

export default router;
