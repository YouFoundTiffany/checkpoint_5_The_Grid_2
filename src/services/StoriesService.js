import { AppState } from "../AppState.js"
import { Story } from "../models/Story.js"
import { api } from "./AxiosService.js"
class StoriesService {

    async getStories() {
        const response = await api.get('api/ads')
        const stories = response.data.map(s => new Story(s))
        AppState.stories = stories
    }

}
export const storiesService = new StoriesService()
