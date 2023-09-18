<template>
    <div @click="openDetails" class="g-4 p-1 mb-4 card elevation-3 hover-steel-mist">
        <!-- <div>{{ story.title }}</div> -->
        <img :src="story.square" alt="Square Image" />
        <img :src="story.banner" alt="Banner Image" />
    </div>
</template>

<script>
import { Story } from '../models/Story.js';
import { logger } from '../utils/Logger.js';
import { inject } from 'vue';
import { AppState } from '../AppState.js';


export default {
    props: { story: { type: Story, required: true } },
    setup(props) {
        // logger.log('storycard from setup?', props.story)
        return {
            AppState,
            async getStories() {
                // Your async function code here
            }
        };
    }
};
</script>