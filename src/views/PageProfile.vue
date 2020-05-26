<template>
  <div class="flex-grid">
    <profile-card v-if="!edit" :user="user" />
    <profile-card-editor v-else :user="user" />
    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead"> {{ user.name }} recent activity </span>
        <a href="#">See only started threads?</a>
      </div>
      <hr />
      <post-list :posts="userPosts" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostList from "@/components/Post/PostList";
import ProfileCard from "@/components/Profile/ProfileCard";
import ProfileCardEditor from "@/components/Profile/ProfileCardEditor";

export default {
  components: {
    PostList,
    ProfileCard,
    ProfileCardEditor
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      user: "authenticatedUser"
    }),
    userPosts() {
      if (this.user.posts) {
        return Object.values(this.$store.state.posts).filter(
          post => post.userId === this.user[".key"]
        );
      }
      return [];
    }
  }
};
</script>
