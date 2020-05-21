<template>
  <div class="thread-list">
    <h2 class="list-title">Threads</h2>
    <thread-list-item
      v-for="thread in threads"
      :thread="thread"
      :key="`post_${thread['.key']}`"
    />
  </div>
</template>

<script>
import ThreadListItem from "@/components/Thread/ThreadListItem";

export default {
  components: {
    ThreadListItem
  },
  props: {
    threads: {
      required: true,
      type: Array
    }
  }
};
</script>
