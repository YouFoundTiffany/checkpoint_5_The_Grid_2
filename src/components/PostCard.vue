<!-- eslint-disable vue/no-mutating-props -->
<!-- TODO ✅ All posts render all post data (✅creator name, ✅creator picture, ✅createdAt,✅ body, ✅like count).
-->
<!-- TODO ✅Each page shows at least 2 ads from the api collection. -->
<template>
    <!-- TODO ✅ Clicking on a post's creator image navigates to that user's Profile page. -->
    <div class="g-4 p-1 mb-4 card elevation-3">
        <router-link :to="{ name: 'Profile Details', params: { profileId: post.creatorId } }">
            <img :src="post.creatorPicture" class="btnclicky profile-pic" alt="">
        </router-link>
        <h4 class="">{{ post.creatorName }}</h4>
        <p>{{ post.createdAt.toLocaleDateString() }}</p>
        <p>{{ post.body }}</p>
        <img class="post-image" :src="post.imgUrl" alt="">
        <i @click="postVote()" class="mdi mdi-laptop btnclicky">{{
            post.likes.length }}</i>
        <img :src="post.likeIds" class="img-fluid rounded-top" alt="">
        <i v-if="post.creatorId == account.id" @click="deletePost()" class="mdi mdi-select-remove btnclicky fs-1"></i>

    </div>
</template>


<script>
import { ref, onMounted, computed } from 'vue';

import { Post } from '../models/Post.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState';





export default {
    name: 'Profile-PostCard',

    props: {
        post: { type: Post, required: true }, userLoggedIn: Boolean,
    },

    setup(props) {
        const postData = ref(null);
        // const router = useRouter();
        onMounted(() => {

        });

        return {

            postData,
            activePost: computed(() => AppState.activePost),
            account: computed(() => AppState.account),

            formattedDate: computed(() => {
                const createdAtDate = props.post.createdAt;
                const now = new Date();
                const timeDifference = now - createdAtDate;
                const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

                if (hoursDifference < 24) {
                    return `${hoursDifference} hours ago`;
                } else {
                    return createdAtDate.toLocaleDateString();
                }
            }),



            async postVote() {
                try {
                    logger.log('this.post:', this.post);
                    const updatedPost = await postsService.postVote(props.post.id);
                    logger.log('updatedPost:', updatedPost);
                    props.post.likes = updatedPost;
                    Pop.toast('🤖V0t3 1s C4st!🤖');
                } catch (error) {
                    logger.error('Error in postVote:', error);
                    Pop.error(error);
                }
            },
            async deletePost() {
                try {
                    if (await Pop.confirm('Are you sure?')) {
                        const postId = this.post.id;
                        await postsService.removePost(postId);

                        const postIndex = AppState.posts.findIndex(post => post.id == postId);
                        if (postIndex !== -1) {
                            AppState.posts.splice(postIndex, 1);
                        }
                        Pop.toast('Post deleted successfully');
                    }
                } catch (error) {
                    Pop.error(error);
                }
            }

        }
    }
}





</script>


<style scoped="scss">
.btnclicky:hover {
    cursor: pointer !important;
    ;
}

.profile-pic {
    height: 75px;
    width: 75px;
    object-fit: cover;
    object-position: center;
    border-radius: 50em;
}

.post-image {
    height: 75vh;
    width: 100%;
    object-fit: cover;
    object-position: center center;
}
</style>