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
        By <a href="#">{{ user.name }}</a
        >, {{ thread.publishedAt | postAge }}.
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">{{ repliesCount }} replies</p>
    </div>
  </div>
</template>

<script>
import sourceData from "@/data";
import postAge from "@/mixins/postAge";

export default {
  props: {
    thread: {
      required: true,
      type: Object
    }
  },
  mixins: [postAge],
  computed: {
    repliesCount() {
      return Object.keys(this.thread.posts).length - 1;
    },
    user() {
      return sourceData.users[this.thread.userId];
    }
  }
};
</script>
