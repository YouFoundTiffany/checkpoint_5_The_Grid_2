import { reactive } from 'vue'

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

  // // FIXME probably dont need this
  // /** @type {Profile} */
  // activeProfile: null,



  /** @type {Story[]} */
  stories: [],

  /** @type {Story} */
  activeStory: null,


  /** @type {Number} */
  pageNumber: 1,
  /** @type{Number} */
  totalPages: 1,
})
