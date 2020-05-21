<template>
  <div>
    <h1>{{ thread.title }}</h1>

    <p>
      By <a href="#" class="link-unstyled">Robin</a>,
      <app-date :timestamp="thread.publishedAt" />.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >
        3 replies by 3 contributors
      </span>
    </p>

    <post-list :posts="posts" />
    <post-editor :thread-id="id" />
  </div>
</template>

<script>
import PostList from "@/components/Post/PostList";
import PostEditor from "@/components/Post/PostEditor";

export default {
  components: { PostList, PostEditor },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      thread: this.$store.state.threads[this.id],
      newPost: ""
    };
  },
  computed: {
    posts() {
      const postIds = Object.values(this.thread.posts);
      return Object.values(this.$store.state.posts).filter(post =>
        postIds.includes(post[".key"])
      );
    }
  }
};
</script>
