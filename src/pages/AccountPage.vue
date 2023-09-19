<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="container">
    <div class="row">
      <!-- Main Content Column -->
      <div class="col-md-8">
        <!-- Editable Account Form -->
        <form @submit.prevent="updateAccount">
          <!-- Account Information -->
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input v-model="account.name" type="text" class="form-control" id="name" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="account.email" type="email" class="form-control" id="email" required>
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>
            <textarea v-model="account.bio" class="form-control" id="bio" rows="4"></textarea>
          </div>
          <!-- Add more fields as needed -->

          <!-- Social Media Links -->
          <div class="mb-3">
            <label for="github" class="form-label">GitHub</label>
            <input v-model="account.github" type="text" class="form-control" id="github">
          </div>
          <div class="mb-3">
            <label for="linkedin" class="form-label">LinkedIn</label>
            <input v-model="account.linkedin" type="text" class="form-control" id="linkedin">
          </div>
          <!-- Add more social media links as needed -->

          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
      </div>

      <!-- Stories Column -->
      <div class="col-md-4">
        <!-- StoryCard Component -->
        <StoryCard v-for="story in stories" :key="story.title" :story="story" />
      </div>
    </div>
  </div>
</template>

<script>
import { Story } from '../models/Story.js';
import { Account } from '../models/Account.js';
export default {
  props: {
    account: { type: Account, required: true }, story: { type: Story, required: true },

    data() {
      return {
        account: {
          name: "",
          email: "",
          bio: "",
          github: "",
          linkedin: "",
          id: "",
          picture: "",
          coverImg: "",
          resume: "",
          class: "",
          graduated: "",
          createdAt: "",
          updatedAt: "",

        },
      };
    },
    methods: {
      updateAccount() {
        // Add logic to update the account information
        // You can use this.account to access the updated values
      },
    },
  }
};
</script>

