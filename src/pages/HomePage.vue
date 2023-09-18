<template>
  <!-- ⬇️newer older buttons -->
  <section class="container">
    <div class="row p-2 justify-content-between">
      <button @click="changePage(pageNumber - 1)" :disabled="pageNumber <= 1" class="col-3"><i
          class="mdi mdi-arrow-left"></i>Newer</button>
      <button @click="changePage(pageNumber + 1)" :disabled="pageNumber >= totalPages" class="col-3">Older<i
          class="mdi mdi-arrow-right"></i></button>
    </div>
    <button @click="openPostForm">Make a Post</button>
    <!--  create Post component template -->
    <!-- <PostForm v-if="showPostForm" @close="closePostForm" /> -->
  </section>
  <!-- ⬆️newer older buttons -->

  <div class="container pt-1">
    <div class="row g-3 p-1 justify-content-between">
      <div class="col-8">
        <!-- ⬇️POSTS TEMPLATE -->
        <PostCard v-for="post in posts" :key="post.id" :post="post" :profile="profile" creatorId="post.creatorId" />

        <!-- ⬆️POSTS TEMPLATE -->
      </div>

      <div class="col-4 d-flex flex-column">
        <!-- ⬇️STORIES TEMPLATE -->
        <StoryCard v-for="story in stories" :key="story.title" :story="story" />
        <!-- ⬆️STORIES TEMPLATE -->
      </div>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { storiesService } from '../services/StoriesService.js';
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js';
import axios from 'axios';


export default {
  props: {
    profile: { type: Object, required: true },
  },
  setup() {
    const posts = ref(null);
    // GET POSTS FUNCTION
    async function getPosts() {
      try {
        await postsService.getPosts();
        posts.value = AppState.posts;

        // logger.log('1 Hello from getPosts on HomePage', posts)
      } catch (error) {
        Pop.error(error);
        // logger.log('2 Hello from getPosts on HomePage', posts.value)
      }
    }
    // const showPostForm = ref(false);

    // function openPostForm() {
    //   showPostForm.value = true;
    // }
    // function closePostForm() {
    //   showPostForm.value = false;
    // }

    async function getStories() {
      try {
        await storiesService.getStories()
      } catch (error) {
        Pop.error(error);
      }
    }

    // async function getProfiles() {
    //   try {
    //     await postsService.getPosts()
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }


    // SECTION PAGING POSTS FUNCTIONS
    const changePage = async (pageNumber) => {
      try {
        const apiUrl = `https://sandbox.codeworksacademy.com/api/posts?page=${pageNumber}`;
        const response = await axios.get(apiUrl);
        AppState.pageNumber = pageNumber;
        AppState.posts = response.data.posts;
        // return response.data;
      } catch (error) {
        Pop.error(error);
      }
    };

    const changePageWithSearch = async (number) => {
      try {
        const searchTerm = ''; // Set your search term here
        await postsService.changePage(`search/movie?query=${searchTerm}&page=${number}`);
      } catch (error) {
        Pop.error(error);
      }
    };

    onMounted(() => {
      getPosts();
      getStories();
      // getProfiles();
    });
    return {
      posts: computed(() => AppState.posts),
      stories: computed(() => AppState.stories),
      pageNumber: computed(() => AppState.pageNumber),
      totalPages: computed(() => AppState.totalPages),
      searchTerm: computed(() => AppState.searchTerm),
      profiles: computed(() => AppState.profiles),
      // showPostForm,
      // openPostForm,
      // closePostForm,
      changePage,
      changePageWithSearch,
      // getProfiles,
    };

  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .profile-pic {
    height: 30px;
    width: 30px;
    object-fit: cover;
    object-position: center;
    border-radius: 50em;
  }

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
