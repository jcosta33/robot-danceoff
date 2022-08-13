import {
  createDanceoff,
  getDanceoffs,
  getPopulatedDanceoffs,
} from "@/api/danceoffs";
import { getRobots } from "@/api/robots";
import { Popup, Resolve } from "@/models";
import {
  Danceoff,
  DanceOffPayload,
  DanceoffPopulated,
} from "@/models/danceoff";
import { Robot } from "@/models/robot";
import { defineStore } from "pinia";
import useUtils from "@/composition/utils";

const { uuidv4 } = useUtils();

export const useStore = defineStore("main", {
  state: () => ({
    robots: { list: [] as Robot[], loading: false },
    danceoffs: {
      list: [] as DanceoffPopulated[],
      loading: false,
      participated: false,
    },
    popups: [] as Popup[],
  }),
  getters: {},
  actions: {
    createDanceoff(payload: DanceOffPayload) {
      return new Promise((resolve: Resolve<Danceoff[]>) => {
        this.danceoffs.loading = true;
        createDanceoff(payload).then((response) => {
          this.danceoffs.loading = false;
          this.danceoffs.participated = true;
          this.danceoffs.list.push(response);
          resolve(response);
        });
      });
    },
    getDanceoffs() {
      return new Promise((resolve: Resolve<DanceoffPopulated[]>) => {
        this.danceoffs.loading = true;
        getPopulatedDanceoffs({}).then((response) => {
          this.danceoffs.loading = false;
          this.danceoffs.list = response;
          resolve(response);
        });
      });
    },
    getRobots() {
      return new Promise((resolve: Resolve<Robot[]>) => {
        this.danceoffs.loading = true;
        getRobots({}).then((response) => {
          this.danceoffs.loading = false;
          this.robots.list = response;
          resolve(response);
        });
      });
    },
    addPopup(popup: Popup) {
      const id = uuidv4();
      popup.onClose = () => {
        this.popups = this.popups.filter((statePopup) => statePopup.id !== id);
      };
      this.popups.push({ ...popup, id });
      if (popup.autohide) {
        setTimeout(() => {
          this.popups = this.popups.filter(
            (statePopup) => statePopup.id !== id
          );
        }, 5000);
      }
    },
  },
});
