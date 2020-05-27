<template>
  <div v-if="thread && text" class="col-full push-top">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>

    <thread-editor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import ThreadEditor from "@/components/Thread/ThreadEditor";

export default {
  components: {
    ThreadEditor
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    thread() {
      return this.$store.state.threads[this.id];
    },
    text() {
      const post = this.$store.state.posts[this.thread.firstPostId].text;
      return post;
    }
  },
  methods: {
    save({ title, text }) {
      this.$store
        .dispatch("updateThread", {
          id: this.id,
          title,
          text
        })
        .then(thread => {
          this.$router.push({
            name: "ThreadShow",
            params: { id: thread[".key"] }
          });
        });
    },
    cancel() {
      this.$router.push({ name: "Forum", params: { id: this.forum[".key"] } });
    }
  },
  created() {
    this.$store
      .dispatch("fetchThread", { id: this.id })
      .then(thread =>
        this.$store.dispatch("fetchPost", { id: thread.firstPostId })
      );
  }
};
</script>
