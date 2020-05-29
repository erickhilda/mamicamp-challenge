<template>
  <div v-if="post && user" class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{ user.name }}</a>

      <a href="#">
        <img class="avatar-large" :src="user.avatar" alt="" />
      </a>

      <p class="desktop-only text-small">{{ userThreadsCount }} threads</p>
      <p class="desktop-only text-small">{{ userPostsCount }} posts</p>
    </div>

    <div class="post-content">
      <template v-if="!editing">
        <div>
          {{ post.text }}
        </div>
        <a
          v-if="authUser"
          @click.prevent="editing = true"
          href="#"
          style="margin-left: auto;"
          class="link-unstyled"
          title="Make a change"
        >
          <i class="fa fa-pencil" />
        </a>
        <!-- <button class="btn-blue" @click.prevent="editing = true">edit</button> -->
      </template>
      <div v-else>
        <post-editor
          :post="post"
          @save="editing = false"
          @cancel="editing = false"
        />
      </div>
    </div>

    <div class="post-date text-faded">
      <div v-if="post.edited" class="edition-info">edited</div>
      <app-date :timestamp="post.publishedAt" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostEditor from "@/components/Post/PostEditor";

export default {
  components: { PostEditor },
  props: {
    post: {
      required: true,
      type: Object,
      validator: obj => {
        const keyIsValid = typeof obj[".key"] === "string";
        const textIsValid = typeof obj.text === "string";
        const valid = keyIsValid && textIsValid;
        if (!textIsValid) {
          console.error(
            "😳 The post prop object must include a `text` attribute."
          );
        }
        if (!keyIsValid) {
          console.error(
            "😳 The post prop object must include a `.key` attribute."
          );
        }
        return valid;
      }
    }
  },
  data() {
    return {
      editing: false
    };
  },
  computed: {
    ...mapGetters({
      authUser: "auth/authUser"
    }),
    user() {
      return this.$store.state.users.items[this.post.userId];
    },
    userPostsCount() {
      return this.$store.getters["users/userPostsCount"](this.post.userId);
    },
    userThreadsCount() {
      return this.$store.getters["users/userThreadsCount"](this.post.userId);
    }
  }
};
</script>
