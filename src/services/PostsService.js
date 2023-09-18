import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

    async getPosts() {
        const response = await api.get('api/posts')
        logger.log('Its Getting Posts! Posts Service reporting in📖', response.data)
        AppState.posts = response.data.posts.map(post => new Post(post))
        AppState.pageNumber = response.data.page
        AppState.totalPages = response.data.total_pages
    }
    // combo? get posts and then send a different appstate return?

    // async getProfiles() {
    //     const response = await api.get('api/posts')
    //     logger.log('Its Getting Postsfor the Profiles, response.data', response.data.posts)
    //     AppState.posts = response.data.posts.map(profile => new Profile(profile))
    // }
    async createPost(postData) {
        const response = await api.post('api/posts', postData)
        logger.log('new post 📖', response.data)
        const newPost = new Post(response.data)
        AppState.post.push(newPost)
        return newPost
    }

    async removePost(postId) {
        const response = await api.delete(`api/posts/${postId}`)
        logger.log('removed post 📖', response.data)
        AppState.activePost = null

        let indexToRemove = AppState.post.findIndex(post => post.id == postId)
        if (indexToRemove >= 0) {
            AppState.posts.splice(indexToRemove, 1)
        }
    }
    async searchGriddies(searchTerm) {
        const response = await api.get(`search/posts?query=${searchTerm}`)
        logger.log('🔮', response.data)
        AppState.posts = response.data.posts.map(posts => new posts(posts))
        AppState.pageNumber = response.data.page
        AppState.totalPages = response.data.total_pages
        AppState.searchTerm = searchTerm
    }

    async clearSearch() {
        AppState.searchTerm = ''
        await postsService.getPosts()

    }

    async changePage(url) {
        logger.log('📄', url)
        const response = await api.get(url)
        logger.log('nuther page', response.data)
        AppState.posts = response.data.posts.map(posts => new posts(posts))
        // AppState.pageNumber =number
        AppState.pageNumber = response.data.page
        AppState.totalPages = response.data.total_pages
    }
}
export const postsService = new PostsService()
