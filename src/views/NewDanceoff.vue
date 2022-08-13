<script setup lang="ts">
import { Robot } from "@/models/robot";
import { useStore } from "@/store";
import RobotCard from "@/partials/RobotCard.vue";
import { reactive, ref } from "vue";
import useUtils from "@/composition/utils";

const store = useStore();
const teamASpan = ref({} as HTMLElement);
const teamBSpan = ref({} as HTMLElement);

const { shuffle } = useUtils();

const form = reactive({
  teamA: {
    name: "Team A",
    members: [] as Robot[],
    winner: false,
  },
  teamB: {
    name: "Team B",
    members: [] as Robot[],
    winner: false,
  },
});

store.getRobots().then(() => {
  newTeams();
});

const newTeams = () => {
  form.teamB.winner = false;
  form.teamA.winner = false;
  form.teamA.members = calculateMembers();
  form.teamB.members = calculateMembers(form.teamA.members);
};

const again = () => {
  form.teamA.winner = false;
  form.teamB.winner = false;
};

const calculateMembers = (excludedMembers?: Robot[]) => {
  const shuffledRobots = shuffle(store.robots.list) as Robot[];
  const team = [] as Robot[];

  let remainingExperience = 40;
  let differential = 0;
  shuffledRobots.forEach((robot) => {
    if (
      team.length < 5 &&
      !robot.outOfOrder &&
      !excludedMembers?.includes(robot)
    ) {
      const averageAvailableExperience =
        remainingExperience / (5 - team.length);

      const totalXp = team.reduce((acc, member) => acc + member.experience, 0);

      if (
        averageAvailableExperience - robot.experience > differential &&
        totalXp + robot.experience <= 50
      ) {
        differential =
          differential - (averageAvailableExperience - robot.experience);

        remainingExperience = remainingExperience - robot.experience;

        team.push(robot);
      }
    }
  });

  return team;
};

/*
  Generating a random value between 0 and the combined experiences of both dancers.
  If the output value is above memberA's experience level then memberB wins. This assures that the
  winner is not entirely random as the player with more experience will have a greater likelihood of
  landing a number within their range.
*/
const dance = () => {
  const danceoffs = form.teamA.members.map((memberA, index) => {
    const memberB = form.teamB.members[index];

    const randomNrWithinCombinedExperience = Math.floor(
      Math.random() * (memberA.experience + memberB.experience)
    );

    if (randomNrWithinCombinedExperience < memberA.experience) {
      return {
        winner: memberA.id,
        opponents: [memberA.id, memberB.id],
      };
    }

    return {
      winner: memberB.id,
      opponents: [memberA.id, memberB.id],
    };
  });

  store
    .createDanceoff({
      danceoffs,
    })
    .then((response) => {
      const teamAIds = form.teamA.members.map((member) => member.id);
      const teamBIds = form.teamB.members.map((member) => member.id);

      const teamAWinCount = response.filter((danceoff) =>
        teamAIds.includes(danceoff.winner)
      );
      const teamBWinCount = response.filter((danceoff) =>
        teamBIds.includes(danceoff.winner)
      );

      if (teamAWinCount > teamBWinCount) {
        form.teamA.winner = true;
      } else {
        form.teamB.winner = true;
      }
    });
};

const onInputTeamAName = (target: HTMLElement) => {
  form.teamA.name = target.innerText.trim();
};
const onInputTeamBName = (target: HTMLElement) => {
  form.teamB.name = target.innerText.trim();
};
const focusTeamASpan = () => {
  teamASpan.value?.focus();
};
const focusTeamBSpan = () => {
  teamBSpan.value?.focus();
};
</script>

<template>
  <section class="section new-danceoff">
    <div class="columns">
      <div class="column">
        <h4 class="title is-4">
          <span
            contenteditable="true"
            @input="($event) => onInputTeamAName($event.target as HTMLElement)"
            ref="teamASpan"
          >
            Team A
          </span>
          <small
            class="icon is-pulled-right is-size-6"
            @click="focusTeamASpan()"
            ><i class="material-icons-outlined">edit</i></small
          >
        </h4>
        <div class="robot-wrapper">
          <RobotCard
            v-for="robot in form.teamA.members"
            :robot="robot"
            :hide-status="true"
          />
          <template v-if="form.teamA.members.length === 0">
            <RobotCard
              v-for="index in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
              :loading="true"
            />
          </template>
        </div>

        <button
          type="button"
          class="button is-black is-fullwidth"
          @click="form.teamA.members = calculateMembers(form.teamB.members)"
        >
          <span class="icon"
            ><i class="material-icons-outlined">refresh</i></span
          >
          <span> New team </span>
        </button>
      </div>
      <div class="column is-3">
        <template v-if="!form.teamA.winner && !form.teamB.winner">
          <h2 class="subtitle" style="margin-top: 6rem">
            {{ form.teamA.name }}
            <small class="tag is-dark is-size-7">
              {{
                form.teamA.members.reduce(
                  (acc, member) => acc + member.experience,
                  0
                )
              }}
            </small>
          </h2>
          <h1 class="title is-1">VERSUS</h1>
          <h2 class="subtitle">
            {{ form.teamB.name }}
            <small class="tag is-dark is-size-7">
              {{
                form.teamB.members.reduce(
                  (acc, member) => acc + member.experience,
                  0
                )
              }}
            </small>
          </h2>
          <div class="buttons">
            <button
              type="button"
              class="button is-primary"
              :class="{ 'is-loading': store.danceoffs.loading }"
              @click="dance()"
            >
              <span class="icon"
                ><i class="material-icons-outlined">nightlife</i></span
              >
              <span> Start Danceoff </span>
            </button>
          </div>
        </template>
        <template v-if="form.teamA.winner || form.teamB.winner">
          <h2 class="subtitle" style="margin-top: 6rem">The winner is</h2>
          <h1 class="title is-1">
            {{ form.teamA.winner ? form.teamA.name : form.teamB.name }}
          </h1>
          <h2 class="subtitle">
            <span class="icon"
              ><i class="material-icons-outlined">military_tech</i></span
            >
          </h2>
          <div class="buttons">
            <router-link
              to="/leaderboard"
              class="button is-dark"
              @click="newTeams()"
            >
              <span class="icon"
                ><i class="material-icons-outlined">leaderboard</i></span
              >
              <span> Leaderboard </span>
            </router-link>
            <button type="button" class="button is-primary" @click="again()">
              <span class="icon"
                ><i class="material-icons-outlined">nightlife</i></span
              >
              <span> Dance </span>
            </button>
          </div>
        </template>
      </div>
      <div class="column">
        <h4 class="title is-4">
          <span
            contenteditable="true"
            @input="($event) => onInputTeamBName($event.target as HTMLElement)"
            ref="teamBSpan"
          >
            Team B
          </span>
          <small
            class="icon is-pulled-right is-size-6"
            @click="focusTeamBSpan()"
            ><i class="material-icons-outlined">edit</i></small
          >
        </h4>
        <div class="robot-wrapper">
          <RobotCard
            v-for="robot in form.teamB.members"
            :robot="robot"
            :hide-status="true"
          />
          <template v-if="form.teamB.members.length === 0">
            <RobotCard
              v-for="index in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
              :loading="true"
            />
          </template>
        </div>

        <button
          type="button"
          class="button is-black is-fullwidth"
          @click="form.teamB.members = calculateMembers(form.teamA.members)"
        >
          <span class="icon"
            ><i class="material-icons-outlined">refresh</i></span
          >
          <span> New team </span>
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.new-danceoff {
  .robot-wrapper {
    max-height: 70vh;
    margin-bottom: 1rem;
    padding-right: 0.5rem;
    overflow: auto;
  }
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
  .buttons {
    width: 100%;
    justify-content: center;
  }

  small.icon {
    cursor: pointer;
    :hover {
      color: $primary;
    }
  }
}
</style>
