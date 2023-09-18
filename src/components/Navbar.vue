<template>
  <nav class="mb-2 mt-1 bg-secondary navbar navbar-expand-lg px-3">
    <!-- ROUTER LINK TO HOME PAGE -->
    <router-link :to="{ name: 'Home' }">
      <div class="m-0 p-0 logo-container">
        <img class="logo-image" src="src/assets/img/GLOGO-clean.png" alt="The Grid Logo">
      </div>
    </router-link>

    <!-- Spacing for Search and Login Components -->
    <div class="d-flex justify-content-evenly align-items-center w-100">
      <!-- Search Component -->
      <div class="mb-2 mb-lg-0">
        <Search />
      </div>
      <div></div>

      <!-- Login Component -->
      <div class="d-flex justify-content-end">
        <Login />
      </div>
    </div>
  </nav>
</template>




<script>
import Login from './Login.vue';
import Search from './Search.vue';
import { inject } from 'vue';
import { AppState } from '../AppState.js'



export default {
  setup() {
    return {
      AppState,
    }
  },
  components: {
    Login,
    Search, // Corrected component registration
  },
}
</script>

<style>
.logo-container {
  max-width: 100%;
  max-height: contain;
  text-align: center;
}

/* Style for the image */
.logo-image {
  max-height: 47px;
  max-width: 100%;
  object-fit: cover;
  object-position: center
    /* max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto; */
}


.logo-image:hover {
  background: url('/image.png') no-repeat 9px 12px;
  -webkit-filter: drop-shadow(0 0 8px rgb(210, 210, 210));
  /* webkit only
                     assuming the content is written in black */
  filter: drop-shadow(0 0 8px rgb(210, 210, 210));
  /* FF~35 */
  filter: drop-shadow(0 0 8px rgb(210, 210, 210));
  /* MDN */
}

/* a:hover {
  text-decoration: none;
} */

.nav-link {
  text-transform: uppercase;
}

/* .navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
} */

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>