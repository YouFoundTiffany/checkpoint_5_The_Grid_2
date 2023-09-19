import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class PostsService {
    async getPosts() {
        const response = await api.get('api/posts');
        logger.log('Its Getting Posts! Posts Service reporting in📖', response.data);
        AppState.posts = response.data.posts.map(post => new Post(post));
        AppState.pageNumber = response.data.page;
        AppState.totalPages = response.data.total_pages;
    }
    async postVote(postId) {
        const response = await api.post(`api/posts/${postId}/like`)
        // logger.log('voting✅', response.data)
        return new Post(response.data)
    }

    async createPost(postData) {
        const response = await api.post('api/posts', postData);
        logger.log('new post 📖', response.data);
        const newPost = new Post(response.data);
        AppState.posts.push(newPost); // Corrected "AppState.post" to "AppState.posts"
        return newPost;
    }

    async removePost(postId) {
        const response = await api.delete(`api/posts/${postId}`);
        logger.log('removed post 📖', response.data);
        AppState.activePost = null;

        let indexToRemove = AppState.posts.findIndex(post => post.id == postId); // Corrected "AppState.post" to "AppState.posts"
        if (indexToRemove >= 0) {
            AppState.posts.splice(indexToRemove, 1);
        }
    }

    async searchPosts(searchTerm) { // Removed "event" parameter
        try {
            logger.log('🔮 searching', searchTerm);
            const response = await api.get(`/api/posts?query=${searchTerm}`);
            logger.log('🔮', response.data);
            AppState.posts = response.data.posts.map(post => new Post(post));
            AppState.pageNumber = response.data.page;
            AppState.totalPages = response.data.total_pages;
            AppState.searchTerm = searchTerm;
        } catch (error) {
            Pop.error(error);
        }
    }

    async clearSearch() {
        AppState.searchTerm = '';
        await this.getPosts(); // Changed "postsService.getPosts()" to "this.getPosts()"
    }

    async changePage(url) {
        logger.log('📄', url);
        const response = await api.get(url);
        logger.log('nuther page', response.data);
        AppState.posts = response.data.posts.map(post => new Post(post)); // Corrected "new posts" to "new Post"
        AppState.pageNumber = response.data.page;
        AppState.totalPages = response.data.total_pages;
    }
}

export const postsService = new PostsService();

