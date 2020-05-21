<template>
  <div>
    <h1>{{ thread.title }}</h1>

    <post-list :posts="posts" />
    <post-editor @save="addPost" :thread-id="id" />
  </div>
</template>

<script>
import sourceData from "@/data";
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
      thread: sourceData.threads[this.id],
      newPost: ""
    };
  },
  computed: {
    posts() {
      const postIds = Object.values(this.thread.posts);
      return Object.values(sourceData.posts).filter(post =>
        postIds.includes(post[".key"])
      );
    }
  },
  methods: {
    addPost(eventData) {
      const post = eventData.post;
      const postId = eventData.post[".key"];
      this.$set(sourceData.posts, postId, post);
      this.$set(this.thread.posts, postId, postId);
      this.$set(sourceData.users[post.userId].posts, postId, postId);
      this.newPost = "";
    }
  }
};
</script>
