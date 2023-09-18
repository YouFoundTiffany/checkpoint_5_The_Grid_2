<template>
    <div @click="showPostDetails" class="g-4 p-1 mb-4 card elevation-3 border border-secondary">
        <!-- <img :src="post.creatorpicture" class="rofile-pic" alt=""> -->
        <!-- <h4 class="">{{ post.creatorName }}</h4> -->
        <!-- <p>{{ formatCreatedAt(post.createdAt) }}</p> -->
        <p>{{ post.body }}</p>
        <img class="post-image" :src="post.imgUrl" alt="">
        <i @click="postVote()" class="mdi mdi-laptop btnclicky">{{
            post.likes.length }}</i>
        <img :src="post.likeIds" class="img-fluid rounded-top" alt="">
        <i @click="removePost()" class="mdi mdi-select-remove btnclicky"></i>

    </div>
</template>
<script>


export default {

    setup() {
        return {}
    }
};



</script>


<style scoped="scss">
.btnclicky:hover {
    cursor: pointer !important;
    ;
}

.profile-pic {
    height: 30px;
    width: 30px;
    object-fit: cover;
    object-position: center;
    border-radius: 50em;
}

.post-image {
    height: 20vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>