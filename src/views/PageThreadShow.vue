<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      {{ thread.title }}

      <router-link
        :to="{ name: 'ThreadEdit', id: this.id }"
        class="btn-green btn-small"
        tag="button"
      >
        Edit Thread
      </router-link>
    </h1>

    <p>
      By <a href="#" class="link-unstyled">{{ user.name }},</a>
      <app-date :timestamp="thread.publishedAt" />.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >
        {{ repliesCount }} replies by {{ contributorsCount }} contributors
      </span>
    </p>

    <post-list :posts="posts" />
    <post-editor :thread-id="id" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PostList from "@/components/Post/PostList";
import PostEditor from "@/components/Post/PostEditor";
import asyncDataStatus from "@/mixins/asyncDataStatus";

export default {
  components: { PostList, PostEditor },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  mixins: [asyncDataStatus],
  computed: {
    posts() {
      const postIds = Object.values(this.thread.posts);
      return Object.values(this.$store.state.posts).filter(post =>
        postIds.includes(post[".key"])
      );
    },
    thread() {
      return this.$store.state.threads[this.id];
    },
    user() {
      return this.$store.state.users[this.thread.userId];
    },
    repliesCount() {
      return this.$store.getters.threadRepliesCount(this.thread[".key"]);
    },
    contributorsCount() {
      const replies = Object.keys(this.thread.posts)
        .filter(postId => postId !== this.thread.firstPostId)
        .map(postId => this.$store.state.posts[postId]);
      const userIds = replies.map(post => post.userId);
      return userIds.filter((item, index) => index === userIds.indexOf(item))
        .length;
    }
  },
  methods: {
    ...mapActions(["fetchThread", "fetchUser", "fetchPosts", "fetchUser"])
  },
  created() {
    this.fetchThread({ id: this.id })
      .then(thread => {
        this.fetchUser({ id: thread.userId });
        this.fetchPosts({ ids: Object.keys(thread.posts) });
        return this.fetchPosts({ ids: Object.keys(thread.posts) });
      })
      .then(posts => {
        return Promise.all(
          posts.map(post => {
            this.fetchUser({ id: post.userId });
          })
        );
      })
      .then(() => {
        this.asyncDataStatus_fetched();
      });
  }
};
</script>
