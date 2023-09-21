<template>
    <div>
        <form @submit.prevent="createPost">
            <div class="mb-3 col-12">
                <label for="postBody" class="form-label">Post Content</label>
                <textarea v-model="postData.body" class="form-control" id="postBody" minlength="3"
                    maxlength="400"></textarea>
            </div>
            <div class="mb-3 col-12">
                <label for="post-imgUrl">Image Url</label>
                <input v-model="postData.imgUrl" type="url" id="post-imgUrl" class="form-control" placeholder="must be url"
                    min="1" required>
                <img class="img-fluid mt-1 h-100" :src="postData.imgUrl" alt="">
            </div>
            <button type="submit" class="mx-1 btn btn-secondary">Submit</button>
            <button @click="deletePost" class="mx-1 btn btn-secondary">Cancel</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { Account } from '../models/Account.js';

export default {
    props: { account: { type: Account, required: true } },

    setup() {
        const postData = ref({ body: '', imgUrl: '' });

        // eslint-disable-next-line space-before-function-paren
        const createPost = async () => {
            try {
                logger.log(postData.value);
                const newPost = await postsService.createPost(postData.value);
                AppState.posts.unshift(newPost);
                postData.value = { body: '', imgUrl: '' };
                Pop.toast('Post Created', 'success');
            } catch (error) {
                Pop.error(error);
                // postData.value = { body: '', imgUrl: '' };
            }
        };

        // const cancelPost = () => {

        //     const showForm = ref(true);

        //     showForm.value = false;
        // };

        return {
            postData,
            createPost,
            // cancelPost,
        };
    },
};
</script>

<style>
.btnclicky:hover {
    cursor: pointer !important;
}
</style>
