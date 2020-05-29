<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>
    <thread-editor ref="editor" @save="save" @cancel="cancel" />
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
    forumId: {
      type: String,
      required: true
    }
  },
  mixins: [asyncDataStatus],
  data() {
    return {
      saved: false
    };
  },
  computed: {
    forum() {
      return this.$store.state.forums[this.forumId];
    },
    hasUnsavedChanges() {
      return (
        (this.$refs.editor.form.title || this.$refs.editor.form.text) &&
        !this.saved
      );
    }
  },
  methods: {
    ...mapActions(["fetchForum", "createThread"]),
    save({ title, text }) {
      this.createThread({
        forumId: this.forum[".key"],
        title,
        text
      }).then(thread => {
        this.saved = true;
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
    this.fetchForum({ id: this.forumId }).then(() => {
      this.asyncDataStatus_fetched();
    });
  },
  beforeRouteEnter(to, from, next) {
    if (this.hasUnsavedChanges) {
      const confirmed = window.confirm(
        "Are you sure you want to leave? Unsaved changes will be lost."
      );
      if (confirmed) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  }
};
</script>
