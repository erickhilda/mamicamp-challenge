<template>
  <div v-if="thread && user" class="thread">
    <div>
      <p>
        <router-link
          :to="{ name: 'ThreadShow', params: { id: thread['.key'] } }"
        >
          {{ thread.title }}
        </router-link>
      </p>
      <p class="text-faded text-xsmall">
        By <a href="#">{{ user.name }},</a>
        <app-date :timestamp="thread.publishedAt" />
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">{{ repliesCount }} replies</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thread: {
      required: true,
      type: Object
    }
  },
  computed: {
    repliesCount() {
      return this.$store.getters["threads/threadRepliesCount"](
        this.thread[".key"]
      );
    },
    user() {
      return this.$store.state.users.items[this.thread.userId];
    }
  }
};
</script>
