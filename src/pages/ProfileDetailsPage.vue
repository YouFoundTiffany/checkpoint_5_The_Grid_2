<template>
    <!-- ⬇️newer older buttons -->
    <section>User Profile Details Section</section>
    <!-- <section class="container">
        <div class="row p-2 justify-content-between">
            <button @click="changePage(pageNumber - 1)" :disabled="pageNumber <= 1" class="col-3"><i
                    class="mdi mdi-arrow-left"></i>Newer</button>
            <button @click="changePage(pageNumber + 1)" :disabled="pageNumber >= totalPages" class="col-3">Older<i
                    class="mdi mdi-arrow-right"></i></button>
        </div>
        <button @click="openPostForm">Make a Post</button>

        <PostForm v-if="showPostForm" @close="closePostForm" />
    </section> -->
    <!-- ⬆️newer older buttons -->

    <!-- <div class="container pt-1">
        <div class="row g-3 p-1 justify-content-between">
            <div class="col-8"> -->
    <!-- ⬇️POSTS TEMPLATE -->
    <PostCard v-for="post in profilePosts" :key="post.id" :post="post" :profile="profile" />
    <!-- ⬆️POSTS TEMPLATE -->

    <!-- </div> -->

    <!-- <div class="col-4 d-flex flex-column"> -->
    <!-- ⬇️STORIES TEMPLATE -->
    <!-- <StoryCard v-for="story in stories" :key="story.title" :story="story" /> -->
    <!-- ⬆️STORIES TEMPLATE -->
    <!-- </div>

        </div>
    </div> -->
</template>


<script>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { profilesService } from '../services/ProfilesService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
logger


export default {
    setup() {

        // logger.log('route', route)
        const route = useRoute()

        async function getProfile() {
            try {
                const profileId = route.params.profileId;
                const response = await profilesService.getProfile(profileId);
                logger.log('API Response:', response);

                AppState.activeProfile = response.profile;
                AppState.projects = response.profilePosts;
            } catch (error) {
                Pop.error(error.message)
            }
        }
        onMounted(() => {
            getProfile()
        })
        return {
            profile: computed(() => AppState.activeProfile),
            profilePosts: computed(() => AppState.projects),
        };
    },
};
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
