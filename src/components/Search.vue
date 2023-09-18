<template>
    <!-- NOTE .prevent works the same as event.preventDefault() -->
    <form @submit.prevent="searchPosts" class="row">
        <div class="col-12 input-group">
            <input v-model="searchTerm" type="text" class="form-control" placeholder="search posts">
            <button class="btn btn-primary"><i class="mdi mdi-magnify"></i></button>
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
export default {
    setup() {
        // NOTE we can create reactive items with ref
        const searchTerm = ref('')
        return {
            searchTerm,
            activeSearch: computed(() => AppState.searchTerm),
            async searchPosts(event) { // if the @handler doesn't have () then it passes the even as the first argument always
                try {
                    logger.log('🔮 searching', searchTerm.value)
                    await postsService.searchPosts(searchTerm.value)
                    // logger.log(event.target) clearing from the old way
                    // event.target.reset()
                } catch (error) {
                    Pop.error(error)
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