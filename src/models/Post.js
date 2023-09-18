export class Post {
    constructor(data) {
        this.id = data.id
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.body = data.body
        this.creatorId = data.creatorId
        this.imgUrl = data.imgUrl
        this.likeIds = data.likeIds || []
        this.likes = data.likes || []
        this.creatorName = data.creator.name
        this.creatorPicture = data.creator.picture
    }

}
