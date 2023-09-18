<template>
    <!-- NOTE .prevent works the same as event.preventDefault() -->
    <form @submit.prevent="searchPosts" class="row">
        <div class="col-12 input-group">
            <input v-model="searchTerm" type="text" class="form-control" placeholder="search posts">
            <button class="btn btn-secondary"><i class="mdi mdi-magnify"></i></button>
        </div>
    </form>
    <div v-if="activeSearch" class="mt-2">
        searching results for:

        <span class="border border-primary rounded-pill p-2">{{ activeSearch }} <button @click="clearSearch" class="btn"><i
                    class="mdi mdi-close"></i></button></span>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { inject } from 'vue';
import { api } from '../services/AxiosService.js';
import { Post } from '../models/Post.js';
Post



export default {
    setup() {
        // NOTE we can create reactive items with ref
        const searchTerm = ref('')
        return {
            AppState,
            searchTerm,
            activeSearch: computed(() => AppState.searchTerm),

            async searchPosts(searchTerm) {
                try {
                    const response = await api.get(`/api/posts?query=${searchTerm}`);
                    logger.log('🔮', response.data);
                    this.posts = response.data.posts.map(post => new Post(post));
                    this.pageNumber = response.data.page;
                    this.totalPages = response.data.totalPages;
                    this.searchTerm = searchTerm;
                } catch (error) {
                    Pop.error(error);
                }
            },

            async clearSearch() {
                try {
                    if (await Pop.confirm('Clear search results?')) {
                        await postsService.clearSearch()
                        // NOTE clearing the form the new way
                        searchTerm.value = ''
                    }
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>



<style lang="scss" scoped></style>