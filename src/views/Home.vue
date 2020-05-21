<template>
  <div class="col-full">
    <h1>Welcome to the Forum</h1>
    <thread-list :threads="threads" />
  </div>
</template>

<script>
import sourceData from "@/data";
import ThreadList from "@/components/Thread/ThreadList";

export default {
  name: "HelloWorld",
  components: {
    ThreadList
  },
  data() {
    return {
      threads: Object.values(sourceData.threads),
      posts: sourceData.posts,
      users: sourceData.users
    };
  }
};
</script>
