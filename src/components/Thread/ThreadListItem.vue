<template>
  <div class="thread">
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
import { objectPropertiesCounter } from "@/helpers/objectPropertiesCounter";

export default {
  props: {
    thread: {
      required: true,
      type: Object
    }
  },
  computed: {
    repliesCount() {
      return objectPropertiesCounter(this.thread.posts) - 1;
    },
    user() {
      return this.$store.state.users[this.thread.userId];
    }
  }
};
</script>
