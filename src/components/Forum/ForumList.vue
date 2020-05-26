<template>
  <div>
    <forum-list-item
      v-for="forum in forums"
      :forum="forum"
      :key="`forum_${forum['.key']}`"
    />
  </div>
</template>

<script>
import ForumListItem from "@/components/Forum/ForumListItem";

export default {
  components: {
    ForumListItem
  },
  props: {
    forums: {
      required: true,
      type: Array
    }
  }
};
</script>
