<template>
  <section id="home">
    <h1 class="title is-1">Robot Danceoff</h1>
    <h3 class="subtitle">Do they know what they are doing? Who cares!</h3>

    <div class="columns">
      <div class="column is-4">
        <router-link to="/robots" class="box is-primary has-text-centered">
          <span class="icon">
            <i class="material-icons-outlined">smart_toy</i>
          </span>
          <h4 class="title is-3">Scrapyard</h4>
          <p>Check out our rusty trash</p>
        </router-link>
      </div>
      <div class="column is-4">
        <router-link to="/leaderboard" class="box is-primary has-text-centered">
          <span class="icon">
            <i class="material-icons-outlined">leaderboard</i>
          </span>
          <h4 class="title is-3">Leaderboard</h4>
          <p>Who's on top of the pile??</p>
        </router-link>
      </div>
    </div>
    <div class="columns">
      <div class="column is-4">
        <router-link to="/new-danceoff" class="box">
          <div class="media">
            <div class="media-content">
              <h4 class="title is-4">New danceoff</h4>
              <p>Time to get these things moving!</p>
            </div>
            <div class="media-right">
              <span class="icon">
                <i class="material-icons-outlined is-size-3">nightlife</i>
              </span>
            </div>
          </div>
        </router-link>
      </div>
      <div class="column is-4">
        <div class="box">
          <div class="media">
            <div class="media-content">
              <h4 class="title is-4">Manage account</h4>
              <p>This is definitely not a placeholder</p>
            </div>
            <div class="media-right">
              <span class="icon">
                <i class="material-icons-outlined is-size-3">person</i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="box">
          <div class="media">
            <div class="media-content">
              <h4 class="title is-4">Leave</h4>
              <p>Go back the way you came!</p>
            </div>
            <div class="media-right">
              <span class="icon">
                <i class="material-icons-outlined is-size-3">logout</i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
#home .box {
  .icon {
    font-size: 4rem;
    height: auto;
  }
  .icon + .title {
    margin: 1rem 0 0.25rem;
  }

  &:hover {
    .icon {
      color: $primary;
    }
  }
}
</style>
