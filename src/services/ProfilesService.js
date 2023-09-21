import { AppState } from "../AppState.js";
import { Profile } from "../models/Profile.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { Post } from "../models/Post.js";

class ProfilesService {

    async getProfile(profileId) {
        const response = await api.get(`api/profiles/${profileId}`)
        logger.log('[GETTING PROFILE]', response.data)
        const profile = new Profile(response.data)
        AppState.profile = profile
    }



    // /api/profiles /: id / posts

    async ProfilePosts(profileId) {
        const response = await api.get(`api/profiles/${profileId}/posts`);

        logger.log('Its Getting Post0s from 1 griddie ! Posts Service reporting in📖', response.data);
        AppState.posts = response.data.posts.map(post => new Post(post));
    }

}



export const profilesService = new ProfilesService()