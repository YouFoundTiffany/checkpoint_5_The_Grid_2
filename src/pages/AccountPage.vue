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
            <input v-model="account.name" type="text" class="form-control" id="name" required :minlength="3"
              :maxlength="50">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="account.email" type="email" class="form-control" id="email" required :minlength="5"
              :maxlength="100">
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>
            <textarea v-model="account.bio" class="form-control" id="bio" rows="4" :minlength="10"
              :maxlength="500"></textarea>
          </div>
          <!-- Add more fields as needed -->

          <!-- Social Media Links -->
          <div class="mb-3">
            <label for="github" class="form-label">GitHub</label>
            <input v-model="account.github" type="text" class="form-control" id="github" :maxlength="100">
          </div>
          <div class="mb-3">
            <label for="linkedin" class="form-label">LinkedIn</label>
            <input v-model="account.linkedin" type="text" class="form-control" id="linkedin" :maxlength="100">
          </div>
          <!-- Add more social media links as needed -->

          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';
import { Story } from '../models/Story.js';
import { Account } from '../models/Account.js';
import { storiesService } from '../services/StoriesService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { accountService } from '../services/AccountService.js';

export default {
  props: {
    account: { type: Account, required: true },
    story: { type: Story, required: true },
  },
  setup(props) {
    // Access props directly in the setup function
    logger.log('account prop:', props.account);
    logger.log('story prop:', props.story);

    const editable = ref(props.account);

    onMounted(() => {
      // Define data using the ref function
      const accountData = ref({
        // ... account properties
      });

      async function editAccount() {
        try {
          const accountId = props.account.id;



          await accountService.editAccount(edit.value);

          emit("carEdited");
        } catch (error) {
          Pop.error(error);
        }
      }

      // Function to get stories
      async function getStories() {
        try {
          await storiesService.getStories();
        } catch (error) {
          Pop.error(error);
        }
      }

      // Execute getStories when the component is mounted
      onMounted(() => {
        getStories();
      });

      watch(() => props.account, (newVal) => {
        accountData.value = { ...newVal };
      });

      return {
        accountData,
        editAccount,
      };
    });
  },
};
</script>


<style></style>
