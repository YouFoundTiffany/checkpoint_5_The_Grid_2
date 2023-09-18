<!-- TODO FIX FORM TO CLOSE CORRECTLY AFTER ALL OTHER REQUIREMENTS ACHIEVED -->
<template>
    <div v-if="userLoggedIn">
        <form @submit.prevent="createPost">
            <div class="mb-3 col-12">
                <label for="postBody" class="form-label">Post Content</label>
                <textarea v-model="postData.body" class="form-control" id="postBody" minlength="3" maxlength="400"
                    required></textarea>
            </div>
            <div class="mb-3 col-12">
                <label for="post-imgUrl">Image Url</label>
                <input v-model="postData.imgUrl" type="url" id="post-imgUrl" class="form-control" placeholder="must be url"
                    min="1" required>
                <img class="img-fluid mt-1 h-100" :src="postData.imgUrl" alt="">
            </div>
            <button type="submit" class="mx-1 btnclicky btn btn-secondary">Submit</button>
            <button @click="deletePost" class="mx-1 btn btn-secondary">Cancel</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { inject } from 'vue';




export default {


    setup() {
        // const make = ref('') // great for single inputs
        //REVIEW consider removing the curley braces.
        const postData = ref({})
        const router = useRouter() // router takes you to other pages (it's the vehicle)
        return {

            postData,
            async createPost() {
                try {
                    logger.log('creating post 🚗', postData.value);
                    const newPost = await postsService.createPost(postData.value);
                    AppState.posts.unshift(newPost);
                    postData.value = {};
                    Pop.toast('Post Created', 'success');
                } catch (error) {
                    Pop.error(error);
                    postData.value = {} // Reset the form data

                }
            },

        }
    }
}

</script>



<style>
.btnclicky:hover {
    cursor: pointer !important;
    ;
}
</style>