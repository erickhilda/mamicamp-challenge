import Vue from "vue";
import Vuex from "vuex";
import sourceData from "@/data";

Vue.use(Vuex);

export default new Vuex.Store({
  state: sourceData,
  mutations: {
    setPost(state, { postId, post }) {
      Vue.set(state.posts, postId, post);
    },
    appendPostToThread(state, { threadId, postId }) {
      const thread = state.threads[threadId];
      Vue.set(thread.posts, postId, postId);
    },
    appendPostToUser(state, { userId, postId }) {
      const user = state.users[userId];
      Vue.set(user.posts, postId, postId);
    }
  },
  actions: {
    createPost(context, post) {
      const postId = "greatPost" + Math.random();
      post[".key"] = postId;

      context.commit("setPost", { post, postId });
      context.commit("appendPostToThread", { threadId: post.threadId, postId });
      context.commit("appendPostToUser", { userId: post.userId, postId });
    }
  },
  modules: {}
});
