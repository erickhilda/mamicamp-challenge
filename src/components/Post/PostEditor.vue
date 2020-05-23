<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        class="form-input"
        v-model="newPost"
      />
    </div>
    <div class="form-actions">
      <button class="btn-blue">Submit post</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    threadId: {
      required: true
    }
  },
  data() {
    return {
      newPost: ""
    };
  },
  methods: {
    save() {
      const post = {
        text: this.newPost,
        threadId: this.threadId
      };
      this.newPost = "";
      this.$store.dispatch("createPost", post);
    }
  }
};
</script>
