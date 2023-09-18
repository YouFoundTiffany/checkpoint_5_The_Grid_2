import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class ProfilesService {

    async getProfile(profileId) {
        // FIXME this is getting the wrong data
        const res = await api.get(`api/profiles/${profileId}/posts`)
        logger.log('[GETTING PROFILE]', res.data)
        const profile = new Profile(res.data)
        AppState.profile = profile
    }

    async getProfilePosts(profileId) {

        // FIXME this is setting the wrong data to the AppState
        const res = await api.get(`api/profiles/${profileId}/posts`)
        logger.log('[GETTING PROFILE]', res.data)
        const profile = new Profile(res.data)
        AppState.profile = profile
    }

}



export const profilesService = new ProfilesService()