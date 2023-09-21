<template>
    <section v-if="profile">

        <!-- ⬇️newer older buttons -->

        <section class="container">
            <div class="row p-2 justify-content-between">
                <button @click="changePage(pageNumber - 1)" :disabled="pageNumber <= 1" class="col-3"><i
                        class="mdi mdi-arrow-left"></i>Newer</button>
                <button @click="changePage(pageNumber + 1)" :disabled="pageNumber >= totalPages" class="col-3">Older<i
                        class="mdi mdi-arrow-right"></i></button>
            </div>


            <!-- <PostForm v-if="account.id" /> -->
        </section>
        <!-- ⬆️newer older buttons -->

        <div class="container pt-1">
            <div class="row g-3 p-1 justify-content-between">
                <div class="col-8">
                    <!-- Profile Card -->
                    <div class="g-4 p-1 mb-4 card elevation-3">
                        <div class="profile-header">
                            <img :src="profile.picture" class="profile-picture" alt="Profile Picture" />
                            <h2>{{ profile.name }}</h2>
                        </div>
                        <div class="profile-details">
                            <p>Email: {{ profile.email }}</p>
                            <p>Bio: {{ profile.bio }}</p>
                            <!-- Add more profile details here -->
                        </div>
                        <div class="profile-links">
                            <a v-if="profile.github" :href="profile.github" target="_blank">GitHub</a>
                            <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank">LinkedIn</a>
                            <a v-if="profile.resume" :href="profile.resume" target="_blank">Resume</a>
                            <!-- Add more social links as needed -->
                        </div>
                    </div>
                    <!-- ⬇️POSTS TEMPLATE -->
                    <PostCard v-for="post in posts" :key="post.id" :post="profilePosts" :profile="profile" />
                    <!-- ⬆️POSTS TEMPLATE -->

                </div>

                <div class="col-4 d-flex flex-column">
                    <!-- ⬇️STORIES TEMPLATE -->
                    <StoryCard v-for="story in stories" :key="story.title" :story="story" />
                    <!-- ⬆️STORIES TEMPLATE -->
                </div>

            </div>
        </div>
    </section>
</template>


<script>
import { onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { profilesService } from '../services/ProfilesService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import { Story } from '../models/Story.js';
import { Post } from '../models/Post.js';
import { storiesService } from '../services/StoriesService.js';
import axios from 'axios';
import { postsService } from '../services/PostsService.js';


export default {
    props: { story: { type: Story, required: true }, profilePosts: { type: Post, required: true }, post: { type: Post, required: true } },
    setup() {
        const route = useRoute()

        async function getProfile() {
            try {
                logger.log('GETTING PROFILE')
                const profileId = route.params.profileId;
                await profilesService.getProfile(profileId);
            } catch (error) {
                Pop.error(error.message)
            }
        }
        async function getStories() {
            try {
                await storiesService.getStories()
            } catch (error) {
                Pop.error(error);
            }
        }

        // async function profilePosts() {
        //     try {
        //         await profilesService.profilePosts()
        //     } catch (error) {
        //         Pop.error(error)
        //     }
        // }

        // SECTION PAGING POSTS FUNCTIONS
        // eslint-disable-next-line space-before-function-paren
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

        // eslint-disable-next-line space-before-function-paren
        const changePageWithSearch = async (number) => {
            try {
                const searchTerm = ''; // Set your search term here
                await postsService.changePage(`search/movie?query=${searchTerm}&page=${number}`);
            } catch (error) {
                Pop.error(error);
            }
        };



        onMounted(() => {
            // getProfile()
            getStories();
            // profilePosts();
        })

        return {
            profilePost: computed(() => AppState.profilePosts),
            profile: computed(() => AppState.profile),
            // posts: computed(() => AppState.projects),
            posts: computed(() => AppState.posts),
            stories: computed(() => AppState.stories),
            pageNumber: computed(() => AppState.pageNumber),
            totalPages: computed(() => AppState.totalPages),
            searchTerm: computed(() => AppState.searchTerm),
            profiles: computed(() => AppState.profiles),
            changePage,
            changePageWithSearch,
        };
    },
    components: {}
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
