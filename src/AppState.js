import { reactive } from 'vue'
// import { Profile } from './models/Profile.js'
// import { Posts } from './models/Posts.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {Post[]} */
  posts: [],

  /** @type {Post} */
  activePost: null,


  /** @type {Profile} */
  profile: null,

  /** @type {Post[]} */
  profilePosts: [],


  /** @type {Story[]} */
  stories: [],

  /** @type {Story} */
  activeStory: null,


  /** @type {Number} */
  pageNumber: 1,
  /** @type{Number} */
  totalPages: 1,
})
