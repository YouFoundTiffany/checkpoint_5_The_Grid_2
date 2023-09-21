<template>
    <form @submit.prevent="searchProfs" class="row">
        <div class="col-12 input-group">
            <input v-model="searchTerm" type="text" class="form-control" :placeholder="placeholderText"
                @focus="clearPlaceholder">
            <button type="submit" class="btn btn-secondary"><i class="mdi mdi-magnify"></i></button>
        </div>
    </form>
</template>

<script>
import { AppState } from '../AppState';
import { computed, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { api } from '../services/AxiosService.js';
import { Post } from '../models/Post.js';

export default {
    setup() {
        const searchTerm = ref('');
        const placeholderText = 'Search posts';

        return {
            AppState,
            searchTerm,
            placeholderText,
            activeSearch: computed(() => AppState.searchTerm),

            async searchProfs() {
                try {
                    const response = await api.get(`/api/posts?query=${this.searchTerm}`);
                    logger.log('🔮', response.data);
                    this.posts = response.data.posts.map(post => new Post(post));
                    this.pageNumber = response.data.page;
                    this.totalPages = response.data.totalPages;
                    AppState.searchTerm = this.searchTerm; // Update the global search term
                } catch (error) {
                    Pop.error(error);
                }
            },

            clearPlaceholder() {
                this.placeholderText = ''; // Clear the placeholder text when the input is focused
            }
        };
    }
};
</script>

<style lang="scss" scoped></style>
