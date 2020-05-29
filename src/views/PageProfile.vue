<template>
  <div class="flex-grid">
    <template v-if="user">
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
    </template>
    <div v-else class="text-center" style="margin-bottom: 50px;">
      <router-link :to="{ name: 'Signin', query: { redirectTo: $route.path } }">
        Sign in
      </router-link>
      or
      <router-link
        :to="{ name: 'Register', query: { redirectTo: $route.path } }"
      >
        Register
      </router-link>
      to post a reply.
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostList from "@/components/Post/PostList";
import ProfileCard from "@/components/Profile/ProfileCard";
import ProfileCardEditor from "@/components/Profile/ProfileCardEditor";
import asyncDataStatus from "@/mixins/asyncDataStatus";

export default {
  components: {
    PostList,
    ProfileCard,
    ProfileCardEditor
  },
  mixins: [asyncDataStatus],
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
      return this.$store.getters.userPosts(this.user[".key"]);
    }
  },
  created() {
    this.$store
      .dispatch("fetchPosts", { ids: this.user.posts })
      .then(() => this.asyncDataStatus_fetched());
  }
};
</script>
