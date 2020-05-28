<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
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
import { mapActions } from "vuex";
import ThreadEditor from "@/components/Thread/ThreadEditor";
import asyncDataStatus from "@/mixins/asyncDataStatus";

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
  mixins: [asyncDataStatus],
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
    ...mapActions(["updateThread", "fetchThread", "fetchPost"]),
    save({ title, text }) {
      this.updateThread({
        id: this.id,
        title,
        text
      }).then(thread => {
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
    this.fetchThread({ id: this.id }).then(thread =>
      this.fetchPost({ id: thread.firstPostId }).then(() => {
        this.asyncDataStatus_fetched();
      })
    );
  }
};
</script>
