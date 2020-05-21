<template>
  <div class="post-list">
    <post-list-item v-for="post in posts" :post="post" :key="post['.key']" />
  </div>
</template>

<script>
import PostListItem from "@/components/Post/PostListItem";

export default {
  components: {
    PostListItem
  },
  props: {
    posts: {
      required: true,
      type: Array
    }
  }
};
</script>
